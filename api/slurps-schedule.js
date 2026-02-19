const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vREzj2I3fkZwX0Ah9eifzl8QjKqitgZFOxyTKFztAKv7ldOeRtRoDbsCRNfeMBjLknAAAwlSZ-ceLsm/pub?gid=0&single=true&output=csv';

function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out.map((v) => (v ?? '').trim());
}

function normalizeHeader(h) {
  return String(h ?? '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .trim();
}

function csvToItems(csvText) {
  const lines = String(csvText ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter((l) => l.trim() !== '');

  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);
  const dayIdx = headers.indexOf('day');
  const timeIdx = headers.indexOf('time');
  const locIdx = headers.indexOf('location');

  const items = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const day = dayIdx >= 0 ? cols[dayIdx] : cols[0] || '';
    const time = timeIdx >= 0 ? cols[timeIdx] : cols[1] || '';
    const location = locIdx >= 0 ? cols[locIdx] : cols[2] || '';
    if (!day && !time && !location) continue;
    items.push({ day, time, location });
  }
  return items;
}

export default async function handler(req, res) {
  try {
    const upstream = await fetch(CSV_URL, {
      headers: {
        Accept: 'text/csv,*/*',
        'User-Agent': 'Mozilla/5.0 (Vercel Serverless Function)',
      },
    });

    if (!upstream.ok) {
      res
        .status(502)
        .json({ error: 'Upstream schedule fetch failed', status: upstream.status });
      return;
    }

    const text = await upstream.text();
    const items = csvToItems(text);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // Cache at the edge for 5 minutes, allow SWR.
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(items);
  } catch (err) {
    res.status(502).json({ error: 'Schedule unavailable' });
  }
}

