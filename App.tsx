
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Microscope, 
  Flower, 
  Trees, 
  Map, 
  Sparkles,
  ArrowRight,
  Activity,
  Trophy,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Wind,
  Bug,
  Zap,
  Sprout,
  HelpCircle,
  Search,
  GitMerge,
  FileText,
  Sun,
  ShoppingBag
} from 'lucide-react';
import { UnitType, GameState } from './types';
import { GameCard, Button } from './components/Shared';
import { Unit6_AILab } from './components/Unit6_AILab';

// ==========================================
// SHARED UI COMPONENTS
// ==========================================

const ConceptImage = ({ type }: { type: string }) => {
  switch (type) {
    case 'moss':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-green-600">
          <path d="M10,90 Q20,80 30,90 T50,90 T70,90 T90,90" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20,90 Q20,70 15,60 Q10,50 20,40 Q30,50 25,60 Q20,70 20,90" fill="#86efac" stroke="currentColor" />
          <path d="M50,90 Q50,60 45,50 Q40,40 50,30 Q60,40 55,50 Q50,60 50,90" fill="#4ade80" stroke="currentColor" />
          <path d="M80,90 Q80,75 75,65 Q70,55 80,45 Q90,55 85,65 Q80,75 80,90" fill="#86efac" stroke="currentColor" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">假根/无维管</text>
        </svg>
      );
    case 'fern':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-green-700">
          <path d="M50,90 Q50,50 80,30" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M50,90 Q40,60 20,50" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="50" r="2" fill="#78350f" />
          <circle cx="65" cy="45" r="2" fill="#78350f" />
          <circle cx="70" cy="40" r="2" fill="#78350f" />
          <path d="M20,50 Q10,45 15,40 Q20,35 25,40" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">孢子囊/拳卷叶</text>
        </svg>
      );
    case 'gymnosperm':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-green-800">
          <path d="M30,50 L10,20 M30,50 L20,15 M30,50 L40,20" stroke="currentColor" strokeWidth="2" />
          <path d="M60,30 L80,30 L70,80 Z" fill="#78350f" stroke="currentColor" />
          <path d="M60,40 L80,40 M62,50 L78,50 M65,60 L75,60" stroke="#a66" strokeWidth="1" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">裸子(松果)/针叶</text>
        </svg>
      );
    case 'angiosperm':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto">
          <circle cx="30" cy="30" r="10" fill="#f472b6" />
          <circle cx="30" cy="30" r="4" fill="#fcd34d" />
          <circle cx="70" cy="60" r="15" fill="#ef4444" />
          <path d="M70,45 L70,35 L75,30" stroke="#78350f" strokeWidth="2" fill="none" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">有花/有果皮</text>
        </svg>
      );
    case 'monocot':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-green-600">
          <path d="M50,90 Q10,50 50,10 Q90,50 50,90 Z" fill="#bbf7d0" stroke="currentColor" />
          <path d="M50,90 L50,10 M40,85 Q20,50 40,15 M60,85 Q80,50 60,15" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">单子叶：平行脉</text>
        </svg>
      );
    case 'dicot':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-green-600">
          <path d="M50,90 Q5,50 50,10 Q95,50 50,90 Z" fill="#bbf7d0" stroke="currentColor" />
          <path d="M50,90 L50,10" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M50,70 L30,50 M50,60 L70,40 M50,40 L35,25" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">双子叶：网状脉</text>
        </svg>
      );
    case 'crucifer':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-yellow-500">
          <path d="M50,20 L50,80 M20,50 L80,50" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="50" cy="50" r="10" fill="#fcd34d" />
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">十字花冠</text>
        </svg>
      );
    case 'lamiaceae':
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-purple-600">
          <rect x="35" y="40" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M30,30 Q50,10 70,30" fill="#d8b4fe" opacity="0.5"/>
          <path d="M35,80 Q50,95 65,80" fill="#d8b4fe" opacity="0.5"/>
          <text x="50" y="98" fontSize="10" textAnchor="middle" fill="#666">方茎/唇形花</text>
        </svg>
      );
    default:
      return <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto" />;
  }
};

