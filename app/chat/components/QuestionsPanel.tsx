"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";

interface Option {
  id: string;
  label: string;
  description: string;
}

const options: Option[] = [
  {
    id: "a",
    label: "Developer",
    description:
      "I write code professionally or have significant coding experience",
  },
  {
    id: "b",
    label: "Aspiring Developer",
    description: "I'm learning to code or studying software development",
  },
  {
    id: "c",
    label: "Dev-Adjacent",
    description:
      "I work closely with developers (Designer, PM, QA, Data Analyst)",
  },
];

export function QuestionsPanel() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-dark-muted" />
          <span className="text-sm font-medium text-dark-text">Questions</span>
        </div>
        <div className="flex items-center gap-1 text-dark-muted">
          <button className="p-1 hover:bg-dark-hover rounded transition-colors">
            <ChevronUp className="w-4 h-4" />
          </button>
          <span className="text-sm">1 of 1</span>
          <button className="p-1 hover:bg-dark-hover rounded transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-4 space-y-4">
        <p className="text-sm font-medium text-dark-text">
          1. Which best describes your role?
        </p>

        {/* Options */}
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                selectedOption === option.id
                  ? "border-dark-accent bg-dark-accent/10"
                  : "border-dark-border hover:border-dark-hover hover:bg-dark-hover/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-medium text-dark-muted uppercase mt-0.5">
                  {option.id}
                </span>
                <div>
                  <span className="text-sm font-medium text-dark-text">
                    {option.label}
                  </span>
                  <span className="text-sm text-dark-muted">
                    {" "}
                    — {option.description}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button className="px-4 py-2 text-sm text-dark-muted hover:text-dark-text transition-colors">
            Skip
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedOption
                ? "bg-dark-accent text-white hover:bg-dark-accent/90"
                : "bg-dark-hover text-dark-muted cursor-not-allowed"
            }`}
            disabled={!selectedOption}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
