# Strategy: Automated Notifications (Email & SMS)

This guide details how to move from the current **Local Backup** system to real-time automated notifications whenever a lead is captured on the platform.

## 1. Current State
Currently, submissions to `/api/contact` are saved as JSON nodes in `/backups/submissions/`. While secure and persistent, this does not provide real-time alerts.

## 2. Implementation: Email Notifications
To send branded emails to yourself or the client upon submission, we recommend using a modern email API.

### Recommended Provider: [Resend](https://resend.com) or [SendGrid](https://sendgrid.com)
1. **API Integration**: Add a call to the email provider inside the `vite.config.ts` middleware.
2. **Branding**: Use HTML templates that mirror the "Gold & Slate" aesthetic of the site.

### Example Logic (Conceptual):
```javascript
// Inside the /api/contact POST handler
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` },
  body: JSON.stringify({
    from: 'system@samsvaluations.com',
    to: 'broker@samsvaluations.com',
    subject: `New Lead: ${submission.name}`,
    html: `<p>New matter received for ${submission.address}</p>`
  })
});
```

---

## 3. Implementation: SMS/Text Alerts
For high-priority probate or litigation leads, text alerts ensure instant response times.

### Recommended Provider: [Twilio](https://twilio.com)
1. **Phone Number**: Provision a Twilio number for the Sams Valuations system.
2. **Trigger**: Similar to the email logic, trigger a Twilio API call after the file is successfully saved to the backup directory.

### Example Logic (Conceptual):
```javascript
const twilio = require('twilio')(accountSid, authToken);
await twilio.messages.create({
  body: `SAMS ALERT: New ${submission.serviceType} request from ${submission.name}.`,
  from: '+15551234567',
  to: '+14046635154' // Your cell
});
```

---

## 4. Best Practices
- **Rate Limiting**: Ensure you don't spam your own cell phone if a bot hits the contact form.
- **Fail-Safe**: Always save to the `/backups/` directory *before* attempting to send the email/SMS. If the API fails, you still have the data locally.
- **Confirmation**: Send a "Thank You" email back to the lead automatically to build instant trust.
