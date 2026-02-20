from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image


@dataclass(frozen=True)
class Run:
    x1: int
    x2: int  # exclusive

    @property
    def width(self) -> int:
        return self.x2 - self.x1


def is_background_pixel(rgb: tuple[int, int, int], *, hard: int = 240, soft: int = 225) -> int:
    """
    Returns alpha 0..255 where 0 is fully transparent (background).
    Hard threshold makes pure/near-white fully transparent.
    Soft threshold preserves anti-aliased edges.
    """
    r, g, b = rgb
    whiteness = min(r, g, b)
    if whiteness >= hard:
        return 0
    if whiteness >= soft:
        # linearly ramp alpha from 0..255 between [hard..soft]
        return int(255 * (hard - whiteness) / (hard - soft))
    return 255


def find_content_runs(
    img_rgb: Image.Image, *, white_thresh: int = 245, gap_merge: int = 12, min_pixels_per_col: int | None = None
) -> list[Run]:
    w, h = img_rgb.size
    px = img_rgb.load()

    if min_pixels_per_col is None:
        # ignore JPG speckle in the white background
        min_pixels_per_col = max(6, h // 120)

    col_has_content = [False] * w
    for x in range(w):
        hits = 0
        for y in range(h):
            r, g, b = px[x, y]
            if r < white_thresh or g < white_thresh or b < white_thresh:
                hits += 1
                if hits >= min_pixels_per_col:
                    col_has_content[x] = True
                    break

    runs: list[Run] = []
    x = 0
    while x < w:
        if not col_has_content[x]:
            x += 1
            continue
        x1 = x
        while x < w and col_has_content[x]:
            x += 1
        x2 = x
        runs.append(Run(x1, x2))

    # merge tiny gaps (JPG compression can create small holes)
    if not runs:
        return []
    merged: list[Run] = [runs[0]]
    for r in runs[1:]:
        prev = merged[-1]
        gap = r.x1 - prev.x2
        if gap <= gap_merge:
            merged[-1] = Run(prev.x1, r.x2)
        else:
            merged.append(r)

    # drop extremely small runs (noise)
    min_width = max(10, w // 80)
    merged = [r for r in merged if r.width >= min_width]
    return merged


def crop_bbox_in_xrange(
    img_rgb: Image.Image, run: Run, *, white_thresh: int = 245, pad: int = 10
) -> tuple[int, int, int, int]:
    w, h = img_rgb.size
    px = img_rgb.load()

    x1, x2 = run.x1, run.x2
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    found = False
    for x in range(x1, x2):
        for y in range(h):
            r, g, b = px[x, y]
            if r < white_thresh or g < white_thresh or b < white_thresh:
                found = True
                if x < min_x:
                    min_x = x
                if y < min_y:
                    min_y = y
                if x > max_x:
                    max_x = x
                if y > max_y:
                    max_y = y

    if not found:
        return (x1, 0, x2, h)

    left = max(0, min_x - pad)
    top = max(0, min_y - pad)
    right = min(w, max_x + pad + 1)
    bottom = min(h, max_y + pad + 1)
    return (left, top, right, bottom)


def main() -> None:
    src = Path(__file__).resolve().parents[1] / "assets" / "Main Website" / "pine tree.jpg"
    dst = Path(__file__).resolve().parents[1] / "assets" / "Main Website" / "pine-tree.png"

    img = Image.open(src).convert("RGB")
    runs = find_content_runs(img)
    if len(runs) < 2:
        raise SystemExit(f"Expected at least 2 tree runs; found {len(runs)}. Runs={runs}")

    # In this asset, silhouettes appear left-to-right as distinct x-ranges.
    second = runs[1]
    bbox = crop_bbox_in_xrange(img, second, pad=12)

    cropped = img.crop(bbox).convert("RGBA")
    px = cropped.load()
    cw, ch = cropped.size
    for x in range(cw):
        for y in range(ch):
            r, g, b, a = px[x, y]
            alpha = is_background_pixel((r, g, b))
            px[x, y] = (r, g, b, alpha)

    # Trim to non-transparent bounds (removes any remaining background border)
    alpha_bbox = cropped.split()[3].getbbox()
    if alpha_bbox:
        # Add a tiny padding so edges don't get clipped
        ax1, ay1, ax2, ay2 = alpha_bbox
        pad = 2
        ax1 = max(0, ax1 - pad)
        ay1 = max(0, ay1 - pad)
        ax2 = min(cropped.size[0], ax2 + pad)
        ay2 = min(cropped.size[1], ay2 + pad)
        cropped = cropped.crop((ax1, ay1, ax2, ay2))

    dst.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(dst, format="PNG", optimize=True)

    print("Wrote:", dst)
    print("Source:", src)
    print("Runs:", [(r.x1, r.x2, r.width) for r in runs])
    print("Selected run:", (second.x1, second.x2, second.width))
    print("Crop bbox:", bbox, "-> size", cropped.size)


if __name__ == "__main__":
    main()

