export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the root layout Header, Footer, and ScrollToTop for admin pages */}
      <style>{`
        header, footer, [aria-label="Scroll to top"] { display: none !important; }
        main.flex-1 { margin: 0 !important; padding: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
