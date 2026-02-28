import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, User2, Ruler, Package } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/projectsData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Generate static params for all projects
export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === id);
  if (!project) return { title: "Dự án không tồn tại" };
  return {
    title: `${project.title} | CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* Hero Image */}
      <section className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d1b] via-[#2a1d1b]/50 to-transparent" />

        {/* Back button */}
        <Link
          href="/projects"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Tất cả Dự Án
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground mb-3">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {project.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1"><MapPin className="size-4" />{project.location}</span>
              <span className="flex items-center gap-1"><Calendar className="size-4" />{project.year}</span>
              <span className="flex items-center gap-1"><Ruler className="size-4" />{project.area}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Mô Tả Dự Án</h2>
                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Image Gallery */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Hình Ảnh Công Trình</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, i) => (
                    <div key={i} className="relative h-52 rounded-lg overflow-hidden group">
                      <Image
                        src={img}
                        alt={`${project.title} - Ảnh ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Project info card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">
                  Thông Tin Dự Án
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <User2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Chủ đầu tư</p>
                      <p className="text-sm font-bold text-foreground">{project.client}</p>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Địa điểm</p>
                      <p className="text-sm font-bold text-foreground">{project.location}</p>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <Ruler className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Diện tích</p>
                      <p className="text-sm font-bold text-foreground">{project.area}</p>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Năm thực hiện</p>
                      <p className="text-sm font-bold text-foreground">{project.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Materials used */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">
                  Vật Liệu Sử Dụng
                </h3>
                <div className="flex flex-col gap-2">
                  {project.materials.map((mat) => (
                    <div key={mat} className="flex items-center gap-2 text-sm">
                      <Package className="size-4 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Liên Hệ Báo Giá
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-foreground mb-6">Dự Án Liên Quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROJECTS_DATA.filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{p.location}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
