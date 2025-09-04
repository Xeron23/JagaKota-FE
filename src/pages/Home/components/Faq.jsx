import { faq } from "@/constants/faq";
import FaqCard from "@/components/FaqCard";

export default function Faq({ faqs = faq, className = "" }) {
  return (
    <section
      aria-labelledby="faq-heading"
      className={`relative isolate w-full items-center self-center py-20 ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="-top-100 absolute left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[360px] w-[360px] rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.9),transparent)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        <h2
          id="faq-heading"
          className="text-center text-4xl font-bold text-gray-900"
        >
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Berikut beberapa pertanyaan yang telah kami jawab yang sering
          ditanyakan oleh pengguna baru dan untuk memudahkan Anda
        </p>

        <div className="mt-6 space-y-3">
          {faqs.map((item, idx) => (
            <FaqCard key={idx} item={item} Open={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
