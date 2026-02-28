// Shared project data for /projects listing and /projects/[id] detail page

export interface Project {
    id: string;
    title: string;
    location: string;
    category: string;
    year: string;
    client: string;
    area: string;
    description: string;
    longDescription: string;
    materials: string[];
    images: string[];
}

export const PROJECT_CATEGORIES = [
    "Tất cả",
    "Nhà ở",
    "Thương mại",
    "Công nghiệp",
    "Hạ tầng",
];

export const PROJECTS_DATA: Project[] = [
    {
        id: "biet-thu-villa-park",
        title: "Biệt Thự Villa Park",
        location: "Quận 9, TP.HCM",
        category: "Nhà ở",
        year: "2024",
        client: "Công ty CP Đầu tư Villa Park",
        area: "12,000 m²",
        description: "Cung cấp toàn bộ gạch tuynel và gạch ốp trang trí cho khu biệt thự cao cấp 48 căn.",
        longDescription: "Dự án Villa Park là khu biệt thự cao cấp gồm 48 căn biệt thự liền kề và biệt thự đơn lập tại Quận 9, TP.HCM. CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN đã được tin tưởng cung cấp toàn bộ vật liệu xây dựng chính bao gồm gạch tuynel chịu lực, gạch block cách nhiệt và gạch ốp trang trí mặt tiền. Quá trình cung cấp kéo dài 18 tháng với cam kết giao hàng đúng tiến độ từng giai đoạn.",
        materials: ["Gạch Tuynel Tiêu Chuẩn", "Gạch Block 4 Lỗ", "Gạch Ốp Tường Xám Đá", "Gạch Đỏ Đặc"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBOkOJMeXYpJ0f4HbwY7XwdaV1MHUpX0i9poi5ObN_p7Jl7XDVT8OxVOhO7QSsi7BBNM2ggQEJYH4S69HwudQk9KL2qezdCfXZp7vAHkCevvWQamiCjtHArq8O4gTffvZN-3tWcsujN6STEiAi7NZnG73cVf3_DmGaQ4AJD4ihfUgxxGdNt2N_jDWBw4k1aF6yHJZUhuaPlyiKbA9Q20DOioiXmCUluvz9ArqicUBknkLhUT6ktJV3onII0nnFLaA31JIEle2COzU8",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuABtXUghu4tcdwVOcH6OYPQ_x9U1GaAyBuIshZOxcyVRyQWcxP4W3OatnhE1k86TVBwbdgKV0iGQxjIVBPcmrvjCzOh0IcgTqClN1i8jJ6wTxbouFePUOZmCcb9Ut-D4r80-2KfW40fZ2rH--AuY7jbbz_K6aP1D_VCk2I-rkNdZQyX6v4jzFUlM5d0YrRFg5blfz_chvyxgQ-xkn3GrhWGqsGPhaIAveXQub8qrsu-91ZCbkoaVX3Zi4XPKdidVUYthdmJWwV4NiM",
        ],
    },
    {
        id: "trung-tam-thuong-mai-golden",
        title: "TTTM Golden Plaza",
        location: "Biên Hòa, Đồng Nai",
        category: "Thương mại",
        year: "2023",
        client: "Golden Group JSC",
        area: "25,000 m²",
        description: "Cung cấp gạch chịu lực và gạch block cách nhiệt cho trung tâm thương mại 5 tầng.",
        longDescription: "Golden Plaza là trung tâm thương mại hiện đại 5 tầng tại trung tâm TP Biên Hòa. Với diện tích sàn 25.000 m², dự án yêu cầu khối lượng gạch lớn và tiêu chuẩn kỹ thuật cao. Trung Sơn đã phối hợp chặt chẽ với đội ngũ thi công để lập kế hoạch giao hàng theo từng tầng, đảm bảo tiến độ xây dựng không bị gián đoạn.",
        materials: ["Gạch Đỏ Đặc", "Gạch Block 4 Lỗ", "Gạch Chịu Lửa"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCO0OQZf20MUW5Ykml8xG4wqM5IzUcZVeolrMnht2HQETk_YnyckuY-R8L_AO-5VKYtLmR7_J488gxit_FbqqFzvlywfql9CMAu270UO_wNhvnO5xQxjwF22IMF6mNdm5q01KTlqsHXzuXOSZB0ZBITf-TwWNiTBhxwToQAxQoqV3Qb5L1hLUeuo3qP1J0xew2SnHfvhcWW6zqLWP5EG7a8s2txqrRqEcpQD_AzQR0K7X_r8-Og7jgltZ0WPb0-xXBmJseRbKDWINc",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBHIHMqYWbnt4OZL7QXikC8Nc4KgurzSpfK7vytzWQSn-PJ0QBcqvS9fRmHvW_x-TxN0Si5JxdawmXT_h_uhsEqiQUVdRZ0q2ZONot6we0cThXPrq1UA40j2KMIguSLP2_YvpBOzoKO03zT_6cGads3KmZJNts5QOJO63VbaM5E2zSTW1V1Hp719QKuE2eOf9piETZj7n_JwTr61YbgFHmm-dhNFilaCJdNVGYhm-NEQ9LoTW37d1pxlV7PJZljq974woHa1vCD3Po",
        ],
    },
    {
        id: "nha-may-tan-phu",
        title: "Nhà Máy Tân Phú Industrial",
        location: "KCN Tân Phú, Bình Dương",
        category: "Công nghiệp",
        year: "2023",
        client: "Tân Phú Industrial Co., Ltd",
        area: "40,000 m²",
        description: "Cung cấp gạch chịu nhiệt và gạch block cho nhà xưởng sản xuất quy mô lớn.",
        longDescription: "Nhà máy Tân Phú Industrial là công trình công nghiệp quy mô lớn tại KCN Tân Phú, Bình Dương. Dự án đặc biệt yêu cầu gạch chịu nhiệt chuyên dụng cho khu vực lò nung và gạch block chịu lực cho tường bao. Trung Sơn đã cung cấp giải pháp vật liệu toàn diện, bao gồm tư vấn kỹ thuật và giao hàng trực tiếp vào công trường.",
        materials: ["Gạch Chịu Lửa", "Gạch Block 4 Lỗ", "Gạch Đỏ Đặc"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAhEgoMjZX7Mo0rML9SJaOP1L5ffQehnCih6QbGB8lT7tpjbVNEyG7e7FtYM1v73b27_3sIXLxzgJb0mLs5vCbbEetu85B3VblcPeQX4QVJsnQpLArlil7jE6NzTwYohiJ1dT7ZGJ-qfPOVZ9WuxTUfnqqz2xhwCuxUAbc_o3xNws80HN2TEktFKK9uyksxKTJHccIznzjuAMqFK7Aw5xWqDteLwf9qAjREAF2qvRYK96gE0JtHnAecQz0LXcN1sZKHnbiHxEN3jUE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCbAP2lKJ7BC25G14XiZSsAp5ooblqYdTqq-zLA4_PHWPutdZ18C923BLZA25Hl3fmkYnjVCa4B18xlEQsTjLzacK_wcBjmetjGT-LK-pP2YO6gApfJtPzYBjtRRklBOnnobtkfHhZi91GnIH6G97SMnCkZYD4JST3cFi3iGzIStC8aJo0HDJux-oojR_8g50spmxKhXX4NYl6Tm7sysT3e6GpkiJL_uANFqFAJiltVNSRqxWj_zSTjJIYuZNM898Mi4JFd2eZRD8Y",
        ],
    },
    {
        id: "khu-dan-cu-sunrise",
        title: "Khu Dân Cư Sunrise City",
        location: "Thuận An, Bình Dương",
        category: "Nhà ở",
        year: "2024",
        client: "Sunrise Land JSC",
        area: "18,000 m²",
        description: "Cung cấp gạch xây dựng cho 120 căn nhà phố trong khu dân cư hiện đại.",
        longDescription: "Sunrise City là khu dân cư kiểu mẫu với 120 căn nhà phố liền kề và 20 căn biệt thự tại Thuận An, Bình Dương. Trung Sơn đã đồng hành cùng chủ đầu tư từ giai đoạn thiết kế, tư vấn lựa chọn vật liệu phù hợp với từng hạng mục. Đặc biệt, dòng gạch ốp tường exposed brick được sử dụng cho mặt tiền tạo nét kiến trúc độc đáo.",
        materials: ["Gạch Tuynel Tiêu Chuẩn", "Gạch Ốp Cổ Điển", "Gạch Lát Sân"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDxo67PKv-6HkxMgn9ATIwRy2E52t6cjqiAzhf9nniA_dNkwgPlfCBHDnIop5MPHhHF8wYSIOKtFp0RXnftERFlvGo6A7_Nd8PZlsngS2lh582ZpisFiAfrXYocxfQVO_cWC4d8tzj-i-e1xDVVxkkU-xpu7sWPtL5Vt7tF21oL7ohCUU9OuYvSmaly5rGAaPyNTNdwUuZQ-jBKN4KQFcDXl4btE7ZXRW7GhQGOnMaORdbKO4NirjUKaDyHqCIfyCZw9tQHFufvmJw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBOkOJMeXYpJ0f4HbwY7XwdaV1MHUpX0i9poi5ObN_p7Jl7XDVT8OxVOhO7QSsi7BBNM2ggQEJYH4S69HwudQk9KL2qezdCfXZp7vAHkCevvWQamiCjtHArq8O4gTffvZN-3tWcsujN6STEiAi7NZnG73cVf3_DmGaQ4AJD4ihfUgxxGdNt2N_jDWBw4k1aF6yHJZUhuaPlyiKbA9Q20DOioiXmCUluvz9ArqicUBknkLhUT6ktJV3onII0nnFLaA31JIEle2COzU8",
        ],
    },
    {
        id: "cau-duong-quoc-lo",
        title: "Dự Án Đường Quốc Lộ 1K",
        location: "Dĩ An, Bình Dương",
        category: "Hạ tầng",
        year: "2022",
        client: "Ban QLDA Giao Thông Bình Dương",
        area: "8,500 m²",
        description: "Cung cấp gạch vỉa hè và gạch lát sân cho dự án hạ tầng đô thị.",
        longDescription: "Dự án nâng cấp mở rộng Quốc Lộ 1K đoạn qua TP Dĩ An, Bình Dương bao gồm lát vỉa hè, bồn hoa và khu vực đi bộ. Trung Sơn đã cung cấp gạch vỉa hè chuyên dụng chịu lực tốt, chống trơn trượt và gạch lát sân tông màu đất nung hài hòa với cảnh quan đô thị. Sản phẩm đạt tiêu chuẩn TCVN cho công trình giao thông.",
        materials: ["Gạch Vỉa Hè", "Gạch Lát Sân"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuABtXUghu4tcdwVOcH6OYPQ_x9U1GaAyBuIshZOxcyVRyQWcxP4W3OatnhE1k86TVBwbdgKV0iGQxjIVBPcmrvjCzOh0IcgTqClN1i8jJ6wTxbouFePUOZmCcb9Ut-D4r80-2KfW40fZ2rH--AuY7jbbz_K6aP1D_VCk2I-rkNdZQyX6v4jzFUlM5d0YrRFg5blfz_chvyxgQ-xkn3GrhWGqsGPhaIAveXQub8qrsu-91ZCbkoaVX3Zi4XPKdidVUYthdmJWwV4NiM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCO0OQZf20MUW5Ykml8xG4wqM5IzUcZVeolrMnht2HQETk_YnyckuY-R8L_AO-5VKYtLmR7_J488gxit_FbqqFzvlywfql9CMAu270UO_wNhvnO5xQxjwF22IMF6mNdm5q01KTlqsHXzuXOSZB0ZBITf-TwWNiTBhxwToQAxQoqV3Qb5L1hLUeuo3qP1J0xew2SnHfvhcWW6zqLWP5EG7a8s2txqrRqEcpQD_AzQR0K7X_r8-Og7jgltZ0WPb0-xXBmJseRbKDWINc",
        ],
    },
    {
        id: "resort-cam-ranh",
        title: "Cam Ranh Bay Resort",
        location: "Cam Ranh, Khánh Hòa",
        category: "Thương mại",
        year: "2024",
        client: "Cam Ranh Bay Hospitality",
        area: "35,000 m²",
        description: "Cung cấp gạch ốp cổ điển và gạch lát sân cho resort 5 sao ven biển.",
        longDescription: "Cam Ranh Bay Resort là dự án nghỉ dưỡng 5 sao ven biển Cam Ranh. Yêu cầu thiết kế sử dụng vật liệu mang phong cách tropical hiện đại. Trung Sơn đã cung cấp dòng gạch ốp cổ điển exposed brick cho các villa, gạch lát sân đất nung cho khu vực hồ bơi và lối đi, tạo nên không gian ấm cúng hòa quyện với thiên nhiên.",
        materials: ["Gạch Ốp Cổ Điển", "Gạch Lát Sân", "Gạch Ốp Tường Xám Đá"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBHIHMqYWbnt4OZL7QXikC8Nc4KgurzSpfK7vytzWQSn-PJ0QBcqvS9fRmHvW_x-TxN0Si5JxdawmXT_h_uhsEqiQUVdRZ0q2ZONot6we0cThXPrq1UA40j2KMIguSLP2_YvpBOzoKO03zT_6cGads3KmZJNts5QOJO63VbaM5E2zSTW1V1Hp719QKuE2eOf9piETZj7n_JwTr61YbgFHmm-dhNFilaCJdNVGYhm-NEQ9LoTW37d1pxlV7PJZljq974woHa1vCD3Po",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDxo67PKv-6HkxMgn9ATIwRy2E52t6cjqiAzhf9nniA_dNkwgPlfCBHDnIop5MPHhHF8wYSIOKtFp0RXnftERFlvGo6A7_Nd8PZlsngS2lh582ZpisFiAfrXYocxfQVO_cWC4d8tzj-i-e1xDVVxkkU-xpu7sWPtL5Vt7tF21oL7ohCUU9OuYvSmaly5rGAaPyNTNdwUuZQ-jBKN4KQFcDXl4btE7ZXRW7GhQGOnMaORdbKO4NirjUKaDyHqCIfyCZw9tQHFufvmJw",
        ],
    },
];
