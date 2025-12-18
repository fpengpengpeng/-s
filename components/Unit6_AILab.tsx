
import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Activity, Send, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { botanyAI } from '../services/geminiService';
import { Button } from './Shared';

export const Unit6_AILab: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'specimen' | 'clinic'>('chat');
  const [loading, setLoading] = useState(false);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'ai', content: string }[]>([]);

  // Specimen State
  const [specimen, setSpecimen] = useState<{description: string, answer: string, name: string} | null>(null);
  const [specimenFeedback, setSpecimenFeedback] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Clinic State
  const [clinicInput, setClinicInput] = useState('');
  const [diagnosis, setDiagnosis] = useState<string | null>(null);

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatLog(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await botanyAI.askBotanist(userMsg);
      setChatLog(prev => [...prev, { role: 'ai', content: res || 'AI 暂时无法回答。' }]);
    } catch (e) {
      setChatLog(prev => [...prev, { role: 'ai', content: '连接实验室失败，请稍后重试。' }]);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecimen = async () => {
    setLoading(true);
    setSpecimenFeedback(null);
    try {
      const data = await botanyAI.generateMysterySpecimen();
      setSpecimen(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecimenGuess = (guess: string) => {
    if (!specimen) return;
    if (guess === specimen.answer) {
      setSpecimenFeedback(`正确！这是 ${specimen.name}。`);
      setCorrectCount(c => c + 1);
      if (correctCount + 1 >= 3) {
        // Goal achieved
      }
    } else {
      setSpecimenFeedback(`鉴定错误。请再次观察描述中的维管系统或繁殖结构。`);
    }
  };

  const handleDiagnose = async () => {
    if (!clinicInput.trim()) return;
    setLoading(true);
    try {
      const res = await botanyAI.diagnosePlantProblem(clinicInput);
      setDiagnosis(res || '');
    } catch (e) {
      setDiagnosis('诊断失败。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-lg text-white flex items-start gap-3 shadow-lg">
        <Sparkles className="w-8 h-8 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-lg">U6 任务：AI 智能植物实验室</h3>
          <p className="text-purple-100 text-sm">利用双子座大模型，探索前沿植物学知识与临床诊断。</p>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
        {(['chat', 'specimen', 'clinic'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-200'}`}
          >
            {tab === 'chat' ? '智能百科' : tab === 'specimen' ? '标本鉴定' : '植物门诊'}
          </button>
        ))}
      </div>

      <div className="min-h-[300px] flex flex-col">
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto space-y-3 p-2 border rounded-xl mb-4 bg-gray-50">
              {chatLog.length === 0 && <p className="text-center text-gray-400 mt-10 text-sm">问问我：“为什么有些植物需要双受精？”</p>}
              {chatLog.map((log, i) => (
                <div key={i} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${log.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border text-gray-800 rounded-bl-none shadow-sm'}`}>
                    {log.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-gray-400 animate-pulse">教授正在查阅文献...</div>}
            </div>
            <div className="flex gap-2">
              <input 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                placeholder="输入你的植物学疑问..." 
                className="flex-1 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-300 outline-none"
              />
              <Button onClick={handleChat} disabled={loading} className="bg-indigo-600"><Send size={16}/></Button>
            </div>
          </div>
        )}

        {activeTab === 'specimen' && (
          <div className="space-y-4">
            {!specimen ? (
              <div className="text-center py-10">
                <Button onClick={loadSpecimen} disabled={loading} className="mx-auto">
                  {loading ? '生成标本中...' : '生成随机神秘标本'}
                </Button>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-indigo-200 p-6 rounded-2xl animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase">形态描述</span>
                  <span className="text-xs font-bold text-green-600">已鉴定: {correctCount}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">“{specimen.description}”</p>
                
                {specimenFeedback ? (
                  <div className={`p-4 rounded-xl mb-4 text-center font-bold ${specimenFeedback.includes('正确') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {specimenFeedback}
                    <div className="mt-4"><Button variant="outline" onClick={loadSpecimen} className="mx-auto text-xs">下一个样本</Button></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="text-xs" onClick={() => handleSpecimenGuess('bryo')}>苔藓植物</Button>
                    <Button variant="outline" className="text-xs" onClick={() => handleSpecimenGuess('pter')}>蕨类植物</Button>
                    <Button variant="outline" className="text-xs" onClick={() => handleSpecimenGuess('gymno')}>裸子植物</Button>
                    <Button variant="outline" className="text-xs" onClick={() => handleSpecimenGuess('angio')}>被子植物</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'clinic' && (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-800">描述你看到的植物异常症状（如叶片斑点、枯萎等），AI 医生将为你提供诊断参考。</p>
            </div>
            <textarea
              value={clinicInput}
              onChange={(e) => setClinicInput(e.target.value)}
              placeholder="例如：我的散尾葵叶尖发黑，新叶长不出来..."
              className="w-full h-32 border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-red-200"
            />
            <Button onClick={handleDiagnose} disabled={loading || !clinicInput} className="w-full bg-red-500 hover:bg-red-600">
              {loading ? '诊断中...' : '提交门诊'}
            </Button>
            {diagnosis && (
              <div className="bg-white border rounded-xl p-4 shadow-sm animate-fade-in">
                <div className="text-xs font-bold text-gray-400 mb-2">诊断报告</div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{diagnosis}</div>
                <Button variant="ghost" onClick={() => setDiagnosis(null)} className="mt-4 text-xs w-full">清空并重新咨询</Button>
              </div>
            )}
          </div>
        )}
      </div>

      {correctCount >= 3 && (
        <Button onClick={onComplete} className="w-full mt-4 bg-green-600">
          完成 AI 实验室训练 <CheckCircle size={16}/>
        </Button>
      )}
    </div>
  );
};
