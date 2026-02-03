
import Image from 'next/image';
import ChatWidget from '@/components/ChatWidget';
import { ArrowRight, BookOpen, GraduationCap, Headphones, HelpCircle, MapPin, Sparkles, Star, Users, CheckCircle, Globe, Award, Zap, ChevronRight, Mail, Phone as PhoneIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* Top Bar (Institutional) */}
      <div className="bg-[#0b2a51] text-white py-2 px-6 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 pt-0.5"><PhoneIcon size={12} className="text-blue-400" /> +222 45 24 45 44</span>
            <span className="flex items-center gap-2 pt-0.5"><Mail size={12} className="text-blue-400" /> contact@supnum.mr</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-300 transition-colors">Portail Étudiant</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-blue-300 transition-colors">Espace Parent</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-[#0b2a51]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <img src="/logo.png" alt="SupNum Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#0b2a51] font-black text-2xl leading-none tracking-tighter uppercase">SupNum</h1>
              <p className="text-[#c1a052] font-bold text-[10px] uppercase tracking-[0.15em] mt-1">Institut Supérieur du Numérique</p>
            </div>
          </div>

          <nav className="hidden lg:flex gap-8 text-[#0b2a51] font-bold text-sm uppercase">
            <a href="#" className="hover:text-[#c1a052] transition-colors border-b-2 border-transparent hover:border-[#c1a052] pb-1">Accueil</a>
            <a href="#" className="hover:text-[#c1a052] transition-colors border-b-2 border-transparent hover:border-[#c1a052] pb-1">Formations</a>
            <a href="#" className="hover:text-[#c1a052] transition-colors border-b-2 border-transparent hover:border-[#c1a052] pb-1">Recherche</a>
            <a href="#" className="hover:text-[#c1a052] transition-colors border-b-2 border-transparent hover:border-[#c1a052] pb-1">Institut</a>
            <a href="/admin" className="text-white bg-[#0b2a51] px-4 py-2 rounded shadow-lg hover:bg-[#c1a052] transition-all">Administration</a>
          </nav>
        </div>
      </header>

      {/* Hero Section (Institutional Style) */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/campus_hero.jpg"
            alt="SupNum Campus Aerial View"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a51]/95 via-[#0b2a51]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 animate-slide-up">
          <div className="max-w-2xl text-white">
            <div className="w-20 h-1.5 bg-[#c1a052] mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase">
              Bâtir le futur numérique de la Mauritanie
            </h2>
            <p className="text-xl mb-10 text-blue-50 font-medium leading-relaxed opacity-90">
              L'excellence académique au service de l'innovation et de la transformation digitale nationale.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#c1a052] text-white px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-[#0b2a51] transition-all flex items-center gap-3">
                Découvrir l'offre
                <ChevronRight size={18} />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-[#0b2a51] transition-all">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Banner */}
      <div className="bg-[#0b2a51] py-4 overflow-hidden relative border-y-4 border-[#c1a052]">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          <span className="text-white font-bold text-sm flex items-center gap-2"><Sparkles className="text-[#c1a052]" size={16} /> INSCRIPTIONS 2024 OUVERTES !</span>
          <span className="text-[#c1a052] opacity-50">•</span>
          <span className="text-white font-bold text-sm">NOUVEAU MASTER EN CYBERSÉCURITÉ</span>
          <span className="text-[#c1a052] opacity-50">•</span>
          <span className="text-white font-bold text-sm">PARTENARIAT AVEC HUAWEI : CERTIFICATIONS DISPONIBLES</span>
          <span className="text-[#c1a052] opacity-50">•</span>
          <span className="text-white font-bold text-sm underline">CONSULTEZ LES RÉSULTATS D'ADMISSION</span>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-[#0b2a51] text-xs font-black uppercase tracking-[0.4em] mb-4">Notre Mission</h3>
              <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Pourquoi choisir SupNum Mauritanie ?</h2>
              <div className="space-y-8">
                <MissionItem
                  icon={<Award className="text-[#c1a052]" />}
                  title="Diplômes Reconnus"
                  description="Des formations accréditées et orientées vers les besoins réels du marché de l'emploi technologique."
                />
                <MissionItem
                  icon={<Zap className="text-[#c1a052]" />}
                  title="Innovation Technologique"
                  description="Un environnement d'apprentissage moderne avec des laboratoires de pointe et des projets innovants."
                />
                <MissionItem
                  icon={<Globe className="text-[#c1a052]" />}
                  title="Ouverture Internationale"
                  description="Des partenariats académiques et industriels avec les leaders mondiaux du numérique."
                />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#c1a052] opacity-10 rounded-[2rem] group-hover:opacity-20 transition-opacity"></div>
              <Image
                src="/campus_entrance.jpg"
                alt="Entrée du Campus SupNum"
                width={800}
                height={600}
                className="rounded-[2rem] shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid (Refined) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h3 className="text-[#c1a052] text-xs font-black uppercase tracking-[0.4em] mb-4">Pôles d'Excellence</h3>
            <h2 className="text-4xl font-black text-[#0b2a51]">Des cursus spécialisés pour des experts recherchés</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProgramCard
              title="DSI"
              subtitle="Développement des Systèmes d'Information"
              description="Maîtrisez les architectures logicielles, la gestion base de données et l'ingénierie des systèmes complexes."
            />
            <ProgramCard
              title="RSS"
              subtitle="Réseaux et Sécurité des Systèmes"
              description="Devenez expert en protection des infrastructures critiques et en administration des réseaux modernes."
            />
            <ProgramCard
              title="DWM"
              subtitle="Développement Web et Multimédia"
              description="Concevez des interfaces immersives et développez des applications web performantes et innovantes."
            />
          </div>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Footer (Institutional Style) */}
      <footer className="bg-[#0b2a51] text-white py-20 border-t-8 border-[#c1a052]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white p-2 rounded transform rotate-[-3deg]">
                  <img src="/logo.png" alt="SupNum Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-2xl tracking-tighter">SUPNUM</span>
              </div>
              <p className="text-blue-100/60 text-sm leading-relaxed">
                Institut supérieur public dont la mission est la formation, la recherche et l'innovation dans le domaine du numérique.
              </p>
            </div>

            <div>
              <h4 className="text-[#c1a052] font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold text-blue-100/80">
                <li><a href="#" className="hover:text-white transition-colors">Politique de formation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Département Recherche</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agenda Institutionnel</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#c1a052] font-black uppercase tracking-widest text-xs mb-8">Coordonnées</h4>
              <ul className="space-y-4 text-sm font-bold text-blue-100/80">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#c1a052] shrink-0" />
                  <span>Tevragh-Zeina, Nouakchott, Mauritanie</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon size={16} className="text-[#c1a052] shrink-0" />
                  <span>+222 45 24 45 44</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#c1a052] font-black uppercase tracking-widest text-xs mb-8">Langues</h4>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-white/20 rounded font-bold hover:bg-white/10 transition-colors">Français</button>
                <button className="px-4 py-2 border border-white/20 rounded font-bold hover:bg-white/10 transition-colors font-arabic">العربية</button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:row justify-between items-center gap-6">
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">© 2024 Institut Supérieur du Numérique. Tous droits réservés.</span>
            <div className="flex gap-6 opacity-60 grayscale">
              <div className="w-8 h-8 flex items-center justify-center">FB</div>
              <div className="w-8 h-8 flex items-center justify-center">LN</div>
              <div className="w-8 h-8 flex items-center justify-center">TW</div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MissionItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
        {icon}
      </div>
      <div>
        <h4 className="text-[#0b2a51] font-black text-lg mb-2">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ProgramCard({ title, subtitle, description }: { title: string, subtitle: string, description: string }) {
  return (
    <div className="p-10 bg-white border-2 border-gray-100 rounded-[2rem] hover:border-[#c1a052] transition-all hover:translate-y-[-10px] shadow-sm hover:shadow-2xl group">
      <div className="w-16 h-16 bg-[#0b2a51] text-white flex items-center justify-center rounded-2xl font-black text-2xl mb-8 group-hover:bg-[#c1a052] transition-colors">
        {title}
      </div>
      <h4 className="text-gray-900 font-black text-xl mb-2">{subtitle}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2 text-[#0b2a51] font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Voir le programme <ArrowRight size={14} />
      </div>
    </div>
  );
}
