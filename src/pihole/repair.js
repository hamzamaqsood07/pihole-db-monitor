import { exec } from 'child_process';
import { log, error } from '../logger.js';

export function repairDB() {
    return new Promise((resolve) => {
        exec('pihole -r --reconfigure', (err, stdout, stderr) => {
            if (err) { error('Repair failed:', stderr); resolve(false); }
            else { log('Repair stdout:', stdout); resolve(true); }
        });
    });
}
