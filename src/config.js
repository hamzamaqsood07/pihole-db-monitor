import dotenv from 'dotenv';
dotenv.config();

export const email = {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    to: process.env.EMAIL_TO
};

export const slack = {
    webhookUrl: process.env.SLACK_WEBHOOK_URL
};

export const pihole = {
    dbPath: process.env.PIHOLE_DB_PATH || '/etc/pihole/pihole-FTL.db'
};

export const checkIntervalMinutes = parseInt(process.env.CHECK_INTERVAL_MINUTES) || 10;
export const stateFile = '/tmp/pihole-monitor.state.json';
