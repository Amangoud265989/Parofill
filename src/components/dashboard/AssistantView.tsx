import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import { Send, Bot, Sparkles, Copy, Trash2, Check, User } from 'lucide-react';

export const AssistantView: React.FC = () => {
  const { chatMessages, sendAssistantMessage, isAssistantThinking, clearChat, showNotification, profile } = useApp();
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'How do I answer: "Why do you want to work here?"',
    'Review and improve my professional summary',
    'Prepare me for a Senior Frontend technical interview',
    'What should I say when asked about salary expectations?',
    'How do I explain a career transition in one punchy paragraph?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAssistantThinking]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isAssistantThinking) return;

    const query = inputText.trim();
    setInputText('');
    await sendAssistantMessage(query);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showNotification('Copied answer to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Chat Top Bar */}
      <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <ParrotAssistantAvatar size={34} isThinking={isAssistantThinking} />
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>ParroFill AI Assistant</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Grounded in your profile
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Personalized career coaching, question drafting, and interview simulations
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Messages Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
            >
              {isAssistant ? (
                <ParrotAssistantAvatar size={28} />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isAssistant
                    ? 'bg-slate-50 border border-slate-200 text-slate-900'
                    : 'bg-emerald-600 text-white font-medium'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                <div
                  className={`pt-1 flex items-center justify-between text-[10px] ${
                    isAssistant ? 'text-slate-400' : 'text-emerald-200'
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  {isAssistant && (
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="hover:text-slate-700 flex items-center gap-1 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isAssistantThinking && (
          <div className="flex items-start gap-3">
            <ParrotAssistantAvatar size={28} isThinking />
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span>ParroFill is formulating a tailored response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Strip */}
      <div className="px-4 sm:px-6 py-2 border-t border-slate-100 bg-slate-50/60 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt);
              }}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-slate-900 text-xs shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-200 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask ParroFill to draft an answer, refine a bullet point, or prepare an interview question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAssistantThinking}
            className="w-full pl-4 pr-12 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isAssistantThinking}
            className="absolute right-2 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg transition-colors shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
