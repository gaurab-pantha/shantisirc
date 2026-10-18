# SSIRC Website

Website for **Shanti Science, ICT & Robotics Club (SSIRC)**, Shree Shanti Namuna Secondary School, Tilottama-5, Manigram, Rupandehi, Nepal.

## Pages
| File | Page |
| --- | --- |
| `index.html` | Home (loading screen, stats, latest events, team) |
| `about/index.html` | Story, mission, vision, values, programs, timeline |
| `team/index.html` | Board of Directors + clickable ID cards |
| `events/index.html` | News and events (slider, filters, live Facebook feed) |
| `projects/index.html` | Projects |
| `gallery/index.html` | Photo gallery |
| `faqs/index.html` | Frequently asked questions |
| `partners/index.html` | Partners |
| `join/index.html` | How to join (opens the Google Form) |
| `id-cards/index.html` | Printable sheet with every ID card (front and back) |
| `404.html` | "Page not found" |

Other files: `css/` (styles), `js/` (scripts), `img/` (member photos), `id-cards/` (ID card images to download), `logo.png`, `favicon.png`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

## Put it online (GitHub Pages)
1. On github.com open your repository, then **Add file → Upload files**.
2. Drag in everything from this folder (all files and folders). Keep your `CNAME` file.
3. Click **Commit changes**, wait a minute, then press Ctrl+F5 on shantisirc.com.
4. Delete old files you no longer need (`style.css`, `script.js`, `logo.jpg`) by opening each file, clicking the trash-can icon and committing.

**One-time setup:** open `js/data.js` and check `repo` near the bottom. `owner` is your GitHub username and `repo` is your repository name (shown at the top of the repository page as `username / repo`). If it is not `shantisirc.github.io`, change it. This lets the gallery, news and projects folders work.

## Add things WITHOUT editing code
Do these on github.com in your repository, then click **Commit changes**. The site updates in about a minute.

- **Gallery photos:** open the `gallery` folder → **Add file → Upload files** → drag photos in. The file name becomes the caption (`robotics-workshop.jpg` shows as "Robotics workshop").
- **News post:** open the `news` folder → **Add file → Create new file**. Name it like `2026-11-05 Robotics workshop.txt` (date first, then the title) and write the news inside. Optional photo: upload `2026-11-05 Robotics workshop.jpg`.
- **Project:** open the `projects` folder → create `Line Follower Robot.txt` with a short description. Optional photo: `Line Follower Robot.jpg`.
- **Remove something:** open the file, click the trash-can icon, then commit.

The "Projects" and "Photos" numbers on the home page update by themselves.

## Admin page and Facebook auto-posts
Full step-by-step instructions are in **SETUP-GUIDE.md** (upload to GitHub, give people admin access, switch on the Facebook sync).

## Edit the text (in `js/data.js`)
- **Join form link:** `JOIN_URL` (every Join button uses it).
- **Board members, ID numbers, photos:** the `board` list. Photos go in `img/`.
- **Built-in news and events from Facebook:** the `events` list.
- **Mission, vision, values, programs, FAQs, advisors:** the `about`, `programs`, `faqs` and `advisors` lists. The mission, vision and values are drafts, so please change them to the club's own words.
- **Advisors:** add people to `advisors` and they appear on the Team page.

## ID cards
Open **Team** and click a member. The card flips, and visitors can download it. The images in `id-cards/` were made from the current board data. If you change a name, role or photo, ask for the images to be made again (the on-screen cards update by themselves).

## Colors
Edit the values at the top of `css/base.css`.

## Contact
Facebook: https://www.facebook.com/profile.php?id=61571635138716 · Instagram: @shanti_sirc · ssirc.club@gmail.com
