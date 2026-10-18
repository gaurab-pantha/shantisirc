# SSIRC website – setup guide

Three parts. Do Part 1 first (everything else needs it). Part 2 lets chosen people add things from the website. Part 3 makes Facebook posts appear on the site by themselves.

---
## Part 1 – Put the website on GitHub
1. Unzip `shantisirc-web-fixed.zip`. You get a folder `shantisirc-web`.
2. Open your website repository on github.com (the one with the `CNAME` file).
3. **Add file → Upload files**, then drag in **everything inside** the folder, including the hidden `.github` folder (turn on "Show hidden files" in Windows Explorer: View → Show → Hidden items). Folders can be dragged in directly.
4. Click **Commit changes**. Wait about a minute, then press Ctrl+F5 on shantisirc.com.
5. Delete the old pages if they are still in the repository: `about.html`, `team.html`, `events.html`, `projects.html`, `gallery.html`, `faqs.html`, `partners.html`, `join.html`, `id-cards.html` (open each file → trash-can icon → Commit).
6. Check `js/data.js`: near the bottom, `repo: { owner: "...", repo: "..." }` must be your GitHub username (or organization) and repository name.
7. In the repository go to **Settings → Actions → General → Workflow permissions** and choose **Read and write permissions**, then Save. (The automatic updates need this.)

## Part 2 – Admin page (add projects, photos, news from the website)
Address: **shantisirc.com/admin/**

### Easiest: no collaborators needed (use the club GitHub account)
Log in to github.com as the **account that owns the website repository** (the club account). Anyone can then be given their own token without being added as a collaborator.
1. On github.com: your photo → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Token name:** the person's name, e.g. `Admin - Gaurab`. Make one token per person.
3. **Expiration:** pick a long one (e.g. 1 year).
4. **Resource owner:** the club account. **Repository access → Only select repositories →** the website repository.
5. **Permissions → Repository permissions → Contents → Read and write.** Leave the rest.
6. **Generate token** and copy it (starts with `github_pat_`). It is shown only once. Send it privately to that person (never post it publicly).
7. The person opens `shantisirc.com/admin/`, types the repository as `owner/name`, pastes the token and presses **Sign in**.

**Take access away:** go to the same **Fine-grained tokens** list, open that person's token and click **Delete**. It stops working at once and nobody else is affected.

### Other way: collaborators
If a person would rather use their own GitHub account: repository **Settings → Collaborators → Add people**, they accept the invite, then create their own token (steps 1–6 above, choosing the club's repository).

### Using the admin page
Tabs: **+ Project**, **+ Gallery photos**, **+ News / event**, **Manage / delete**. The site updates in about a minute (press Ctrl+F5). Tick "Remember me" only on your own device.

---
## Part 3 – Facebook posts appear on the site automatically
The site already contains the posts from "Meet the Board of Directors" up to 15 Oct 2026. From **16 Oct 2026 onward**, every new Facebook Page post (text + photo) is copied into **News and Events** every 3 hours.

Facebook only allows this with a Page token, so there is a one-time setup. You must be an **admin of the club's Facebook Page**. (Meta changes its screens now and then; if a button is named a little differently, look for the closest one.)

**A. Create a Facebook app**
1. Go to **developers.facebook.com**, log in with the account that is admin of the Page, and register as a developer if asked.
2. **My Apps → Create App**. Name it `SSIRC Website`. If asked for a use case or type, choose **Other → Business** (or the option about managing Pages).

**B. Get a Page token that never expires**
1. Open **developers.facebook.com/tools/explorer** (Graph API Explorer). Select your app `SSIRC Website`.
2. Under **Permissions** add `pages_show_list` and `pages_read_engagement`. Click **Generate Access Token** and approve, choosing the club's Page.
3. Open **developers.facebook.com/tools/debug/accesstoken**, paste the token, click **Debug**, then **Extend Access Token**. Copy the long token it gives.
4. Back in the Graph API Explorer, paste that long token into the Access Token box and send the request `me/accounts`. You will see your Page with `"id"` (the **Page ID**) and `"access_token"` (the **Page token**, which does not expire). Copy both.
5. Test: request `PAGE_ID/posts?fields=message,created_time` in the Explorer with that Page token. You should see your posts.

**C. Give both to GitHub (only GitHub sees them)**
1. Repository **Settings → Secrets and variables → Actions → New repository secret**.
2. Add `FB_PAGE_ID` = the Page ID. Add `FB_PAGE_TOKEN` = the Page token.

**D. Test it**
1. Repository **Actions** tab → **Facebook sync** → **Run workflow**. A green tick means success. New posts appear on the Events page after about a minute.
2. After that it runs by itself every 3 hours.

**Problems?**
- Red cross in Actions: open the run and read the message. "Invalid OAuth access token" means the token was copied wrong or a user token was used instead of the Page token (repeat B4).
- Nothing new appears: only posts dated 16 Oct 2026 or later are copied. To change that date, edit the date after `FB_SINCE` in `tools/fb-sync.py` (on github.com: open the file, pencil icon, Commit).
- A post that should not be on the site: delete it on **Admin → Manage → News**. It will not come back (the sync remembers it).
- If the Facebook setup is too hard, skip Part 3: you can still add every post by hand in **Admin → + News / event**.
