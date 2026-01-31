"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon, PreviewIcon } from '../../utils/icons'

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    shortDescription: string;
    detailedDescription?: string;
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
  const images = project.images?.length ? project.images : [project.cover];

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

  if (!isOpen) return null;

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
          <div className="flex gap-5 mb-6">
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

          <div className="pr-2">
            {description.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h3 key={index} className="text-base font-semibold text-secondary-content mt-4 mb-2">
                    {paragraph.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="text-primary-content ml-4 text-sm md:text-base">
                    {paragraph.substring(2)}
                  </li>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="text-primary-content text-sm md:text-base mb-2">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Right Side - Image Slideshow */}
        <div className="flex-1 bg-primary flex flex-col items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-0">
          <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[280px] md:max-w-[320px]">
              <Image
                src={images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 280px, 320px"
              />
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