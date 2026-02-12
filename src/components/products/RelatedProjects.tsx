import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function RelatedProjects() {
  return (
    <div className="mt-20 mb-10">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-xl font-bold uppercase tracking-widest text-foreground flex items-center gap-3">
          <span className="w-8 h-0.5 bg-primary block"></span>
          Dự Án Tiêu Biểu
        </h3>
        <Link
          href="#"
          className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 group text-sm"
        >
          Xem tất cả
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProjectCard
          title="The Lotus Villa"
          location="Quận 2, TP.HCM"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBBnVsVDsU8sWXIz_NvMlcWLW6jKMubAfAeB0Fd1Q90VswdsiU4cwYiYrRDQlhBDE1O2cDU8GnPmeErA7ERT8R3h6dyI7h8GfqM58qMvPLV77r8bi6wQpiTFLhfJvOHjU7SqI2CtOJbQzcyXlCl9ldvsxdjyylZAitRp3tEyeVDVoWUHEuquiaVTE0r8mq7KI0j-_RVlbqnRDW2WNSfUkxAfXAscnJdOdcPYXGoYqDv-D5TJzsscLTTF2Xk7VhS78DzRUyxD9th4Ng"
        />
        <ProjectCard
          title="Cafe Indochine"
          location="TP. Đà Nẵng"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuD1nRM9kxqlgPRwPx-1Rh5FUnepCaR1iHSrWCCsSiDHhJLTBY-V2Qmr2gUI6UjOkgBOcX2QLx2dqlIXpYg2-a8GURxGsb4ke-jqYOknc4eOv4fMDB6R10sV93jBHC_omyCnK_rwBBYRrMTmFmcR207U-TEgfqOS6mDum4KElAQwCNwcsY3vI_6dz9gGaeFGpd8BK1Czyu_VXzbuc3l6nBSr0i-ElVAigI1MaZrEh-4lbhHu3KS6uGFC7f1NPC0VnA2y48vi5epgk6U"
        />
        <ProjectCard
          title="Riverside Apartments"
          location="Hà Nội"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuAt2rOdj6NLGYaWtNT7x0h12cIxtY_JCUfDZX6XRXh0zc1IF8xUmt_M2Fv8Z4biy8QEH4nhGimFKtLuXWxWQ2ilaiC0cAEAdrrDag4eVzsY045F9-nWK-aoOYh3UuTAVjHOXgg8MxQ3kqGU_ux9zjOLnYWJZLpy5n8ld8NeRKHoByl6tcsP4rl8UcZW0Zj0CDiU428bHoW2P0QqkbAVbxEO3M4qg6k324EwuBn8jlexuH8f8FiCtqL4QPnU21YVL2yNM1H4US1Nqos"
        />
      </div>
    </div>
  );
}

function ProjectCard({ title, location, image }: { title: string, location: string, image: string }) {
    return (
        <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
            <p className="text-white text-lg font-bold">{title}</p>
            <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              {location}
            </p>
          </div>
        </div>
    )
}
