import { MapPin, Phone, Mail, Headset } from "lucide-react";

export function ShowroomList({ settings }: { settings?: Record<string, string> }) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-bold uppercase text-foreground border-l-4 border-primary pl-4">
        Hệ Thống Showroom
      </h3>
      
      {/* Showroom 1 */}
      <div className="group flex flex-col overflow-hidden bg-card shadow-md sm:flex-row border border-border">
        <div className="h-48 w-full shrink-0 bg-muted sm:h-auto sm:w-48 relative">
            {/* Background Image Placeholder */}
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvg_FQlVvHrNWZDoozPRNjibt4jTuJbpIZcldFSWdgj0ZAxgXEaSQXTBFCWNeGh18kC4kfhysut6NgFi_07PODghJJ_3p9imRcUgY8Mq45eabdwtacu05a4Nl9usqni5MkQhFyHy3sqEvSmId7HcqGtvTiCvoqxGkkz_DkKaYGt_OgjahYkyNNiqcjV8sEGOhPPSglX9PNRgEw_ozVSo3pb4ooPp9jyuCLm8yWhz8QLbmEMMthPnJv6n0S6VbQG5pEtnbIGUE5kpU')" }}
            />
        </div>
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="size-5" />
            <h4 className="font-bold uppercase tracking-wide">Trụ Sở TP.HCM</h4>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            123 Điện Biên Phủ, Quận Bình Thạnh
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Phone className="size-4" />
              <span>+84 (28) 3840 0000</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Mail className="size-4" />
              <span>hcmc-sales@trungson.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom 2 */}
      <div className="group flex flex-col overflow-hidden bg-card shadow-md sm:flex-row border border-border">
        <div className="h-48 w-full shrink-0 bg-muted sm:h-auto sm:w-48 relative">
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbAP2lKJ7BC25G14XiZSsAp5ooblqYdTqq-zLA4_PHWPutdZ18C923BLZA25Hl3fmkYnjVCa4B18xlEQsTjLzacK_wcBjmetjGT-LK-pP2YO6gApfJtPzYBjtRRklBOnnobtkfHhZi91GnIH6G97SMnCkZYD4JST3cFi3iGzIStC8aJo0HDJux-oojR_8g50spmxKhXX4NYl6Tm7sysT3e6GpkiJL_uANFqFAJiltVNSRqxWj_zSTjJIYuZNM898Mi4JFd2eZRD8Y')" }}
            />
        </div>
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="flex items-center gap-2 text-primary">
             <MapPin className="size-5" />
            <h4 className="font-bold uppercase tracking-wide">Chi Nhánh Đà Nẵng</h4>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            456 Nguyễn Hữu Thọ, Quận Cẩm Lệ
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Phone className="size-4" />
              <span>+84 (23) 6368 0000</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Mail className="size-4" />
              <span>dn-sales@trungson.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotline */}
      <div className="mt-4 bg-primary text-primary-foreground p-8 rounded-sm shadow-md">
        <h4 className="font-bold uppercase tracking-wider">Hotline Trực Tiếp</h4>
        <p className="mt-2 text-sm text-primary-foreground/90">
          Hỗ trợ khẩn cấp và tư vấn mua hàng trực tiếp:
        </p>
        <div className="mt-4 flex items-center gap-4">
          <Headset className="size-10 text-primary-foreground/90" />
          <div>
            <span className="block text-2xl font-black tracking-tighter text-primary-foreground">
              {settings?.CONTACT_HOTLINE || "1900 8000"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-primary-foreground/70">
              Thứ 2 - Thứ 7 | 08:00 - 18:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
