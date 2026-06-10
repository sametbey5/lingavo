import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Zap, Brain, ChevronLeft } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

const PlaySection: React.FC = () => {
    const navigate = useNavigate();
    const { stats } = useGamification();

    return (
        <div className="w-full flex-1 flex flex-col p-4 animate-fade-in pb-24 h-[calc(100vh-80px)] overflow-y-auto">
            <header className="mb-6 shrink-0 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">Play Zone</h1>
                    <p className="text-sm font-bold text-slate-400">Learn by playing games!</p>
                </div>
                <div className="w-12 h-12 bg-fun-blue/10 rounded-2xl flex items-center justify-center text-fun-blue border border-fun-blue/20">
                    <Gamepad2 size={24} />
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4 flex-1 min-h-0">
                <div 
                    onClick={() => navigate('/vocab')}
                    className="w-full bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-6 shadow-md border-b-[6px] border-orange-500 cursor-pointer hover:-translate-y-1 transition-transform relative overflow-hidden group h-[180px]"
                >
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                        <Zap size={24} className="fill-current" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-end">
                        <h2 className="text-3xl font-black text-white mb-1 drop-shadow-sm">Word Rush</h2>
                        <p className="text-white/90 font-bold text-sm">Beat the clock and find words!</p>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default PlaySection;
