import { Ruler, Scale, Hammer, Droplets } from "lucide-react";

export function TechSpecs() {
  return (
    <div className="mt-20 border-t border-border pt-16">
      <h3 className="text-xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
        <span className="w-8 h-0.5 bg-primary block"></span>
        Thông Số Kỹ Thuật
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Spec Card 1 */}
        <SpecCard 
            icon={<Ruler className="size-6" />}
            label="Kích Thước"
            value="80 x 190 x 80 mm"
        />
        {/* Spec Card 2 */}
        <SpecCard 
            icon={<Scale className="size-6" />}
            label="Trọng Lượng"
            value="2.2 kg"
        />
        {/* Spec Card 3 */}
        <SpecCard 
            icon={<Hammer className="size-6" />}
            label="Cường Độ Chịu Nén"
            value="> 75 kg/cm²"
        />
        {/* Spec Card 4 */}
        <SpecCard 
            icon={<Droplets className="size-6" />}
            label="Độ Hút Nước"
            value="< 10%"
        />
      </div>
    </div>
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="bg-card border border-border p-6 rounded-xl flex flex-col gap-3 hover:border-primary/50 transition-colors group">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {icon}
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
              {label}
            </p>
            <p className="text-foreground text-lg font-bold">{value}</p>
          </div>
        </div>
    )
}
