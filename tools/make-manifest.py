"""Writes manifest.json: the list of files in gallery/, news/ and projects/.
GitHub runs this automatically on every push (see .github/workflows/update-manifest.yml).
You can also run it yourself:  python tools/make-manifest.py"""
import json, os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = {}
for folder in ("gallery", "news", "projects"):
    d = os.path.join(root, folder)
    names = []
    if os.path.isdir(d):
        names = sorted(f for f in os.listdir(d)
                       if os.path.isfile(os.path.join(d, f)) and not f.startswith(("_", ".")) and f != "index.html")
    out[folder] = names

with open(os.path.join(root, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(json.dumps(out, ensure_ascii=False, indent=2))
