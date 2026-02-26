"use client";

import Link from "next/link";
import Image from "next/image";
import { Grid3x3, Mail, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background relative overflow-hidden">
        {/* Brick Pattern Background */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: '24px 24px'
            }}
        />

        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[450px] relative z-10">
            {/* Brand Header Area */}
            <div className="flex flex-col items-center mb-8">
                <div className="size-16 bg-primary flex items-center justify-center rounded-sm mb-4 shadow-lg shadow-primary/20">
                    <Grid3x3 className="text-white size-8" />
                </div>
                <h1 className="text-2xl font-bold text-foreground uppercase tracking-wider">Trung Sơn Company</h1>
                <p className="text-sm text-muted-foreground mt-1 uppercase tracking-[0.2em]">Building Excellence</p>
            </div>

            {/* Main Authentication Card */}
            <div className="bg-card shadow-2xl rounded-sm overflow-hidden border border-border">
                {/* Progress Bar (Subtle) */}
                <div className="h-1 w-full bg-muted">
                    <div className="h-full bg-primary w-1/3" />
                </div>

                <div className="p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-3">Quên mật khẩu?</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Vui lòng nhập email hoặc số điện thoại đã đăng ký. Chúng tôi sẽ gửi một liên kết để bạn có thể thiết lập lại mật khẩu của mình.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="recovery-id" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                                Email hoặc Số điện thoại
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                </div>
                                <input 
                                    id="recovery-id" 
                                    type="text" 
                                    className="block w-full pl-10 pr-4 py-3 bg-background border border-input rounded-sm text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 placeholder:font-light outline-none" 
                                    placeholder="example@gmail.com" 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 group uppercase tracking-wide text-sm"
                        >
                            <span>GỬI YÊU CẦU CẤP LẠI</span>
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-border text-center">
                        <Link 
                            href="/login" 
                            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Quay lại Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>

            {/* Visual Decoration / Context */}
            <div className="mt-12 grid grid-cols-4 gap-2 opacity-30 grayscale mix-blend-multiply dark:mix-blend-overlay">
                <div className="aspect-square bg-muted rounded-sm overflow-hidden relative">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXRuFt3MfvTy6dcX7l7pWRqZCQcu7YgoZn938G-0UF13u-tZOgk5Qlq0bxZnLsRdl8ffViFlhN3xkVOELK1A4MFge-RXSJJGDGeQf49daj48Q4c9LRQNsRwjjmUHHtQg1Hm5RAAVryPZzGyH-5kiZmJsnMPgexKHsLAVszKARxLLp36nv2oAiOPbT_kEFTQ8VJUeQr8k_O2O459NjHJteVULxjRoL01asb4Ucg08EegwOMNn--uEa2WIdF4uioTqx6xcm_5vFkVoU" alt="Texture sample" fill className="object-cover" />
                </div>
                <div className="aspect-square bg-muted rounded-sm overflow-hidden relative">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcoRi499TAzxnE0TzXjduUpooTjRIa5OJ5dXbRA1MvZnnbUpSFMOMIeAVsIY90tMyQLpKodcrQi26jdea1NcDGfadwdT8bzfsbOk5HKbs0t28zS562XoNIoxAwvotVcZLiGyik_oMQya7gJDKXotY5JZ8WIz1VAR5HnbzdWW_cMGF2rPadMa660_534ZI2NFLrXvqhKIiFHlC5oUnNbxAMgxl8FKYRFKhb0-KTax6I9Xl67fXI4PkZpMnE0fGXM2J4fd7Af28fDS8" alt="Texture sample" fill className="object-cover" />
                </div>
                <div className="aspect-square bg-muted rounded-sm overflow-hidden relative">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIj5hbw9-o28x5RbJPa_Z-pxjSpBG5N5PFt20tYaIFmH1tzuTR2dMAInu8v9ZlJqs1yRAU7KcaZsJVLVhWopzDt5mHAygwpkkBKL3qO6IDHZJZXpzto0TDFycGyr7kMRQSIKSMqwjJQS7vW2jizNczzGvfiW8WymedO_TN5A4DLTeCx45ddsufGBxv0DhjAZ1spdgXRiWk8JoRzdHmxVZVUJRSj8EOyNlSoBccHT_R6rm_DyneEjwkikimYd8xRztpdBUbnNNeCNQ" alt="Texture sample" fill className="object-cover" />
                </div>
                <div className="aspect-square bg-muted rounded-sm overflow-hidden relative">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-UOgGYiAxrnlmYSUo-15EEnecPifQ8G3N8ZQctx5KcOTH6zoWjsS2fXCnSlYZrv7jQup9ExeQRk0zscziwBN2mGs5bY4fFMx3koRII9VbXsShP-mRNt0eoFrDle3qW74esmrrDBjNSokbRryP4ylNYrBcqXonGR8cUXM3Co1N5KfyDobBQXqS4QnW2RKeRdBCoZgowCjm8YJ-53RTGFaiVzZvR0QRAF1OOCbWqtWcF2XjJuIzCywnmoftAVyIHd7TExmcauLRG38" alt="Texture sample" fill className="object-cover" />
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center">
                <p className="text-xs text-muted-foreground tracking-wide">
                    © 2024 Trung Sơn Company. All rights reserved. <br />
                    Chất lượng vững bền - Kiến trúc hoàn mỹ
                </p>
            </footer>
        </div>
    </div>
  );
}
