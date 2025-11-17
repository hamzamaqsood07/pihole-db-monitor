# Pi-hole DB Monitor

A lightweight Node.js service to monitor Pi-hole FTL database for crashes, attempt auto-recovery, and send notifications via email and Slack.

---

## Features

- Detects Pi-hole FTL database crash.
- Attempts automatic recovery.
- Sends email notifications on crash, recovery success, or recovery failure.
- Sends Slack notifications.
- Lightweight and designed to run every 10 minutes.
- Maintains state in a temporary file to avoid redundant recovery attempts.
- Fully configurable via environment variables.

---

## Prerequisites

- Node.js 18+ installed on the server.
- PM2 installed globally (optional but recommended for production).

---

## Git Setup

1. Initialize the repository:

```bash
git init
git remote add origin <your-repo-url>
```

2. Make sure `.gitignore` ignores sensitive files.

---

## Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
cd pihole-db-monitor
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
PIHOLE_DB_PATH=/etc/pihole/pihole-FTL.db

# Email configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@example.com

# Slack webhook
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Recovery attempts
MAX_RECOVERY_ATTEMPTS=3

# Temp state file
STATE_FILE=/tmp/pihole-db-monitor-state.json
```

> **Important:** Never commit `.env` or secrets to Git.

---

## Running the Service

### Using Node

```bash
node src/index.js
```

### Using PM2 (recommended for production)

1. Install PM2 globally if not already installed:

```bash
npm install -g pm2
```

2. Start the service:

```bash
pm2 start src/index.js --name pihole-db-monitor
```

3. Save the PM2 process list (so it restarts on server reboot):

```bash
pm2 save
```

4. Enable PM2 startup for systemd:

```bash
pm2 startup systemd
```

5. View logs:

```bash
pm2 logs pihole-db-monitor
```

6. Stop or restart:

```bash
pm2 stop pihole-db-monitor
pm2 restart pihole-db-monitor
```

---

## File Structure

```
pihole-db-monitor/
├── src/
│   ├── index.js          # Main entry point
│   ├── monitor.js        # DB check & recovery logic
│   ├── notify.js         # Email/Slack notifications
│   └── utils.js          # Utility functions
├── .env                  # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## How It Works

1. Every run, the script checks if the Pi-hole FTL DB is accessible.
2. If a crash is detected:
   - Attempt recovery automatically.
   - If recovery succeeds, send a "recovery success" notification.
   - If recovery fails, send a "recovery failed" notification.
3. Maintains state in a temporary JSON file to track crash/recovery attempts and avoid redundant retries.
4. Notifications can be sent via email or Slack.

---

## Notes

- Designed to be lightweight; can safely run every 10 minutes via PM2 or cron.
- Always ensure the DB path (`PIHOLE_DB_PATH`) is correct for your server.
- Keep secrets out of the repository (the `.env` file is ignored in `.gitignore`).

---

## License

MIT
