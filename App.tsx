import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Home, 
  Compass, 
  ShoppingBag, 
  Box, 
  PlusSquare, 
  Bell, 
  MessageSquare, 
  User,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Info,
  Building2,
  Layers,
  FileText,
  TrendingUp,
  List,
  ArrowLeft,
  Send,
  Paperclip,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Clock,
  ThumbsUp
} from 'lucide-react';

// --- Types ---
type ViewState = 'home' | 'category' | 'article' | 'ticket';
type CategoryId = 'about' | 'museums' | 'collectibles' | 'posts' | 'value' | 'lists';

interface CategoryCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

interface Guide {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface CategoryData {
  id: CategoryId;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accentColor: string;
  guides: Guide[];
  faqs: FAQ[];
  content?: React.ReactNode;
}

// --- Mock Data ---
const CATEGORIES_DATA: Record<string, CategoryData> = {
  about: {
    id: 'about',
    title: 'Sobre Museum App',
    description: 'Aprende qué es Museum App, nuestra misión y cómo empezar tu viaje en el coleccionismo digital.',
    icon: Info,
    color: 'from-blue-400 to-blue-600',
    accentColor: 'bg-blue-50 text-blue-600',
    content: (
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">¿Qué es Museum App?</h2>
          <p>
            Museum App es una <strong className="text-slate-900">red social diseñada específicamente para coleccionistas</strong> de todo el mundo. Nace de la pasión por los objetos coleccionables, de saber qué historia esconde detrás cada artículo. Nuestra misión es proporcionar un entorno social a los coleccionistas ofreciéndoles todas las herramientas posibles para ver, exhibir y organizar su colección, ofreciéndoles la posibilidad de crear un museo y repartir los coleccionables en distintas secciones, así como llevar un registro de datos público y privado.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">¿Por qué Museum App?</h2>
          <p>
            El coleccionismo es un hobby social, seguro que tienes amigos coleccionistas de tu nicho; pueden ser cromos deportivos antiguos, juguetes, videojuegos, monedas de Estados Unidos. A todos nos gusta mostrar nuestras últimas adquisiciones, en muchas ocasiones tienen una gran historia detrás que debe ser contada. Museum App te ofrece la posibilidad de crear un registro virtual que puedes actualizar día a día y dejar en internet un legado de tu colección, poder mostrarle a tus conocidos tu colección y exhibirla como te gustaría, como si invitaras a un amigo a tu casa y le enseñaras lo que tienes.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">¿Para quién es Museum App?</h2>
          <p>
            Nuestra plataforma es perfecta para cualquier coleccionista. Si estás en este hobby, este es tu lugar ideal. Regístrate y descubre cuántas herramientas diferentes ofrece Museum App. Principalmente es un entorno social que te permite conocer a otros coleccionistas, subir coleccionables y posts, además de crear tu museo, pero además te ofrece herramientas para llevar la contabilidad de tu colección, para encontrar coleccionables a la venta a través de un gran directorio de tiendas y páginas especializadas.
          </p>
        </div>
      </div>
    ),
    guides: [
      { id: 'what-is', title: '¿Qué es Museum App?', excerpt: 'Descubre la red social definitiva para coleccionistas.', readTime: '2 min' },
      { id: 'getting-started', title: 'Guía de inicio rápido', excerpt: 'Configura tu perfil y empieza a explorar en 5 minutos.', readTime: '5 min' },
      { id: 'mission', title: 'Nuestra misión', excerpt: 'Por qué hacemos lo que hacemos y hacia dónde vamos.', readTime: '3 min' }
    ],
    faqs: [
      { question: '¿Museum App es gratis?', answer: 'Sí, Museum App es gratis y puedes registrarte ahora mismo. Ofrecemos planes Premium para funcionalidades avanzadas de análisis de mercado y almacenamiento ilimitado de fotos en alta resolución.' },
      { question: '¿Cómo contacto al soporte?', answer: 'Puedes usar el botón "Crear ticket" en la parte inferior de esta página o enviarnos un correo directo si no puedes acceder a tu cuenta.' },
      { question: '¿Es seguro subir mis datos?', answer: 'Absolutamente. Utilizamos encriptación de nivel bancario para proteger tus datos y nunca compartimos tu información personal con terceros sin tu consentimiento explícito.' }
    ]
  },
  museums: {
    id: 'museums',
    title: 'Museos Virtuales',
    description: 'Crea y personaliza tu museo virtual. Aprende a organizar tus salas y exhibiciones.',
    icon: Building2,
    color: 'from-purple-400 to-purple-600',
    accentColor: 'bg-purple-50 text-purple-600',
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          En Museum App, creemos que cada colección merece su propio espacio de exhibición. La función de <strong>Museos Virtuales</strong> te permite diseñar y curar tus propias galerías digitales. No se trata solo de subir fotos; se trata de crear una experiencia.
        </p>
        <p>
          Puedes organizar tus items en diferentes "Salas", personalizar el fondo, la iluminación virtual y el orden de exhibición. Invita a tus amigos a realizar visitas guiadas virtuales o deja tu museo abierto al público para que la comunidad global pueda admirar tus tesoros.
        </p>
      </div>
    ),
    guides: [
      { id: 'create-museum', title: 'Crea tu primer museo', excerpt: 'Paso a paso para inaugurar tu espacio digital.', readTime: '6 min' },
      { id: 'customization', title: 'Personalización de salas', excerpt: 'Cambia fondos, vitrinas e iluminación de tus salas.', readTime: '4 min' },
      { id: 'visibility', title: 'Privacidad y Visibilidad', excerpt: 'Controla quién puede ver tu colección.', readTime: '3 min' }
    ],
    faqs: [
      { question: '¿Cuántos museos puedo crear?', answer: 'Los usuarios gratuitos pueden crear 1 museo principal con hasta 3 salas. Los usuarios Premium pueden crear museos ilimitados.' },
      { question: '¿Puedo invitar amigos a mi museo?', answer: '¡Sí! Puedes generar un enlace de invitación o hacer tu museo público para que cualquiera en la comunidad pueda visitarlo y dejar comentarios en tu libro de visitas.' }
    ]
  },
  collectibles: {
    id: 'collectibles',
    title: 'Coleccionables',
    description: 'Sube, gestiona y categoriza tus items. Todo sobre la gestión de tu inventario.',
    icon: Layers,
    color: 'from-green-400 to-emerald-600',
    accentColor: 'bg-green-50 text-green-600',
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          El corazón de Museum App son tus coleccionables. Hemos desarrollado un sistema de gestión de inventario robusto pero fácil de usar. Cada item que subes es mucho más que una foto; es un registro detallado de su historia, condición, procedencia y valor.
        </p>
        <p>
          Utiliza nuestro sistema de etiquetas inteligentes para categorizar automáticamente tus items. Además, puedes vincular tus coleccionables a la base de datos global para obtener información automática sobre rareza y variantes.
        </p>
      </div>
    ),
    guides: [
      { id: 'upload', title: 'Cómo subir un coleccionable', excerpt: 'Añade fotos, detalles y estado de conservación.', readTime: '3 min' },
      { id: 'bulk', title: 'Importación masiva', excerpt: 'Sube toda tu colección desde un Excel o CSV.', readTime: '8 min' },
      { id: 'tags', title: 'Sistema de etiquetas', excerpt: 'Organiza tus items para encontrarlos rápidamente.', readTime: '2 min' }
    ],
    faqs: [
      { question: '¿Qué formatos de imagen soportan?', answer: 'Soportamos JPG, PNG y HEIC hasta 10MB por imagen. Recomendamos usar formato cuadrado 1:1 para la mejor visualización en el feed.' },
      { question: '¿Puedo vender mis coleccionables?', answer: 'Sí, puedes marcar cualquier item como "En Venta" y aparecerá automáticamente en la sección de Compras del marketplace global.' }
    ]
  },
  posts: {
    id: 'posts',
    title: 'Posts y Comunidad',
    description: 'Comparte tus historias, interactúa con otros coleccionistas y haz crecer tu red.',
    icon: FileText,
    color: 'from-orange-400 to-orange-600',
    accentColor: 'bg-orange-50 text-orange-600',
    guides: [
      { id: 'feed', title: 'Entendiendo el Feed', excerpt: 'Cómo funciona el algoritmo de descubrimiento.', readTime: '4 min' },
      { id: 'stories', title: 'Compartir historias', excerpt: 'Mejores prácticas para posts atractivos.', readTime: '3 min' }
    ],
    faqs: [
      { question: '¿Cómo reportar contenido?', answer: 'Usa el menú de tres puntos en cualquier publicación y selecciona "Reportar". Nuestro equipo revisa los reportes en menos de 24 horas.' }
    ]
  },
  value: {
    id: 'value',
    title: 'Valor de Colección',
    description: 'Herramientas de análisis de mercado y seguimiento del valor de tu portfolio.',
    icon: TrendingUp,
    color: 'from-teal-400 to-cyan-600',
    accentColor: 'bg-teal-50 text-teal-600',
    guides: [
      { id: 'market-data', title: 'Fuentes de datos', excerpt: 'De dónde obtenemos los precios de mercado.', readTime: '5 min' }
    ],
    faqs: [
      { question: '¿Cada cuánto se actualizan los precios?', answer: 'Los precios de mercado se actualizan diariamente basándose en ventas recientes en plataformas principales como eBay y casas de subastas asociadas.' }
    ]
  },
  lists: {
    id: 'lists',
    title: 'Listas de Búsqueda',
    description: 'Gestiona tus "grials", configura alertas y no pierdas ninguna oportunidad.',
    icon: List,
    color: 'from-pink-400 to-rose-600',
    accentColor: 'bg-pink-50 text-pink-600',
    guides: [
      { id: 'alerts', title: 'Configurar alertas', excerpt: 'Recibe notificaciones cuando aparezca un item.', readTime: '2 min' }
    ],
    faqs: [
      { question: '¿Las alertas son inmediatas?', answer: 'Sí, enviamos notificaciones push y email en el momento en que un item que coincida con tu lista de búsqueda sea listado en el marketplace.' }
    ]
  }
};

