# Makeup Artist Gallery

معرض أعمال احترافي لفنانة المكياج - جاهز للنشر على GitHub Pages

## المميزات

- ✅ معرض صور تفاعلي مع فئات (زفاف، خطوبة، كتب كتاب، سوارية)
- ✅ عرض كامل الشاشة مع تكبير
- ✅ حجز سريع عبر WhatsApp
- ✅ جاهز للنشر على GitHub Pages
- ✅ إضافة الصور تلقائيًا بدون تعديل الكود

## كيفية إضافة الصور

1. ضع الصور في المجلدات المناسبة داخل `docs/gallery/`:
   - `docs/gallery/zafaf/` - صور الزفاف
   - `docs/gallery/khotoba/` - صور الخطوبة
   - `docs/gallery/ketb-ketab/` - صور كتب الكتاب
   - `docs/gallery/sawariya/` - صور السوارية

2. شغّل الأمر لتحديث manifest:
   ```bash
   npm run gen:manifest
   ```

3. الصور ستظهر تلقائيًا في المشروع!

## التطوير المحلي

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) لرؤية النتيجة.

## البناء للنشر

```bash
npm run build
```

الملفات الجاهزة ستكون في مجلد `out/`

## النشر على GitHub Pages

المشروع جاهز للنشر على GitHub Pages. عند الـ push إلى main، سيتم البناء والنشر تلقائيًا عبر GitHub Actions.

الصور يجب أن تكون في `docs/gallery/` وستُنسخ تلقائيًا عند البناء.
