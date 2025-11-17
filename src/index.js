import { checkDB } from './pihole/checker.js';
import { repairDB } from './pihole/repair.js';
import { sendEmail } from './notifier/email.js';
import { sendSlack } from './notifier/slack.js';
import { log } from './logger.js';
import { loadState, saveState } from './state.js';
import { checkIntervalMinutes } from './config.js';

async function monitor() {
    let state = loadState();
    const healthy = await checkDB();

    if (healthy) {
        if (state.crash) {
            sendEmail('Pi-hole DB recovered', 'Pi-hole database is now healthy');
            await sendSlack('Pi-hole database recovered ✅');
        }
        state.crash = false;
        saveState(state);
        log('DB healthy');
        return;
    }

    log('DB is crashed');
    if (!state.crash) {
        state.crash = true;
        sendEmail('Pi-hole DB crashed', 'Pi-hole database appears crashed ❌');
        await sendSlack('Pi-hole database crashed ❌');
        saveState(state);
    }

    const repaired = await repairDB();
    if (repaired) {
        sendEmail('Pi-hole DB recovered', 'Pi-hole database repaired automatically ✅');
        await sendSlack('Pi-hole database repaired automatically ✅');
        state.crash = false;
        saveState(state);
    } else {
        sendEmail('Pi-hole DB recovery failed', 'Automatic repair failed ❌');
        await sendSlack('Pi-hole database recovery failed ❌');
    }
}

monitor();
setInterval(monitor, checkIntervalMinutes * 60 * 1000);
