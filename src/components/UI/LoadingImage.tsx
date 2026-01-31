"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Loader2, ImageOff } from "lucide-react";

interface LoadingImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  containerClassName?: string;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
  containerClassName = "",
  className = "",
  alt,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary rounded-md z-10">
          <Loader2 className="w-5 h-5 text-accent animate-spin" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary rounded-md z-10 gap-2">
          <ImageOff className="w-8 h-8 text-neutral" />
          <span className="text-neutral text-sm">Failed to load image</span>
        </div>
      ) : (
        <Image
          {...props}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default LoadingImage;
