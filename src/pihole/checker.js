import sqlite3 from 'sqlite3';
import { pihole } from '../config.js';
import { error } from '../logger.js';

export function checkDB() {
    return new Promise((resolve) => {
        const db = new sqlite3.Database(pihole.dbPath, sqlite3.OPEN_READONLY, (err) => {
            if (err) { error('DB open error:', err.message); resolve(false); }
            else {
                db.get('SELECT 1', [], (err2) => {
                    if (err2) { error('DB query error:', err2.message); resolve(false); }
                    else resolve(true);
                    db.close();
                });
            }
        });
    });
}
