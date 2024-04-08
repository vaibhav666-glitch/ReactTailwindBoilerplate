export const sendEmail = ({ to, from, sub, body, apiKey }) => {
  fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          from: from,
          to: to,
          subject: sub,
          html: body,
      }),
  }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
}