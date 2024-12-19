// FileUploader.tsx
"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { ArrowUpFromLineIcon, X } from "lucide-react";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  maxFileSize?: number; // Optional max size in MB
}

const FileUploader = ({
  files,
  onChange,
  maxFileSize = 10,
}: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter(
        (file) => file.size / 1024 / 1024 <= maxFileSize // Check file size limit
      );
      onChange(filteredFiles);
    },
    [onChange, maxFileSize]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".pdf"], // Limit to certain file types
    },
  });

  return (
    <div {...getRootProps()} className="file-upload ">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <div className="uploaded-file-preview flex items-center">
          {files[0].type.startsWith("image/") ? (
            <>
              <Image
                src={convertFileToUrl(files[0])}
                alt="uploadedImg"
                className="max-h-8 w-fit py-2 overflow-hidden object-contain"
                height={30}
                width={30}
              />
              <p className="ml-2 text-sm text-muted-foreground truncate">
                {files[0].name}
              </p>
            </>
          ) : null}
          <Button
            size={"icon"}
            variant={"link"}
            className="ml-4 bg-transparent "
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
            }}
          >
            <X size={18} className="text-destructive" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-end">
          <ArrowUpFromLineIcon size={16} className="text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
