"use client";

import {
  AtSign,
  Grid3X3,
  Image,
  Mic,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

export function InputBar() {
  return (
    <div className="border-t border-dark-border bg-dark-bg p-4">
      {/* Input Area */}
      <div className="bg-dark-card border border-dark-border rounded-xl">
        <input
          type="text"
          placeholder="Add more optional details"
          className="w-full bg-transparent px-4 py-3 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none"
        />

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-dark-border">
          <div className="flex items-center gap-2">
            {/* Guide Badge */}
            <button className="flex items-center gap-1.5 px-2 py-1 bg-dark-accent/20 text-dark-accent rounded-md text-sm font-medium hover:bg-dark-accent/30 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              Guide
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Composer Dropdown */}
            <button className="flex items-center gap-1 px-2 py-1 text-dark-muted hover:text-dark-text text-sm transition-colors">
              Composer
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-dark-muted hover:text-dark-text hover:bg-dark-hover rounded-lg transition-colors">
              <AtSign className="w-4 h-4" />
            </button>
            <button className="p-2 text-dark-muted hover:text-dark-text hover:bg-dark-hover rounded-lg transition-colors">
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button className="p-2 text-dark-muted hover:text-dark-text hover:bg-dark-hover rounded-lg transition-colors">
              <Image className="w-4 h-4" />
            </button>
            <button className="p-2 text-dark-muted hover:text-dark-text hover:bg-dark-hover rounded-lg transition-colors">
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
