import { type ReactNode } from "react";

interface ContentProps {
  children: ReactNode
  title: string
  date: string
}

export const Content = ({ children, title, date }: ContentProps) => {
  return (
    <div className="p-4">
      <section className="flex items-center justify-between rounded-ss-xl">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </section>
      <h1 className="rounded-b-xl pr-4 pt-2 text-end text-lg hover:rounded-b-xl">
        {date}
      </h1>
    </div>
  );
};
