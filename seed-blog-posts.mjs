import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const posts = [
  {
    title: "5 Scams Targeting Everyday People Right Now (And How to Spot Them)",
    slug: "scams-targeting-people",
    category: "Scam Awareness",
    excerpt: "Scammers are sophisticated, organized, and relentless - and they don't discriminate. Here are five schemes circulating right now and exactly how to recognize them before they cost you.",
    date: "February 28, 2026",
    readTime: "7 min read",
    imageUrl: null,
    status: "published",
    content: `Every year, Americans lose billions of dollars to fraud. Not because they're careless - but because today's scammers are sophisticated, organized, and specifically trained to exploit trust. The encouraging news? Once you know what to look for, these scams become remarkably easy to spot.

Here are five of the most common scams circulating right now, along with exactly how to recognize and avoid them.

## 1. The "Loved One in Trouble" Scam

You get a frantic call. Someone who sounds like a family member - or claims to be calling on their behalf - says they're in serious trouble. A car accident. An arrest. A medical emergency. They beg you not to tell anyone else. A "lawyer" or "officer" gets on the line to explain how to wire money or purchase gift cards.

**How to spot it:** The urgency is manufactured. Real emergencies don't require gift cards. Before doing anything, hang up and call your family member directly on a number you already have. If they're fine, you've just confirmed it's a scam.

**What scammers count on:** Your love for your family and your instinct to help immediately.

## 2. The Government Impersonation Scam

A caller claims to be from the IRS, Social Security Administration, or another agency. They say your account has been compromised, you owe back taxes, or your benefits are at risk. They ask you to confirm personal details or make an immediate payment to "protect" your account.

**How to spot it:** Government agencies never call you out of the blue to demand personal information or payment. They communicate primarily by mail. If you receive this kind of call, hang up. You can always call the real agency directly using the number on their official website.

**What scammers count on:** Fear of legal trouble and the authority that comes with a government name.

## 3. The Tech Support Scam

A pop-up appears on your computer warning that your device has been infected with a virus. It displays a phone number to call immediately. When you call, a "technician" asks for remote access to your computer to "fix" the problem - and uses that access to steal your files, passwords, or install actual malware.

**How to spot it:** Legitimate tech companies like Microsoft and Apple do not send unsolicited pop-ups with phone numbers. If you see one, don't call the number. Close the browser window (or restart your computer if needed). If you're genuinely concerned about your device, take it to a trusted local repair shop.

**What scammers count on:** The fear of losing your computer or your data.

## 4. The Romance Scam

This one is particularly painful because it involves genuine emotional connection. A stranger contacts you online - through social media, a dating site, or even email. They're warm, attentive, and seem genuinely interested in you. Over weeks or months, a relationship develops. Then a crisis strikes. They need money for a plane ticket, a medical emergency, or to escape a difficult situation.

**How to spot it:** Anyone who builds an online relationship but can never meet in person - and eventually asks for money - is almost certainly a scammer. Run their profile photo through a reverse image search (Google Images). If the photo appears under a different name, it's stolen.

**What scammers count on:** Loneliness, genuine connection, and the reluctance to believe someone you care about is lying.

## 5. The Lottery or Prize Scam

You receive a letter, email, or call telling you that you've won a lottery, sweepstakes, or prize. To claim it, you just need to pay a small fee - taxes, processing, or shipping. Once you pay, the prize never arrives, and the scammers disappear.

**How to spot it:** You cannot win a contest you didn't enter. Legitimate prizes never require you to pay fees upfront. If it sounds too good to be true, it is.

**What scammers count on:** Excitement and the sunk-cost feeling of "I've already paid, I might as well see it through."

---

## The Most Important Rule

When in doubt, **slow down**. Scammers create artificial urgency because they know that if you have time to think - or talk to someone you trust - you'll see through the scheme. Hang up. Call someone. Look it up. You have every right to take your time.

If you think you've been targeted by a scam, report it to the FTC at reportfraud.ftc.gov and to your local police department. And if you'd like personalized guidance on protecting yourself and your family online, that's exactly what we're here for at Bright Path Cyber.`
  },
  {
    title: "How to Tell If a Website Is Safe Before You Enter Your Information",
    slug: "is-this-website-safe",
    category: "Online Safety",
    excerpt: "Before you type your name, email, or credit card number into any website, a few quick checks can tell you whether it's trustworthy - or a trap.",
    date: "March 7, 2026",
    readTime: "6 min read",
    imageUrl: null,
    status: "published",
    content: `Every day, people enter personal information into websites without thinking twice. Your name, your address, your credit card number. And most of the time, that's perfectly fine - the site is legitimate, the connection is secure, and nothing bad happens.

But sometimes it's not fine. Fake websites, phishing pages, and lookalike sites are designed specifically to trick you into handing over your information. The encouraging news is that a few simple checks can tell you a lot about whether a site is trustworthy - before you type a single character.

## Check for HTTPS - But Don't Stop There

You've probably heard that you should look for the padlock icon in your browser's address bar. That padlock means the connection between your browser and the website is encrypted - which is a good thing. It means your information can't be intercepted in transit.

But here's what many people don't realize: the padlock does not mean the website itself is legitimate. Scammers can - and do - set up fake websites with valid HTTPS certificates. The padlock just means the connection is secure. It says nothing about whether the people running the site are trustworthy.

So yes, check for HTTPS. But don't stop there.

## Look Carefully at the Web Address

The web address (also called the URL) is one of the most reliable ways to spot a fake site - if you know what to look for.

Legitimate websites have clean, recognizable addresses. A scam site might look almost identical but with a small change: an extra letter, a hyphen, or a different ending. For example:

**Real:** www.paypal.com
**Fake:** www.paypa1.com or www.paypal-secure-login.com

Always look at the part of the address just before the first single slash. That's the actual domain. Everything before it is just a subdomain and can say anything. A site at "paypal.fake-login.com" is not a PayPal site - it belongs to fake-login.com.

When in doubt, don't click a link. Instead, type the address directly into your browser, or search for the company and navigate from the official search result.

## Look Up the Company Before You Buy

If you've landed on an unfamiliar shopping site or a business you've never heard of, take two minutes to look them up before entering any payment information.

Search for the company name along with words like "reviews," "scam," or "complaints." Check sites like the Better Business Bureau (bbb.org) or Trustpilot. Look for a physical address and a real phone number on their contact page - and consider calling it.

A legitimate business will have a traceable presence. A scam site often has none.

## Watch for Pressure Tactics and Urgency

Legitimate websites don't pressure you. If a site is flashing countdown timers, warning you that your account will be suspended if you don't act immediately, or offering a deal that expires in the next 10 minutes - slow down.

Urgency is a manipulation tactic. It's designed to short-circuit your judgment and get you to act before you think. Whenever you feel rushed online, that's exactly the moment to pause.

## Check the Privacy Policy and Contact Information

This sounds mundane, but it's genuinely useful. A real company will have a privacy policy that explains how they handle your data. They'll have a real contact page with an address, a phone number, or at minimum a working email.

If a site has no contact information, no privacy policy, or only a generic contact form with no other details - that's a red flag.

## When Something Feels Off, Trust That Feeling

This is perhaps the most underrated piece of advice: if something about a website feels wrong, pay attention to that feeling. Maybe the design looks slightly off. Maybe the writing has unusual grammar. Maybe the deal seems too good to be true.

Your instincts are often picking up on real signals, even when you can't articulate exactly what they are. You don't need to explain why something feels suspicious to decide not to enter your information.

The cost of being cautious is low. The cost of ignoring a warning sign can be significant.

---

## A Quick Checklist Before You Enter Your Information

1. Does the address bar show HTTPS and a padlock?
2. Does the web address look exactly right - no extra letters, hyphens, or unfamiliar domains?
3. Have you verified the company through a quick search?
4. Is the site free of pressure tactics and countdown timers?
5. Does anything feel off?

If you answered no to any of these, take a step back before proceeding. And if you'd like to walk through how to spot unsafe sites with a real person who can answer your questions, that's exactly what Bright Path Cyber is here for.`
  },
  {
    title: "Why Your Password Is the Front Door to Your Digital Life",
    slug: "password-front-door",
    category: "Account Security",
    excerpt: "Most people use the same password for everything. Here's why that's a problem - and a simple system that actually works for real people.",
    date: "February 21, 2026",
    readTime: "6 min read",
    imageUrl: null,
    status: "published",
    content: `Think about the front door of your home. You probably have a good lock on it. You don't leave it propped open. You don't give your key to strangers. And you definitely don't use the same key for your house, your car, your mailbox, and your safe-deposit box.

But that's exactly what most people do with their passwords online.

## The Problem with "One Password for Everything"

It's understandable. Passwords are annoying. There are dozens of them. They have to be long, complicated, and different from your last five. So most people settle on one or two passwords they can remember and use them everywhere.

Here's the risk: when a company gets hacked - and it happens constantly - your username and password get stolen. Criminals then take that combination and automatically try it on hundreds of other websites. Your email. Your bank. Your Amazon account. If you use the same password, they're in.

This is called "credential stuffing," and it's one of the most common ways accounts get compromised. Not because someone guessed your password - but because they got it from a completely different website you forgot you even had an account on.

## What Makes a Strong Password?

Forget the old advice about replacing letters with numbers and symbols (P@$$w0rd is not secure). Modern guidance from security experts is simpler and more effective:

**Length beats complexity.** A password like "correct-horse-battery-staple" is far stronger than "P@$$w0rd1!" because it's longer. Every additional character exponentially increases the difficulty of cracking it.

**Use a passphrase.** Pick three or four random words and string them together. "PurpleTruckMapleSunday" is long, memorable, and genuinely difficult to crack. Add a number or symbol if the site requires it.

**Never use personal information.** Birthdays, pet names, addresses, and family names are the first things a targeted attacker will try.

## The Real Solution: A Password Manager

Here's the honest truth: the best password practice is to use a different, long, random password for every single account - and the only realistic way to do that is with a password manager.

A password manager is an app that stores all your passwords in an encrypted vault. You only need to remember one master password to unlock it. The app generates strong, unique passwords for every site and fills them in automatically.

Popular options include **Bitwarden** (free and excellent), **1Password**, and **LastPass**. Many are available on your phone, tablet, and computer.

If a password manager feels like too big a step right now, start with this: at minimum, use a unique, strong password for your email account and your bank. Those two are the most critical. If someone gets into your email, they can reset every other password you have.

## Two-Factor Authentication: The Deadbolt

Even the best password can be stolen. Two-factor authentication (2FA) is your second line of defense - the deadbolt on your digital front door.

When 2FA is enabled, logging in requires two things: your password, and a second verification - usually a code sent to your phone or generated by an app. Even if someone has your password, they can't get in without that second code.

Enable 2FA on every account that offers it, starting with your email and bank. It takes about two minutes to set up and dramatically reduces your risk.

## A Simple Starting Point

You don't have to overhaul everything at once. Start here:

1. Change your email password to a unique passphrase you don't use anywhere else.
2. Enable two-factor authentication on your email.
3. Do the same for your bank account.
4. Consider downloading a free password manager and adding accounts one at a time as you log in to them.

Small steps, taken consistently, add up to real protection. And if you'd like to walk through any of this with someone who can explain it clearly and patiently - that's exactly what Bright Path Cyber is here for.`
  }
];

async function seed() {
  const conn = await mysql.createConnection(DATABASE_URL);
  
  for (const post of posts) {
    // Check if post already exists by slug
    const [existing] = await conn.execute(
      'SELECT id FROM blog_posts WHERE slug = ?',
      [post.slug]
    );
    
    if (Array.isArray(existing) && existing.length > 0) {
      console.log(`Post "${post.slug}" already exists, skipping.`);
      continue;
    }
    
    await conn.execute(
      `INSERT INTO blog_posts (title, slug, category, excerpt, content, date, readTime, imageUrl, status, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [post.title, post.slug, post.category, post.excerpt, post.content, post.date, post.readTime, post.imageUrl, post.status]
    );
    console.log(`Inserted: "${post.title}"`);
  }
  
  await conn.end();
  console.log('Blog post migration complete!');
}

seed().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
