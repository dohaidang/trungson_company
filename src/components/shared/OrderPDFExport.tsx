"use client";

import { Printer } from "lucide-react";
import { useState } from "react";

export function OrderPDFExport({ order }: { order: any }) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Trình duyệt đã chặn popup. Vui lòng cho phép popup để in phiếu.");
      setIsPrinting(false);
      return;
    }

    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td class="right">${item.unitPrice.toLocaleString('vi-VN')} đ</td>
        <td class="right"><strong>${(item.quantity * item.unitPrice).toLocaleString('vi-VN')} đ</strong></td>
      </tr>
    `).join('');

    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Phiếu Giao Hàng #${order.id.slice(0, 8).toUpperCase()}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              color: #000; 
              padding: 20px 40px; 
              max-width: 800px;
              margin: 0 auto;
              line-height: 1.5;
            }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; font-weight: 900; }
            .header p { margin: 5px 0 0; color: #333; font-size: 14px; }
            
            .invoice-title { text-align: center; margin-bottom: 30px; }
            .invoice-title h2 { margin: 0; font-size: 22px; text-transform: uppercase; }
            .invoice-title p { margin: 5px 0 0; font-style: italic; color: #555; }

            .info { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 20px; }
            .info-block { width: 48%; border: 1px solid #ccc; padding: 15px; border-radius: 4px; }
            .info-block h3 { margin: 0 0 10px; font-size: 12px; text-transform: uppercase; color: #000; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .info-block p { margin: 5px 0; font-size: 14px; }
            .info-block strong { color: #000; }

            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #000; padding: 10px 12px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 12px; }
            td.right, th.right { text-align: right; }
            
            .total-section { padding: 15px; text-align: right; font-size: 16px; border: 2px solid #000; border-top: none; }
            .total-section strong { font-size: 20px; color: #000; }

            .notes { margin-top: 20px; font-size: 13px; font-style: italic; color: #333; }

            .signatures { display: flex; justify-content: space-between; margin-top: 60px; padding: 0 20px; }
            .sig-block { text-align: center; width: 200px; }
            .sig-block h4 { margin: 0 0 5px; font-size: 14px; }
            .sig-block p { font-style: italic; font-size: 12px; color: #555; }
            .sig-area { height: 100px; }
            
            @media print {
                body { padding: 0; }
                @page { margin: 1cm; size: A4; }
            }
          </style>
        </head>
        <body onload="setTimeout(function() { window.print(); window.onafterprint = function(){ window.close() }; }, 500)">
          <div class="header">
            <h1 style="color: #ef4444;">VẬT LIỆU XÂY DỰNG TRUNG SƠN</h1>
            <p>Địa chỉ: Đường Lê Trọng Tấn, P. Dương Nội, Q. Hà Đông, Hà Nội</p>
            <p>Điện thoại: 0912 345 678 | Website: trungson.vn</p>
          </div>

          <div class="invoice-title">
            <h2>PHIẾU GIAO HÀNG</h2>
            <p>Mã đơn: #${order.id.slice(0, 8).toUpperCase()} - Ngày lập: ${dateStr}</p>
          </div>

          <div class="info">
            <div class="info-block">
              <h3>Thông Tin Khách Hàng</h3>
              <p><strong>Người nhận:</strong> ${order.customerName || 'Không có'}</p>
              <p><strong>Điện thoại:</strong> ${order.customerPhone || 'Không có'}</p>
              <p><strong>Địa chỉ giao:</strong> ${order.deliveryAddress || 'Tại cửa hàng'}</p>
            </div>
            <div class="info-block">
              <h3>Thông Tin Vận Chuyển</h3>
              <p><strong>Phương thức giao hàng:</strong> ${order.deliveryMethod === 'CRANE' ? 'Xe Cẩu chuyên dụng' : 'Bốc Tay (Xe tải)'}</p>
              <p><strong>Đường rộng:</strong> ${order.roadWidthLimit ? `${order.roadWidthLimit} mét` : 'Không giới hạn'}</p>
              <p><strong>Ghi chú đơn hàng:</strong> ${order.notes || 'Không có'}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Tên Hàng Hóa</th>
                <th width="80">Số Lượng</th>
                <th width="120" class="right">Đơn Giá</th>
                <th width="150" class="right">Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total-section">
            Cộng tiền hàng: <strong>${order.totalAmount.toLocaleString('vi-VN')} đ</strong>
          </div>

          <div class="notes">
            * Giá trên chưa bao gồm thuế VAT (10%).</br>
            * Phiếu giao hàng kiêm hóa đơn bảo hành. Quý khách vui lòng kiểm tra kỹ số lượng và chất lượng vật tư trước khi ký nhận.
          </div>

          <div class="signatures">
            <div class="sig-block">
              <h4>Người Nhận Hàng</h4>
              <p>(Ký, ghi rõ họ tên)</p>
              <div class="sig-area"></div>
              <p style="font-style: normal; font-weight: bold; border-top: 1px dotted #ccc; padding-top: 10px;">${order.customerName || ''}</p>
            </div>
            <div class="sig-block">
              <h4>Người Giao Hàng</h4>
              <p>(Ký, ghi rõ họ tên)</p>
              <div class="sig-area"></div>
            </div>
            <div class="sig-block">
              <h4>Người Lập Phiếu</h4>
              <p>(Ký, đóng dấu)</p>
              <div class="sig-area"></div>
              <p style="font-style: normal; font-weight: bold; border-top: 1px dotted #ccc; padding-top: 10px;">TRUNG SƠN</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    // reset loading after a short time
    setTimeout(() => setIsPrinting(false), 1000);
  };

  return (
    <button 
      onClick={handlePrint} 
      disabled={isPrinting}
      className="flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 rounded font-bold hover:bg-primary/5 transition-colors disabled:opacity-50"
    >
      <Printer className="size-4" /> 
      {isPrinting ? "Đang tạo phiếu..." : "In Phiếu Giao"}
    </button>
  );
}
