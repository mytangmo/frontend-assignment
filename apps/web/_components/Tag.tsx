"use client";
import React, { ReactNode } from "react";

interface TagProps {
  className?: string;
  color?: string;
  variant?: "filled" | "solid" | "outlined";
  status?: "success" | "warning" | "error" | "default";
  rounded?: boolean;
  children?: ReactNode;
  onSelect?: () => void;
  selected?: boolean;
}

const DEFAULT_TAG_STYLE = {
  default: {
    filled: "bg-black/5 text-black/60",
    solid: "bg-black text-white",
    outlined: "border border-black/20 text-black",
  },
  success: {
    filled: "bg-green-100 text-green-700",
    solid: "bg-green-600 text-white",
    outlined: "border border-green-600 text-green-700",
  },
  warning: {
    filled: "bg-yellow-100 text-yellow-700",
    solid: "bg-yellow-500 text-white",
    outlined: "border border-yellow-500 text-yellow-700",
  },
  error: {
    filled: "bg-[#FF33331A] text-[#FF3333]",
    solid: "bg-[#FF3333] text-white",
    outlined: "border border-[#FF3333] text-[#FF3333]",
  },
} as const;

export default function Tag(props: TagProps) {
  const {
    children,
    className = "",
    color,
    variant = "filled",
    status = "default",
    rounded = true,
    onSelect,
    selected = true,
  } = props;

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`
        inline-flex items-center justify-center
        px-5 py-2.5 text-sm font-normal
        transition-colors
        ${DEFAULT_TAG_STYLE[status][variant]}
        ${rounded ? "rounded-full" : "rounded"}
        ${className}
        bg-[${color}]
      `}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}
