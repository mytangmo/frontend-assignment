"use client";

import { type ReactNode, useId, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

type CollapseProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Collapse({
  title,
  children,
  defaultOpen = true,
  className = "",
}: CollapseProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section
      className={`border-b border-black/10 py-2 md:py-5 ${className}`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="text-xl font-bold">{title}</span>

        <FiChevronUp
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>

      <div
        id={contentId}
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen
            ? "mt-2 grid-rows-[1fr] opacity-100 md:mt-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
