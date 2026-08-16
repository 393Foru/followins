import { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  description: string;
  children: ReactNode;
  controls?: ReactNode;
}

export default function ChartContainer({ title, description, children, controls }: ChartContainerProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      <div className="relative z-10 mb-8 border-b border-zinc-200 pb-6 shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">{title}</h3>
          <p className="text-sm text-zinc-600 font-light">
            {description}
          </p>
        </div>
        
        {controls && (
          <div className="flex items-center gap-4">
            {controls}
          </div>
        )}
      </div>
      
      <div className="w-full mt-auto relative z-10 flex-1 flex flex-col min-h-[320px]">
        {children}
      </div>
    </div>
  );
}
