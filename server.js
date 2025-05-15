const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const DB_PATH = path.join(__dirname, 'db.json');
app.use(express.json());
app.use(require('cors')());

app.post('/schedule', async (req, res) => {
  const { recipient_name, recipient_email, message, send_time, order_id } = req.body;

  if (!recipient_email || !message || !send_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEntry = {
    id: Date.now(),
    recipient_name,
    recipient_email,
    message,
    send_time,
    sent: false,
    order_id
  };

  const db = await fs.readJson(DB_PATH).catch(() => []);
  db.push(newEntry);
  await fs.writeJson(DB_PATH, db);

  res.json({ success: true, message: 'Message scheduled.' });
});

app.listen(PORT, () => console.log(`🎯 Server running on http://localhost:${PORT}`));

require('./scheduler');
