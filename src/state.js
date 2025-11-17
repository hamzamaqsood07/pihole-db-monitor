import fs from 'fs';
import { stateFile } from './config.js';

export function loadState() {
    if (fs.existsSync(stateFile)) {
        try {
            return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
        } catch {
            return {};
        }
    }
    return {};
}

export function saveState(state) {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}
