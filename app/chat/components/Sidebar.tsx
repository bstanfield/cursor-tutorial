"use client";

import { Search, Plus, MessageSquare } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  isSelected: boolean;
}

const agents: Agent[] = [{ id: "1", name: "Tour guide", isSelected: true }];

export function Sidebar() {
  return (
    <div className="w-[250px] bg-dark-bg border-r border-dark-border flex flex-col h-full">
      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
          <input
            type="text"
            placeholder="Search Agents..."
            className="w-full bg-dark-card border border-dark-border rounded-lg pl-9 pr-3 py-2 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-dark-accent"
          />
        </div>
      </div>

      {/* New Agent Button */}
      <div className="px-3 pb-3">
        <button className="w-full flex items-center justify-center gap-2 bg-dark-card hover:bg-dark-hover border border-dark-border rounded-lg py-2 text-sm text-dark-text transition-colors">
          <Plus className="w-4 h-4" />
          New Agent
        </button>
      </div>

      {/* Agents Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <span className="text-xs font-medium text-dark-muted uppercase tracking-wider">
            Agents
          </span>
        </div>
        <div className="px-2">
          {agents.map((agent) => (
            <button
              key={agent.id}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                agent.isSelected
                  ? "bg-dark-accent/20 text-dark-accent"
                  : "text-dark-text hover:bg-dark-hover"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {agent.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