// --- Components ---

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Museum<span className=".text-slate-400 text-sm">.app</span></span>
          </div>

          {/* Center Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="#" className="flex items-center gap-1 hover:text-primary-600 transition-colors"><Home size={18} /> Inicio</a>
            <a href="#" className="flex items-center gap-1 hover:text-primary-600 transition-colors"><Compass size={18} /> Explorar</a>
            <a href="#" className="flex items-center gap-1 hover:text-primary-600 transition-colors"><ShoppingBag size={18} /> Compras</a>
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-primary-50 hover:text-primary-600 transition-all">
                <Box size={16} className="text-primary-500" /> 
                Coleccionables 
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Search Bar (Nav) */}
          <div className="hidden lg:flex flex-1 max-w-xs mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar coleccionables..." 
                className="block w-full pl-10 pr-3 py-2 border-none rounded-full leading-5 bg-slate-100 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all shadow-inner" 
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 text-slate-600">
            <button className="hidden sm:flex items-center gap-1 hover:text-primary-600 transition-colors font-medium">
              <PlusSquare size={20} /> <span className="hidden xl:inline">Subir</span>
            </button>
            <button className="hover:text-primary-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 transform translate-x-1/2 -translate-y-1/4"></span>
            </button>
            <button className="hover:text-primary-600 transition-colors">
              <MessageSquare size={20} />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-[2px] cursor-pointer hover:shadow-md transition-all">
                 <img src="https://picsum.photos/200" alt="User" className="rounded-full w-full h-full object-cover border-2 border-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-slate-700">Pablo Becerra</span>
              <ChevronDown size={14} className="hidden lg:block text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const BackgroundBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    <div className="absolute top-1/2 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  </div>
);

