
'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, LogOut, BarChart, MessageSquare, Users, Phone, Calendar } from 'lucide-react';

type FAQ = {
    id: number;
    question: string;
    answer: string;
    category: string;
    language: string;
    createdAt: string;
};

type Contact = {
    id: number;
    name: string;
    phone: string;
    message: string;
    createdAt: string;
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [conversations, setConversations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'history'>('faq');

    // New FAQ Form State
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [newCategory, setNewCategory] = useState('Général');
    const [newLanguage, setNewLanguage] = useState('fr');
    const [respondingToId, setRespondingToId] = useState<number | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchFAQs();
            fetchContacts();
            fetchConversations();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'supnum2024') {
            setIsAuthenticated(true);
        } else {
            alert('Mot de passe incorrect');
        }
    };

    const fetchFAQs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/faq');
            if (res.ok) {
                const data = await res.json();
                setFaqs(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await fetch('/api/contact');
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/conversations');
            if (res.ok) {
                const data = await res.json();
                setConversations(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddFAQ = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion || !newAnswer) return;

        try {
            const res = await fetch('/api/faq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: newQuestion,
                    answer: newAnswer,
                    category: newCategory,
                    language: newLanguage,
                }),
            });

            if (res.ok) {
                const created = await res.json();
                setFaqs([created, ...faqs]);

                // If we were responding to a conversation, mark it as resolved
                if (respondingToId) {
                    await fetch('/api/conversations', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: respondingToId,
                            botResponse: newAnswer
                        })
                    });
                    setRespondingToId(null);
                    fetchConversations(); // Refresh history
                }

                setNewQuestion('');
                setNewAnswer('');
                alert('FAQ ajoutée et historique mis à jour !');
            }
        } catch (e) {
            console.error(e);
            alert('Erreur lors de l\'ajout');
        }
    };

    const handleDeleteFAQ = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) return;

        try {
            const res = await fetch(`/api/faq?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setFaqs(faqs.filter(f => f.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteContact = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setContacts(contacts.filter(c => c.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteConversation = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette conversation ?')) return;

        try {
            const res = await fetch(`/api/conversations?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setConversations(conversations.filter(c => c.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const clearAllHistory = async () => {
        if (!confirm('VOULEZ-VOUS VRAIMENT TOUT SUPPRIMER ?')) return;
        try {
            const res = await fetch(`/api/conversations`, { method: 'DELETE' });
            if (res.ok) {
                setConversations([]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">SupNum Admin</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900"
                                placeholder="Entrez le mot de passe"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Se connecter
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-400 mt-4">Demo Pass: supnum2024</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-white shadow-sm border-b sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="SupNum Logo" className="w-10 h-10 object-contain" />
                            <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('faq')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'faq' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Base FAQ
                                </button>
                                <button
                                    onClick={() => setActiveTab('contact')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'contact' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Contacts
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Historique
                                </button>
                            </div>
                            <div className="h-6 w-px bg-gray-200"></div>
                            <button
                                onClick={() => setIsAuthenticated(false)}
                                className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
                            >
                                <LogOut size={18} />
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Questions</p>
                            <p className="text-3xl font-bold text-gray-900">{faqs.length}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <BarChart size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Conversations</p>
                            <p className="text-3xl font-bold text-gray-900">{conversations.length}</p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <MessageSquare size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
                        <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">Gestion SupNum</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {activeTab === 'faq'
                                ? "Gérez les connaissances du Chatbot. Les modifications sont appliquées instantanément."
                                : activeTab === 'contact'
                                    ? "Consultez les demandes de contact envoyées via le formulaire."
                                    : "Analysez les interactions réelles des utilisateurs avec le chatbot."}
                        </p>
                    </div>
                </div>

                {activeTab === 'faq' ? (
                    /* FAQ SECTION */
                    <div className="space-y-8 animate-fade-in">
                        {/* Add FAQ Form */}
                        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Plus size={20} className="text-blue-600" />
                                    Ajouter une nouvelle question
                                </h3>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleAddFAQ} className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Question</label>
                                        <input
                                            type="text"
                                            required
                                            value={newQuestion}
                                            onChange={(e) => setNewQuestion(e.target.value)}
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none border text-gray-900"
                                            placeholder="Ex: Quelles sont les conditions d'admission ?"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Catégorie</label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none border cursor-pointer text-gray-900"
                                        >
                                            <option>Général</option>
                                            <option>Admission</option>
                                            <option>Formation</option>
                                            <option>Contact</option>
                                            <option>Divers</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Réponse détaillée</label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={newAnswer}
                                            onChange={(e) => setNewAnswer(e.target.value)}
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none border resize-none text-gray-900"
                                            placeholder="Rédigez la réponse ici..."
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Langue</label>
                                        <select
                                            value={newLanguage}
                                            onChange={(e) => setNewLanguage(e.target.value)}
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none border cursor-pointer text-gray-900"
                                        >
                                            <option value="fr">🇫🇷 Français</option>
                                            <option value="ar">🇲🇷 Arabe</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                                        >
                                            Enregistrer la FAQ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* FAQ List */}
                        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900">Questions existantes</h3>
                                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">{faqs.length} entrées</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <div className="p-12 text-center text-gray-500 font-medium">Chargement des données...</div>
                                ) : faqs.length === 0 ? (
                                    <div className="p-12 text-center text-gray-500">Aucune question trouvée.</div>
                                ) : (
                                    faqs.map((faq) => (
                                        <div key={faq.id} className="p-6 hover:bg-blue-50/30 transition-colors group">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${faq.language === 'fr' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {faq.language === 'fr' ? 'FR' : 'AR'}
                                                        </span>
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{faq.category}</span>
                                                    </div>
                                                    <p className="text-base font-bold text-gray-900">{faq.question}</p>
                                                    <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{faq.answer}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteFAQ(faq.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'contact' ? (
                    /* CONTACTS SECTION */
                    <div className="space-y-6 animate-fade-in-delayed">
                        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Users size={20} className="text-indigo-600" />
                                    Demandes de contact agents
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Utilisateur</th>
                                            <th className="px-6 py-4">Coordonnées</th>
                                            <th className="px-6 py-4">Message</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {contacts.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium whitespace-nowrap text-gray-900">
                                                    Aucune demande de contact pour le moment.
                                                </td>
                                            </tr>
                                        ) : (
                                            contacts.map((c) => (
                                                <tr key={c.id} className="hover:bg-indigo-50/20 transition-colors group">
                                                    <td className="px-6 py-4 text-gray-900">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                                {c.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="font-bold">{c.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-900">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone size={14} className="text-gray-400" />
                                                            {c.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-900">
                                                        <div className="max-w-xs overflow-hidden">
                                                            <p className="text-sm line-clamp-2" title={c.message}>
                                                                {c.message}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-xs text-gray-400 px-3 py-1 bg-gray-50 w-fit rounded-full">
                                                            <Calendar size={12} />
                                                            {new Date(c.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-gray-900">
                                                        <button
                                                            onClick={() => handleDeleteContact(c.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* HISTORY SECTION */
                    <div className="space-y-6 animate-fade-in-delayed">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Historique des Conversations</h3>
                            <button
                                onClick={clearAllHistory}
                                className="text-xs text-red-600 hover:underline font-medium"
                            >
                                Tout effacer
                            </button>
                        </div>
                        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {conversations.length === 0 ? (
                                    <div className="p-12 text-center text-gray-500">Aucun historique disponible.</div>
                                ) : (
                                    conversations.map((conv) => (
                                        <div key={conv.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Calendar size={12} />
                                                        {new Date(conv.createdAt).toLocaleString()}
                                                    </div>
                                                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${conv.language === 'fr' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {conv.language === 'fr' ? 'FR' : 'AR'}
                                                    </span>
                                                    {conv.isNoInfo && (
                                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-red-100 text-red-700 animate-pulse">
                                                            Sans Réponse
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {conv.isNoInfo && (
                                                        <button
                                                            onClick={() => {
                                                                setNewQuestion(conv.userMessage);
                                                                setNewLanguage(conv.language);
                                                                setRespondingToId(conv.id);
                                                                setActiveTab('faq');
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }}
                                                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm"
                                                        >
                                                            Répondre (Ajouter FAQ)
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteConversation(conv.id)}
                                                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-700 text-xs font-bold">U</div>
                                                    <div className="bg-blue-50/50 rounded-2xl p-4 text-sm text-gray-800 flex-1">
                                                        {conv.userMessage}
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-green-700 text-xs font-bold">AI</div>
                                                    <div className={`rounded-2xl p-4 text-sm flex-1 border italic ${conv.isNoInfo ? 'bg-red-50/50 text-red-700 border-red-100' : 'bg-green-50/50 text-green-700 border-green-100/50'}`}>
                                                        {conv.botResponse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

