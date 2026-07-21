// app/page.tsx
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-navy tracking-tight">
          Manage your business,{" "}
          <span className="text-marigold">not your spreadsheets</span>
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Inventory, sales, khata, and staff — all in one place, built for
          Nepali shops and traders.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-steel-blue hover:bg-sky-accent text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get Started
          </button>
          <button className="bg-pale-blue-grey text-navy px-6 py-3 rounded-lg font-medium hover:bg-white border border-border transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
