import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, GraduationCap, Building2, Globe, Laptop, HardDrive, Edit3 } from 'lucide-react';

export default function InstitutPage() {
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
                    <nav className="hidden lg:flex gap-8 text-[#0b2a51] font-bold text-sm uppercase">
                        <Link href="/" className="hover:text-[#c1a052] transition-colors border-b-2 border-transparent hover:border-[#c1a052] pb-1">Accueil</Link>
                        <Link href="/#formations" className="hover:text-[#c1a052] transition-colors border-b-2 border-transparent hover:border-[#c1a052] pb-1">Formations</Link>
                        <Link href="/institut" className="text-[#c1a052] transition-colors border-b-2 border-[#c1a052] pb-1">Institut</Link>
                        <Link href="/admin" className="text-white bg-[#0b2a51] px-4 py-2 rounded shadow-lg hover:bg-[#c1a052] transition-all">Administration</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-24 bg-[#0b2a51] text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/campus_hero.jpg"
                        alt="Campus"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a51] to-transparent"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <Building2 size={64} className="text-[#c1a052] mb-6" />
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-wide">
                        À Propos de <span className="text-[#c1a052]">SupNum</span>
                    </h1>
                    <p className="text-xl text-blue-100/90 leading-relaxed font-medium max-w-3xl">
                        L’Institut Supérieur du Numérique (SupNum) est un établissement public mauritanien d’enseignement supérieur, créé en 2021 et placé sous la tutelle du Ministère de l’Enseignement Supérieur et de la Recherche Scientifique.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">

                    <div className="mb-20">
                        <h2 className="text-[#c1a052] text-xs font-black uppercase tracking-[0.4em] mb-4">Notre Vocation</h2>
                        <h3 className="text-3xl font-black text-[#0b2a51] mb-6">Former des cadres compétents et immédiatement opérationnels</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            En réponse aux besoins croissants du marché national et international, SupNum propose des formations professionnalisantes de niveau Licence et Master, conçues pour accompagner les grandes mutations technologiques. Depuis 2024, l’Institut propose également un Master d’Excellence en Intelligence Artificielle et Data Engineering, fruit d’un partenariat stratégique avec le Ministère de la Transformation Numérique.
                        </p>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-[#c1a052] text-xs font-black uppercase tracking-[0.4em] mb-4">Offre Pédagogique</h2>
                        <h3 className="text-3xl font-black text-[#0b2a51] mb-10">Trois axes structurent notre offre</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#0b2a51] text-[#c1a052] rounded-2xl flex items-center justify-center mb-6">
                                    <Laptop size={32} />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-4">Développement informatique</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Développement web et mobile, systèmes d'information, intégration.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#0b2a51] text-[#c1a052] rounded-2xl flex items-center justify-center mb-6">
                                    <HardDrive size={32} />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-4">Réseaux, systèmes et cybersécurité</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Administration réseaux, sécurité, cloud, gestion de parc informatique.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#0b2a51] text-[#c1a052] rounded-2xl flex items-center justify-center mb-6">
                                    <Edit3 size={32} />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-4">Création numérique et multimédia</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Infographie, gestion de contenu, animation de communautés, rédaction web.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0b2a51] text-white rounded-[3rem] p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c1a052] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c1a052] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-[#c1a052] text-xs font-black uppercase tracking-[0.4em] mb-4">L'excellence</h2>
                                <h3 className="text-3xl font-black mb-6">Un tremplin vers l’emploi</h3>
                                <p className="text-blue-100 leading-relaxed mb-6">
                                    SupNum est un institut sélectif, accessible principalement aux bacheliers scientifiques. Il est reconnu pour son exigence académique, la qualité de son encadrement et l’adéquation de ses formations avec les besoins du marché.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle size={20} className="text-[#c1a052]" />
                                        <span>Technologies de l’information</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle size={20} className="text-[#c1a052]" />
                                        <span>Télécommunications et finance</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle size={20} className="text-[#c1a052]" />
                                        <span>Administration publique et création numérique</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center">
                                    <span className="block text-5xl font-black text-[#c1a052] mb-2">70%</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-blue-100">Des premiers diplômés recrutés dès leur sortie</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl text-center flex flex-col justify-center">
                                        <span className="block text-2xl font-black text-[#c1a052] mb-1">1920</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Heures de cours sur 3 ans</span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl text-center flex flex-col justify-center">
                                        <span className="block text-2xl font-black text-[#c1a052] mb-1">372</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Heures de cours magistraux</span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl text-center flex flex-col justify-center">
                                        <span className="block text-2xl font-black text-[#c1a052] mb-1">588</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Heures de TD</span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl text-center flex flex-col justify-center">
                                        <span className="block text-2xl font-black text-[#c1a052] mb-1">660</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Heures de TP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Join CTA */}
            <section className="py-24 bg-gray-100 text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0b2a51] mb-8 leading-tight">
                        Rejoignez SupNum dès aujourd'hui et choisissez une formation d'excellence, professionnelle et reconnue.
                    </h2>
                    <p className="text-gray-600 text-lg mb-10">
                        Par son ambition, sa formation et son engagement, SupNum affirme sa place de pôle d’excellence des métiers du numérique en Mauritanie, au service d’une jeunesse formée, qualifiée et prête à relever les défis de demain.
                    </p>
                    <Link href="/#formations" className="inline-block bg-[#0b2a51] text-white font-bold py-4 px-10 rounded-xl hover:bg-[#c1a052] transition-colors shadow-xl">
                        Voir nos Formations
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0b2a51] text-white py-12 border-t-8 border-[#c1a052] text-center">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">© 2026 Institut Supérieur du Numérique. Tous droits réservés.</p>
            </footer>
        </main>
    );
}
