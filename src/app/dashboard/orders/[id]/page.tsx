import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, MapPin, Phone, User, FileText, Download } from 'lucide-react';
import type { Metadata } from 'next';
import { OrderPDFExport } from '@/components/shared/OrderPDFExport';

export const metadata: Metadata = {
  title: 'Chi Tiết Đơn Hàng | Trung Sơn',
  description: 'Theo dõi hành trình và chi tiết đơn hàng của bạn.',
};

export default async function OrderTrackingPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  const { id } = await params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: { select: { name: true, slug: true } }
        }
      },
      deliveries: {
        orderBy: { scheduledDate: 'asc' }
      }
    }
  });

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <Package className="size-16 text-muted-foreground mb-4 opacity-50" />
        <h1 className="text-2xl font-black mb-2">Không tìm thấy đơn hàng</h1>
        <p className="text-muted-foreground mb-6">Đơn hàng bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>
        <Link href="/dashboard" className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold hover:bg-primary/90 transition-colors">
          Quay lại Dashboard
        </Link>
      </div>
    );
  }

  if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-black mb-2 text-red-500">Truy cập bị từ chối</h1>
        <p className="text-muted-foreground mb-6">Bạn không có quyền xem đơn hàng này.</p>
        <Link href="/dashboard" className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold hover:bg-primary/90 transition-colors">
          Quay lại Dashboard
        </Link>
      </div>
    );
  }

  const STEPS = [
    { key: 'PENDING', label: 'Chờ xử lý', icon: Clock },
    { key: 'CONFIRMED', label: 'Xác nhận', icon: CheckCircle2 },
    { key: 'DELIVERING', label: 'Đang giao', icon: Truck },
    { key: 'COMPLETED', label: 'Hoành thành', icon: CheckCircle2 },
  ];

  const currentStepIndex = STEPS.findIndex(s => s.key === order.status);
  // Nếu là CANCELLED thì show layout khác
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/dashboard" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors mb-3">
              <ArrowLeft className="size-4" /> Quay lại danh sách
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              Chi Tiết Đơn <span className="text-primary">#{order.id.slice(0, 8).toUpperCase()}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Đặt ngày {order.createdAt.toLocaleDateString('vi-VN')} {order.createdAt.toLocaleTimeString('vi-VN')}</p>
          </div>
          
          <OrderPDFExport order={order as any} />
        </div>

        {/* Timeline */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-6 shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-tight mb-8">Trạng Thái Đơn Hàng</h2>
          
          {isCancelled ? (
            <div className="bg-red-50 text-red-700 p-4 border border-red-200 rounded-lg flex items-center gap-3">
              <span className="font-bold flex items-center gap-2"><CheckCircle2 className="size-5" /> Đã Hủy</span>
              <span className="text-sm">Đơn hàng này đã bị hủy.</span>
            </div>
          ) : (
            <div className="relative">
              {/* Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full hidden sm:block"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full hidden sm:block transition-all duration-500" 
                style={{ width: `${Math.max(0, currentStepIndex) * (100 / (STEPS.length - 1))}%` }}
              ></div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0 relative z-10">
                {STEPS.map((step, index) => {
                  const isActive = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const StepIcon = step.icon;
                  
                  return (
                    <div key={step.key} className="flex sm:flex-col items-center gap-4 sm:gap-2 text-left sm:text-center w-full sm:w-24">
                      {/* Line for mobile */}
                      {index !== STEPS.length - 1 && (
                        <div className={`absolute ml-5 sm:hidden h-full w-0.5 mt-8 ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}`}></div>
                      )}
                      
                      <div className={`flex items-center justify-center size-10 sm:size-12 rounded-full border-2 transition-all duration-300 shadow-sm shrink-0 bg-card ${
                        isActive ? 'border-primary text-primary shadow-primary/20' : 'border-muted-foreground/30 text-muted-foreground'
                      } ${isCurrent ? 'ring-4 ring-primary/10' : ''}`}>
                        <StepIcon className="size-5" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {isCurrent && index === 1 && <p className="text-[10px] text-primary mt-0.5">Sắp được giao</p>}
                        {isCurrent && index === 2 && <p className="text-[10px] text-primary mt-0.5">Tài xế đang tới</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Delivery Batch Info (If Delivering) */}
          {order.deliveries && order.deliveries.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Lịch Trình Vận Chuyển</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.deliveries.map((delivery) => (
                  <div key={delivery.id} className="bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-primary flex items-center gap-2">
                        <Truck className="size-4" /> Chuyến xe #{delivery.id.slice(0, 4)}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{delivery.status}</span>
                    </div>
                    <p className="text-xs text-foreground mb-1">
                      <span className="text-muted-foreground">Tài xế:</span> {delivery.driverName || 'Chưa cập nhật'}
                    </p>
                    <p className="text-xs text-foreground mb-1">
                      <span className="text-muted-foreground">Biển số:</span> <span className="font-mono">{delivery.vehiclePlate || '...'}</span>
                    </p>
                    <p className="text-xs text-foreground">
                      <span className="text-muted-foreground">Dự kiến giao:</span> {delivery.scheduledDate ? delivery.scheduledDate.toLocaleDateString('vi-VN') : 'Sắp xếp sau'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Info */}
          <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6">Mặt Hàng</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Sản Phẩm</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">SL</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Đơn Giá</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Thành Tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 text-sm font-bold text-foreground">
                        {item.product.name}
                      </td>
                      <td className="py-4 text-sm font-medium">{item.quantity}</td>
                      <td className="py-4 text-sm text-muted-foreground text-right">{item.unitPrice.toLocaleString()}đ</td>
                      <td className="py-4 text-sm font-bold text-primary text-right">{(item.quantity * item.unitPrice).toLocaleString()}đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col items-end gap-2 border-t border-border pt-4">
              <div className="flex justify-between w-full sm:w-64 text-sm text-muted-foreground">
                <span>Tạm tính</span>
                <span>{order.totalAmount.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between w-full sm:w-64 text-sm font-bold text-foreground mt-2">
                <span>Tổng Cộng</span>
                <span className="text-lg text-primary">{order.totalAmount.toLocaleString()}đ</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-border pb-3">Thông Tin Người Nhận</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Họ & Tên</p>
                    <p className="text-sm font-medium text-foreground">{order.customerName || 'Không có'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Số điện thoại</p>
                    <p className="text-sm font-medium text-foreground">{order.customerPhone || 'Không có'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Địa chỉ giao hàng</p>
                    <p className="text-sm font-medium text-foreground">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-border pb-3">Ghi Chú & Yêu Cầu</h2>
              <div className="flex items-start gap-3 mb-4">
                <Truck className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Phương thức</p>
                  <p className="text-sm font-bold text-foreground bg-primary/10 text-primary uppercase text-[10px] tracking-wider px-2 py-0.5 inline-block rounded mt-1">
                    {order.deliveryMethod === 'CRANE' ? 'Xe Cẩu' : 'Bốc Tay'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Ghi chú từ khách hàng</p>
                  <p className="text-sm italic text-foreground bg-muted p-3 rounded-md mt-2 border border-border/50">
                    {order.notes ? `"${order.notes}"` : 'Không có ghi chú.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