const FlashcardViewer = ({ cards, onComplete }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState(new Set([0]));

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentIndex(nextIndex);
      setViewedCards(prev => new Set([...prev, nextIndex]));
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
      setCurrentIndex(prevIndex);
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-xl flex items-start gap-3">
        <BookOpen className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-indigo-800">核心概念卡片</h3>
          <p className="text-indigo-700 text-sm">点击卡片翻转，完成后开始挑战。</p>
        </div>
      </div>
      <div className="perspective-1000 h-80 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute w-full h-full backface-hidden bg-white border-2 border-indigo-100 rounded-2xl shadow-md flex flex-col items-center justify-center p-8 hover:border-indigo-300">
            {cards[currentIndex].type && <div className="mb-4"><ConceptImage type={cards[currentIndex].type} /></div>}
            <h2 className="text-2xl font-bold text-gray-800">{cards[currentIndex].term}</h2>
            <div className="mt-6 text-gray-400 text-sm flex items-center gap-1"><RotateCw className="w-4 h-4" /> 点击翻转</div>
          </div>
          <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-2xl shadow-md flex flex-col items-center justify-center p-8 text-white rotate-y-180" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            <p className="text-lg leading-relaxed">{cards[currentIndex].def}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handlePrev}><ChevronLeft className="w-5 h-5" /> 上一个</Button>
        <span className="text-gray-400 font-mono text-sm">{currentIndex + 1} / {cards.length}</span>
        <Button variant="ghost" onClick={handleNext}>下一个 <ChevronRight className="w-5 h-5" /></Button>
      </div>
      {viewedCards.size >= cards.length && (
        <Button onClick={onComplete} className="w-full py-4 bg-indigo-600">我准备好了 <ArrowRight className="w-5 h-5" /></Button>
      )}
    </div>
  );
};

