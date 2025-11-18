
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SchemaInput } from './components/SchemaInput';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { generateSqlQuery } from './services/geminiService';
import { INITIAL_SCHEMA } from './constants';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [schema, setSchema] = useState<string>(INITIAL_SCHEMA);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedQuery, setGeneratedQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuery = useCallback(async () => {
    if (!prompt.trim() || !schema.trim()) {
      setError('Please provide both a schema and a natural language prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedQuery('');

    try {
      const query = await generateSqlQuery(schema, prompt);
      setGeneratedQuery(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [schema, prompt]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="flex flex-col gap-6 p-6 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg">
            <SchemaInput value={schema} onChange={setSchema} />
            <PromptInput value={prompt} onChange={setPrompt} />
            <button
              onClick={handleGenerateQuery}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center justify-center gap-2 w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-cyan-500/30"
            >
              <SparklesIcon />
              {isLoading ? 'Generating...' : 'Generate SQL Query'}
            </button>
          </div>

          {/* Output Section */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg">
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              generatedQuery={generatedQuery}
            />
          </div>
        </div>
        <footer className="text-center text-slate-500 mt-12 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
