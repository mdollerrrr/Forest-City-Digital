from __future__ import annotations

import math
from pathlib import Path

from PIL import Image


def median(vals: list[int]) -> int:
    vals_sorted = sorted(vals)
    n = len(vals_sorted)
    if n == 0:
        return 0
    mid = n // 2
    if n % 2 == 1:
        return vals_sorted[mid]
    return (vals_sorted[mid - 1] + vals_sorted[mid]) // 2


def sample_bg_rgb(img_rgb: Image.Image, sample: int = 8) -> tuple[int, int, int]:
    w, h = img_rgb.size
    px = img_rgb.load()

    samples_r: list[int] = []
    samples_g: list[int] = []
    samples_b: list[int] = []

    corners = [
        (0, 0),
        (w - sample, 0),
        (0, h - sample),
        (w - sample, h - sample),
    ]

    for cx, cy in corners:
        for x in range(cx, min(cx + sample, w)):
            for y in range(cy, min(cy + sample, h)):
                r, g, b = px[x, y]
                samples_r.append(r)
                samples_g.append(g)
                samples_b.append(b)

    return (median(samples_r), median(samples_g), median(samples_b))


def alpha_from_dist(dist: float, *, hard: float = 6.0, soft: float = 38.0) -> int:
    """
    Alpha ramp that preserves anti-aliased edges.
    - dist <= hard  -> 0 (transparent)
    - dist >= soft  -> 255 (opaque)
    - else          -> linear ramp
    """
    if dist <= hard:
        return 0
    if dist >= soft:
        return 255
    return int(255 * (dist - hard) / (soft - hard))


def find_main_x_run(alpha_img: Image.Image, *, alpha_thresh: int = 32) -> tuple[int, int] | None:
    """
    Finds the widest x-range that contains meaningful non-transparent pixels.
    This avoids artifacts like edge borders (e.g., a dark strip on the far right).
    """
    w, h = alpha_img.size
    px = alpha_img.load()
    min_pixels_per_col = max(12, h // 140)

    has = [False] * w
    for x in range(w):
        hits = 0
        for y in range(h):
            if px[x, y] > alpha_thresh:
                hits += 1
                if hits >= min_pixels_per_col:
                    has[x] = True
                    break

    runs: list[tuple[int, int]] = []
    x = 0
    while x < w:
        if not has[x]:
            x += 1
            continue
        x1 = x
        while x < w and has[x]:
            x += 1
        x2 = x
        runs.append((x1, x2))

    if not runs:
        return None
    # pick widest run (main silhouette)
    return max(runs, key=lambda r: r[1] - r[0])


def bbox_in_xrange(alpha_img: Image.Image, x1: int, x2: int, *, alpha_thresh: int = 32) -> tuple[int, int, int, int] | None:
    w, h = alpha_img.size
    px = alpha_img.load()
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    found = False

    for x in range(x1, x2):
        for y in range(h):
            if px[x, y] > alpha_thresh:
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
        return None
    return (min_x, min_y, max_x + 1, max_y + 1)


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    src = root / "assets" / "Main Website" / "pine-tree.png"
    dst = src  # overwrite

    img_rgba = Image.open(src).convert("RGBA")
    w, h = img_rgba.size
    alpha_in = img_rgba.split()[3]
    alpha_bbox = alpha_in.getbbox()
    if alpha_bbox is None:
        raise SystemExit(
            "pine-tree.png appears fully transparent. Re-copy your original pine-tree.png into assets/Main Website/ and re-run."
        )

    # Sample background from opaque-ish corner pixels (avoids black fill from transparent corners)
    img_rgb = img_rgba.convert("RGB")
    bg = sample_bg_rgb(img_rgb, sample=10)

    out = Image.new("RGBA", (w, h))
    in_px = img_rgba.load()
    out_px = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a_in = in_px[x, y]
            if a_in == 0:
                out_px[x, y] = (0, 0, 0, 0)
                continue
            dr = r - bg[0]
            dg = g - bg[1]
            db = b - bg[2]
            dist = math.sqrt(dr * dr + dg * dg + db * db)
            a = alpha_from_dist(dist)

            if a == 0:
                out_px[x, y] = (0, 0, 0, 0)
            else:
                # Force silhouette to clean black while preserving edge alpha
                out_px[x, y] = (0, 0, 0, a)

    # Trim to main silhouette bounds (tight crop + small pad)
    alpha = out.split()[3]
    run = find_main_x_run(alpha)
    bbox = None
    if run:
        bbox = bbox_in_xrange(alpha, run[0], run[1])
    if not bbox:
        bbox = alpha.getbbox()
    if bbox:
        pad = 6
        x1, y1, x2, y2 = bbox
        x1 = max(0, x1 - pad)
        y1 = max(0, y1 - pad)
        x2 = min(w, x2 + pad)
        y2 = min(h, y2 + pad)
        out = out.crop((x1, y1, x2, y2))

    out.save(dst, format="PNG", optimize=True)

    # Lightweight logging for debugging
    print("Wrote:", dst)
    print("Original size:", (w, h), "New size:", out.size)
    print("Sampled background RGB:", bg)


if __name__ == "__main__":
    main()

