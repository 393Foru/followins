import { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  description: string;
  children: ReactNode;
  controls?: ReactNode;
}

export default function ChartContainer({ title, description, children, controls }: ChartContainerProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-sm relative overflow-hidden">
      <div className="relative z-10 mb-4 pb-4 lg:mb-8 lg:pb-6 border-b border-zinc-200 shrink-0 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex flex-col">
          <h3 className="text-fluid-widget-title font-bold text-zinc-900 tracking-tight mb-2">{title}</h3>
          <p className="text-fluid-widget-desc text-zinc-600 font-light">
            {description}
          </p>
        </div>
        
        {controls && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto mt-2 lg:mt-0">
            {controls}
          </div>
        )}
      </div>
      
      <div className="w-full relative z-10 flex-1 flex flex-col sm:min-h-[320px] justify-center md:justify-end">
        {children}
      </div>
    </div>
  );
}
