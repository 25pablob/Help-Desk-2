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
  ThumbsUp,
  Filter,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  Lock,
  Star,
  Calendar,
  Hash
} from 'lucide-react';

// --- Types ---
type ViewState = 'home' | 'category' | 'article' | 'ticket' | 'my-tickets' | 'ticket-detail' | 'faq';
type CategoryId = 'about' | 'museums' | 'collectibles' | 'posts' | 'value' | 'lists';
type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';

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

interface Ticket {
  id: string;
  category: string;
  status: TicketStatus;
  title: string;
  preview: string;
  priority: TicketPriority;
  comments: number;
  date: string;
  updatedAt: string;
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

interface TicketMessage {
  id: string;
  sender: string;
  role: 'user' | 'support';
  message: string;
  date: string;
}

// --- Mock Data ---
const MOCK_TICKETS: Ticket[] = [
  {
    id: '10002',
    category: 'Report Content',
    status: 'resolved',
    title: 'Hay un usuario intentado estafar a los demás',
    preview: 'El usuario @elrubius ha publicado en su biografía una página scam...',
    priority: 'urgent',
    comments: 2,
    date: '20 nov 2025, 03:29',
    updatedAt: '20 nov 2025, 03:29'
  },
  {
    id: '0023',
    category: 'Privacidad y datos personales',
    status: 'resolved',
    title: 'Solicitud de exportación de datos',
    preview: 'Hola, me gustaría obtener una copia de todos mis datos almacenados en la plataforma...',
    priority: 'normal',
    comments: 1,
    date: 'hace 23 días',
    updatedAt: 'hace 22 días'
  },
  {
    id: '0019',
    category: 'Problemas con Premium/Pago',
    status: 'in_progress',
    title: 'Error al procesar el pago de la suscripción anual',
    preview: 'He intentado renovar mi suscripción Premium pero recibo un error 503...',
    priority: 'high',
    comments: 3,
    date: 'hace 24 días',
    updatedAt: 'hace 1 hora'
  },
];

const MOCK_TICKET_MESSAGES: TicketMessage[] = [
  {
    id: '1',
    sender: 'Pablo Becerra',
    role: 'user',
    message: 'El usuario @elrubius ha publicado en su biografía una página scam que te pide la tarjeta de crédito y está dejando comentarios para que el resto de los usuarios acceda',
    date: '20 nov 2025, 03:29'
  },
  {
    id: '2',
    sender: 'Pablo Becerra 2',
    role: 'support',
    message: 'Muchas gracias por avisarnos, hemos eliminado todos los comentarios de @rubius y baneado su cuenta',
    date: '20 nov 2025, 03:29'
  }
];

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

const Navbar = ({ onMessagesClick, onHomeClick, onFAQClick }: { onMessagesClick: () => void, onHomeClick: () => void, onFAQClick: () => void }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <div onClick={onHomeClick} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Museum<span className=".text-slate-400 text-sm">.app</span></span>
          </div>

          {/* Center Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className="flex items-center gap-1 hover:text-primary-600 transition-colors"><Home size={18} /> Inicio</a>
            <a href="#" className="flex items-center gap-1 hover:text-primary-600 transition-colors"><Compass size={18} /> Explorar</a>
            <button onClick={onFAQClick} className="flex items-center gap-1 hover:text-primary-600 transition-colors"><HelpCircle size={18} /> Preguntas Frecuentes</button>
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
            <button onClick={onMessagesClick} className="hover:text-primary-600 transition-colors relative group" title="Mis Tickets">
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white hidden group-hover:block"></span>
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

const Hero = ({ onSearch, onMyTicketsClick }: { onSearch: (q: string) => void, onMyTicketsClick: () => void }) => {
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

        <div className="relative max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300 mb-6">
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

        <button 
          onClick={onMyTicketsClick}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
        >
          Ver estado de mis tickets <ArrowLeft className="rotate-180" size={14} />
        </button>
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

const FAQView = ({ onBack }: { onBack: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  // Flatten FAQs logic for search
  const filteredCategories = Object.values(CATEGORIES_DATA).filter(cat => {
    // If category is selected via sidebar, only show that category (unless search is active)
    if (activeCategory !== 'all' && cat.id !== activeCategory && searchTerm === '') {
      return false;
    }

    // If searching, check if any question matches
    if (searchTerm) {
      const hasMatchingFAQ = cat.faqs.some(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return hasMatchingFAQ;
    }

    return true;
  });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveCategory(id as CategoryId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onBack} 
        className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Volver al inicio</span>
      </button>

      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200/50 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Preguntas <span className="text-primary-600">Frecuentes</span></h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Encuentra respuestas rápidas a las dudas más comunes sobre Museum App, nuestra plataforma y herramientas.
        </p>

        {/* FAQ Search */}
        <div className="max-w-xl mx-auto mt-8 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-primary-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
          <div className="relative flex items-center bg-white rounded-xl p-2 shadow-sm">
            <Search className="ml-3 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar una pregunta..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-2">
            <h3 className="font-bold text-slate-900 mb-4 px-3">Categorías</h3>
            <button 
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                activeCategory === 'all' 
                ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-500"><Hash size={14} /></div>
              Todas las preguntas
            </button>
            {Object.values(CATEGORIES_DATA).map((cat) => (
              <button 
                key={cat.id}
                onClick={() => handleScrollTo(`faq-section-${cat.id}`)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                  activeCategory === cat.id 
                  ? 'bg-white text-primary-700 shadow-md ring-1 ring-slate-100' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                 <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-[10px]`}>
                    <cat.icon size={12} />
                 </div>
                 {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-200">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search size={32} />
               </div>
               <h3 className="text-lg font-medium text-slate-700">No encontramos resultados</h3>
               <p className="text-slate-500 text-sm mt-1">Intenta con otros términos de búsqueda.</p>
            </div>
          ) : (
            filteredCategories.map((cat) => {
              // Filter FAQs inside the category if search is active
              const visibleFaqs = searchTerm 
                ? cat.faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.answer.toLowerCase().includes(searchTerm.toLowerCase()))
                : cat.faqs;

              if (visibleFaqs.length === 0) return null;

              return (
                <div key={cat.id} id={`faq-section-${cat.id}`} className="scroll-mt-28">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md`}>
                      <cat.icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{cat.title}</h2>
                      <p className="text-slate-500 text-sm">{visibleFaqs.length} preguntas disponibles</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                    {visibleFaqs.map((faq, idx) => (
                      <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              )
            })
          )}

          {/* Contact Section at bottom */}
          <div className="mt-12 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
             <h3 className="text-2xl font-bold mb-4 relative z-10">¿No encontraste lo que buscabas?</h3>
             <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">
               Nuestro equipo de soporte está disponible para resolver dudas más específicas o problemas técnicos.
             </p>
             <button className="relative z-10 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30">
               Contactar Soporte
             </button>
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

const TicketListView = ({ onBack, onCreateClick, onTicketClick }: { onBack: () => void, onCreateClick: () => void, onTicketClick: (id: string) => void }) => {
  const [filter, setFilter] = useState<'all' | TicketStatus>('all');

  const filteredTickets = filter === 'all' 
    ? MOCK_TICKETS 
    : MOCK_TICKETS.filter(ticket => ticket.status === filter);

  const getStatusBadge = (status: TicketStatus) => {
    switch(status) {
      case 'resolved': 
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">Resuelto</span>;
      case 'open': 
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">Abierto</span>;
      case 'in_progress': 
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">En progreso</span>;
      case 'closed': 
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">Cerrado</span>;
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-slate-400';
    }
  };

  const getPriorityLabel = (priority: TicketPriority) => {
     switch(priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'normal': return 'Normal';
      case 'low': return 'Baja';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onBack} 
        className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Volver al inicio</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 mb-2">Mis Tickets de Soporte</h1>
           <p className="text-slate-500">Gestiona y consulta el estado de tus solicitudes de ayuda.</p>
        </div>
        <button 
          onClick={onCreateClick}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <PlusSquare size={18} />
          Crear ticket de soporte
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg p-2 mb-8 overflow-x-auto">
         <div className="flex gap-1 min-w-max">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'open', label: 'Abiertos' },
              { id: 'in_progress', label: 'En progreso' },
              { id: 'resolved', label: 'Resueltos' },
              { id: 'closed', label: 'Cerrados' }
            ].map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filter === tab.id 
                    ? 'bg-white text-primary-600 shadow-md' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                  }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      <div className="space-y-4">
         {filteredTickets.length === 0 ? (
           <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                 <MessageSquare size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-700">No tienes tickets en esta categoría</h3>
              <p className="text-slate-500 text-sm mt-1">Cuando crees un ticket, aparecerá aquí.</p>
           </div>
         ) : (
           filteredTickets.map((ticket) => (
             <div 
               key={ticket.id}
               onClick={() => onTicketClick(ticket.id)}
               className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group cursor-pointer relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-3">
                   <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-mono font-bold text-slate-400">#{ticket.id}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{ticket.category}</span>
                   </div>
                   <div className="self-start">
                      {getStatusBadge(ticket.status)}
                   </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary-700 transition-colors">{ticket.title}</h3>
                
                <div className="flex items-start gap-2 mb-6">
                   <span className="text-primary-500 font-medium text-sm whitespace-nowrap">Soporte:</span>
                   <p className="text-slate-500 text-sm line-clamp-2">{ticket.preview}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                         <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`}></div>
                         <span className="text-slate-600">{getPriorityLabel(ticket.priority)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                         <MessageSquare size={14} />
                         <span>{ticket.comments}</span>
                      </div>
                   </div>
                   <div className="text-slate-400 text-xs">
                      {ticket.date}
                   </div>
                </div>
             </div>
           ))
         )}
      </div>
    </div>
  );
};

const TicketDetailView = ({ ticketId, onBack }: { ticketId: string, onBack: () => void }) => {
  const ticket = MOCK_TICKETS.find(t => t.id === ticketId) || MOCK_TICKETS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onBack} 
        className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Volver al centro de ayuda</span>
      </button>

      <div className="mb-8">
         <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Ticket #{ticket.id}</h1>
         <p className="text-lg text-slate-500">{ticket.title}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Messages */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-xl font-bold text-slate-800">Mensajes</h2>
           
           <div className="space-y-6">
             {MOCK_TICKET_MESSAGES.map((msg) => (
               <div key={msg.id} className="flex gap-4">
                  {msg.role === 'user' ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                       <img src="https://picsum.photos/200" alt="User" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm flex-shrink-0">
                       P
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-1">
                     <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${msg.role === 'support' ? 'text-primary-600' : 'text-slate-800'}`}>
                          {msg.sender}
                        </span>
                        {msg.role === 'user' ? (
                           <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-md">Tú</span>
                        ) : (
                           <div className="flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-bold uppercase rounded-md border border-primary-100">
                             <CheckCircle2 size={10} /> Equipo de soporte
                           </div>
                        )}
                        <span className="text-xs text-slate-400 ml-auto">{msg.date}</span>
                     </div>
                     
                     <div className={`p-5 rounded-2xl text-slate-700 leading-relaxed shadow-sm border ${
                        msg.role === 'support' 
                        ? 'bg-primary-100 border-primary-200' 
                        : 'bg-white border-slate-100'
                     }`}>
                        {msg.message}
                     </div>
                  </div>
               </div>
             ))}
           </div>

           {/* Closed Ticket State */}
           <div className="mt-8 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                 <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Este ticket está cerrado</h3>
              <p className="text-slate-500 text-sm mb-6">No puedes responder a un ticket cerrado</p>
              
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors inline-flex items-center gap-2 shadow-lg shadow-primary-500/20">
                 <Star size={16} /> Dar feedback
              </button>
           </div>
        </div>

        {/* Right Column: Info */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Información</h3>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">Estado</label>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                       Resuelto
                    </span>
                 </div>
                 
                 <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">Prioridad</label>
                    <div className="flex items-center gap-2 text-red-500 font-medium">
                       <div className="w-2 h-2 rounded-full bg-red-500"></div>
                       Urgent
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">Categoría</label>
                    <div className="font-medium text-slate-800">
                       {ticket.category}
                    </div>
                 </div>
                 
                 <div className="pt-4 border-t border-slate-100">
                    <div className="mb-4">
                       <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">Creado el</label>
                       <div className="text-sm text-slate-700">{ticket.date}</div>
                    </div>
                    <div>
                       <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">Última actualización</label>
                       <div className="text-sm text-slate-700">{ticket.updatedAt}</div>
                    </div>
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
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 pt-6 pb-20">
      <button 
        onClick={onBack} 
        className="group mb-6 flex items-center text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Volver</span>
      </button>

      <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl overflow-hidden">
        {/* Banner - Reduced height from h-48 to h-32 */}
        <div className="h-32 bg-gradient-to-r from-primary-100 to-cyan-50 relative overflow-hidden flex items-end pb-6 px-8 md:px-12">
           <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary-200/50 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
           
           {/* Content container aligned to bottom via flex */}
           <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-primary-600 flex-shrink-0">
                 <Info size={20} />
              </div>
              <div>
                  <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-0.5">General</div>
                  <h1 className="text-2xl font-bold text-slate-800 leading-tight">Sobre Museum App</h1>
              </div>
           </div>
        </div>

        <div className="p-8 md:p-10">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-primary-600">
                <h2 className="text-slate-800">¿Qué es Museum App?</h2>
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

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
                <div className="text-slate-500 text-sm">
                    ¿Te resultó útil este artículo?
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600 text-sm font-medium flex items-center gap-2">
                        <ThumbsUp size={14} /> Sí, gracias
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600 text-sm font-medium">
                        No mucho
                    </button>
                </div>
            </div>
            
            {/* Related Guides Section */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Guías relacionadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: 'Guía de inicio rápido', readTime: '5 min', icon: BookOpen },
                        { title: 'Nuestra misión', readTime: '3 min', icon: Info },
                        { title: 'Configuración de cuenta', readTime: '4 min', icon: User }
                    ].map((guide, i) => (
                        <button key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-primary-200 transition-all text-left group">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <guide.icon size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm group-hover:text-primary-700 transition-colors">{guide.title}</h4>
                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                    <Clock size={12} /> {guide.readTime} de lectura
                                </div>
                            </div>
                        </button>
                    ))}
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
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  
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
    setSelectedTicketId(null);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-primary-100 selection:text-primary-700 flex flex-col">
      <BackgroundBlobs />
      <Navbar 
        onHomeClick={goHome}
        onMessagesClick={() => setView('my-tickets')}
        onFAQClick={() => setView('faq')}
      />

      <main className="flex-grow relative z-0">
        {view === 'home' && (
          <>
            <Hero 
              onSearch={handleSearch} 
              onMyTicketsClick={() => setView('my-tickets')}
            />
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

        {view === 'my-tickets' && (
            <TicketListView 
              onBack={goHome}
              onCreateClick={() => setView('ticket')}
              onTicketClick={(id) => {
                setSelectedTicketId(id);
                setView('ticket-detail');
              }}
            />
        )}

        {view === 'ticket-detail' && selectedTicketId && (
            <TicketDetailView 
              ticketId={selectedTicketId}
              onBack={() => setView('my-tickets')}
            />
        )}

        {view === 'faq' && (
            <FAQView onBack={goHome} />
        )}
      </main>

      <Footer />
    </div>
  );
}