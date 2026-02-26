"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Users, Calendar, Truck } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Nhà Thầu Tin Dùng",
  },
  {
    icon: Building2,
    value: 200,
    suffix: "+",
    label: "Dự Án Đã Cung Cấp",
  },
  {
    icon: Calendar,
    value: 15,
    suffix: "",
    label: "Năm Kinh Nghiệm",
  },
  {
    icon: Truck,
    value: 24,
    suffix: "h",
    label: "Giao Hàng Nhanh",
  },
];

// Hook for count-up animation
function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, isVisible, duration]);

  return count;
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  isVisible,
}: {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, isVisible);

  return (
    <div className="flex flex-col items-center gap-3 text-center group">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {count}
          {suffix}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
