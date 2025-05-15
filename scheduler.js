const cron = require('node-cron');
const fs = require('fs-extra');
const path = require('path');
const { sendMail } = require('./mailer');
const DB_PATH = path.join(__dirname, 'db.json');

cron.schedule('* * * * *', async () => {
  const db = await fs.readJson(DB_PATH).catch(() => []);
  const now = new Date();

  const pending = db.filter(entry => !entry.sent && new Date(entry.send_time) <= now);

  for (const entry of pending) {
    await sendMail(entry);
    entry.sent = true;
  }

  await fs.writeJson(DB_PATH, db);
});
