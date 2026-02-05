# Google Ads Compliance Documentation

## Overview
This document outlines the comprehensive Google Ads compliance measures implemented for Sri Janaki Mahal Trust website to eliminate "Compromised Site" and "Circumventing systems" violations.

## Compliance Checklist ✅

### 1. Security Measures
- [x] **Content Security Policy (CSP)** - Implemented in `vercel.json`
- [x] **X-Frame-Options** - Set to DENY to prevent clickjacking
- [x] **X-Content-Type-Options** - Set to nosniff
- [x] **X-XSS-Protection** - Enabled with mode=block
- [x] **Strict-Transport-Security** - HTTPS enforcement
- [x] **Referrer-Policy** - Strict origin when cross-origin
- [x] **Permissions-Policy** - Restricted camera, microphone, geolocation
- [x] **Security Meta Tags** - Added to Layout.astro
- [x] **HTTPS Redirects** - Configured in Vercel

### 2. Legal Pages & Transparency
- [x] **Privacy Policy** - `/privacy-policy` (GDPR compliant)
- [x] **Terms of Service** - `/terms-of-service` (comprehensive)
- [x] **Cancellation Policy** - `/cancellation-refund` (detailed)
- [x] **About Page** - `/about` (trust signals)
- [x] **Legal Links** - Added to footer navigation
- [x] **Business Registration** - Displayed in footer

### 3. Trust Signals
- [x] **Complete Contact Information** - Phone, email, address
- [x] **Physical Address** - Vasudev Gath, Karsewakpuram, Ayodhya
- [x] **Business Hours** - Check-in/out times displayed
- [x] **Google Maps Integration** - Embedded map with directions
- [x] **Trust Badges** - SSL, Registered Trust, Ratings
- [x] **Email Contact** - srijanakimahaltrust7484@gmail.com

### 4. Pricing Transparency
- [x] **Clear Pricing Display** - All room rates visible
- [x] **Tax Inclusion Notice** - "All prices include taxes"
- [x] **No Hidden Charges** - Explicit disclaimer
- [x] **Meal Inclusion** - Breakfast, lunch, dinner included
- [x] **Booking Terms** - Check-in/out times specified

### 5. Technical Compliance
- [x] **Structured Data** - Enhanced business schema
- [x] **Google Site Verification** - Meta tag added (placeholder)
- [x] **Security.txt** - Created in `.well-known/`
- [x] **Robots.txt** - Updated with legal pages
- [x] **Canonical URLs** - Proper HTTPS canonicalization

## Implementation Details

### Security Headers (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me tel:;"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

### Legal Pages Structure
```
/privacy-policy     - GDPR compliant privacy policy
/terms-of-service   - Comprehensive terms and conditions
/cancellation-refund - Detailed cancellation and refund policy
/about             - Trust signals and business information
```

### Enhanced Schema Markup
- Organization schema with complete contact details
- LocalBusiness schema with geo-coordinates
- LodgingBusiness schema with amenities
- Enhanced contact points with 24/7 availability

## Google Search Console Setup

### 1. Site Verification
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.srijanakimahaltrustofficial.com`
3. Choose "HTML tag" verification method
4. Copy the verification code
5. Replace `your-google-verification-code` in Layout.astro with actual code
6. Verify ownership

### 2. Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Add sitemap: `https://www.srijanakimahaltrustofficial.com/sitemap-index.xml`
3. Submit and monitor indexing status

### 3. Monitor Security Issues
1. Check "Security Issues" section regularly
2. Monitor "Manual Actions" for any penalties
3. Review "Core Web Vitals" for performance

## Google Ads Policy Compliance

### Before Submitting Ads
1. **Verify Site Security**
   - Test HTTPS enforcement
   - Check security headers with [SecurityHeaders.com](https://securityheaders.com)
   - Verify CSP doesn't block legitimate resources

2. **Test All Links**
   - WhatsApp links work correctly
   - Phone links open dialer
   - Email links open mail client
   - All internal links function properly

3. **Mobile Responsiveness**
   - Test on various devices
   - Ensure all CTAs are visible
   - Check form functionality

4. **Content Review**
   - Verify all pricing is accurate
   - Check contact information
   - Ensure legal pages are accessible

### Ad Submission Process
1. **Create New Campaign**
   - Use clear, honest ad copy
   - Include business name in ad text
   - Use relevant keywords

2. **Landing Page**
   - Direct to homepage (https://www.srijanakimahaltrustofficial.com)
   - Ensure fast loading
   - Clear call-to-action buttons

3. **Conversion Tracking**
   - Google Ads conversion tracking already implemented
   - Test conversion events
   - Monitor conversion data

## Troubleshooting Common Issues

### "Compromised Site" Violation
**Possible Causes:**
- Missing security headers
- No HTTPS enforcement
- Malware detection (unlikely with Vercel)
- Suspicious redirects

**Solutions:**
1. Verify all security headers are active
2. Test HTTPS redirects
3. Check for any suspicious scripts
4. Ensure clean codebase

### "Circumventing Systems" Violation
**Possible Causes:**
- Misleading redirects
- Hidden content
- Deceptive practices
- Policy violations

**Solutions:**
1. Ensure transparent pricing
2. Clear business information
3. Honest ad copy
4. Proper legal pages

### Site Verification Issues
**Common Problems:**
- Verification code not found
- Incorrect meta tag placement
- DNS issues

**Solutions:**
1. Check meta tag in page source
2. Verify correct placement in `<head>`
3. Wait 24-48 hours for propagation
4. Try alternative verification methods

## Monitoring & Maintenance

### Weekly Checks
- [ ] Security headers status
- [ ] All links functional
- [ ] Contact information accurate
- [ ] Legal pages accessible

### Monthly Reviews
- [ ] Google Search Console reports
- [ ] Security scan results
- [ ] Performance metrics
- [ ] User feedback

### Quarterly Updates
- [ ] Review and update legal pages
- [ ] Check security.txt expiration
- [ ] Update contact information if needed
- [ ] Review compliance measures

## Contact Information

**For Technical Issues:**
- Email: srijanakimahaltrust7484@gmail.com
- Phone: +91 8679304702

**For Legal Inquiries:**
- Refer to Privacy Policy and Terms of Service
- Contact via official channels listed in footer

## File Locations

```
vercel.json                           - Security headers configuration
src/layouts/Layout.astro              - Security meta tags & schema
src/pages/privacy-policy.astro        - Privacy policy page
src/pages/terms-of-service.astro      - Terms of service page
src/pages/cancellation-refund.astro   - Cancellation policy page
src/pages/about.astro                 - About page
src/components/Footer.astro            - Legal links & trust badges
src/components/ContactSection.astro   - Enhanced contact info
src/components/RoomsSection.astro     - Pricing transparency
public/.well-known/security.txt       - Security contact info
public/robots.txt                     - Updated robots file
```

## Success Metrics

### Google Ads Compliance
- ✅ Zero policy violations
- ✅ Ads approved without issues
- ✅ No "Compromised Site" flags
- ✅ No "Circumventing Systems" flags

### Trust Signals
- ✅ Complete business information
- ✅ Transparent pricing
- ✅ Legal compliance
- ✅ Security measures

### Technical Performance
- ✅ Fast loading times
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Security hardened

---

**Last Updated:** January 2025  
**Next Review:** April 2025  
**Maintained By:** Sri Janaki Mahal Trust Development Team
