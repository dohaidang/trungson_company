export function PartnersMarquee() {
  // Partner names representing brands the company works with
  const partners = [
    "Viglacera", "INAX", "Đồng Tâm", "Taicera", "Prime Group",
    "Hạ Long", "Phú Điền", "Tân Kỷ", "Mikado", "Bạch Mã",
  ];

  return (
    <section className="w-full py-16 overflow-hidden bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Đối tác cung cấp & Thương hiệu hàng đầu
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex animate-marquee gap-12 w-max">
          {[...partners, ...partners].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-16 min-w-[160px] items-center justify-center rounded-lg border border-border/50 bg-card px-8 text-sm font-bold tracking-wide text-muted-foreground/70 transition-all hover:border-primary/30 hover:text-foreground hover:shadow-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
