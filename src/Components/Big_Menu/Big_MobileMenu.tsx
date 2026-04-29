import { Check } from "lucide-react";
import React from "react";

type BigMobileMenutype = {
  item:
    | {
        label: string;
        isExpanded: boolean;
        link: string;
        children?: undefined;
      }
    | {
        label: string;
        isExpanded: boolean;
        link: string;
        children: {
          label: string;
          desc: string;
        }[];
      };
};

const Big_MobileMenu = ({ item }: BigMobileMenutype) => {
  return (
    <div className="w-full pb-4 border-b-2 border-slate-300">
      <div className="grid grid-cols-1 items-start gap-2">
        <div className="flex flex-col justify-between gap-3">
          {item.children?.map((child, index) => (
            <div
              key={index}
              className="border-2 border-emerald-700/20 p-4 rounded-lg flex items-center gap-4 hover:border-emerald-700 transition-all duration-500 cursor-pointer"
            >
              <div className=" p-2 bg-emerald-300/40 rounded-md">
                <Check className="w-8 h-8 text-emerald-800" />
              </div>
              <div className="flex flex-col justify-between items-stretch">
                <h2 className="text-md text-start font-medium text-slate-900 capitalize">
                  {child.label}
                </h2>
                <p className="text-[1rem] font-medium leading-6 text-slate-500 tracking-tight">
                  {child.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Big_MobileMenu);
