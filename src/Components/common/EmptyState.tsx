import { FileText, Plus } from "lucide-react";
import React from "react";

type EmptyProps = {
  title: string;
  description: string;
  onActionClick?: () => void;
  buttonText?: string;
};

const EmptyState = (props: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-linear-to-br from-slate-50/50 to-white border-2 border-slate-200 border-dashed rounded-3xl">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200/50 mb-4">
        <FileText className="w-8 h-8" strokeWidth={2} />
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-4">{props.title}</h3>
      <p className="text-sm text-slate-500 mb-4 max-w-sm leading-relaxed">{props.description}</p>
      {props.buttonText && props.onActionClick && (
        <button onClick={props.onActionClick} className="group relative inline-flex items-center gap-2 px-6 h-11 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-sm rounded-xl transition-all 
        duration-300 shadow-lg shadow-emerald-500/30 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 overflow-hidden"> 
        <span className="relative z-10 flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={2} />
            {props.buttonText}
        </span>
        <div className=" absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:trnaslate-x-[100%] transition-all duration-700"/>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
