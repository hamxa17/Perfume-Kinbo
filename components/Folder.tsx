"use client";
import { useState, type ReactNode } from "react";

// The glass folder: tabs on top, frosted body below. Used in the hero and the store.
export default function Folder({ tabs, className = "" }: { tabs: { label: string; body: ReactNode }[]; className?: string }) {
  const [i, setI] = useState(0);
  return (
    <div className={className}>
      <div className="tabs" role="tablist">
        {tabs.map((t, n) => (
          <button key={t.label} type="button" role="tab" aria-selected={n === i} className={`tab glass${n === i ? " on" : ""}`} onClick={() => setI(n)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="glass folder-body" role="tabpanel">{tabs[i].body}</div>
    </div>
  );
}
