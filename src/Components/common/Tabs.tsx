import React from "react";

type TabsProps = {
  tabs: {
    name: string;
    label: string;
    content: React.ReactNode;
  }[];
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const Tabs = (props: TabsProps) => {
  return (
    <div className="w-full">
      <div className="sticky -top-[4%] bg-white z-50 pt-4 border-b-2 border-slate-100">
        <nav className="flex gap-2 flex-wrap justify-center md:justify-start">
          {props.tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => props.setActiveTab(tab.name)}
              className={`realtive capitalize pb-4 px-2 md:px-6 text-sm font-semibold transition-all duration-300 ${
                props.activeTab === tab.name
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-slate-500  hover:text-slate-900"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {props.activeTab === tab.name && (
                <div className=" absolute bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/25" />
              )}
              {props.activeTab === tab.name && (
                <div className=" absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-t-xl -z-10" />
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {props.tabs.map((tab) => {
          if (tab.name === props.activeTab) {
            return <div className="animate-in fade-in duration-300" key={tab.name}>{tab.content}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
