# Laboratory · Email Filter

Self-contained demo of the personalized email-usefulness models. Reachable at
**`/laboratory/email-filter`**. It is intentionally **not linked from any
navigation** — you reach it only by typing the URL.

## How it works

- `models.json` — exported parameters for each person's three models
  (Ridge for the 1–5 score, Logistic Regression for recommend / spam) plus the
  per-sender reputation maps. ~28 KB.
- `emailModel.ts` — reproduces the 20 hand-engineered features in the browser
  and applies the linear models. Pure functions, no dependencies.
- `page.tsx` — the form + per-person result cards.

All inference is **client-side** — a few dot products — so the server (an
N100-class box) does no ML work and there are **no embedding models or API
calls**. Feature definitions are kept byte-for-byte in sync with the Python
side (`statistics/src/features.py`); parity was verified to < 1e-4.

## Regenerating models.json

From the `statistics` project (after labels or features change):

```bash
uv run python src/export_web_models.py
cp results/web/models.json <blog>/src/app/\(routes\)/laboratory/email-filter/models.json
```

The feature order in `export_web_models.py` (`FEATURES`) and in `emailModel.ts`
must stay identical; if you add a feature, update both and re-verify parity.
