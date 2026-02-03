
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, ArrowLeft, CheckCircle2, Sparkles, Phone, LifeBuoy, MoreVertical, Paperclip, Smile } from 'lucide-react';

type Message = {
    id: number;
    type: 'user' | 'bot';
    text: string;
    time: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            type: 'bot',
            text: 'Bonjour ! Je suis l\'assistant intelligent de SupNum. 👋\nComment puis-je vous éclairer aujourd\'hui ?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && !isFormOpen) {
            const timer = setTimeout(scrollToBottom, 50);
            return () => clearTimeout(timer);
        }
    }, [messages, isOpen, isFormOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            type: 'user',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text }),
            });

            const data = await response.json();

            // Auto-switch UI language based on detection from API
            if (data.language && data.language !== language) {
                setLanguage(data.language);
            }

            const botMsg: Message = {
                id: Date.now() + 1,
                type: 'bot',
                text: data.response || (language === 'ar' ? 'حدث خطأ.' : 'Une erreur est survenue.'),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                type: 'bot',
                text: language === 'ar' ? 'فقدت الاتصال بالخادم.' : 'Connexion au serveur perdue.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsFormSubmitted(true);
                setTimeout(() => {
                    setIsFormOpen(false);
                    setIsFormSubmitted(false);
                    setFormData({ name: '', phone: '', message: '' });
                }, 3000);
            }
        } catch (error) {
            console.error('Form error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>

            {/* Chat Window with Glassmorphism */}
            {isOpen && (
                <div
                    className="mb-6 w-[380px] sm:w-[420px] h-[600px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden flex flex-col transition-all duration-500 ease-out transform animate-slide-up origin-bottom-right"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                    {/* Premium Header */}
                    <div className="bg-gradient-to-br from-[#1a237e] via-[#0d47a1] to-[#01579b] p-6 text-white flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                                <div className="bg-white p-1 rounded-2xl w-12 h-12 flex items-center justify-center shadow-2xl rotate-[-3deg]">
                                    <img src="/logo.png" alt="SupNum Logo" className="w-9 h-9 object-contain" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0d47a1] rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-black text-lg tracking-tight">SupNum AI</h3>
                                <div className="flex items-center gap-1.5 opacity-80">
                                    <Sparkles size={12} className="text-yellow-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Assistant Intelligent</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                            <button className="hover:bg-white/10 p-2 rounded-xl transition-all">
                                <MoreVertical size={20} />
                            </button>
                            <button onClick={() => { setIsOpen(false); setIsFormOpen(false); }} className="hover:bg-white/20 p-2 rounded-xl transition-all bg-white/5">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {isFormOpen ? (
                        /* Contact Form View */
                        <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="flex items-center gap-2 text-sm font-bold text-[#0d47a1] mb-8 hover:translate-x-[-4px] transition-transform"
                            >
                                <ArrowLeft size={16} />
                                {language === 'fr' ? 'Retour au chat' : 'العودة للمحادثة'}
                            </button>

                            {isFormSubmitted ? (
                                <div className="flex flex-col items-center justify-center h-[70%] text-center space-y-6 animate-scale-in">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={40} className="text-green-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-gray-900">
                                            {language === 'fr' ? 'Transmis !' : 'تم الإرسال!'}
                                        </h3>
                                        <p className="text-gray-500 text-sm font-medium">
                                            {language === 'fr'
                                                ? 'Votre demande a été envoyée à un agent. Nous vous contacterons bientôt.'
                                                : 'تم إرسال طلبك إلى وكيل. سنتصل بك قريباً.'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-gray-900">
                                            {language === 'fr' ? 'Besoin d\'aide ?' : 'هل تحتاج مساعدة؟'}
                                        </h3>
                                        <p className="text-gray-500 text-sm">Remplissez ce formulaire et un consultant SupNum vous répondra dans les plus brefs délais.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#0d47a1]/20 shadow-sm transition-all"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder={language === 'fr' ? 'Nom complet' : 'الاسم الكامل'}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="tel"
                                                className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#0d47a1]/20 shadow-sm transition-all"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder={language === 'fr' ? 'Numéro de téléphone' : 'رقم الهاتف'}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                required
                                                rows={4}
                                                className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#0d47a1]/20 shadow-sm transition-all resize-none"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder={language === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'كيف يمكننا مساعدتك؟'}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#0d47a1] text-white font-black py-4 rounded-2xl hover:bg-[#1a237e] transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : null}
                                        {isLoading
                                            ? (language === 'fr' ? 'Envoi...' : 'جاري الإرسال...')
                                            : (language === 'fr' ? 'Envoyer au agent' : 'إرسال إلى الوكيل')}
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        /* Modern Chat Logic */
                        <>
                            <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 space-y-6 scrollbar-hide">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={msg.id}
                                        className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                    >
                                        <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                                            <div
                                                className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm transition-all ${msg.type === 'user'
                                                    ? 'bg-[#0d47a1] text-white rounded-tr-none'
                                                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                                    }`}
                                            >
                                                <p className="whitespace-pre-line">{msg.text}</p>
                                            </div>
                                            <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter mx-2">
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start w-full">
                                        <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            <span className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Help Suggestions / Action Bar */}
                            <div className="px-4 py-3 border-t border-gray-100 flex gap-2 overflow-x-auto bg-white no-scrollbar">
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0d47a1] text-xs font-bold rounded-full hover:bg-blue-100 transition-colors shrink-0 whitespace-nowrap"
                                >
                                    <LifeBuoy size={14} />
                                    {language === 'fr' ? 'Agent Humain' : 'وكيل بشري'}
                                </button>
                                <button
                                    onClick={() => setInput(language === 'fr' ? 'Formations' : 'التخصصات')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full hover:bg-gray-200 transition-colors shrink-0 whitespace-nowrap"
                                >
                                    {language === 'fr' ? '🎓 Formations' : '🎓 التخصصات'}
                                </button>
                                <button
                                    onClick={() => setInput(language === 'fr' ? 'Inscription' : 'التسجيل')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full hover:bg-gray-200 transition-colors shrink-0 whitespace-nowrap"
                                >
                                    {language === 'fr' ? '📝 Inscription' : '📝 التسجيل'}
                                </button>
                            </div>

                            {/* Refined Input Area */}
                            <div className="p-6 bg-white border-t border-gray-50">
                                <div className="flex items-center gap-3 bg-gray-100/80 rounded-[1.5rem] px-5 py-3 focus-within:ring-2 focus-within:ring-[#0d47a1]/10 focus-within:bg-white transition-all border border-transparent focus-within:border-gray-200">
                                    <Smile size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={language === 'fr' ? 'Écrivez votre message...' : 'اكتب رسالتك هنا...'}
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 font-medium"
                                    />
                                    <div className="flex items-center gap-3">
                                        <Paperclip size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!input.trim() || isLoading}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim()
                                                ? 'bg-[#0d47a1] text-white shadow-lg shadow-blue-900/20 transform hover:scale-105 active:scale-95'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <Send size={18} className={language === 'ar' ? 'transform rotate-180' : ''} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Premium Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-20 h-20 rounded-[2rem] shadow-[0_20px_40px_rgba(13,71,161,0.4)] flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 group relative ${isOpen ? 'bg-[#0d47a1] rotate-[360deg]' : 'bg-gradient-to-br from-[#1a237e] to-[#01579b]'
                    } text-white border-4 border-white`}
                aria-label="Toggle Support Chat"
            >
                {isOpen ? (
                    <X size={32} />
                ) : (
                    <>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                            <span className="text-[10px] font-black">1</span>
                        </div>
                        <MessageCircle size={36} className="group-hover:rotate-12 transition-transform" />
                    </>
                )}
            </button>
        </div>
    );
}

