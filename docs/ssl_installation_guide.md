# Strategy: SSL Installation & Security (HTTPS)

Installing an SSL (Secure Sockets Layer) certificate is mandatory for **Sams Valuations**. It secures the Client Portal, protects lead data, and enables the "Padlock" icon in the browser which is critical for attorney trust.

## 1. Automatic SSL (Recommended)
If you are deploying to modern cloud platforms, SSL is handled automatically via **Let's Encrypt**.

- **Vercel / Netlify / Cloudflare Pages**: Once you point your domain (e.g., `samsvaluations.com`) to these providers, they will automatically issue and renew your SSL certificate at no cost.
- **Action**: No manual installation required. Just verify that "Always use HTTPS" is toggled ON in your dashboard.

---

## 2. Manual Installation (VPS/Ubuntu/Nginx)
If you are hosting on a private server (DigitalOcean, AWS, Linode), you must install it manually.

### Using Certbot (Free Let's Encrypt)
1. **Install Certbot**:
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx
   ```
2. **Obtain Certificate**:
   ```bash
   sudo certbot --nginx -d samsvaluations.com -d www.samsvaluations.com
   ```
3. **Renewal**: Certbot installs a timer that automatically renews the cert every 90 days.

---

## 3. Paid SSL Certificates (Sectigo, DigiCert, Comodo)
For high-fiduciary businesses, some choose a "Business Validated" (BV) or "Extended Validation" (EV) certificate for higher insurance warranties.

### Step 1: Generate a CSR (Certificate Signing Request)
Run this on your server or via your hosting panel:
```bash
openssl req -new -newkey rsa:2048 -nodes -keyout samsvaluations.key -out samsvaluations.csr
```
### Step 2: Validation
The provider will ask you to:
- Add a specific **DNS TXT record**.
- Or upload a **.txt file** to a hidden folder on your site.

### Step 3: Installation
Once validated, you will receive a `.crt` file. Upload this to your server and update your Nginx/Apache config to point to the `.key` and `.crt` files.

---

## 4. Post-Installation Checklist
- **Mixed Content Check**: Ensure all images and scripts are loaded via `https://` and not `http://`.
- **HSTS**: Enable HTTP Strict Transport Security to force browsers to always use the secure version.
- **SSL Labs Test**: Run your domain through [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) to ensure you have an **A+** rating.

---

*Note: Our UI already includes "Secure 256-bit SSL" badges in the footer and checkout. Keeping the certificate active is required to maintain the validity of these claims.*
