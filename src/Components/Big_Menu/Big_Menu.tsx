import { ArrowRight, Check } from "lucide-react";
import React from "react";
import { Link } from "react-router";

type MenuChild = {
  label: string;
  desc: string;
  slug?: string;
  to?: string;
};

type BigMenutype = {
  handleMouseLeave: () => void;
  handleHoverBigMenu: (index: number) => void;
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
        children: MenuChild[];
      };
  index: number | null;
};

function childHref(item: BigMenutype["item"], child: MenuChild): string {
  if (child.to) return child.to;
  if (child.slug) return `${item.link}#${child.slug}`;
  return item.link;
}

const Big_Menu = ({
  index,
  item,
  handleHoverBigMenu,
  handleMouseLeave,
}: BigMenutype) => {
  return (
    <div
      onMouseEnter={() => handleHoverBigMenu(index as number)}
      onMouseLeave={() => handleMouseLeave()}
      className="bigmenu absolute p-4 border -left-20 top-12 min-h-[50vh] w-3xl rounded-xl border-slate-300 shadow-lg shadow-emerald-300/20 bg-white animate__animated animate__fadeIn animate__faster"
    >
      <div className="grid grid-cols-2 items-start gap-2">
        <div className="flex flex-col justify-between gap-3">
          {item.children?.map((child, index) => (
            <Link
              key={index}
              to={childHref(item, child)}
              className="border-2 border-emerald-700/20 p-4 rounded-lg flex items-center gap-4 hover:border-emerald-700 transition-all duration-500 cursor-pointer"
            >
              <div className=" p-2 bg-emerald-300/40 rounded-md">
                <Check className="w-8 h-8 text-emerald-800" />
              </div>
              <div className="flex flex-col justify-between items-stretch">
                <h2 className="text-md text-start font-medium text-slate-900 capitalize">
                  {child.label}
                </h2>
                <p className="text-[1rem] text-left font-medium leading-6 text-slate-500 tracking-tight">
                  {child.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="p-4 min-h-[60vh] h-full self-start bg-linear-to-tl from-emerald-700 to-teal-600 rounded-xl">
          <p className="text-[1.4rem] px-2 font-semibold text-center text-white capitalize text-shadow-lg">
            Your next study session can be smarter.
          </p>
          <p className="py-4 text-[1rem] font-medium text-center text-slate-100">
            Turn Leactures, readings and books into a complete AI study system
            in minutes.
          </p>
          <div className="mb-4">
            <img
              src="/AI_ASSISTANT.svg"
              alt="ai_Assistant"
              className="w-auto h-auto"
            />
          </div>
          <Link
            className="flex items-center justify-center bg-linear-to-tr from-violet-700 to-purple-600 py-2 hover:from-purple-700 hover:to-violet-600 transition-all duration-500 text-white rounded-lg mx-2 text-md font-medium active:scale-95"
            to={"/login"}
          >
            Start a Free Study Session{" "}
            <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Big_Menu);
