# Product Requirements Document (PRD)

## 1. Overview
**Product Name:** Makeup Artist Gallery Web App  
**Platform:** Web (Mobile-first, PWA-ready)  
**Primary Goal:** عرض أعمال الـ Makeup Artist بشكل احترافي وتحويل الزائر إلى عميل فعلي.

---

## 2. Objectives
- تقديم تجربة شبيهة بتطبيق Gallery على الموبايل
- إبراز جودة وتفاصيل أعمال المكياج
- تسهيل الحجز والتواصل السريع
- بناء ثقة واحترافية للبراند

---

## 3. Target Audience
- Brides & Event Clients
- Social media visitors (Instagram / WhatsApp)
- Mobile users (90%+)

---

## 4. Core Features

> **Image Management Note:** الصور يتم رفعها يدويًا عن طريق وضعها داخل مجلد مخصص داخل المشروع (Static Assets)، بدون أي Dashboard أو رفع من داخل الموقع.

### 4.1 Gallery
- Grid layout (2–3 columns حسب حجم الشاشة)
- Full-screen image viewer
- Swipe (يمين / شمال)
- Zoom (Pinch / Double tap)
- Lazy loading
- High-resolution images

### 4.2 Categories & Filters
- Categories:
  - زفاف
  - خطوبة
  - كتب كتاب
  - سوارية
- Filter بدون إعادة تحميل الصفحة
- Featured work في أعلى الصفحة

### 4.3 Before / After
- Slider لعرض قبل وبعد المكياج
- دعم السحب باللمس

### 4.4 Booking & Contact
- زر **احجزي الآن** واضح وثابت
- فتح WhatsApp مباشرة برسالة جاهزة
- Calendar بسيط (Available / Unavailable)

### 4.5 Trust & Branding
- Testimonials (اسم + صورة + تعليق)
- About section مختصر
- Logo + Brand colors ثابتة
- Instagram feed (آخر الأعمال)

---

## 5. User Flow
1. Landing → Gallery
2. اختيار صورة → Full Screen
3. Swipe / Zoom
4. View Category أو Before/After
5. Click "احجزي الآن"
6. WhatsApp Conversation

---

## 6. UX & UI Requirements
- Mobile-first design
- Bottom actions (thumb-friendly)
- Dark mode (اختياري)
- Smooth animations (قصيرة وسريعة)
- Skeleton loading أثناء تحميل الصور

---

## 7. Performance Requirements
- Image formats: WebP / AVIF
- Lazy loading لكل الصور
- First Load < 2s على الموبايل
- Minimal JavaScript

---

## 8. Technical Stack (Proposed)

### Frontend
- Next.js (React)
- Tailwind CSS
- Framer Motion
- Static Image Gallery (File-based)

### Image Management (Manual)
- مجلد مخصص داخل المشروع مثل:
  - `/public/gallery/bridal`
  - `/public/gallery/soft`
  - `/public/gallery/evening`
- Naming convention للصور:
  - `client-name_before.webp`
  - `client-name_after.webp`
- Categories تعتمد على اسم المجلد
- الموقع يقرأ الصور تلقائيًا بدون Backend

### Backend
- غير مطلوب في v1

### PWA
- Add to Home Screen
- Fullscreen mode
- Offline caching (صور مختارة)

---

## 9. SEO & Sharing
- Alt text لكل صورة
- Meta tags لكل Category
- Share image/link مباشرة

---

## 10. Out of Scope (v1)
- User accounts
- Online payment
- Admin dashboard معقد

---

## 11. Success Metrics
- Time spent on gallery
- WhatsApp clicks
- Conversion rate (زيارة → تواصل)
- Page load performance

---

## 12. Future Enhancements
- Favorite looks
- Client reviews submission
- Multi-language support
- Advanced booking system

