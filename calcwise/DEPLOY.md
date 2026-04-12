# CalcWise — Deployment Guide
## Cloudflare Pages + Namecheap Domain

---

## STEP 1: Buy Your Domain on Namecheap

1. Go to namecheap.com
2. Search for your chosen domain (e.g. calcwise.com, smartcalc.com)
3. Add to cart → Checkout
4. Cost: ~$9.58 for .com first year
5. Enable WhoisGuard (free) during checkout
6. DO NOT buy hosting — we use Cloudflare Pages (free)

---

## STEP 2: Create Free GitHub Account

1. Go to github.com → Sign Up (free)
2. Create a new repository named: calcwise (or your site name)
3. Set it to Public
4. Upload all site files by dragging them into GitHub's web interface

File structure to upload:
```
calcwise/
├── index.html
├── css/
│   └── style.css
└── calculators/
    ├── zakat.html
    ├── llm-token.html
    ├── mortgage.html
    ├── compound-interest.html
    ├── sip.html
    ├── tdee.html
    ├── bmi.html
    ├── halal-roi.html
    ├── sadaqah.html
    └── automation-roi.html
```

---

## STEP 3: Deploy to Cloudflare Pages (FREE)

1. Go to pages.cloudflare.com → Sign up free
2. Click "Create a project" → "Connect to Git"
3. Connect your GitHub account → Select your calcwise repo
4. Build settings:
   - Framework preset: None
   - Build command: (leave blank)
   - Build output directory: / (root)
5. Click "Save and Deploy"
6. Cloudflare gives you a free URL: calcwise.pages.dev

---

## STEP 4: Connect Your Namecheap Domain to Cloudflare

1. In Cloudflare Pages → Your project → Custom domains
2. Click "Set up a custom domain"
3. Enter: yourcalcwisedomain.com
4. Cloudflare shows you nameservers (e.g. ns1.cloudflare.com, ns2.cloudflare.com)
5. Go to Namecheap → Manage domain → Nameservers
6. Switch to "Custom DNS" and paste Cloudflare's nameservers
7. Wait 15–30 minutes for DNS to propagate
8. Your site is now live at your custom domain with free HTTPS

---

## STEP 5: Update Domain URLs in Files

After you know your domain, find and replace in all HTML files:
- Replace: https://yourcalcwisedomain.com
- With: https://YOURACTUALDOMAIN.com

Do this in: index.html and all 10 calculator pages (canonical tags + OG tags)

---

## STEP 6: Submit to Google Search Console (Free)

1. Go to search.google.com/search-console
2. Add property → URL prefix → enter your domain
3. Verify via HTML file method (Cloudflare Pages supports this)
4. Submit sitemap: your-domain.com/sitemap.xml

Create a simple sitemap.xml file with all page URLs and upload to GitHub.

---

## STEP 7: Apply for Ezoic (Start Earning Ads)

1. Go to ezoic.com → Sign Up
2. Complete the free Essential Course (~1 hour)
3. Add your site URL
4. Ezoic gives you a script tag — add it to the <head> of every HTML page
5. No traffic minimum — you can apply from day 1

Ezoic script example (they give you your actual ID):
```html
<script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
```

Add this line inside the <head> tag of every page, above the closing </head>.

---

## STEP 8: Set Up Google Analytics 4 (Free)

1. Go to analytics.google.com → Create account
2. Create a property → Get your Measurement ID (G-XXXXXXXXXX)
3. Add this to every page's <head>:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## HOW TO ADD A NEW CALCULATOR LATER

1. Copy any existing calculator HTML file
2. Change the title, meta description, and h1
3. Update the form fields and JavaScript formula
4. Upload to GitHub → calculators/new-calc.html
5. Cloudflare auto-deploys in 30 seconds
6. Add a link card to index.html

---

## TOTAL YEAR 1 COST

| Item | Cost |
|------|------|
| Domain (.com, 1 year) | ~$9.58 |
| Cloudflare Pages hosting | $0.00 |
| GitHub | $0.00 |
| SSL certificate | $0.00 |
| Ezoic ads account | $0.00 |
| Google Analytics | $0.00 |
| **TOTAL** | **~$9.58** |

---

## SITE IS NOW LIVE. WHAT NEXT?

Month 1–2: Let Google index all pages. Check Search Console weekly.
Month 2–3: First rankings appear. First Ezoic revenue (small but real).
Month 4–6: Target adding 10 more calculators. Build internal links.
Month 6+: Apply to Mediavine (50k sessions) for 3–5x higher RPM.
