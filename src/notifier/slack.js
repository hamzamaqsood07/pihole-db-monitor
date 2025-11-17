import { IncomingWebhook } from '@slack/webhook';
import { slack } from '../config.js';
import { log, error } from '../logger.js';

const webhook = new IncomingWebhook(slack.webhookUrl);

export async function sendSlack(message) {
    try {
        await webhook.send({ text: message });
        log('Slack message sent');
    } catch (err) {
        error('Slack error:', err);
    }
}
