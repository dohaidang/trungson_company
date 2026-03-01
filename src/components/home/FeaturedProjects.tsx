import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

// Project data for the featured projects section
const PROJECTS = [
  {
    title: "The Lotus Villa",
    location: "Quận 2, TP.HCM",
    category: "Biệt thự",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBnVsVDsU8sWXIz_NvMlcWLW6jKMubAfAeB0Fd1Q90VswdsiU4cwYiYrRDQlhBDE1O2cDU8GnPmeErA7ERT8R3h6dyI7h8GfqM58qMvPLV77r8bi6wQpiTFLhfJvOHjU7SqI2CtOJbQzcyXlCl9ldvsxdjyylZAitRp3tEyeVDVoWUHEuquiaVTE0r8mq7KI0j-_RVlbqnRDW2WNSfUkxAfXAscnJdOdcPYXGoYqDv-D5TJzsscLTTF2Xk7VhS78DzRUyxD9th4Ng",
  },
  {
    title: "Cafe Indochine",
    location: "TP. Đà Nẵng",
    category: "Thương mại",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1nRM9kxqlgPRwPx-1Rh5FUnepCaR1iHSrWCCsSiDHhJLTBY-V2Qmr2gUI6UjOkgBOcX2QLx2dqlIXpYg2-a8GURxGsb4ke-jqYOknc4eOv4fMDB6R10sV93jBHC_omyCnK_rwBBYRrMTmFmcR207U-TEgfqOS6mDum4KElAQwCNwcsY3vI_6dz9gGaeFGpd8BK1Czyu_VXzbuc3l6nBSr0i-ElVAigI1MaZrEh-4lbhHu3KS6uGFC7f1NPC0VnA2y48vi5epgk6U",
  },
  {
    title: "Riverside Apartments",
    location: "Hà Nội",
    category: "Chung cư",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAt2rOdj6NLGYaWtNT7x0h12cIxtY_JCUfDZX6XRXh0zc1IF8xUmt_M2Fv8Z4biy8QEH4nhGimFKtLuXWxWQ2ilaiC0cAEAdrrDag4eVzsY045F9-nWK-aoOYh3UuTAVjHOXgg8MxQ3kqGU_ux9zjOLnYWJZLpy5n8ld8NeRKHoByl6tcsP4rl8UcZW0Zj0CDiU428bHoW2P0QqkbAVbxEO3M4qg6k324EwuBn8jlexuH8f8FiCtqL4QPnU21YVL2yNM1H4US1Nqos",
  },
  {
    title: "Green Valley Resort",
    location: "Đà Lạt",
    category: "Resort",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvg_FQlVvHrNWZDoozPRNjibt4jTuJbpIZcldFSWdgj0ZAxgXEaSQXTBFCWNeGh18kC4kfhysut6NgFi_07PODghJJ_3p9imRcUgY8Mq45eabdwtacu05a4Nl9usqni5MkQhFyHy3sqEvSmId7HcqGtvTiCvoqxGkkz_DkKaYGt_OgjahYkyNNiqcjV8sEGOhPPSglX9PNRgEw_ozVSo3pb4ooPp9jyuCLm8yWhz8QLbmEMMthPnJv6n0S6VbQG5pEtnbIGUE5kpU",
  },
  {
    title: "Metro Office Tower",
    location: "Quận 7, TP.HCM",
    category: "Văn phòng",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbAP2lKJ7BC25G14XiZSsAp5ooblqYdTqq-zLA4_PHWPutdZ18C923BLZA25Hl3fmkYnjVCa4B18xlEQsTjLzacK_wcBjmetjGT-LK-pP2YO6gApfJtPzYBjtRRklBOnnobtkfHhZi91GnIH6G97SMnCkZYD4JST3cFi3iGzIStC8aJo0HDJux-oojR_8g50spmxKhXX4NYl6Tm7sysT3e6GpkiJL_uANFqFAJiltVNSRqxWj_zSTjJIYuZNM898Mi4JFd2eZRD8Y",
  },
  {
    title: "Heritage Boutique Hotel",
    location: "Hội An",
    category: "Khách sạn",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNzCte1D6X418EWPtmaLJg_3pK04ZFtlWqMwsbDI39UJs7ld5q4afKfOL_BSeAud_2CmAufamEyFqfwjrHUZgRWG_1wHBHp-Wj4wMzvsrP9RgXjkOd7drc_LWfFMDhVHSGL1bjd5RljR7_ZUciXE0rHATLlah1NRcnMHRgXXv21CDh9gDHhREhvTZlxZl61ex9erxsU_fDuL23TLu_L2Nji_ZqQ5IIk3PYKkLWI7-7lRv9V3TSKvv50yZ3Bj9--X7EQ9M6ijVNkSk",
  },
  {
    title: "Trường Quốc Tế Gateway",
    location: "Cầu Giấy, Hà Nội",
    category: "Giáo dục",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAkL0V5N6n_Yt7Q0ZXVqR9aR_7z1Qx5ZxF28CkxLZwG2p89x2-T0f9d9s8A0YmE02wJ3k5P2l7oW084VfR9_rYg3DzvbO06YVn9HwX_02ZqE5F5d7o5eH9rN4qZ8P8Dq5V4M5O5_aZ3sD_7o7wX86LfZ9_f8R9P2Ym3Z6r",
  },
  {
    title: "Trung Tâm Thương Mại AEON",
    location: "Bình Dương",
    category: "Thương mại",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXWc9O3Q4Z5zR-O6wK82ZxF12C_m9Z9Q0X4yR9z2T8wY1o5Z8P_0MvZ5E7-H4_e8s2V4J9w8-Q9P3o0-V0Y2oT8sX8M1_R5z0C7l6L9",
  },
];

export function FeaturedProjects() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background" id="projects">
      <div className="mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Đối tác tin cậy
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Dự Án <span className="text-primary">Tiêu Biểu</span>
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Tự hào cung cấp vật liệu cho hàng trăm công trình từ biệt thự đến cao ốc trên khắp
              Việt Nam.
            </p>
          </div>
          <Link
            href="#"
            className="group flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Xem Tất Cả Dự Án
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects - Marquee scroll */}
        <div className="relative overflow-hidden w-full py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-background to-transparent" />

          {/* Scrolling track */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
            {[...PROJECTS, ...PROJECTS].map((project, i) => (
              <div key={`${project.title}-${i}`} className="shrink-0 w-[300px] sm:w-[400px] pr-6">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  location,
  category,
  image,
}: {
  title: string;
  location: string;
  category: string;
  image: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Category Badge */}
      <div className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        {category}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
        <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className="h-0.5 w-6 bg-primary rounded-full" />
          <p className="text-sm text-gray-300">{location}</p>
        </div>
      </div>
    </div>
  );
}
