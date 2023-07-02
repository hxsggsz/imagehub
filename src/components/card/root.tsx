import { type ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
  return (
    <div className="rounded-xl border-2 border-b-4 border-r-4 border-slate-900 transition-all hover:border-b-8 hover:border-r-8 active:border-b-4 active:border-r-4">
      {children}
    </div>
  );
};
