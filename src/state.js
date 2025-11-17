import fs from 'fs';
import path from 'path';

const stateDir = path.resolve('./tmp');
const stateFile = path.join(stateDir, 'pihole-monitor.state.json');

export function saveState(data) {
    if (!fs.existsSync(stateDir)) {
        fs.mkdirSync(stateDir, { recursive: true });
    }

    fs.writeFileSync(stateFile, JSON.stringify(data, null, 2));
}

export function loadState() {
    if (!fs.existsSync(stateFile)) return null;
    return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
}
