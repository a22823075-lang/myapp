import React, { useState, ImgHTMLAttributes } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  className, 
  fallbackSrc = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  ...props 
 }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    setImgSrc(src);
    setErrorCount(0);
    setLoading(true);
  }, [src]);

  // Check if image is already loaded (from cache)
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setLoading(false);
    }
  }, [imgSrc]);

  const handleError = () => {
    if (errorCount === 0) {
      setImgSrc(fallbackSrc);
      setErrorCount(1);
    } else {
      setErrorCount(2);
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (errorCount === 2) {
    return (
      <div className={`bg-slate-100 flex flex-col items-center justify-center p-6 text-center text-slate-400 ${className}`}>
        <div className="w-12 h-12 mb-2 bg-slate-200 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest leading-none bg-white px-2 py-1 rounded shadow-sm">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-slate-50 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-brand rounded-full animate-spin" />
        </div>
      )}
      <img 
        ref={imgRef}
        key={imgSrc}
        src={imgSrc} 
        alt={alt} 
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        referrerPolicy="no-referrer"
        {...props} 
      />
    </div>
  );
}
