
import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import Button from '../components/Button';
import { Brain, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, GraduationCap, Copy, RefreshCw } from 'lucide-react';
import { GrammarAnalysis } from '../types';

const GrammarCoach: React.FC = () => {
  const { awardPoints, mode } = useGamification();
  const isKids = mode === 'kids';
  
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<GrammarAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeGrammar = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const text = inputText.trim();
      const params = new URLSearchParams({
        text: text,
        language: 'en-US'
      });

      const response = await fetch(`https://api.languagetool.org/v2/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from LanguageTool');
      }

      const data = await response.json();
      const matches = data.matches || [];
      
      let corrected = text;
      let explanationList: string[] = [];
      const examples: string[] = [];

      // Sort matches right-to-left so string replacement doesn't break offsets
      const sortedMatches = [...matches].sort((a: any, b: any) => b.offset - a.offset);

      for (const match of sortedMatches) {
        if (match.replacements && match.replacements.length > 0) {
          const replacement = match.replacements[0].value;
          const start = match.offset;
          const end = match.offset + match.length;
          
          const wrongWord = corrected.substring(start, end);
          corrected = corrected.substring(0, start) + replacement + corrected.substring(end);
          
          explanationList.unshift(`• ${match.message}`);
          examples.unshift(`"${wrongWord}" → "${replacement}"`);
        } else {
          explanationList.unshift(`• ${match.message}`);
        }
      }

      let score = 100;
      let explanation = "";
      if (matches.length > 0) {
        score = Math.max(0, 100 - (matches.length * 5)); 
        explanation = "Here is what we found:\n\n" + explanationList.join('\n');
      } else {
        explanation = "Your text looks excellent! No grammar or spelling mistakes found. Great job using English.";
        examples.push("Keep practicing with different sentence structures!");
      }

      const result: GrammarAnalysis = {
        original: text,
        corrected: corrected,
        explanation: explanation,
        score: score,
        examples: examples
      };
      
      setAnalysis(result);
      awardPoints(10, 'Grammar Analysis');
      
    } catch (err) {
      console.error("Grammar Analysis Error:", err);
      setError("Failed to analyze text. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (analysis?.corrected) {
      navigator.clipboard.writeText(analysis.corrected);
      // Could add a toast here
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in pb-10">
      <div className="text-center space-y-2 px-2">
        <div className="inline-block bg-fun-purple/10 p-3 sm:p-4 rounded-[1.5rem] mb-1">
            <GraduationCap className="text-fun-purple w-8 h-8 sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none">
           GRAMMAR COACH
        </h2>
        <p className="text-sm sm:text-base font-bold text-slate-500 max-w-xl mx-auto">
           Paste your text below and let our AI coach help you perfect your English! ✍️
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="bg-white p-4 sm:p-6 rounded-[2rem] border-4 border-slate-100 shadow-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-black text-sm sm:text-lg text-slate-700 flex items-center gap-2">
                    <BookOpen className="text-fun-blue w-4 h-4 sm:w-5 sm:h-5" /> YOUR TEXT
                </h3>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">{inputText.length} chars</span>
            </div>
            
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your English text here..."
                className="w-full flex-1 min-h-[150px] sm:min-h-[200px] p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-fun-blue focus:bg-white outline-none transition-all resize-none font-medium text-base sm:text-lg text-slate-700 placeholder:text-slate-400"
            />
            
            <div className="mt-4 flex justify-end">
                <Button 
                    onClick={analyzeGrammar}
                    disabled={!inputText.trim() || isAnalyzing}
                    variant="primary"
                    className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-xl shadow-md w-full sm:w-auto"
                    icon={isAnalyzing ? <RefreshCw className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> : <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
                >
                    {isAnalyzing ? 'ANALYZING...' : 'CHECK GRAMMAR'}
                </Button>
            </div>
        </div>

        {/* Results Section */}
        <div className="flex flex-col h-full">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-xl shadow-sm mb-4 sm:mb-6 animate-fade-in">
                    <div className="flex items-center gap-2 sm:gap-3 text-red-700 font-bold text-sm sm:text-base">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {!analysis && !isAnalyzing && !error && (
                <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center text-slate-400 min-h-[200px]">
                    <Brain className="mb-3 opacity-20 w-12 h-12 sm:w-16 sm:h-16" />
                    <p className="font-bold text-base sm:text-lg">Results will appear here</p>
                    <p className="text-xs sm:text-sm mt-1 max-w-[200px] sm:max-w-xs">Our AI will analyze your grammar, suggest corrections, and explain mistakes.</p>
                </div>
            )}

            {isAnalyzing && (
                <div className="bg-white border-4 border-slate-100 rounded-[2rem] h-full flex flex-col items-center justify-center p-6 text-center shadow-md min-h-[200px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-fun-blue border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="font-black text-lg sm:text-xl text-slate-700 animate-pulse">Analyzing...</p>
                    <p className="text-slate-400 font-bold text-xs mt-1">Checking errors</p>
                </div>
            )}

            {analysis && (
                <div className="bg-white rounded-[2rem] border-4 border-slate-100 shadow-lg overflow-hidden animate-fade-in flex flex-col h-full">
                    {/* Score Header */}
                    <div className={`p-3 sm:p-5 ${analysis.score >= 90 ? 'bg-fun-green' : analysis.score >= 70 ? 'bg-fun-yellow' : 'bg-fun-orange'} text-white flex items-center justify-between`}>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="bg-white/20 p-1.5 sm:p-2 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-[10px] sm:text-xs uppercase tracking-wide opacity-90">Grammar Score</h3>
                                <div className="text-xl sm:text-2xl font-black leading-none">{analysis.score}/100</div>
                            </div>
                        </div>
                        {analysis.score === 100 && <Sparkles className="animate-bounce w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>

                    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 flex-1 overflow-y-auto">
                        {/* Correction */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-black text-slate-700 uppercase text-[10px] sm:text-xs tracking-widest">Corrected Version</h4>
                                <button onClick={handleCopy} className="text-fun-blue hover:text-blue-600 transition-colors p-1" title="Copy to clipboard">
                                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                            <div className="bg-green-50 p-3 sm:p-4 rounded-xl border-l-4 border-green-400 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                                {analysis.corrected}
                            </div>
                        </div>

                        {/* Explanation */}
                        <div>
                            <h4 className="font-black text-slate-700 uppercase text-[10px] sm:text-xs tracking-widest mb-2">Coach's Feedback</h4>
                            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                {analysis.explanation}
                            </div>
                        </div>

                        {/* Examples */}
                        {analysis.examples && analysis.examples.length > 0 && (
                            <div>
                                <h4 className="font-black text-slate-700 uppercase text-[10px] sm:text-xs tracking-widest mb-2">Examples</h4>
                                <ul className="space-y-2">
                                    {analysis.examples.map((ex, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate-600 text-sm sm:text-base bg-slate-50 p-2 sm:p-3 rounded-lg">
                                            <ArrowRight className="text-fun-purple mt-0.5 sm:mt-1 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>{ex}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GrammarCoach;
