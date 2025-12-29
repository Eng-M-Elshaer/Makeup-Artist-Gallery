import Gallery from "@/components/Gallery";

export default function Home() {
  const whatsappMsg = encodeURIComponent(
    "مرحبًا! عايزة أحجز ميكب لتاريخ محدد، ممكن التفاصيل؟"
  );

  return (
    <>
      <main className="max-w-5xl mx-auto p-4 pb-24">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">معرض أعمال</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              اختاري الفئة وشاهدي الصور
            </p>
          </div>
        </header>

        <section>
          <Gallery />
        </section>
      </main>

      <a
        href={`https://wa.me/201100793335?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:w-auto bg-green-600 text-white font-semibold py-3 rounded-full text-center shadow-lg"
      >
        احجزي الآن عبر واتساب
      </a>
    </>
  );
}
