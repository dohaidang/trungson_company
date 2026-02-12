import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="w-10 h-10 flex items-center justify-center border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50 rounded-sm">
        <ChevronLeft className="size-5" />
      </button>
      <button className="w-10 h-10 flex items-center justify-center border border-primary bg-primary text-primary-foreground font-bold transition-colors rounded-sm">
        1
      </button>
      <button className="w-10 h-10 flex items-center justify-center border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors rounded-sm">
        2
      </button>
      <button className="w-10 h-10 flex items-center justify-center border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors rounded-sm">
        3
      </button>
      <span className="text-muted-foreground px-2">...</span>
      <button className="w-10 h-10 flex items-center justify-center border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors rounded-sm">
        12
      </button>
      <button className="w-10 h-10 flex items-center justify-center border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary transition-colors rounded-sm">
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
