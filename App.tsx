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
  Hash,
  Smartphone,
  Share,
  Download,
  Menu,
  Monitor
} from 'lucide-react';

// --- Types ---
type ViewState = 'home' | 'category' | 'article' | 'ticket' | 'my-tickets' | 'ticket-detail' | 'faq' | 'download';
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

const Navbar = ({ onMessagesClick, onHomeClick, onFAQClick, onDownloadClick }: { onMessagesClick: () => void, onHomeClick: () => void, onFAQClick: () => void, onDownloadClick: () => void }) => {
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
            <button onClick={onDownloadClick} className="flex items-center gap-1 hover:text-primary-600 transition-colors"><Smartphone size={18} /> Descargar App</button>
            <button onClick={onFAQClick} className="flex items-center gap-1 hover:text-primary-600 transition-colors"><HelpCircle size={18} /> Preguntas Frecuentes</button>
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

const CategoryGrid = ({ onSelectCategory }: { onSelectCategory: (id: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(CATEGORIES_DATA).map((category) => (
          <CategoryCard
            key={category.id}
            {...category}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
        {/* Special card for Support/Ticket */}
        <CategoryCard
            icon={MessageSquare}
            title="Soporte Técnico"
            description="¿No encuentras lo que buscas? Abre un ticket y te ayudaremos."
            color="from-slate-700 to-slate-900"
            onClick={() => onSelectCategory('ticket')}
        />
      </div>
    </div>
  );
};

const CategoryDetail = ({ categoryId, onBack, onArticleClick, onTicketClick }: { categoryId: string, onBack: () => void, onArticleClick: () => void, onTicketClick: () => void }) => {
  const category = CATEGORIES_DATA[categoryId];
  if (!category) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Back button and Header */}
      <button onClick={onBack} className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors">
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Volver a categorías</span>
      </button>

      <div className={`rounded-3xl p-8 md:p-12 bg-gradient-to-br ${category.color} text-white shadow-xl mb-12 relative overflow-hidden`}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <category.icon size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">{category.description}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
            {category.content && (
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    {category.content}
                </section>
            )}

            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <BookOpen className="text-primary-500" /> Guías y Tutoriales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.guides.map(guide => (
                        <div key={guide.id} onClick={onArticleClick} className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${category.accentColor}`}>{category.title}</span>
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={12} /> {guide.readTime}</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">{guide.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2">{guide.excerpt}</p>
                        </div>
                    ))}
                </div>
            </section>
            
             <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <HelpCircle className="text-primary-500" /> Preguntas Frecuentes
                </h2>
                <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 px-6">
                    {category.faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>
        </div>

        <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">¿No encuentras respuesta?</h3>
                        <p className="text-slate-300 mb-6 text-sm">Nuestro equipo de soporte está listo para ayudarte con cualquier problema específico.</p>
                        <button onClick={onTicketClick} className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                            <PlusSquare size={18} /> Crear Ticket
                        </button>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

const TicketForm = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
       <button onClick={onCancel} className="mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Cancelar
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900">Crear nuevo ticket</h2>
            <p className="text-slate-500 mt-2">Describe tu problema detalladamente para que podamos ayudarte mejor.</p>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onCancel(); /* Mock submit */ }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Categoría</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                            <option>Seleccionar categoría...</option>
                            <option>Problemas con mi cuenta</option>
                            <option>Reportar contenido</option>
                            <option>Problemas de facturación</option>
                            <option>Bug / Error técnico</option>
                            <option>Sugerencia</option>
                        </select>
                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prioridad</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                            <option>Normal</option>
                            <option>Baja</option>
                            <option>Alta</option>
                            <option>Urgente</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                <input type="text" placeholder="Resumen breve del problema" className="w-full bg-slate-50 border border-slate-200 text-slate-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400" />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descripción detallada</label>
                <textarea rows={6} placeholder="Explica qué sucedió, pasos para reproducir el error, etc." className="w-full bg-slate-50 border border-slate-200 text-slate-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400 resize-none"></textarea>
            </div>

            <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Adjuntos (Opcional)</label>
                 <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <Paperclip className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Arrastra archivos aquí o <span className="text-primary-600 font-medium">haz clic para examinar</span></p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF hasta 10MB</p>
                 </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <button type="button" onClick={onCancel} className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors">Cancelar</button>
                <button type="submit" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-[1.02]">Enviar Ticket</button>
            </div>
        </form>
      </div>
    </div>
  )
}

const ArticleView = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="max-w-4xl mx-auto py-12 animate-in slide-in-from-bottom-8 duration-500">
             <button onClick={onBack} className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
                    <ArrowLeft size={16} />
                </div>
                <span className="font-medium">Volver</span>
            </button>
            
            <article className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="h-64 w-full bg-slate-200 relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                     <img src="https://picsum.photos/1200/400" className="w-full h-full object-cover" alt="Article Cover" />
                     <div className="absolute bottom-0 left-0 p-8 text-white">
                        <div className="flex items-center gap-2 text-sm font-medium mb-2 opacity-90">
                            <span className="bg-primary-500 px-2 py-1 rounded-md">Guía</span>
                            <span>•</span>
                            <span>5 min de lectura</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">Cómo organizar tu colección digitalmente</h1>
                     </div>
                </div>
                <div className="p-8 md:p-12 prose prose-slate max-w-none prose-lg prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600">
                    <p className="lead">
                        Una colección bien organizada no solo es más fácil de gestionar, sino que también aumenta su valor y disfrute. En esta guía, exploraremos las mejores prácticas para catalogar tus items en Museum App.
                    </p>
                    <h3>1. Fotografía de calidad</h3>
                    <p>
                        Todo empieza con una buena imagen. Asegúrate de tener buena iluminación, preferiblemente natural. Usa un fondo neutro para que el objeto destaque. En Museum App, recomendamos el formato cuadrado para que tus coleccionables se vean perfectos en la cuadrícula del perfil.
                    </p>
                    <h3>2. Datos precisos</h3>
                    <p>
                        Rellenar todos los campos de información es crucial. No te limites al nombre; añade el año de fabricación, marca, estado de conservación y cualquier detalle histórico relevante. Cuanta más información proporciones, más fácil será para otros coleccionistas encontrar tus piezas.
                    </p>
                    <blockquote>
                        "Una colección sin documentación es solo una acumulación de objetos."
                    </blockquote>
                    <h3>3. Uso de Etiquetas</h3>
                    <p>
                        Las etiquetas (tags) son herramientas poderosas. Usa términos generales (#Vintage, #Juguetes) y específicos (#StarWars, #Kenner1980) para maximizar la visibilidad.
                    </p>
                    <div className="my-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 items-start">
                        <Info className="text-blue-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 text-lg mb-1">Consejo Pro</h4>
                            <p className="text-blue-700 text-base m-0">
                                Puedes exportar tu inventario en formato CSV desde la configuración de tu cuenta para tener siempre una copia de seguridad offline.
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

const TicketListView = ({ onBack, onCreateClick, onTicketClick }: { onBack: () => void, onCreateClick: () => void, onTicketClick: (id: string) => void }) => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
             <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="group flex items-center text-slate-500 hover:text-primary-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="font-medium">Volver al inicio</span>
                </button>
                <button onClick={onCreateClick} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <PlusSquare size={18} /> Nuevo Ticket
                </button>
             </div>

             <div className="mb-10">
                 <h1 className="text-3xl font-bold text-slate-900 mb-2">Mis Tickets de Soporte</h1>
                 <p className="text-slate-500">Historial de tus consultas y reportes al equipo de Museum App.</p>
             </div>

             <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                 <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium whitespace-nowrap">Todos</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">Abiertos</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">Resueltos</button>
             </div>

             <div className="space-y-4">
                 {MOCK_TICKETS.map((ticket) => (
                     <div key={ticket.id} onClick={() => onTicketClick(ticket.id)} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide
                                    ${ticket.status === 'open' ? 'bg-blue-100 text-blue-700' : 
                                      ticket.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                                      ticket.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {ticket.status === 'open' ? 'Abierto' : ticket.status === 'in_progress' ? 'En Progreso' : ticket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">#{ticket.id}</span>
                            </div>
                            <span className="text-xs text-slate-400">{ticket.updatedAt}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{ticket.title}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-1">{ticket.preview}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                             <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                 <span>{ticket.category}</span>
                                 <span className="flex items-center gap-1"><MessageSquare size={14} /> {ticket.comments}</span>
                             </div>
                             <ChevronRight size={16} className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                        </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

const TicketDetailView = ({ ticketId, onBack }: { ticketId: string, onBack: () => void }) => {
    const ticket = MOCK_TICKETS.find(t => t.id === ticketId) || MOCK_TICKETS[0];

    return (
         <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col animate-in slide-in-from-right-8 duration-500">
             <div className="flex items-center justify-between mb-6 shrink-0">
                <button onClick={onBack} className="group flex items-center text-slate-500 hover:text-primary-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="font-medium">Volver a mis tickets</span>
                </button>
             </div>

             <div className="bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col flex-grow overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900">{ticket.title}</h1>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide whitespace-nowrap ml-4
                                    ${ticket.status === 'open' ? 'bg-blue-100 text-blue-700' : 
                                      ticket.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                                      ticket.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                           {ticket.status === 'open' ? 'Abierto' : ticket.status === 'in_progress' ? 'En Progreso' : ticket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Hash size={14} /> {ticket.id}</span>
                        <span className="flex items-center gap-1"><Layers size={14} /> {ticket.category}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> Actualizado {ticket.updatedAt}</span>
                        {ticket.priority === 'urgent' && <span className="flex items-center gap-1 text-red-500 font-bold"><AlertCircle size={14} /> Urgente</span>}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-grow overflow-y-auto p-6 space-y-8 bg-slate-50/30">
                    {MOCK_TICKET_MESSAGES.map((msg) => (
                         <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                             <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-sm 
                                ${msg.role === 'user' ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-slate-900 text-white'}`}>
                                {msg.role === 'user' ? 
                                  <img src="https://picsum.photos/200" alt="User" className="rounded-full w-full h-full object-cover border-2 border-white" /> 
                                  : <div className="font-bold">M</div>
                                }
                             </div>
                             <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-slate-700">{msg.sender}</span>
                                    <span className="text-xs text-slate-400">{msg.date}</span>
                                    {msg.role === 'support' && <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">STAFF</span>}
                                 </div>
                                 <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                                    ${msg.role === 'user' ? 'bg-white border border-slate-100 rounded-tr-none text-slate-700' : 'bg-slate-100 border border-slate-200 rounded-tl-none text-slate-800'}`}>
                                    {msg.message}
                                 </div>
                             </div>
                         </div>
                    ))}
                    
                    {ticket.status === 'resolved' && (
                        <div className="flex justify-center py-4">
                            <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                                <CheckCircle2 size={16} /> Este ticket ha sido marcado como resuelto
                            </div>
                        </div>
                    )}
                </div>

                {/* Reply Box */}
                {ticket.status !== 'closed' && (
                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="relative">
                            <textarea 
                                placeholder="Escribe una respuesta..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pr-12 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none h-24 text-sm"
                            ></textarea>
                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"><Paperclip size={18} /></button>
                                <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-md transition-colors"><Send size={16} /></button>
                            </div>
                        </div>
                    </div>
                )}
             </div>
         </div>
    );
};

const FAQView = ({ onBack }: { onBack: () => void }) => {
    // Flatten all FAQs for this view or use a specific set
    const allFaqs = Object.values(CATEGORIES_DATA).flatMap(c => c.faqs.map(f => ({...f, category: c.title})));
    
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <button onClick={onBack} className="group mb-8 flex items-center text-slate-500 hover:text-primary-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-primary-300 group-hover:shadow-md transition-all">
                    <ArrowLeft size={16} />
                </div>
                <span className="font-medium">Volver</span>
            </button>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h1>
                <p className="text-lg text-slate-600">Todo lo que necesitas saber sobre Museum App</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden divide-y divide-slate-100">
                {allFaqs.map((faq, i) => (
                    <div key={i} className="p-2 hover:bg-slate-50 transition-colors">
                        <FAQItem question={faq.question} answer={faq.answer} />
                        <div className="px-5 pb-2 text-xs text-slate-400 font-medium uppercase tracking-wider">{faq.category}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center bg-primary-50 rounded-3xl p-8 border border-primary-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">¿Sigues teniendo dudas?</h3>
                <p className="text-slate-600 mb-6">Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">Contactar Soporte</button>
                    <button className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">Ver Guías</button>
                </div>
            </div>
        </div>
    );
};

const DownloadView = ({ onBack }: { onBack: () => void }) => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');

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

      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl -z-10"></div>
         <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
           Lleva tu museo en el <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-cyan-500">bolsillo</span>
         </h1>
         <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
           Accede a tu colección, descubre nuevos items y gestiona tus alertas estés donde estés.
         </p>
         
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="relative group opacity-60 cursor-not-allowed">
              <div className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">PRÓXIMAMENTE</div>
              <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl shadow-lg transition-transform" disabled>
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.995 14.888c-.021-3.612 2.96-5.32 3.097-5.412-1.688-2.464-4.305-2.8-5.234-2.834-2.227-.229-4.35 1.309-5.474 1.309-1.125 0-2.887-1.285-4.755-1.252-2.447.037-4.706 1.423-5.968 3.614-2.56 4.437-.655 10.957 1.838 14.562 1.22 1.764 2.671 3.746 4.582 3.676 1.834-.072 2.527-1.185 4.745-1.185 2.215 0 2.844 1.185 4.767 1.163 1.967-.035 3.21-1.789 4.407-3.535 1.39-2.025 1.96-3.987 1.982-4.088-.043-.018-3.815-1.464-3.98-5.714h-.001zm-3.593-9.59c1.006-1.218 1.685-2.912 1.498-4.606-1.45.059-3.204.966-4.243 2.181-.929 1.077-1.742 2.801-1.522 4.456 1.616.126 3.264-.816 4.267-2.031z"/></svg>
                  <div className="text-left">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Consíguelo en</div>
                      <div className="text-sm font-bold leading-none">App Store</div>
                  </div>
              </button>
            </div>
            
            <div className="relative group opacity-60 cursor-not-allowed">
              <div className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">PRÓXIMAMENTE</div>
              <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl shadow-lg transition-transform" disabled>
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.184.098-.39.125-.568.031-.18-.094-.29-.286-.29-.491V2.272c0-.204.11-.395.29-.489.179-.094.384-.067.567.031zm11.373 11.002L4.697 22.46l11.776-6.736-1.491-2.908zm1.096-1.63L22.68 8.162c.708-.405.708-1.92 0-2.325L16.078 2.812l-1.492 2.91 1.492 5.464zm-1.49-8.373L16.474 9.65l1.492-2.91-11.777-6.734 8.39 4.799z"/></svg>
                  <div className="text-left">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Disponible en</div>
                      <div className="text-sm font-bold leading-none">Google Play</div>
                  </div>
              </button>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent pointer-events-none"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
                  <Smartphone size={16} /> Disponible Hoy
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Instala la PWA y disfruta de la experiencia nativa</h2>
               <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  No necesitas esperar a las tiendas. Nuestra Progressive Web App (PWA) te ofrece una experiencia fluida, a pantalla completa y rápida directamente desde tu navegador.
               </p>

               <div className="flex gap-4 mb-8 bg-slate-100 p-1.5 rounded-xl inline-flex">
                  <button 
                     onClick={() => setPlatform('ios')}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                       platform === 'ios' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'
                     }`}
                  >
                     <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16.995 14.888c-.021-3.612 2.96-5.32 3.097-5.412-1.688-2.464-4.305-2.8-5.234-2.834-2.227-.229-4.35 1.309-5.474 1.309-1.125 0-2.887-1.285-4.755-1.252-2.447.037-4.706 1.423-5.968 3.614-2.56 4.437-.655 10.957 1.838 14.562 1.22 1.764 2.671 3.746 4.582 3.676 1.834-.072 2.527-1.185 4.745-1.185 2.215 0 2.844 1.185 4.767 1.163 1.967-.035 3.21-1.789 4.407-3.535 1.39-2.025 1.96-3.987 1.982-4.088-.043-.018-3.815-1.464-3.98-5.714h-.001zm-3.593-9.59c1.006-1.218 1.685-2.912 1.498-4.606-1.45.059-3.204.966-4.243 2.181-.929 1.077-1.742 2.801-1.522 4.456 1.616.126 3.264-.816 4.267-2.031z"/></svg>
                     iOS / Safari
                  </button>
                  <button 
                     onClick={() => setPlatform('android')}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                       platform === 'android' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'
                     }`}
                  >
                     <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.523 15.3414C17.523 15.3414 17.5 15.3414 17.5 15.3414C17.5 15.3414 17.5 15.3414 17.523 15.3414C17.5 15.3414 17.5 15.3414 17.523 15.3414ZM7.727 15.3414C7.727 15.3414 7.727 15.3414 7.727 15.3414C7.727 15.3414 7.727 15.3414 7.727 15.3414C7.727 15.3414 7.727 15.3414 7.727 15.3414ZM3.5 11.5457C3.5 12.1821 4.02272 12.7049 4.65909 12.7049C5.29545 12.7049 5.81818 12.1821 5.81818 11.5457V7.02298C5.81818 6.38662 5.29545 5.86389 4.65909 5.86389C4.02272 5.86389 3.5 6.38662 3.5 7.02298V11.5457ZM19.4091 12.7049C20.0455 12.7049 20.5682 12.1821 20.5682 11.5457V7.02298C20.5682 6.38662 20.0455 5.86389 19.4091 5.86389C18.7727 5.86389 18.25 6.38662 18.25 7.02298V11.5457C18.25 12.1821 18.7727 12.7049 19.4091 12.7049ZM9.68182 17.1595V21.6822C9.68182 22.3186 9.20455 22.8413 8.56818 22.8413C7.93182 22.8413 7.40909 22.3186 7.40909 21.6822V17.5913C8.09091 17.5232 8.86364 17.3868 9.68182 17.1595ZM15.5455 21.6822V17.1595C16.3636 17.3868 17.1364 17.5232 17.8182 17.5913V21.6822C17.8182 22.3186 17.2955 22.8413 16.6591 22.8413C16.0227 22.8413 15.5455 22.3186 15.5455 21.6822ZM16.6591 4.5457L18.4318 1.45479C18.6364 1.11389 18.5227 0.682068 18.1818 0.477522C17.8409 0.272976 17.4091 0.386613 17.2045 0.727522L15.3864 3.88661C14.0455 3.27298 12.5682 2.93207 10.9773 2.93207C9.38636 2.93207 7.90909 3.27298 6.56818 3.88661L4.75 0.704795C4.54545 0.363886 4.11364 0.25025 3.77273 0.454795C3.43182 0.659341 3.31818 1.09116 3.52273 1.43207L5.29545 4.52298C2.5 6.04571 0.590909 8.81843 0.386364 12.0684H21.5682C21.3636 8.81843 19.4545 6.04571 16.6591 4.5457ZM6.93182 8.31843C6.31818 8.31843 5.81818 7.81843 5.81818 7.2048C5.81818 6.59116 6.31818 6.09116 6.93182 6.09116C7.54545 6.09116 8.04545 6.59116 8.04545 7.2048C8.04545 7.81843 7.54545 8.31843 6.93182 8.31843ZM15.0227 8.31843C14.4091 8.31843 13.9091 7.81843 13.9091 7.2048C13.9091 6.59116 14.4091 6.09116 15.0227 6.09116C15.6364 6.09116 16.1364 6.59116 16.1364 7.2048C16.1364 7.81843 15.6364 8.31843 15.0227 8.31843Z"/></svg>
                     Android
                  </button>
               </div>

               <div className="space-y-4">
                  {platform === 'ios' ? (
                     <>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors font-bold">1</div>
                           <div className="text-slate-700 font-medium">Pulsa el botón <span className="font-bold text-slate-900 inline-flex items-center mx-1"><Share size={14} className="mx-1" /> Compartir</span> en la barra de navegación.</div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors font-bold">2</div>
                           <div className="text-slate-700 font-medium">Desliza hacia abajo y selecciona <span className="font-bold text-slate-900">"Añadir a la pantalla de inicio"</span>.</div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors font-bold">3</div>
                           <div className="text-slate-700 font-medium">Confirma pulsando <span className="font-bold text-slate-900">"Añadir"</span> arriba a la derecha.</div>
                        </div>
                     </>
                  ) : (
                     <>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors font-bold">1</div>
                           <div className="text-slate-700 font-medium">Pulsa el botón de menú <span className="font-bold text-slate-900 inline-flex items-center mx-1"><MoreHorizontal size={14} /></span> (tres puntos) en tu navegador.</div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors font-bold">2</div>
                           <div className="text-slate-700 font-medium">Selecciona la opción <span className="font-bold text-slate-900">"Instalar aplicación"</span> o "Añadir a inicio".</div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors font-bold">3</div>
                           <div className="text-slate-700 font-medium">Sigue las instrucciones para confirmar la instalación.</div>
                        </div>
                     </>
                  )}
               </div>
            </div>

            {/* Phone Animation */}
            <div className="flex justify-center">
               <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-900/50">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-slate-50 relative flex flex-col pt-8">
                     {/* Fake App Header */}
                     <div className="px-4 py-2 flex items-center justify-between border-b border-slate-200 bg-white">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"></div>
                        <div className="w-20 h-2 bg-slate-200 rounded-full"></div>
                        <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                     </div>
                     
                     {/* Fake App Body */}
                     <div className="p-4 space-y-4 overflow-hidden opacity-50">
                        <div className="w-full h-32 bg-white rounded-xl shadow-sm"></div>
                        <div className="flex gap-4">
                           <div className="w-1/2 h-32 bg-white rounded-xl shadow-sm"></div>
                           <div className="w-1/2 h-32 bg-white rounded-xl shadow-sm"></div>
                        </div>
                        <div className="w-full h-32 bg-white rounded-xl shadow-sm"></div>
                     </div>

                     {/* Installation Simulation */}
                     {platform === 'ios' ? (
                        <>
                           {/* Bottom Bar (Safari) */}
                           <div className="absolute bottom-0 w-full h-16 bg-white/90 backdrop-blur border-t border-slate-200 flex items-center justify-around px-6 pb-2 z-10">
                              <div className="text-slate-400"><ChevronLeftIcon /></div>
                              <div className="text-slate-400"><ChevronRightIcon /></div>
                              <div className="text-blue-500 animate-bounce relative z-20"><Share /></div>
                              <div className="text-slate-400"><BookOpen size={20} /></div>
                              <div className="text-slate-400"><Layers size={20} /></div>
                           </div>
                           
                           {/* Popover Sheet */}
                           <div className="absolute bottom-0 w-full bg-slate-100 rounded-t-xl transition-transform duration-1000 animate-[slideUp_4s_infinite] shadow-2xl z-20 border-t border-slate-200">
                               <div className="p-4">
                                  <div className="flex items-center gap-3 mb-4 p-2 bg-white rounded-lg">
                                     <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500"></div>
                                     <div>
                                        <div className="font-bold text-sm">Museum App</div>
                                        <div className="text-xs text-slate-500">museum.app</div>
                                     </div>
                                  </div>
                                  <div className="space-y-1">
                                      <div className="p-3 bg-white rounded-lg text-slate-700 text-sm font-medium flex items-center justify-between">
                                         Copiar <span className="text-slate-400"><FileText size={16}/></span>
                                      </div>
                                      <div className="p-3 bg-white rounded-lg text-slate-900 text-sm font-bold flex items-center justify-between ring-2 ring-primary-400">
                                         Añadir a inicio <span className="text-primary-600"><PlusSquare size={16}/></span>
                                      </div>
                                  </div>
                               </div>
                           </div>
                        </>
                     ) : (
                        <>
                            {/* Top Bar (Chrome Android) */}
                            <div className="absolute top-8 w-full h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-10">
                                <div className="text-slate-400 text-xs bg-slate-100 px-2 py-1 rounded-full flex items-center gap-1">
                                   <Lock size={10} /> museum.app
                                </div>
                                <div className="flex gap-4 text-slate-600">
                                   <span className="text-xs border border-slate-300 rounded px-1 font-bold">1</span>
                                   <MoreHorizontal className="animate-pulse text-slate-900" />
                                </div>
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute top-20 right-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-20 animate-[fadeIn_3s_infinite]">
                                <div className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Nueva pestaña</div>
                                <div className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Historial</div>
                                <div className="my-1 border-b border-slate-100"></div>
                                <div className="px-4 py-2 text-sm font-bold text-primary-600 bg-primary-50 flex items-center justify-between">
                                   Instalar app <Download size={14} />
                                </div>
                                <div className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Añadir a pantalla...</div>
                            </div>
                        </>
                     )}
                     
                     {/* Hand/Cursor Animation */}
                     <div className="absolute top-1/2 left-1/2 pointer-events-none z-30 opacity-0 animate-[touch_4s_infinite]">
                        <div className="w-8 h-8 bg-slate-900/20 rounded-full border-2 border-slate-900"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// Helper components for icons inside the mock phone
const ChevronLeftIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
const ChevronRightIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>

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
      <style>{`
        @keyframes slideUp {
          0%, 10% { transform: translateY(100%); }
          20%, 80% { transform: translateY(0); }
          90%, 100% { transform: translateY(100%); }
        }
        @keyframes fadeIn {
           0%, 10% { opacity: 0; transform: scale(0.9); }
           20%, 80% { opacity: 1; transform: scale(1); }
           90%, 100% { opacity: 0; transform: scale(0.9); }
        }
        @keyframes touch {
           0%, 15% { opacity: 0; top: 80%; left: 50%; transform: scale(1); }
           20% { opacity: 1; top: 80%; left: 50%; transform: scale(0.8); }
           25% { transform: scale(1); } 
           100% { opacity: 0; }
        }
      `}</style>
      <Navbar 
        onHomeClick={goHome}
        onMessagesClick={() => setView('my-tickets')}
        onFAQClick={() => setView('faq')}
        onDownloadClick={() => setView('download')}
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

        {view === 'download' && (
            <DownloadView onBack={goHome} />
        )}
      </main>

      <Footer />
    </div>
  );
}