const GenericQuiz = ({ questions, onComplete, title }: any) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    if (optionIndex === questions[currentQIndex].correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <div className="text-center py-10 space-y-6">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-800">测试结果</h3>
        <p className="text-lg">得分：<span className="font-bold text-green-600 text-3xl">{score}</span> / {questions.length}</p>
        <Button onClick={onComplete} className="w-full bg-green-600">继续学习</Button>
      </div>
    );
  }

  const question = questions[currentQIndex];

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
        <div className="flex items-center gap-2"><HelpCircle className="w-6 h-6 text-green-600" /><span className="font-bold text-green-800">{title}</span></div>
        <span className="text-sm font-mono bg-white px-2 py-1 rounded text-green-700">{currentQIndex + 1}/{questions.length}</span>
      </div>
      <h4 className="text-lg font-bold text-gray-800 leading-snug">{question.question}</h4>
      <div className="space-y-3">
        {question.options.map((opt: string, idx: number) => (
          <button 
            key={idx} 
            onClick={() => handleAnswer(idx)} 
            disabled={showExplanation}
            className={`w-full p-4 text-left rounded-xl border-2 font-medium transition-all ${
              showExplanation 
                ? idx === question.correct 
                  ? 'bg-green-50 border-green-500 text-green-800' 
                  : idx === selectedOption 
                    ? 'bg-red-50 border-red-300 text-red-800' 
                    : 'bg-gray-50 text-gray-400 opacity-60'
                : 'bg-white border-gray-100 hover:border-indigo-300 hover:shadow-sm'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 animate-fade-in">
          <p className="text-blue-800 text-sm leading-relaxed"><span className="font-bold">解析：</span> {question.explanation}</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={nextQuestion} className="bg-indigo-600">
              {currentQIndex === questions.length - 1 ? "完成测试" : "下一题"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// DATA: UNITS (Restored)
// ==========================================

const quizQuestionsU5 = [
  { id: 1, question: "茎是四方形，叶对生，闻起来有薄荷香，属于哪个科？", options: ["十字花科", "唇形科", "蔷薇科", "禾本科"], correct: 1, explanation: "唇形科特征：茎四棱，叶对生，花唇形，味芳香。" },
  { id: 2, question: "“十字花冠，四强雄蕊”是哪个科的特征？", options: ["十字花科", "豆科", "茄科", "锦葵科"], correct: 0, explanation: "十字花科（白菜、萝卜）典型特征：十字形花瓣和4长2短的雄蕊。" },
  { id: 3, question: "被子植物中种类最多、演化程度最高的科是？", options: ["兰科", "菊科", "豆科", "蔷薇科"], correct: 1, explanation: "菊科是被子植物第一大科，具有头状花序和聚药雄蕊等先进特征。" }
];

const familyZones = [
  { id: 'zone1', name: '蔬菜坊', icon: <Sun />, color: 'bg-lime-100', families: [
    { name: '十字花科', desc: '十字花冠，四强雄蕊，角果。', iconType: 'crucifer', tags: ['油菜', '萝卜'] },
    { name: '茄科', desc: '花冠轮状，浆果或蒴果。', tags: ['番茄', '辣椒'] }
  ]},
  { id: 'zone2', name: '花卉苑', icon: <Flower />, color: 'bg-pink-100', families: [
    { name: '唇形科', desc: '茎四棱，叶对生，唇形花冠。', iconType: 'lamiaceae', tags: ['薄荷', '薰衣草'] },
    { name: '菊科', desc: '头状花序，聚药雄蕊。', tags: ['向日葵', '雏菊'] }
  ]}
];

// ==========================================
// MAIN APP ROUTER
// ==========================================

export default function App() {
  const [activeUnit, setActiveUnit] = useState<UnitType | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);

  const startUnit = (unitId: UnitType) => {
    setActiveUnit(unitId);
    if (unitId === UnitType.U6) setGameState(GameState.GAME1);
    else if (unitId === UnitType.U5) setGameState(GameState.COMPENDIUM);
    else setGameState(GameState.FLASHCARDS);
  };

  const goHome = () => {
    setActiveUnit(null);
    setGameState(GameState.INTRO);
  };

  const renderUnitContent = () => {
    if (activeUnit === UnitType.U5) {
      if (gameState === GameState.COMPENDIUM) {
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-xl flex items-center gap-3">
              <Map className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-bold text-purple-800">U5：植物分科巡礼</h3>
                <p className="text-purple-700 text-sm">探索主要科属特征，随后进行考核。</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {familyZones.map(zone => (
                <div key={zone.id} className={`${zone.color} p-5 rounded-2xl border-2 border-transparent hover:border-purple-300 transition-all shadow-sm`}>
                  <div className="flex items-center gap-2 font-bold text-gray-800 mb-3">{zone.icon} {zone.name}</div>
                  <div className="space-y-3">
                    {zone.families.map(f => (
                      <div key={f.name} className="bg-white/80 p-3 rounded-xl">
                        <div className="font-bold text-xs text-gray-500">{f.name}</div>
                        <div className="text-xs text-gray-700 mt-1">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => setGameState(GameState.QUIZ)} className="w-full bg-purple-600">进入特征诊断室 <ArrowRight size={16}/></Button>
          </div>
        );
      }
      if (gameState === GameState.QUIZ) {
        return <GenericQuiz title="U5 考核" questions={quizQuestionsU5} onComplete={() => setGameState(GameState.FINISHED)} />;
      }
    }

    if (activeUnit === UnitType.U6) {
      return <Unit6_AILab onComplete={() => setGameState(GameState.FINISHED)} />;
    }

    // Placeholder for U2, U3, U4 - in a real "Pro" app these would be imported components
    return (
      <div className="text-center py-20 space-y-4">
        <Activity className="w-16 h-16 text-gray-300 mx-auto" />
        <h3 className="text-xl font-bold text-gray-400">模块开发中</h3>
        <p className="text-sm text-gray-400">单元 {activeUnit?.toUpperCase()} 正在升级交互体验。</p>
        <Button variant="outline" onClick={goHome}>返回</Button>
      </div>
    );
  };

  if (gameState === GameState.INTRO) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center space-y-10 py-10">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center mx-auto rotate-6 shadow-xl animate-pulse">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-1 rounded-full shadow-sm">PRO</div>
            </div>
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">植物实验室</h1>
              <p className="text-slate-500 mt-3 text-lg font-medium">沉浸式园艺学互动课件</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
              <NavButton icon={<Microscope className="text-green-600" />} title="单元 3-2" sub="花粉与花药壁解剖" onClick={() => startUnit(UnitType.U2)} color="hover:border-green-400" />
              <NavButton icon={<Flower className="text-blue-600" />} title="单元 3-3" sub="传粉规律与双受精" onClick={() => startUnit(UnitType.U3)} color="hover:border-blue-400" />
              <NavButton icon={<Trees className="text-teal-600" />} title="单元 4" sub="植物类群与演化" onClick={() => startUnit(UnitType.U4)} color="hover:border-teal-400" />
              <NavButton icon={<Map className="text-purple-600" />} title="单元 5" sub="被子植物分科大巡礼" onClick={() => startUnit(UnitType.U5)} color="hover:border-purple-400" />
              <NavButton icon={<Sparkles className="text-indigo-600" />} title="单元 6 (AI)" sub="智能鉴定实验室" onClick={() => startUnit(UnitType.U6)} color="border-indigo-100 hover:border-indigo-400 bg-indigo-50/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {gameState !== GameState.FINISHED && (
          <div className="flex justify-between items-center mb-6 px-2">
            <button onClick={goHome} className="text-sm font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-4 h-4" /> 返回主页
            </button>
            <div className="h-1.5 w-32 bg-gray-200 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 w-1/2 transition-all"></div>
            </div>
          </div>
        )}
        <GameCard className="animate-fade-in">{gameState === GameState.FINISHED ? <FinishScreen unit={activeUnit?.toUpperCase()} onHome={goHome} /> : renderUnitContent()}</GameCard>
      </div>
    </div>
  );
}

const NavButton = ({ icon, title, sub, onClick, color }: any) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border-2 border-transparent transition-all hover:scale-[1.02] active:scale-95 text-left group ${color}`}
  >
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">{icon}</div>
    <div className="flex-1">
      <div className="font-bold text-slate-800 text-lg">{title}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
  </button>
);

const FinishScreen = ({ unit, onHome }: any) => (
  <div className="text-center space-y-8 py-10 animate-bounce-in">
    <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
    <h2 className="text-3xl font-black text-slate-900">单元 {unit} 达成！</h2>
    <p className="text-slate-500">知识已成功入库，继续加油。</p>
    <Button onClick={onHome} className="w-full py-4 bg-indigo-600">返回主页</Button>
  </div>
);
