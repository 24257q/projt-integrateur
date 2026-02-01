import Image from 'next/image';
import ChatWidget from '@/components/ChatWidget';
import { ArrowRight, BookOpen, GraduationCap, Headphones, HelpCircle, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen font-sans overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/campus.png"
          alt="SupNum Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-24 md:pb-32 flex flex-col items-center">
        {/* Navigation / Header */}
        <header className="w-full max-w-6xl flex justify-between items-center mb-20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-white/20">
              <img src="/logo.png" alt="SupNum Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight hidden sm:block">SupNum</span>
          </div>
          <nav className="flex gap-6 text-white/90 font-medium text-sm">
            <a href="#" className="hover:text-white transition-colors">Accueil</a>
            <a href="#" className="hover:text-white transition-colors">Programmes</a>
            <a href="#" className="hover:text-white transition-colors">Espace Parent</a>
            <a href="/admin" className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-all text-xs border border-blue-400/30">Admin</a>
          </nav>
        </header>

        {/* Content */}
        <div className="text-center max-w-4xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Intelligence Artificielle au service de l'excellence
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-sm">
            L'Assistance Intellegente de <span className="text-blue-400">SupNum</span>.
          </h1>

          <p className="text-xl md:text-2xl text-blue-50 mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            Obtenez des réponses instantanées sur les inscriptions, les formations et la vie quotidienne sur notre campus numérique.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-2xl shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
              Découvrir nos formations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-blue-600/30 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">
              Procédures d'inscription
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl animate-fade-in-delayed">
          <FeatureCard
            icon={<BookOpen className="w-6 h-6 text-blue-400" />}
            title="Formations"
            description="Explorez nos Licences et Masters spécialisés en informatique et numérique."
          />
          <FeatureCard
            icon={<GraduationCap className="w-6 h-6 text-blue-400" />}
            title="Inscriptions"
            description="Guide complet étape par étape pour rejoindre l'Institut cette année."
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6 text-blue-400" />}
            title="Vie au Campus"
            description="Services étudiants, localisation et toutes les ressources utiles."
          />
        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="relative z-10 w-full py-12 border-t border-white/10 bg-black/20 backdrop-blur-md mt-24">
        <div className="container mx-auto px-6 flex flex-col md:row justify-between items-center gap-8 opacity-70">
          <div className="text-white text-sm">
            © 2024 Institut Supérieur du Numérique. Tous droits réservés.
          </div>
          <div className="flex gap-8 text-white text-sm font-medium">
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Mentions Légales</a>
            <a href="#" className="hover:underline">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-blue-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-blue-100/70 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
