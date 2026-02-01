
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, ArrowLeft, CheckCircle2 } from 'lucide-react';

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
        { id: 0, type: 'bot', text: 'Bonjour ! Je suis l\'assistant virtuel de SupNum. Comment puis-je vous aider ?', time: new Date().toLocaleTimeString() }
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
        if (isOpen && !isFormOpen) scrollToBottom();
    }, [messages, isOpen, isFormOpen]);

    const toggleLanguage = () => {
        const newLang = language === 'fr' ? 'ar' : 'fr';
        setLanguage(newLang);
        const welcome = newLang === 'fr'
            ? 'Bonjour ! Comment puis-je vous aider ?'
            : 'مرحباً! أنا المساعد الافتراضي لـ SupNum. كيف يمكنني مساعدتك؟';

        setMessages(prev => [
            ...prev,
            { id: Date.now(), type: 'bot', text: welcome, time: new Date().toLocaleTimeString() }
        ]);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            type: 'user',
            text: input,
            time: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text, language: language }),
            });

            const data = await response.json();

            const botMsg: Message = {
                id: Date.now() + 1,
                type: 'bot',
                text: data.response || (language === 'ar' ? 'حدث خطأ.' : 'Une erreur est survenue.'),
                time: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                type: 'bot',
                text: language === 'ar' ? 'فقدت الاتصال بالخادم.' : 'Connexion au serveur perdue.',
                time: new Date().toLocaleTimeString()
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

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1 rounded-full w-10 h-10 flex items-center justify-center">
                                <img src="/logo.png" alt="SupNum Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">SupNum Support</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    {language === 'fr' ? 'En ligne' : 'متصل الآن'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={toggleLanguage} className="hover:bg-white/20 p-2 rounded-full transition-colors text-xs font-bold" title="Switch Language">
                                {language === 'fr' ? 'AR' : 'FR'}
                            </button>
                            <button onClick={() => { setIsOpen(false); setIsFormOpen(false); }} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {isFormOpen ? (
                        /* Contact Form View */
                        <div className="flex-1 p-6 overflow-y-auto bg-white">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="flex items-center gap-1 text-sm text-blue-600 mb-4 hover:underline"
                            >
                                <ArrowLeft size={14} />
                                {language === 'fr' ? 'Retour au chat' : 'العودة للمحادثة'}
                            </button>

                            {isFormSubmitted ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
                                    <CheckCircle2 size={64} className="text-green-500" />
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {language === 'fr' ? 'Transmis !' : 'تم الإرسال!'}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {language === 'fr'
                                            ? 'Votre demande a été envoyée à un agent. Nous vous contacterons bientôt.'
                                            : 'تم إرسال طلبك إلى وكيل. سنتصل بك قريباً.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {language === 'fr' ? 'Parler à un agent' : 'تحدث مع وكيل'}
                                    </h3>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            {language === 'fr' ? 'Nom complet' : 'الاسم الكامل'}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder={language === 'fr' ? 'Votre nom' : 'اسمك'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            {language === 'fr' ? 'Numéro de téléphone' : 'رقم الهاتف'}
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+222 ..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            {language === 'fr' ? 'Message / Context' : 'الرسالة / السياق'}
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder={language === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'كيف يمكننا مساعدتك؟'}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                                    >
                                        {isLoading
                                            ? (language === 'fr' ? 'Envoi...' : 'جاري الإرسال...')
                                            : (language === 'fr' ? 'Envoyer au agent' : 'إرسال إلى الوكيل')}
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        /* Messages Logic */
                        <>
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.type === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                            <span className={`text-[10px] block mt-1 opacity-70 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start w-full">
                                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-2 border-t border-gray-100 flex justify-center bg-gray-50/50">
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1 py-1"
                                >
                                    <User size={14} />
                                    {language === 'fr' ? 'Parler à un agent humain' : 'تحدث مع وكيل بشري'}
                                </button>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={language === 'fr' ? 'Posez votre question...' : 'اكتب سؤالك هنا...'}
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!input.trim() || isLoading}
                                        className={`p-2 rounded-full transition-all ${input.trim()
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:scale-105'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send size={18} className={language === 'ar' ? 'transform rotate-180' : ''} />
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <span className="text-[10px] text-gray-400">
                                        {language === 'fr' ? 'Chatbot alimenté par IA' : 'روبوت مدعوم بالذكاء الاصطناعي'}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-indigo-900 rotate-90' : 'bg-gradient-to-br from-blue-600 to-indigo-700 animate-bounce-slow'
                    } text-white border-2 border-white`}
                aria-label="Toggle Support Chat"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
}
