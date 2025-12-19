"use client";

import { X, MoreHorizontal } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
}

export function ChatHeader({
  title,
  subtitle = "Now · Composer",
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
      <div>
        <h1 className="text-lg font-semibold text-dark-text">{title}</h1>
        <p className="text-sm text-dark-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-dark-muted hover:text-dark-text hover:bg-dark-hover rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
        <button className="p-2 text-dark-muted hover:text-dark-text hover:bg-dark-hover rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
