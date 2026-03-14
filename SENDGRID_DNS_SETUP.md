# SendGrid DNS Authentication for brightpathcyber.com

## DNS Records to Add

You need to add these **3 CNAME records** to your domain's DNS settings (wherever you manage brightpathcyber.com -- GoDaddy, Cloudflare, Namecheap, etc.):

| Type  | Host / Name                          | Value / Points To                              |
|-------|--------------------------------------|------------------------------------------------|
| CNAME | em6485.brightpathcyber.com           | u60981970.wl221.sendgrid.net                   |
| CNAME | s1._domainkey.brightpathcyber.com    | s1.domainkey.u60981970.wl221.sendgrid.net      |
| CNAME | s2._domainkey.brightpathcyber.com    | s2.domainkey.u60981970.wl221.sendgrid.net      |

**Note:** Some DNS providers only want the subdomain portion (without the root domain). In that case, enter:

| Type  | Host / Name        | Value / Points To                              |
|-------|--------------------|------------------------------------------------|
| CNAME | em6485             | u60981970.wl221.sendgrid.net                   |
| CNAME | s1._domainkey      | s1.domainkey.u60981970.wl221.sendgrid.net      |
| CNAME | s2._domainkey      | s2.domainkey.u60981970.wl221.sendgrid.net      |

## What These Records Do

- **em6485** -- SPF/Return-Path authentication (tells mail servers SendGrid is authorized to send for your domain)
- **s1._domainkey** -- DKIM signing key 1 (cryptographically proves emails are really from your domain)
- **s2._domainkey** -- DKIM signing key 2 (backup signing key for key rotation)

## After Adding DNS Records

1. Wait 15-30 minutes for DNS propagation
2. Log into SendGrid and click "Verify" on the domain authentication page, OR I can verify via the API once you confirm the records are added

## Single Sender Verification (Needed Immediately)

Until domain authentication is verified, you also need to verify `info@brightpathcyber.com` as a Single Sender:

1. Log into [app.sendgrid.com](https://app.sendgrid.com)
2. Go to **Settings > Sender Authentication > Verify a Single Sender**
3. Fill in:
   - From Name: Bright Path Cyber
   - From Email: info@brightpathcyber.com
   - Reply To: info@brightpathcyber.com
   - Company Address: Your business address
   - City, State, Zip, Country
4. Click "Create" -- SendGrid sends a verification email to info@brightpathcyber.com
5. Click the verification link in that email

Once either Single Sender Verification OR Domain Authentication is complete, the email system will be able to send.
