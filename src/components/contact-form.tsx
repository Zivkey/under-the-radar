'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) return;

    setStatus('sending');

    // TODO: Replace with actual API endpoint
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/30">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your project..."
          className="w-full resize-none rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.05] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent!' : 'Send message →'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-400/70">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
