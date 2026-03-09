"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/app/actions/product";

// Hooks Custom - debounce
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    
    const router = useRouter();
    const searchRef = useRef<HTMLFormElement>(null);
    const debouncedQuery = useDebounce(query, 400);

    // Kích hoạt gọi API khi query debounce thay đổi
    useEffect(() => {
        if (debouncedQuery.trim().length === 0) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        const fetchResults = async () => {
            setIsLoading(true);
            try {
                // Fetch trực tiếp bằng server action (chỉ lấy 5 item gợi ý)
                const res = await getProducts({ query: debouncedQuery.trim(), limit: 5 });
                if (res.products) {
                    setResults(res.products);
                }
            } catch (err) {
                console.error("Lỗi tìm kiếm:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Handle click ra ngoài component để tắt dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Xử lý nộp form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsFocused(false);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    // Hàm lấy ảnh bìa đầu tiên
    const getCoverImage = (imagesStr: string | null) => {
        if (!imagesStr) return "/assets/images/placeholder.svg";
        try {
            const arr = JSON.parse(imagesStr);
            return arr && arr.length > 0 ? arr[0] : "/assets/images/placeholder.svg";
        } catch {
            return "/assets/images/placeholder.svg";
        }
    };

    return (
        <form 
            ref={searchRef}
            onSubmit={handleSubmit} 
            className="relative w-full max-w-sm hidden md:block" // Tạm ẩn trên mobile để giữ thiết kế đơn giản
        >
            <div className="relative group text-slate-700">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                
                <input
                    type="text"
                    placeholder="Tìm gạch block, bê tông..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-100 hover:bg-slate-200 focus:bg-white border focus:border-blue-500 rounded-full text-sm outline-none transition-all shadow-sm focus:shadow-md"
                />

                {/* Nút X xoá query */}
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            searchRef.current?.querySelector("input")?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Kết Quả */}
            {isFocused && query.trim() !== "" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Trạng thái Loading */}
                    {isLoading && (
                        <div className="p-4 flex items-center justify-center text-slate-500 space-x-2">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                            <span className="text-sm font-medium">Đang tìm kiếm...</span>
                        </div>
                    )}

                    {/* Trạng thái rỗng */}
                    {!isLoading && results.length === 0 && query.trim() !== "" && (
                        <div className="p-6 text-center text-slate-500">
                            <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium">Không tìm thấy "{query}"</p>
                            <p className="text-xs mt-1 text-slate-400">Vui lòng thử lại với từ khóa khác</p>
                        </div>
                    )}

                    {/* Danh sách gợi ý */}
                    {!isLoading && results.length > 0 && (
                        <div className="py-2">
                            <div className="px-4 pb-2 mb-2 border-b border-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Sản phẩm ({results.length})
                            </div>
                            
                            <ul>
                                {results.map((product) => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/products/${product.slug}`}
                                            onClick={() => setIsFocused(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 transition-colors"
                                        >
                                            <div className="h-10 w-10 shrink-0 relative rounded overflow-hidden bg-slate-100 border border-slate-200">
                                                <Image
                                                    src={getCoverImage(product.images)}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="40px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-slate-900 truncate">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-slate-500 truncate flex items-center gap-2 mt-0.5">
                                                    {product.category?.name && (
                                                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600">
                                                            {product.category.name}
                                                        </span>
                                                    )}
                                                    {product.priceTiers?.[0]?.unitPrice ? (
                                                        <span className="text-slate-600 font-medium">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.priceTiers[0].unitPrice)}
                                                        </span>
                                                    ) : "Liên hệ"}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Nút xem tất cả */}
                            <div className="border-t border-slate-100 p-2 mt-1">
                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 text-sm font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    Xem tất cả kết quả cho "{query}"
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </form>
    );
}
