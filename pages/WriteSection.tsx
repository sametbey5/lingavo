import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, BookOpen, Brain, ChevronLeft } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

const WriteSection: React.FC = () => {
    const navigate = useNavigate();
    const { stats } = useGamification();

    return (
        <div className="w-full flex-1 flex flex-col p-4 animate-fade-in pb-24 h-[calc(100vh-80px)] overflow-y-auto">
            <header className="mb-6 shrink-0 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">Write Zone</h1>
                    <p className="text-sm font-bold text-slate-400">Practice writing and grammar</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <PenTool size={24} />
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4 flex-1 min-h-0">
                <div 
                    onClick={() => navigate('/wordbank')}
                    className="w-full bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-6 shadow-md border-b-[6px] border-orange-500 cursor-pointer hover:-translate-y-1 transition-transform relative overflow-hidden group h-[180px]"
                >
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                        <BookOpen size={24} className="fill-current" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-end">
                        <h2 className="text-3xl font-black text-white mb-1 drop-shadow-sm">Dictionary</h2>
                        <p className="text-white/90 font-bold text-sm">Build your vocabulary</p>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
                </div>

                <div 
                    onClick={() => navigate('/grammar')}
                    className="w-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-6 shadow-md border-b-[6px] border-blue-600 cursor-pointer hover:-translate-y-1 transition-transform relative overflow-hidden group h-[180px]"
                >
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                        <Brain size={24} className="fill-current" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-end">
                        <h2 className="text-3xl font-black text-white mb-1 drop-shadow-sm">Grammar Coach</h2>
                        <p className="text-white/90 font-bold text-sm">Improve your sentences</p>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default WriteSection;
