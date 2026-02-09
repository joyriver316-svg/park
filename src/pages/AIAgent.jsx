import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIAgent = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: '안녕하세요! Park & Play AI 에이전트입니다.\n매출 현황, 입출차 로그분석, 시스템 상태 등 무엇이든 물어보세요.'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                sender: 'ai',
                text: getMockResponse(inputValue)
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (query) => {
        if (query.includes('매출')) return '이번 달 총 매출은 ₩45,231,890원으로 지난달 대비 20.1% 증가했습니다. 강남 파이낸스 센터의 매출 기여도가 가장 높습니다.';
        if (query.includes('차량')) return '현재 총 3,421대의 차량이 주차되어 있습니다. 가동률은 85% 수준으로 여유 공간이 다소 부족할 수 있습니다.';
        if (query.includes('장애')) return '현재 3건의 시스템 알림이 있습니다. LPR 카메라 연결 상태를 확인해주세요.';
        return '죄송합니다. 제가 이해할 수 없는 질문입니다. 매출, 차량, 장애 현황 등에 대해 질문해주시면 답변해 드리겠습니다.';
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                    <Bot size={18} />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-slate-800">AI 에이전트</h2>
                    <p className="text-xs text-slate-500">Powered by Park & Play Intelligence</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/30">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${msg.sender === 'user'
                                ? 'bg-white border-slate-200 text-slate-600'
                                : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                            }`}>
                            {msg.sender === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                        </div>
                        <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                ? 'bg-slate-800 text-white rounded-tr-none'
                                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                            }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                            <Sparkles size={14} />
                        </div>
                        <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-100 bg-white">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="질문을 입력하세요... (예: 오늘 매출 현황 알려줘)"
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIAgent;
