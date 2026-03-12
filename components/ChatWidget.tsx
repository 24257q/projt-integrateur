
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, ArrowLeft, CheckCircle2, Sparkles, Phone, LifeBuoy, MoreVertical, Paperclip, Smile, Copy } from 'lucide-react';

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
    const [faqs, setFaqs] = useState<any[]>([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const res = await fetch('/api/faq');
                if (res.ok) {
                    const data = await res.json();
                    setFaqs(data);
                }
            } catch (error) {
                console.error('Failed to fetch FAQs:', error);
            }
        };
        fetchFAQs();
    }, []);

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

    const handleFAQClick = (faq: any) => {
        const userMsg: Message = {
            id: Date.now(),
            type: 'user',
            text: faq.question,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const botMsg: Message = {
            id: Date.now() + 1,
            type: 'bot',
            text: faq.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg, botMsg]);
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

            {/* Chat Window - Minimalist Professional */}
            {isOpen && (
                <div
                    className="mb-4 w-[380px] sm:w-[420px] h-[600px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ease-out transform animate-slide-up origin-bottom-right"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                    {/* Header Minimalist */}
                    <div className="bg-[#0f172a] p-5 text-white flex justify-between items-center relative overflow-hidden">
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="relative">
                                <div className="bg-white p-1 rounded-lg w-10 h-10 flex items-center justify-center shadow-sm">
                                    <img src="/logo.png" alt="SupNum Logo" className="w-7 h-7 object-contain" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-base tracking-tight">SupNum AI</h3>
                                <div className="flex items-center gap-1.5 opacity-80 mt-0.5">
                                    <Sparkles size={10} className="text-blue-300" />
                                    <span className="text-[9px] font-medium uppercase tracking-wider text-blue-100">Assistant</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 relative z-10">
                            <button className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                                <MoreVertical size={16} />
                            </button>
                            <button onClick={() => { setIsOpen(false); setIsFormOpen(false); }} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {isFormOpen ? (
                        /* Contact Form View */
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] mb-6 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeft size={14} />
                                {language === 'fr' ? 'Retour' : 'العودة'}
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

                                    <div className="space-y-3">
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
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
                                                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm resize-none"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder={language === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'كيف يمكننا مساعدتك؟'}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#0f172a] text-white font-semibold py-3 rounded-lg hover:bg-[#1e293b] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                                    >
                                        {isLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : null}
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
                                        <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[85%] group relative`}>
                                            <div
                                                className={`p-3 rounded-xl text-[13px] leading-relaxed transition-colors border ${msg.type === 'user'
                                                    ? 'bg-[#0f172a] text-white rounded-br-none border-transparent shadow-sm'
                                                    : 'bg-white text-gray-800 border-gray-200 rounded-bl-none shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                                                    }`}
                                            >
                                                <div className="whitespace-pre-line">
                                                    {msg.text.split(/(!\[[^\]]*\]\([^)]+\))/g).map((part, i) => {
                                                        const match = part.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                                                        if (match) {
                                                            return <img key={i} src={match[2]} alt={match[1]} className="w-full mt-3 mb-1 rounded-lg shadow-sm border border-gray-200" />;
                                                        }
                                                        return <span key={i}>{part}</span>;
                                                    })}
                                                </div>
                                            </div>
                                            <div className={`flex items-center mt-1 mx-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    {msg.time}
                                                </span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(msg.text)}
                                                    className="p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors"
                                                    title={msg.type === 'user' ? "Copier la question" : "Copier la réponse"}
                                                >
                                                    <Copy size={11} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {messages.length === 1 && faqs.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-4 animate-fade-in pl-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Questions fréquentes</p>
                                        <div className="flex flex-col gap-2 items-start">
                                            {faqs.slice(0, 5).map(faq => (
                                                <button
                                                    key={faq.id}
                                                    onClick={() => handleFAQClick(faq)}
                                                    className="text-left text-[13px] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 px-3 py-2 rounded-xl rounded-bl-none transition-colors shadow-sm"
                                                >
                                                    {faq.question}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {isLoading && (
                                    <div className="flex justify-start w-full">
                                        <div className="bg-white border border-gray-200 px-3 py-2.5 rounded-xl rounded-bl-none shadow-sm flex items-center gap-1 w-12 h-8">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Help Suggestions / Action Bar */}
                            <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto bg-gray-50/80 no-scrollbar">
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[11px] font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shrink-0 whitespace-nowrap shadow-sm"
                                >
                                    <LifeBuoy size={12} />
                                    {language === 'fr' ? 'Agent Humain' : 'وكيل بشري'}
                                </button>
                                <button
                                    onClick={() => setInput(language === 'fr' ? 'Formations' : 'التخصصات')}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[11px] font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shrink-0 whitespace-nowrap shadow-sm"
                                >
                                    <span className="text-[10px]">🎓</span> {language === 'fr' ? 'Formations' : 'التخصصات'}
                                </button>
                                <button
                                    onClick={() => setInput(language === 'fr' ? 'Inscription' : 'التسجيل')}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[11px] font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shrink-0 whitespace-nowrap shadow-sm"
                                >
                                    <span className="text-[10px]">📝</span> {language === 'fr' ? 'Inscription' : 'التسجيل'}
                                </button>
                            </div>

                            {/* Minimalist Input Area */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-blue-500 focus-within:bg-white transition-all border border-gray-200 focus-within:border-blue-500">
                                    <Smile size={18} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={language === 'fr' ? 'Écrivez votre message...' : 'اكتب رسالتك هنا...'}
                                        className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder-gray-400"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Paperclip size={18} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!input.trim() || isLoading}
                                            className={`p-1.5 rounded-lg flex items-center justify-center transition-all duration-200 ${input.trim()
                                                ? 'bg-[#0f172a] text-white shadow-sm transform hover:scale-105 active:scale-95'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <Send size={14} className={`${language === 'ar' ? 'transform rotate-180' : ''} ml-0.5`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Minimalist Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1 active:scale-95 hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] z-10 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-[#0f172a] hover:bg-[#1e293b]'
                    } text-white`}
                aria-label="Toggle Support Chat"
            >
                {isOpen ? (
                    <X size={26} className="transition-transform duration-300 rotate-90 group-hover:rotate-180" />
                ) : (
                    <>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white leading-none mb-[1px]">1</span>
                        </div>
                        <MessageCircle size={26} className="text-white group-hover:scale-110 transition-transform duration-200" />
                    </>
                )}
            </button>
        </div>
    );
}

