"""Copies new posts from the club's Facebook Page into news/ (one .txt per post, plus the photo).
Runs on GitHub every 3 hours (.github/workflows/facebook-sync.yml). Needs two secrets, see README ("Facebook auto-posts").
Run by hand:  FB_PAGE_ID=... FB_PAGE_TOKEN=... python tools/fb-sync.py"""
import json, os, re, sys, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NEWS = os.path.join(ROOT, "news")
STATE = os.path.join(NEWS, "_facebook-synced.json")      # starts with "_" so the website ignores it
API = os.environ.get("FB_API_BASE", "https://graph.facebook.com/v21.0")
page, token = os.environ.get("FB_PAGE_ID", ""), os.environ.get("FB_PAGE_TOKEN", "")
if not page or not token:
    print("FB_PAGE_ID / FB_PAGE_TOKEN not set - skipping Facebook sync."); sys.exit(0)

def get(url):
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.read()

# Only posts from this date on are copied. Older posts are already in js/data.js (from "Meet the Board of Directors" up to 15 Oct 2026).
SINCE = os.environ.get("FB_SINCE", "2026-10-16")
fields = "id,message,created_time,full_picture,permalink_url"
url = f"{API}/{page}/posts?" + urllib.parse.urlencode({"fields": fields, "limit": 25, "access_token": token})
posts = []
try:
    for _ in range(8):                                   # follow "next page" links until posts get older than SINCE
        data = json.loads(get(url)); batch = data.get("data", []); posts += [p for p in batch if p["created_time"][:10] >= SINCE]
        url = data.get("paging", {}).get("next")
        if not url or not batch or batch[-1]["created_time"][:10] < SINCE: break
except Exception as e:
    print("Facebook request failed:", getattr(e, "read", lambda: b"")() or e); sys.exit(1)

done = set(json.load(open(STATE))) if os.path.exists(STATE) else set()
os.makedirs(NEWS, exist_ok=True)
added = 0
for p in reversed(posts):
    if p["id"] in done: continue
    msg = (p.get("message") or "").strip()
    if not msg and not p.get("full_picture"): done.add(p["id"]); continue
    first = re.sub(r"\s+", " ", (msg.split("\n")[0] if msg else "Facebook post"))
    title = re.sub(r'[\\/:*?"<>|#%\x00-\x1f]', "", first).strip()[:60].strip(" .") or "Facebook post"
    name = f'{p["created_time"][:10]} {title}'
    n = name; i = 2
    while os.path.exists(os.path.join(NEWS, n + ".txt")): n = f"{name} {i}"; i += 1
    open(os.path.join(NEWS, n + ".txt"), "w", encoding="utf-8").write((msg or title) + "\n")
    if p.get("full_picture"):
        try: open(os.path.join(NEWS, n + ".jpg"), "wb").write(get(p["full_picture"]))
        except Exception as e: print("photo skipped:", e)
    done.add(p["id"]); added += 1; print("added:", n)
json.dump(sorted(done), open(STATE, "w"), indent=1)
print(f"{added} new post(s).")
