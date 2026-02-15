# Google Search Console Setup Guide

Complete guide to setting up Google Search Console for Sri Janaki Mahal Trust website to monitor SEO performance and improve search rankings.

## What is Google Search Console?

Google Search Console (formerly Google Webmaster Tools) is a free service that helps you:
- Monitor how Google sees your website
- Submit sitemaps for faster indexing
- Track search performance
- Identify and fix technical issues
- Improve search rankings

## Step 1: Create Google Account

1. If you don't have a Google account, create one at [accounts.google.com](https://accounts.google.com)
2. Use a Google account that you'll have long-term access to

## Step 2: Add Property to Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" or "Start now"
3. Select "URL prefix" option
4. Enter your website URL: `https://www.srijanakimahaltrustofficial.com`
5. Click "Continue"

## Step 3: Verify Ownership

You need to verify that you own the website. Choose one of these methods:

### Method 1: HTML Tag (Recommended for Astro)

1. In Search Console, select "HTML tag" verification method
2. Copy the verification code (looks like: `<meta name="google-site-verification" content="ABC123XYZ" />`)
3. Open `src/layouts/Layout.astro`
4. Find the line: `<meta name="google-site-verification" content="your-google-verification-code" />`
5. Replace `your-google-verification-code` with the actual code from Search Console
6. Remove the `content="your-google-verification-code"` part and paste the full content value
7. Save the file
8. Build and deploy your site: `npm run build`
9. Return to Search Console and click "Verify"

### Method 2: HTML File Upload

1. Download the HTML verification file from Search Console
2. Upload it to the `public/` directory
3. Deploy the site
4. Click "Verify" in Search Console

### Method 3: DNS Verification

1. Select "DNS record" method
2. Add the TXT record to your domain's DNS settings
3. Click "Verify" in Search Console

## Step 4: Submit Sitemap

Once verified, submit your sitemap:

1. In Search Console, go to "Sitemaps" in the left menu
2. Enter: `https://www.srijanakimahaltrustofficial.com/sitemap-index.xml`
3. Click "Submit"
4. Wait for Google to process (may take a few hours)

### Alternative Sitemap URLs

Always submit the sitemap index URL as the canonical entry point:
- `https://www.srijanakimahaltrustofficial.com/sitemap-index.xml`

Do **not** manually submit shard files (such as `sitemap-0.xml`) unless Google support explicitly asks for debugging samples.

## Step 5: Request Indexing

### For Homepage

1. Go to "URL Inspection" in Search Console
2. Enter: `https://www.srijanakimahaltrustofficial.com`
3. Click "Request Indexing"
4. Wait for Google to crawl (usually within a few hours)

### For Important Pages

Request indexing for:
- `/` (Homepage)
- `/about`
- `/blog`
- Individual blog posts

## Step 6: Monitor Performance

### Check Indexing Status

1. Go to "Coverage" in Search Console
2. Check for any errors or warnings
3. Fix any issues reported

### Monitor Search Queries

1. Go to "Performance" in Search Console
2. View search queries, clicks, impressions, and CTR
3. Track rankings for target keywords:
   - "Sri Janaki Mahal Trust"
   - "Sri Janaki Mahal"
   - "Sri Janaki Mahal Ayodhya"
   - "Janaki Mahal Trust"
   - "dharmshala ayodhya"

### Mobile Usability

1. Go to "Mobile Usability"
2. Ensure all pages pass mobile-friendly test
3. Fix any mobile issues reported

## Step 7: Set Up Email Notifications

1. Go to Settings → Users and permissions
2. Click "Notifications"
3. Enable email notifications for:
   - Critical issues
   - Manual actions
   - Security issues

## Step 8: Regular Monitoring

### Pre-Deploy Quality Gate

Before any major content or template release:
- Run `npm run seo:verify:strict`
- Resolve all reported failures before deploying

### Weekly Tasks

- Check for new search queries
- Monitor click-through rates
- Review any errors or warnings
- Check indexing status

### Monthly Tasks

- Review search performance report
- Analyze top-performing pages
- Identify opportunities for improvement
- Check for new backlinks

## Troubleshooting

### Verification Failed

**Problem:** Verification code not working

**Solutions:**
1. Ensure the meta tag is in the `<head>` section
2. Check that the site is deployed with the verification code
3. Try a different verification method
4. Clear browser cache and try again

### Sitemap Not Found

**Problem:** Google can't find the sitemap

**Solutions:**
1. Check that sitemap is accessible: Visit `https://www.srijanakimahaltrustofficial.com/sitemap-index.xml`
2. Verify `robots.txt` includes both sitemap references:
   - `https://www.srijanakimahaltrustofficial.com/sitemap-index.xml`
   - `https://www.srijanakimahaltrustofficial.com/image-sitemap.xml`
3. Ensure the latest deployment was published successfully
4. Re-submit only the sitemap index URL in Search Console

### Pages Not Indexed

**Problem:** Pages not appearing in search results

**Solutions:**
1. Request indexing manually
2. Check for "noindex" tags
3. Ensure pages are in sitemap
4. Check robots.txt doesn't block pages
5. Wait 1-2 weeks for new pages to be indexed

## Best Practices

### 1. Regular Updates

- Update content regularly
- Add new blog posts
- Keep information current

### 2. Monitor Performance

- Check Search Console weekly
- Track keyword rankings
- Monitor traffic trends

### 3. Fix Issues Promptly

- Address errors immediately
- Fix mobile usability issues
- Resolve security warnings

### 4. Optimize Content

- Use target keywords naturally
- Create quality content
- Build internal links

## Key Metrics to Track

### Search Performance

- **Impressions:** How often your site appears in search
- **Clicks:** How many users click through
- **CTR:** Click-through rate (clicks/impressions)
- **Average Position:** Average ranking position

### Target Keywords

Monitor these keywords:
- Sri Janaki Mahal Trust
- Sri Janaki Mahal
- Sri Janaki Mahal Ayodhya
- Sri Janaki Mahal Trust Ayodhya
- Janaki Mahal Trust
- dharmshala ayodhya
- spiritual accommodation ayodhya
- rooms near ram mandir

### Pages to Monitor

- Homepage (`/`)
- About page (`/about`)
- Blog index (`/blog`)
- Individual blog posts
- Contact/booking pages

## Additional Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Search Console Academy](https://developers.google.com/search-console)
- [Google Search Central](https://developers.google.com/search)

## Next Steps

After setting up Search Console:

1. ✅ Verify ownership
2. ✅ Submit sitemap
3. ✅ Request indexing for important pages
4. ✅ Set up email notifications
5. ✅ Monitor performance weekly
6. ✅ Track keyword rankings
7. ✅ Fix any issues reported
8. ✅ Optimize content based on data

---

**Need Help?**

If you encounter issues:
1. Check Google Search Console Help Center
2. Review the error messages in Search Console
3. Ensure all verification steps are completed correctly
4. Wait 24-48 hours for changes to propagate

---

*Last Updated: February 2026*

