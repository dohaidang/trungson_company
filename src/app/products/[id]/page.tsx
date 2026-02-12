import Link from "next/link";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { TechSpecs } from "@/components/products/TechSpecs";
import { RelatedProjects } from "@/components/products/RelatedProjects";

export default function ProductDetailPage() {
  const productImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEp2uwkXz3XZI3YKy2hSBtTXZSIvV9847p2Wmb1UWAXo5AeNK7BS8rGojfJTXvCe1FLIN6m4mgB1ygC33FnJOHkUwiQj6-yleB55Q-aPL4z-iFd36Z3WHJT5mSEp-FbNlwxwcRMwSt-yuP5r-bCg-E2mA_B_n6aAypZ5VamoOF66nc6gV_28y_F0R7x0bVrcxWH1RDMvQinD3iAhdHggjruYDYUSz_ilUamEd5_LNmQ64NlC4R3c3xnrQgOlb-B2XOVD7QCwzEf2Y",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjzrYLfAshd8fSVlsFI-7sTRU_UkeiUuNodM9vZ_MNC-pNNWPMzhyDyxtKKh7511D1448wMV4laWFClqJMiuJDl9uoM85pcSRll1UqHDJGUbSdCzGfOKW8mEoDX936N8-AJHjk_zQ_VIpKgc09acdusRQlekKH7izPQdWqZX6uhdw3oqd8hAa3lfQ8htx7CPusyGmsXIUIG7hgmipy8rMTFCAOfiHWT2U7g6OWJe5YpBRHcbdi_l-l1AFEglRpFTqeMFZkcgHv6_o",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCJzlh-6pK72J6fOayC36KJcp7RNV8rvP7su7DhhXd-D-qgJjJao5nVd45AvZ486ComFtQ-o3ne9SJ2pRWqN6VIrBBEcbT04T4pzJsvHkGDNEwrgDqt-ASfNQQJ-kcfKoxTuo2JUf5NWYJ-PYC4BE4RS4C5XnUrRGc5XTun3-x7S3A6u3F-yBCa9D9NYL8StvaleNERPotZGs9uv-ihBKNBH-Kv3eyZ8gd-RT_pD9LYfYD0KdM3JQSSex2bTfC4AwRrw_Uh7X7j5fI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcfdKU9UEi9vXgRf093aoAXFjDdkRKoGHAjst51nqtXw_xgEneeZfOw741XzZJ7PTD9OlqiEEW65Dm26T0qSd03dW69eXVlTd_NtbEvRTF-aVQOAYIpk83wyuLWVSHkyjTrzNObPrMHC2KTGQPF-J61Y-MP6LZI2I-zj74LDOdg9MZRWdq1Q85AeuQD-jSmiZusHFXYSArEFEWS2HIKjuR_jcETUi80mHi6pNPUN26IDVMZg98ziJgyggDpNv68AKJUUW4M7jACnM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2JRMjZdhHqM8Ejd80DoCey0aq0TnSZtUjpIQk4JRnZ1ckQh606-MtIaOkTFBX1i046HIdSUYQc5WRW_5UTRh2OgsUEzj1ieL329fYSLzvSKOgm6y28R0WbidGdJJrS8-nYUvK_li2cBR6VI3cw05jmZqqPnqQRLLX2brIR67AkgaX-Jm2HfB-dpKpgTc4xSDHnbCQQ5LBlodfdi0x-koI7UK2f96rPchFy75IkpF-p-cKMxwCv4z3yE72oOgbDm2O6DrJgOKD760",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow w-full mx-auto px-4 md:px-10 py-6 md:py-10">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Trang Chủ
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Sản Phẩm
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <span className="text-foreground font-medium">Gạch Đặc Tiêu Chuẩn - Tuynel Đỏ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Gallery */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <ProductGallery images={productImages} />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="md:col-span-5 flex flex-col gap-8 sticky top-24 self-start">
            <ProductInfo 
                sku="GX-2024-RD"
                name="Gạch Đặc Tiêu Chuẩn - Tuynel Đỏ A1"
                description="Gạch đất sét nung đỏ tự nhiên chất lượng cao. Thích hợp cho tường gạch trần, lối đi sân vườn và nội thất phong cách công nghiệp. Có độ bền nén cao và độ hút nước thấp."
                price={1200}
                unit="viên"
                coverage="Khoảng 55 viên/m²."
            />
          </div>
        </div>

        {/* Technical Specs Section */}
        <TechSpecs />

        {/* Related Projects Section */}
        <RelatedProjects />

      </main>
    </div>
  );
}
