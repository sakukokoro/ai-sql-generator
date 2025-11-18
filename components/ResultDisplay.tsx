
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, LoadingSpinner, ExclamationIcon } from './icons';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedQuery: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, generatedQuery }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (generatedQuery) {
      setCopied(false);
    }
  }, [generatedQuery]);

  const handleCopy = () => {
    if (generatedQuery) {
      navigator.clipboard.writeText(generatedQuery);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <LoadingSpinner />
          <p className="mt-4 text-lg">Generating query...</p>
          <p className="text-sm">The AI is thinking ✨</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
          <ExclamationIcon />
          <p className="mt-4 text-lg font-semibold">An Error Occurred</p>
          <p className="text-sm text-center">{error}</p>
        </div>
      );
    }

    if (generatedQuery) {
      return (
        <div className="relative h-full">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-slate-700/50 hover:bg-slate-600 rounded-md transition-colors"
            aria-label="Copy SQL to clipboard"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <pre className="h-full bg-black/50 p-4 rounded-lg overflow-x-auto">
            <code className="language-sql text-cyan-300 text-sm whitespace-pre-wrap">
              {generatedQuery}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <p className="text-lg">Your generated SQL query will appear here.</p>
        <p className="text-sm">Provide a schema and a prompt to get started.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
        <h2 className="text-lg font-semibold text-slate-300 mb-4">Generated SQL</h2>
        <div className="flex-grow min-h-[300px] lg:min-h-0">
          {renderContent()}
        </div>
    </div>
  );
};
