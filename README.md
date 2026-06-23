# 🏠 Ahmed & Diana — Household Tracker

A mobile-first Progressive Web App (PWA) for tracking household cash flow, with automatic balance calculation, bill reminders, and push notifications to both phones.

---

## 🚀 Step 1 — Host on GitHub Pages (5 min)

1. Go to [github.com](https://github.com) → **New repository** → name it `home-tracker` (or any name)
2. Upload all files: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)** → Save
4. Your app will be live at: `https://YOUR-USERNAME.github.io/home-tracker/`

> **Icon files:** Use any 192×192 and 512×512 PNG as `icon-192.png` and `icon-512.png`. You can generate them at [realfavicongenerator.net](https://realfavicongenerator.net).

---

## 📱 Step 2 — Install on Both Phones

**iPhone (Safari required):**
1. Open your GitHub Pages URL in Safari
2. Tap the **Share** button → **Add to Home Screen** → Add
3. The app installs like a native app

**Android (Chrome):**
1. Open the URL in Chrome
2. Tap the **⋮ menu → Add to Home Screen** → Add
3. Or Chrome may show an automatic install banner

Both phones now have the app. Any data added is visible on both phones once Firebase sync is set up (Step 4).

---

## 🔔 Step 3 — Push Notifications on Both Phones (FREE)

This uses **[ntfy.sh](https://ntfy.sh)** — a free, open-source push notification service. No account needed.

### Setup (takes 3 minutes):

1. **Ahmed's phone:** Install the **ntfy** app
   - [iOS App Store](https://apps.apple.com/app/ntfy/id1625396347)
   - [Google Play Store](https://play.google.com/store/apps/details?id=io.heckel.ntfy)

2. **Diana's phone:** Install the same **ntfy** app

3. In ntfy app on **both phones**: tap **+ Subscribe** → enter your private topic name (e.g. `abdelbaky-home-2026`) → Subscribe

4. In the **Home Tracker app** → Settings → Push Notifications → enter the same topic name → Save

5. Tap **Send Test** to confirm both phones receive the notification

From now on, whenever a bill is due (or about to be due based on your reminder setting), the app automatically sends a push notification to **both phones** via ntfy.sh.

> **Privacy:** Your topic name acts as a private channel. Anyone who knows it can subscribe — so choose something unique and personal.

---

## ☁️ Step 4 — Real-time Sync Between Phones (Firebase, FREE)

This keeps data in sync instantly across both phones.

### Setup (takes ~10 minutes):

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → name it (e.g. `abdelbaky-tracker`)

2. In your project: **Build → Realtime Database → Create database** → Start in **test mode** → Done

3. Set rules (Database → Rules):
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
   *(Your ntfy topic protects privacy. You can add auth rules later.)*

4. Copy your **Database URL** (looks like `https://abdelbaky-tracker-default-rtdb.firebaseio.com`)

5. Go to **Project settings (⚙️) → Service accounts → Database secrets** → Show → copy the secret

6. In the **Home Tracker app** → Settings → Cloud Sync → paste URL + secret → Connect & Sync

From now on, any income or expense added on one phone instantly appears on the other.

---

## 💰 Step 5 — Calibrate Your Starting Balance

In **Settings → Starting Balance**:

- **Initial Balance**: Your current AED account balance (e.g. `200000`)
- **Tracking Start Date**: The date that balance is accurate from (e.g. `2026-01-01`)

The app automatically:
- Adds all income you record
- Deducts all recurring expenses as their due dates pass each month
- Deducts one-time expenses on their due date
- Shows your real-time running balance at the top

---

## 📋 How to Use

### Adding Monthly Income
1. Tap **+** → Income
2. Enter: Source (e.g. "Ahmed Salary"), Amount, Date received
3. Save → balance updates instantly

### Adding a One-Time Expense
1. Tap **+** → One-Time Expense
2. Enter: Name, Amount, Due Date, Category, Reminder (days before)
3. Save → shows in Upcoming and auto-deducts when due date passes

### Adding a Recurring Expense
1. Tap **+** → Recurring
2. Enter: Name, Amount, Category, Day of Month, End Date (if applicable), Reminder
3. Save → automatically deducted every month

### Marking an Expense as Paid
- In **Expenses → One-Time** tab, tap ✅ on any expense to mark it paid

---

## 🔁 Pre-loaded Data

The app comes pre-loaded with all expenses from your 2026 spreadsheet:

| Type | Items |
|------|-------|
| Recurring | Mortgage, Car 1&2, Nannies, Adam, Farida, BUS, Gymnastics, Football, DEWA, DU, Empower, Shoreline, Mivida, Zed East (ends Feb 2031), Mountain View (ends Jul 2028), Haitham (ends Jul 2026) |
| One-Time | Mountain View one-time (Jul), Hacienda Ras el Hekma ×3 (Jun, Sep, Nov) |
| Income | Jan–Jun 2026: Ahmed + Diana salaries, Somabay + Telal rentals |

---

## 🛠 Files

| File | Purpose |
|------|---------|
| `index.html` | Full app (all JS, CSS, HTML in one file) |
| `manifest.json` | PWA install metadata |
| `sw.js` | Service worker (offline support, push notifications) |
| `icon-192.png` | App icon (you provide) |
| `icon-512.png` | App icon large (you provide) |
