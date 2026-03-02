"use client";

import { X, Send, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderFormModal({ isOpen, onClose }: OrderFormModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const { items, clearCart } = useCart();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isOpen && !session) {
      router.push("/login?callbackUrl=/cart");
    }
  }, [isOpen, session, router]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !session) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const customerName = formData.get("customerName") as string;
    const customerPhone = formData.get("customerPhone") as string;
    const deliveryAddress = formData.get("deliveryAddress") as string;
    const notes = formData.get("notes") as string;

    try {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
                customerName,
                customerPhone,
                deliveryAddress,
                notes,
                deliveryMethod: "CRANE"
            }),
        });

        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Gửi đơn hàng thất bại");

        setIsSubmitted(true);
        clearCart();
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-lg shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
            onClick={handleClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
            <X className="size-5" />
        </button>

        {!isSubmitted ? (
            <div className="p-6 sm:p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                        Thông Tin Đặt Hàng
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Vui lòng để lại thông tin, nhân viên sẽ liên hệ xác nhận đơn hàng và báo giá vận chuyển trong vòng 30 phút.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Họ Tên <span className="text-red-500">*</span></label>
                            <input name="customerName" required type="text" className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Nguyễn Văn A" defaultValue={session.user?.name || ""} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Số Điện Thoại <span className="text-red-500">*</span></label>
                            <input name="customerPhone" required type="tel" className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="0912..." />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Địa Chỉ Giao Hàng <span className="text-red-500">*</span></label>
                        <input name="deliveryAddress" required type="text" className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Số nhà, đường, phường/xã..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ghi Chú</label>
                        <textarea name="notes" className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[80px]" placeholder="Ghi chú về thời gian giao hàng hoặc yêu cầu đặc biệt..." />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium text-center">{error}</p>
                    )}

                    <button disabled={isLoading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest py-3 rounded-sm transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-50">
                        {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                        {isLoading ? "Đang Gửi..." : "Gửi Đơn Hàng"}
                    </button>
                    
                    <p className="text-[10px] text-center text-muted-foreground/60">
                        Bằng việc gửi đi, bạn đồng ý với chính sách bảo mật của chúng tôi.
                    </p>
                </form>
            </div>
        ) : (
            <div className="p-8 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Send className="size-8" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground text-green-600">
                    Gửi Thành Công!
                </h3>
                <p className="text-muted-foreground mt-2 mb-6">
                    Cảm ơn bạn đã quan tâm. Nhân viên kinh doanh của Trung Sơn sẽ liên hệ với bạn qua số điện thoại vừa cung cấp trong thời gian sớm nhất.
                </p>
                <button 
                    onClick={handleClose}
                    className="bg-muted hover:bg-muted/80 text-foreground font-bold uppercase tracking-wide px-6 py-2 rounded-sm transition-colors"
                >
                    Đóng
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
