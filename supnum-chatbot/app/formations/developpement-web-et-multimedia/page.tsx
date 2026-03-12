import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Globe, MonitorPlay, GraduationCap } from 'lucide-react';

export default function FormationDWM() {
    return (
        <main className="relative min-h-screen font-sans bg-gray-50 text-gray-900 overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-[#0b2a51]">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                        <div className="w-16 h-16 relative">
                            <img src="/logo.png" alt="SupNum Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#0b2a51] font-black text-2xl leading-none tracking-tighter uppercase">SupNum</h1>
                            <p className="text-[#c1a052] font-bold text-[10px] uppercase tracking-[0.15em] mt-1">Institut Supérieur du Numérique</p>
                        </div>
                    </Link>
                    <Link href="/" className="hidden lg:flex gap-2 items-center text-[#0b2a51] font-bold text-sm uppercase hover:text-[#c1a052] transition-colors">
                        <ArrowLeft size={16} /> Retour à l'accueil
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-24 bg-[#0b2a51] text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-[#c1a052] text-[#0b2a51] font-black px-4 py-1 rounded-full text-sm uppercase tracking-wider">Licence</div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Développement Web <br /> <span className="text-[#c1a052]">et Multimédia</span> (DWM)
                        </h1>
                        <p className="text-xl text-blue-100/90 leading-relaxed font-medium max-w-2xl">
                            Prépare aux métiers du développement web, de la programmation, et de la création multimédia. Combine des compétences techniques, scientifiques et professionnelles pour une insertion réussie.
                        </p>
                    </div>

                </div>
            </section>

            {/* Program details */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-[#c1a052] text-xs font-black uppercase tracking-[0.4em] mb-4">Curriculum</h2>
                        <h3 className="text-4xl font-black text-[#0b2a51]">Programme du cours</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Year 1 */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors"></div>
                            <h4 className="text-2xl font-black text-[#0b2a51] mb-8 flex items-center gap-3 pb-4 border-b border-gray-100">
                                <span className="w-10 h-10 bg-[#0b2a51] text-white flex justify-center items-center rounded-xl text-base">L1</span>
                                Première Année
                            </h4>

                            <div className="space-y-6">
                                <div>
                                    <h5 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                                        <CheckCircle size={18} className="text-[#c1a052]" /> Semestre 1
                                    </h5>
                                    <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                        <li>Algorithmique et programmation C++</li>
                                        <li>Introduction aux bases de données & Technologies web</li>
                                        <li>Bases d’informatique & Réseaux</li>
                                        <li>Mathématiques (Algèbre I, Analyse, PIX 1)</li>
                                        <li>Communication I, Anglais I, PPP I</li>
                                    </ul>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <h5 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                                        <CheckCircle size={18} className="text-[#c1a052]" /> Semestre 2
                                    </h5>
                                    <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                        <li>Programmation Python & Langages Web</li>
                                        <li>Systèmes Logiques et d’exploitation</li>
                                        <li>Atelier Multimédia: CMS et PAO I</li>
                                        <li>Mathématiques (Algèbre II, Statistiques, PIX 2)</li>
                                        <li>Projet Intégrateur I</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Year 2 */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors"></div>
                            <h4 className="text-2xl font-black text-[#0b2a51] mb-8 flex items-center gap-3 pb-4 border-b border-gray-100">
                                <span className="w-10 h-10 bg-[#0b2a51] text-white flex justify-center items-center rounded-xl text-base">L2</span>
                                Deuxième Année
                            </h4>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                                        <CheckCircle size={18} className="text-[#c1a052]" /> Semestre 3
                                    </h5>
                                    <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                        <li>Programmation Avancée: POO Java, Structures de données</li>
                                        <li>Science des Données: Machine Learning, Recherche Opérationnelle</li>
                                        <li>Outils Multimédia: Numérisation et Codage, CMS et PAO II</li>
                                        <li>Base de Données et Conception des SI, Tech. Multimédias Avancées</li>
                                        <li>Communication, Anglais, Projet Personnel</li>
                                    </ul>
                                </div>
                                <div className="pt-4 border-t border-gray-100 opacity-60">
                                    <h5 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2 italic">
                                        Semestres suivants
                                    </h5>
                                    <p className="text-sm text-gray-600 pl-7 italic">
                                        La suite du programme se spécialise davantage dans le développement web fullstack, les applications immersives et le multimédia avancé, incluant des stages obligatoires en milieu professionnel.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0b2a51] text-white py-12 border-t-8 border-[#c1a052] text-center">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">© 2026 Institut Supérieur du Numérique. Tous droits réservés.</p>
            </footer>
        </main>
    );
}
