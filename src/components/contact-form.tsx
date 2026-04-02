'use client';

export function ContactForm() {
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
          Email
        </label>
        <input
          type="email"
          placeholder="you@email.com"
          className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full resize-none rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]"
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.05] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
      >
        Send message →
      </button>
    </form>
  );
}
