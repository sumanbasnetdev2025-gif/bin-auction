"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({ value, onChange, maxFiles = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (value.length + acceptedFiles.length > maxFiles) {
        toast.error(`You can upload a maximum of ${maxFiles} images`);
        return;
      }

      setUploading(true);
      const newUrls: string[] = [];

      try {
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Upload failed");
          newUrls.push(data.url);
        }

        onChange([...value, ...newUrls]);
        toast.success(`${newUrls.length} image(s) uploaded`);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading || value.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30",
          (uploading || value.length >= maxFiles) && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm font-medium">
              {isDragActive ? "Drop images here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WEBP up to 5MB — max {maxFiles} images
            </p>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {value.map((url, i) => (
            <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-secondary">
              <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              {i === 0 && (
                <div className="absolute bottom-1 left-1">
                  <span className="text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded font-medium">
                    Main
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {value.length}/{maxFiles} images • First image is the main listing photo
      </p>
    </div>
  );
}