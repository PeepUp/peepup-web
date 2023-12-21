import React from "react";

type Props = {
  children: React.ReactNode;
};

export function ListBoxWrapper({ children }: Props) {
  return (
    <div className="w-full rounded-small border-small px-1 py-2">
      {children}
    </div>
  );
}
