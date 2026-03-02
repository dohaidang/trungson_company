export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Vòng xoay bên ngoài */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary border-r-primary"></div>
        {/* Logo/Icon Trung Tâm */}
        <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-black shadow-lg">
          TS
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Đang tải trang...
      </p>
    </div>
  );
}
