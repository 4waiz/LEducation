import { motion } from 'framer-motion';
import { useState, type ChangeEvent } from 'react';

export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  multiline = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Input = multiline ? 'textarea' : 'input';

  return (
    <label className="grid gap-2 text-sm text-chalk-200">
      <span className="text-xs uppercase tracking-[0.2em] text-chalk-500">{label}</span>
      <div className="relative">
        <Input
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-chalk-800/60 bg-navy-900/70 px-4 py-3 text-sm text-chalk-50 outline-none focus:ring-1 focus:ring-lime-400/50"
          {...(multiline ? { rows: 4 } : { type })}
        />
        <motion.span
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left bg-lime-400"
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
