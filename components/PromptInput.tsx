
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-slate-400 mb-2">
        What do you want to query?
      </label>
      <input
        type="text"
        id="prompt"
        name="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 'Find all products with a price less than 20'"
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300"
      />
    </div>
  );
};
