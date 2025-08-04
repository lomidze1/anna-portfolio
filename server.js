import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MAILCHIMP_API_KEY = '047062b39b6cca8d5f692b8faa8ae4ec-us7'; // 🔒 Replace with your real API key
const LIST_ID = 'd13694cdf0';
const DATACENTER = 'us7'; // From your API key or endpoint

app.post('/check-subscriber', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      },
    });

    if (response.status === 404) {
      return res.json({ status: 'not_subscribed' });
    }

    const data = await response.json();
    return res.json({ status: data.status });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
