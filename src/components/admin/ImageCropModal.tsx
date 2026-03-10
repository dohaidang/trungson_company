"use client";

import React, { useState, useRef } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Check } from "lucide-react";

interface ImageCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (file: File) => void;
  aspectRatio?: number;
}

// Helper to center the crop area by default
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropModal({ imageSrc, onClose, onCropComplete, aspectRatio = 1 }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspectRatio));
  }

  async function handleComplete() {
    if (!completedCrop || !imgRef.current) return;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const image = imgRef.current;
    // Calculate device scale to render high quality
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    ctx.imageSmoothingQuality = "high";
    
    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;
    
    ctx.drawImage(
      image,
      cropX, cropY, cropWidth, cropHeight,
      0, 0, completedCrop.width, completedCrop.height
    );
    
    // Scale down if the cropped image is still too large (e.g. max 1200px)
    let finalCanvas = canvas;
    if (canvas.width > 1200 || canvas.height > 1200) {
      const scaleCanvas = document.createElement("canvas");
      const sCtx = scaleCanvas.getContext("2d");
      const scaling = Math.min(1200 / canvas.width, 1200 / canvas.height);
      scaleCanvas.width = canvas.width * scaling;
      scaleCanvas.height = canvas.height * scaling;
      sCtx?.drawImage(canvas, 0, 0, scaleCanvas.width, scaleCanvas.height);
      finalCanvas = scaleCanvas;
    }
    
    finalCanvas.toBlob(
      (blob) => {
        if (!blob) return;
        // Output WebP for fast load times
        const file = new File([blob], "cropped-image.webp", { type: "image/webp" });
        onCropComplete(file);
      },
      "image/webp",
      0.9 // 90% quality webp is significantly smaller than jpeg while looking same
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg">Cắt và Tối Ưu Ảnh</h3>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="size-5" />
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 flex-1 flex items-center justify-center min-h-[300px] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
            className="max-h-full"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop area"
              onLoad={onImageLoad}
              className="max-w-full max-h-[60vh] object-contain shadow-sm border border-gray-200"
            />
          </ReactCrop>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between bg-white mt-auto">
          <p className="text-xs text-gray-500 hidden sm:block">Ảnh sẽ tự động nén sang WebP nhỏ gọn để SEO tốt hơn.</p>
          <div className="flex justify-end gap-3 flex-1">
             <button onClick={onClose} className="px-5 py-2.5 font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Bỏ qua ảnh này
            </button>
            <button onClick={handleComplete} disabled={!completedCrop} className="px-5 py-2.5 font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-all disabled:opacity-50">
              <Check className="size-4" /> Hoàn Tất / Tải Lên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
