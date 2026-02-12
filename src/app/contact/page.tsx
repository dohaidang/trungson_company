import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ShowroomList } from "@/components/contact/ShowroomList";
import { ShieldCheck, Truck, Factory, CreditCard } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="mx-auto max-w-[1280px] w-full px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Liên Hệ Với <span className="text-primary">Tư Vấn Viên</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-primary"></div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Bạn đang lên kế hoạch cho một dự án lớn? Đội ngũ kinh doanh của chúng tôi cung cấp hỗ trợ tận tình, chính sách giá sỉ tùy chỉnh và kế hoạch vận chuyển cho các dự án thương mại trên toàn quốc.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Form */}
          <ContactForm />

          {/* Showrooms & Info */}
          <ShowroomList />
        </div>
      </main>

      {/* Features Highlights */}
      <section className="bg-muted/40 py-12">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <FeatureItem 
                icon={<ShieldCheck className="size-10 text-muted-foreground" />}
                title="Chất Lượng Được Kiểm Định"
            />
            <FeatureItem 
                icon={<Truck className="size-10 text-muted-foreground" />}
                title="Đội Xe Vận Chuyển Toàn Quốc"
            />
            <FeatureItem 
                icon={<Factory className="size-10 text-muted-foreground" />}
                title="Trực Tiếp Từ Nhà Máy"
            />
            <FeatureItem 
                icon={<CreditCard className="size-10 text-muted-foreground" />}
                title="Tín Dụng Linh Hoạt"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex flex-col items-center text-center opacity-60">
            <div className="mb-2">
                {icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {title}
            </span>
        </div>
    )
}
