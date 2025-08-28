import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function FaqItem({ item, Open = false }) {
  const [open, setOpen] = useState(Open);

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white transition-shadow duration- ${
        open ? "shadow-sm" : ""
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <h3 className="text-base font-normal text-gray-900">{item.q}</h3>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-700 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 text-gray-800">
          <ReactMarkdown>{item.a}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
