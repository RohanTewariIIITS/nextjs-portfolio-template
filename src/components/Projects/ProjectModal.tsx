"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Loader2, ImageOff } from "lucide-react";
import { GithubIcon, PreviewIcon } from '../../utils/icons'

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    shortDescription: string;
    detailedDescription?: string;
    techStack?: string[];
    images?: string[];
    cover: string;
    livePreview?: string;
    githubLink?: string;
    type: string;
    siteAge?: string;
    ongoing?: boolean;
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
  const images = project.images?.length ? project.images : [project.cover];

  const isCurrentImageLoading = !loadedImages.has(currentImageIndex) && !errorImages.has(currentImageIndex);
  const hasCurrentImageError = errorImages.has(currentImageIndex);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Reset loaded images when modal reopens with different project
  useEffect(() => {
    if (!isOpen) {
      setLoadedImages(new Set());
      setErrorImages(new Set());
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageLoad = () => {
    setLoadedImages((prev) => new Set(prev).add(currentImageIndex));
  };

  const handleImageError = () => {
    setErrorImages((prev) => new Set(prev).add(currentImageIndex));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const description = project.detailedDescription || project.shortDescription;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-secondary border-border border rounded-[14px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-primary/80 hover:bg-primary transition-colors text-primary-content"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Left Side - Description */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-tertiary-content">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {project.type && (
              <span
                className={`h-7 w-fit rounded-md bg-[#FFFFFF1A] px-2 py-1 text-sm ${project.type === 'New 🔥' ? 'animate-blink text-tag' : 'text-accent'} backdrop-blur-[80px]`}>
                {project.type}
              </span>
            )}
            {project.ongoing && (
              <span className="h-7 w-fit rounded-md bg-[#10B98120] px-2 py-1 text-sm text-[#10B981] backdrop-blur-[80px]">
                🚧 Ongoing
              </span>
            )}
            {project.siteAge && (
              <span className="text-sm text-tertiary-content">{project.siteAge}</span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-content mb-4">
            {project.title}
          </h2>

          {/* Action Buttons */}
          <div className="flex gap-5 mb-4">
            {project.livePreview && (
              <a
                href={project.livePreview}
                className="text-accent flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PreviewIcon className="h-auto w-[18px] md:w-5" />
                <span>Live Preview</span>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                className="text-accent flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-[18px] md:w-5" />
                <span>Github Link</span>
              </a>
            )}
          </div>

          {/* Tech Stack Tags */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs md:text-sm rounded-md bg-[#FFFFFF1A] text-accent backdrop-blur-[80px] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="pr-2">
            {description.split("\n").map((paragraph, index) => {
              // Helper function to render text with highlighted keywords (backticks)
              const renderWithHighlights = (text: string) => {
                const parts = text.split(/(`[^`]+`)/g);
                return parts.map((part, i) => {
                  if (part.startsWith('`') && part.endsWith('`')) {
                    return (
                      <span key={i} className="text-accent font-medium">
                        {part.slice(1, -1)}
                      </span>
                    );
                  }
                  return part;
                });
              };

              // Check if line starts with emoji + **heading** pattern (e.g., "💻 **Tech Stack:** content")
              const headingWithContentMatch = paragraph.match(/^([^\*]*)\*\*([^*]+)\*\*(.*)$/);
              
              // Full line heading: starts with optional emoji and is fully wrapped in **
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h3 key={index} className="text-base font-bold text-secondary-content mt-5 mb-2 border-l-2 border-accent pl-3">
                    {paragraph.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              
              // Heading pattern like "🚩 **What problem it solves**" or "💻 **Tech Stack:** content"
              if (headingWithContentMatch) {
                const [, prefix, heading, rest] = headingWithContentMatch;
                // If there's content after the heading, render as paragraph with bold heading
                if (rest.trim()) {
                  return (
                    <p key={index} className="text-primary-content text-sm md:text-base mb-2 mt-5">
                      {prefix}<span className="font-bold text-secondary-content">{heading}</span>{renderWithHighlights(rest)}
                    </p>
                  );
                }
                // Otherwise it's a standalone heading
                return (
                  <h3 key={index} className="text-base font-bold text-secondary-content mt-5 mb-2 border-l-2 border-accent pl-3">
                    {prefix}{heading}
                  </h3>
                );
              }
              
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="text-primary-content ml-4 text-sm md:text-base">
                    {renderWithHighlights(paragraph.substring(2))}
                  </li>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="text-primary-content text-sm md:text-base mb-2">
                  {renderWithHighlights(paragraph)}
                </p>
              );
            })}
          </div>
        </div>

        {/* Right Side - Image Slideshow */}
        <div className="flex-1 bg-primary flex flex-col items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-0">
          <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[280px] md:max-w-[320px]">
              {/* Loading Spinner */}
              {isCurrentImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary rounded-lg z-10">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
              )}
              {/* Error State */}
              {hasCurrentImageError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary rounded-lg z-10 gap-3">
                  <ImageOff className="w-12 h-12 text-neutral" />
                  <span className="text-neutral text-sm">Failed to load image</span>
                </div>
              ) : (
                <Image
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  fill
                  className={`object-contain rounded-lg transition-opacity duration-300 ${isCurrentImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  sizes="(max-width: 768px) 280px, 320px"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </div>

            {/* Navigation Arrows - Always visible */}
            <button
              onClick={prevImage}
              disabled={images.length <= 1}
              className={`absolute left-2 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors text-secondary-content ${images.length <= 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              disabled={images.length <= 1}
              className={`absolute right-2 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors text-secondary-content ${images.length <= 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Image Counter */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-primary-content">
              {currentImageIndex + 1} / {images.length}
            </span>
          </div>

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-accent"
                      : "bg-border hover:bg-tertiary-content"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}