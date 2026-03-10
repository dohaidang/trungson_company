"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = images.map(src => ({ src }));

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div 
        className="w-full aspect-[4/3] bg-muted rounded-xl overflow-hidden relative border border-border group cursor-zoom-in"
        onClick={() => openLightbox(images.indexOf(selectedImage))}
      >
        <Image
          src={selectedImage}
          alt="Product Image"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105 origin-center"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-foreground pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Click để xem trọn bộ
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-24 aspect-square rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${
              selectedImage === img
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-primary/50"
            }`}
          >
            <div className="w-full h-full relative">
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
      />
    </div>
  );
}
