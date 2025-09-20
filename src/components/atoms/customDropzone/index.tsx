import React from "react";

interface CustomDropzoneProps {
  error?: boolean;
  maxFiles?: number;
  className?: string;
  isDisabled?: boolean;
  onReject?: () => void;
  children: React.ReactNode;
  onDrop: (files: File[]) => void;
  classNames?: Partial<Record<"root" | "inner", string>>;
}

const CustomDropzone = ({
  children,
  classNames,
  isDisabled,
  onDrop,
  onReject,
  maxFiles = 0,
}: CustomDropzoneProps) => {
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    if (isDisabled) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onDrop(files);
    } else if (onReject) {
      onReject();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onDrop(files);
    } else if (onReject) {
      onReject();
    }
  };

  return (
    <label
      className={classNames?.root || classNames?.inner}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      style={{ display: "block", cursor: "pointer" }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        max={maxFiles}
        multiple={maxFiles > 0}
        disabled={isDisabled}
        onChange={handleFileSelect}
        className="hidden"
        style={{ display: "none" }}
      />
      <div>{children}</div>
    </label>
  );
};

export default CustomDropzone;