const Hero = ({ onSearch }: { onSearch: (q: string) => void }) => {
  return (
    <div className="relative py-16 lg:py-24 text-center px-4 overflow-hidden">
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/50 shadow-sm backdrop-blur-sm text-primary-600 text-sm font-medium mb-6 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Centro de Ayuda & Soporte
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
          ¿Cómo podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">ayudarte?</span>
        </h1>
        
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Sácale el máximo partido a Museum App. Accede a guías, preguntas frecuentes y obtén soporte personalizado de nuestro equipo.
        </p>

        <div className="relative max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-300 via-purple-300 to-primary-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2 ring-1 ring-slate-900/5">
            <Search className="ml-4 text-slate-400 w-6 h-6" />
            <input 
              type="text"
              placeholder="Buscar en el centro de ayuda (ej. 'Cómo subir un coleccionable')"
              className="w-full p-4 text-lg bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="bg-slate-900 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCard: React.FC<CategoryCardProps> = ({ icon: Icon, title, description, color, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col text-left bg-white/70 backdrop-blur-sm border border-white/60 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700`}></div>
      
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform duration-300`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm mb-6">{description}</p>
      
      <div className="mt-auto flex items-center text-primary-600 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        Ver artículos <ChevronDown className="-rotate-90 ml-1" size={16} />
      </div>
    </button>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between py-5 text-left group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary-600' : 'text-slate-700 group-hover:text-primary-600'}`}>
          {question}
        </span>
        <span className={`ml-4 p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary-100 text-primary-600 rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500'}`}>
          <ChevronDown size={20} />
        </span>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-600 leading-relaxed">
            {answer}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-slate-400">¿Fue útil esta respuesta?</span>
            <button className="p-1 text-slate-400 hover:text-green-500 transition-colors"><ThumbsUp size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryDetail = ({ categoryId, onBack, onArticleClick, onTicketClick }: { categoryId: string, onBack: () => void, onArticleClick: () => void, onTicketClick: () => void }) => {
  const data = CATEGORIES_DATA[categoryId];
  if (!data) return <div>Categoría no encontrada</div>;

  const Icon = data.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <div className="mb-12">
        <button 
          onClick={onBack} 
          className="group mb-6 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
              <ArrowLeft size={16} />
          </div>
          <span className="font-medium">Volver a categorías</span>
        </button>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white shadow-xl overflow-hidden">
           <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${data.color} opacity-10 rounded-bl-full -mr-10 -mt-10 blur-3xl`}></div>
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${data.color} flex items-center justify-center text-white shadow-lg transform -rotate-3`}>
                <Icon size={40} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{data.title}</h1>
                <p className="text-lg text-slate-600 max-w-2xl">{data.description}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Description Content */}
          {data.content && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
               {data.content}
            </div>
          )}

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${data.accentColor} bg-opacity-50`}>
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Guías y Artículos</h2>
            </div>
            
            <div className="grid gap-4">
              {data.guides.map((guide) => (
                <div 
                  key={guide.id}
                  onClick={onArticleClick}
                  className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{guide.title}</h3>
                    <p className="text-slate-500 text-sm mb-3">{guide.excerpt}</p>
                    <div className="flex items-center text-xs font-medium text-slate-400 gap-2">
                      <Clock size={14} />
                      {guide.readTime} de lectura
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${data.accentColor} bg-opacity-50`}>
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Preguntas Frecuentes</h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              {data.faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="sticky top-24">
              <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-8 text-white text-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500 rounded-full blur-[60px] opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-300">
                    <MessageSquare size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">¿Sigues con dudas?</h3>
                  <p className="text-slate-400 text-sm mb-6">Si no encuentras la respuesta en nuestras guías, nuestro equipo está aquí para ayudarte.</p>
                  <button 
                    onClick={onTicketClick}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-900/50 flex items-center justify-center gap-2"
                  >
                    <PlusSquare size={18} />
                    Abrir Ticket
                  </button>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-4">Categorías relacionadas</h4>
                 <div className="space-y-3">
                    {Object.values(CATEGORIES_DATA).filter(c => c.id !== categoryId).slice(0, 3).map(cat => (
                      <button key={cat.id} onClick={onBack} className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-lg transition-colors text-left group">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-xs`}>
                             <cat.icon size={14} />
                          </div>
                          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{cat.title}</span>
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const TicketForm = ({ onCancel }: { onCancel: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Ticket enviado con éxito!");
      onCancel();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 pt-8 pb-20">
      <button 
        onClick={onCancel} 
        className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Cancelar y volver</span>
      </button>

      <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background element inside form */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Crear ticket de soporte</h2>
              <p className="text-slate-500 mt-2">Cuéntanos tu problema y nuestro equipo te ayudará lo antes posible.</p>
            </div>
            <div className="hidden md:flex w-12 h-12 bg-primary-50 rounded-2xl items-center justify-center text-primary-600">
              <MessageSquare size={24} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Categoría <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 focus:bg-white transition-all appearance-none outline-none text-slate-700">
                    <option>Selecciona una categoría</option>
                    <option>Problema técnico</option>
                    <option>Facturación</option>
                    <option>Reportar usuario</option>
                    <option>Sugerencia</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Prioridad</label>
                <div className="relative">
                    <select className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 focus:bg-white transition-all appearance-none outline-none text-slate-700">
                      <option>Normal</option>
                      <option>Alta</option>
                      <option>Baja</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Asunto <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Resume brevemente tu problema..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 focus:bg-white transition-all outline-none"
                required
              />
              <div className="text-right text-xs text-slate-400">0/100 caracteres</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Descripción detallada <span className="text-red-500">*</span></label>
              <textarea 
                rows={6}
                placeholder="Por favor proporciona todos los detalles posibles sobre tu problema o pregunta..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 focus:bg-white transition-all outline-none resize-none"
                required
              ></textarea>
               <div className="text-right text-xs text-slate-400">0/5000 caracteres</div>
            </div>

            <div className="p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-primary-50/50 hover:border-primary-300 transition-all cursor-pointer group text-center">
                <input type="file" className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                        <Paperclip size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-primary-700">Adjuntar archivos (opcional)</span>
                    <span className="text-xs text-slate-400">JPG, PNG, PDF hasta 5MB</span>
                </label>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-cyan-600 hover:from-primary-600 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transform hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    Enviar Ticket <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ArticleView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 pt-8 pb-20">
      <button 
        onClick={onBack} 
        className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Volver</span>
      </button>

      <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl overflow-hidden">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-primary-100 to-cyan-50 relative overflow-hidden">
           <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary-200/50 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
           <div className="absolute bottom-8 left-8 md:left-12 flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-primary-600">
                 <Info size={28} />
              </div>
              <div>
                  <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">General</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Sobre Museum App</h1>
              </div>
           </div>
        </div>

        <div className="p-8 md:p-12">
            <div className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-slate-800 font-bold">¿Qué es Museum App?</h2>
                <p className="text-slate-600">
                    Museum App es una <strong className="text-primary-600">red social diseñada específicamente para coleccionistas</strong> de todo el mundo. Nace de la pasión por los objetos coleccionables, de saber qué historia esconde detrás cada artículo. Nuestra misión es proporcionar un entorno social a los coleccionistas ofreciéndoles todas las herramientas posibles para ver, exhibir y organizar su colección.
                </p>
                
                <div className="my-8 p-6 bg-slate-50 rounded-2xl border-l-4 border-primary-400">
                    <p className="text-slate-700 italic mb-0">
                        "El lugar donde tu colección cobra vida y encuentra su audiencia."
                    </p>
                </div>

                <h2 className="text-slate-800 font-bold mt-8">¿Por qué Museum App?</h2>
                <p className="text-slate-600">
                    El coleccionismo es un hobby social. Seguro que tienes amigos coleccionistas de tu nicho; pueden ser cromos deportivos antiguos, juguetes, videojuegos, monedas, etc. A todos nos gusta mostrar nuestras últimas adquisiciones. Museum App te ofrece la posibilidad de:
                </p>
                <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span>Crear un registro virtual actualizado día a día.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span>Dejar en internet un legado de tu colección.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span>Exhibirla como te gustaría, invitando amigos a tu museo virtual.</span>
                    </li>
                </ul>

                <h2 className="text-slate-800 font-bold mt-8">¿Para quién es?</h2>
                <p className="text-slate-600">
                    Nuestra plataforma es perfecta para cualquier coleccionista. Si estás en este hobby, este es tu lugar ideal. Regístrate y descubre cuántas herramientas diferentes ofrece Museum App.
                </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-slate-500 text-sm">
                    ¿Te resultó útil este artículo?
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600 text-sm font-medium">
                        Sí, gracias
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600 text-sm font-medium">
                        No mucho
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CategoryGrid = ({ onSelectCategory }: { onSelectCategory: (id: CategoryId) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Explorar por categorías</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Object.values(CATEGORIES_DATA).map((cat) => (
          <CategoryCard 
            key={cat.id}
            title={cat.title}
            description={cat.description}
            icon={cat.icon}
            color={cat.color}
            onClick={() => onSelectCategory(cat.id as CategoryId)}
          />
        ))}
        
        {/* Contact Card */}
        <div className="md:col-span-2 lg:col-span-3 mt-4">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-30"></div>
                
                <div className="relative z-10 mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">¿No encuentras lo que buscas?</h3>
                    <p className="text-slate-300">Nuestro equipo de soporte está listo para ayudarte con cualquier problema específico.</p>
                </div>
                <button 
                    onClick={() => onSelectCategory('ticket' as any)}
                    className="relative z-10 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg whitespace-nowrap flex items-center gap-2"
                >
                    <PlusSquare size={20} className="text-primary-600" />
                    Abrir un Ticket
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-12 mt-auto relative z-10">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-slate-400 text-sm">
        © 2023 Museum App. Todos los derechos reservados.
      </div>
      <div className="flex gap-6 text-slate-500 text-sm font-medium">
        <a href="#" className="hover:text-primary-600 transition-colors">Términos</a>
        <a href="#" className="hover:text-primary-600 transition-colors">Privacidad</a>
        <a href="#" className="hover:text-primary-600 transition-colors">Cookies</a>
        <a href="#" className="hover:text-primary-600 transition-colors">Contacto</a>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleSearch = (q: string) => {
    // Mock search functionality
    console.log("Searching for:", q);
  };

  const handleCategorySelect = (id: string) => {
    if (id === 'ticket') {
        setView('ticket');
    } else if (CATEGORIES_DATA[id]) {
        setSelectedCategory(id);
        setView('category');
    }
  };

  const goHome = () => {
    setView('home');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-primary-100 selection:text-primary-700 flex flex-col">
      <BackgroundBlobs />
      <Navbar />

      <main className="flex-grow relative z-0">
        {view === 'home' && (
          <>
            <Hero onSearch={handleSearch} />
            <CategoryGrid onSelectCategory={handleCategorySelect} />
          </>
        )}

        {view === 'category' && selectedCategory && (
            <CategoryDetail 
                categoryId={selectedCategory} 
                onBack={goHome}
                onArticleClick={() => setView('article')}
                onTicketClick={() => setView('ticket')}
            />
        )}

        {view === 'ticket' && (
             <TicketForm onCancel={() => {
                 if (selectedCategory) {
                     setView('category');
                 } else {
                     setView('home');
                 }
             }} />
        )}

        {view === 'article' && (
            <div className="px-4">
                <ArticleView onBack={() => {
                    if (selectedCategory) {
                        setView('category');
                    } else {
                        setView('home');
                    }
                }} />
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}