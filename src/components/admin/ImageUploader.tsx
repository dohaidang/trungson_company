"use client";

import { useState } from "react";
import { UploadCloud, GripVertical, Trash2, Loader2, ImagePlus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImageCropModal } from "./ImageCropModal";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

function SortableImageItem({ url, index, onRemove }: { url: string; index: number; onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center h-20 p-2 gap-3 hover:border-primary/50 transition-colors shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-2 text-gray-400 hover:text-gray-900 transition-colors touch-none"
      >
        <GripVertical className="size-5" />
      </div>
      
      <div className="h-14 w-14 bg-gray-100 rounded overflow-hidden shrink-0 relative border border-gray-200">
        <Image src={url} alt="product img" fill sizes="56px" className="object-cover" />
        {index === 0 && (
          <div className="absolute top-0 left-0 right-0 bg-primary/90 backdrop-blur-sm text-white text-[9px] font-black text-center py-0.5 z-10 shadow-sm uppercase tracking-wider">
            Chính
          </div>
        )}
      </div>

      <div className="flex-1 truncate text-xs text-gray-600 font-medium">
        <a href={url} target="_blank" rel="noreferrer" className="hover:underline hover:text-primary transition-colors">
          {url.split('/').pop()?.slice(0, 40) || url}
        </a>
      </div>

      <button
        type="button"
        onClick={(e) => {
           e.preventDefault();
           onRemove();
        }}
        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors mr-1"
        title="Xóa hình này"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileQueue, setFileQueue] = useState<{file: File, url: string}[]>([]);
  const [currentCropIndex, setCurrentCropIndex] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.indexOf(active.id as string);
      const newIndex = images.indexOf(over.id as string);
      onChange(arrayMove(images, oldIndex, newIndex));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newQueue = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setFileQueue(newQueue);
    setCurrentCropIndex(0);
    e.target.value = "";
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  };

  const handleCropComplete = async (croppedFile: File) => {
    try {
      setIsUploading(true);
      const data = await uploadFile(croppedFile);
      if (data.urls && data.urls.length > 0) {
        onChange([...images, data.urls[0]]);
      }
    } catch (e) {
      alert("Lỗi tải ảnh lên S3. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
      // Next file or clear queue
      if (currentCropIndex < fileQueue.length - 1) {
        setCurrentCropIndex(prev => prev + 1);
      } else {
        fileQueue.forEach(f => URL.revokeObjectURL(f.url));
        setFileQueue([]);
      }
    }
  };

  const handleCancelCrop = () => {
    if (currentCropIndex < fileQueue.length - 1) {
      setCurrentCropIndex(prev => prev + 1);
    } else {
      fileQueue.forEach(f => URL.revokeObjectURL(f.url));
      setFileQueue([]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {fileQueue.length > 0 && currentCropIndex < fileQueue.length && (
        <ImageCropModal 
          imageSrc={fileQueue[currentCropIndex].url}
          onCropComplete={handleCropComplete}
          onClose={handleCancelCrop}
          aspectRatio={1} // Ảnh vuông (tỷ lệ 1:1) tiêu chuẩn e-commerce
        />
      )}

      {/* Dnd List */}
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-500 mb-1">Thứ tự hiển thị (Ảnh đầu tiên là Thumbnail)</h3>
            <SortableContext items={images} strategy={verticalListSortingStrategy}>
              {images.map((url, i) => (
                <SortableImageItem 
                  key={url} 
                  url={url} 
                  index={i} 
                  onRemove={() => onChange(images.filter((img) => img !== url))} 
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}

      {/* Upload button area */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 p-8 hover:bg-gray-50 hover:border-primary hover:shadow-inner transition-all relative overflow-hidden group">
         <input
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          disabled={isUploading || fileQueue.length > 0}
        />
        <div className={`flex items-center justify-center size-14 rounded-full mb-3 transition-colors ${fileQueue.length > 0 ? 'bg-orange-100 text-orange-500' : 'bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20'}`}>
          {isUploading ? <Loader2 className="size-6 animate-spin" /> : (fileQueue.length > 0 ? <ImagePlus className="size-6" /> : <UploadCloud className="size-6" />)}
        </div>
        <p className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">
          {fileQueue.length > 0 ? `Đang xử lý ${currentCropIndex + 1}/${fileQueue.length}...` : "Kéo thả ảnh vào đây, hoặc click để chọn"}
        </p>
        <p className="text-xs text-gray-500 mt-1 max-w-sm text-center">
          Hệ thống sẽ tự động bật cửa sổ Cắt Ảnh (Crop) và tối ưu độ phân giải trước khi tải lên.
        </p>
      </div>

    </div>
  );
}
