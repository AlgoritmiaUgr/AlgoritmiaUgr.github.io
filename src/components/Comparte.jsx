import React, { useState } from 'react';
import { prefixPath } from '../utils/basePath';

// Configurable Google Calendar & community URLs (set in .env.local)
const CALENDAR_EMBED_URL = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL ||
  'https://calendar.google.com/calendar/embed?src=cpcugr%40gmail.com&ctz=Europe%2FMadrid';
const CALENDAR_ADD_URL = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ADD_URL ||
  'https://calendar.google.com/calendar/u/0?cid=Y3BjdWdyQGdtYWlsLmNvbQ';
const WHATSAPP_INVITE_URL = process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL || 'https://chat.whatsapp.com/EJP8DQe7Zqe2nk9QTO17z0';
const DISCORD_INVITE_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg/5petbUmA';
const REUNION_IMAGE_URL = process.env.NEXT_PUBLIC_REUNION_IMAGE_URL || '';
const CHAT_ILLUSTRATION_URL = process.env.NEXT_PUBLIC_CHAT_ILLUSTRATION_URL || '';

const Comparte = () => {
  const [showContact, setShowContact] = useState(false);
  const openContact = () => setShowContact(true);
  const closeContact = () => setShowContact(false);

  return (
  <section className="relative overflow-hidden">
    {/* Decorative background removed per request for a cleaner, frameless look */}

    <div className="relative z-10 max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white mb-5 bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red bg-clip-text text-transparent">
        Comparte
        </h1>
        <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed mb-6">
        El CPC es un club de aficionados para aficionados. Creemos en una comunidad cercana,
        con espacios sencillos para conectar, compartir recursos y apoyar a quien empieza.
        </p>
        <div className="flex justify-center">
          <div className="w-28 h-[3px] bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red rounded-full"></div>
        </div>
      </div>

    {/* Main content grid */}
    <div className="grid gap-8 lg:gap-12">
      {/* Sección: Reuniones - Featured */}
      <section className="relative group">
        <div className="relative rounded-2xl p-6 bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl border border-white/10 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warm-orange to-warm-red flex items-center justify-center shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-light text-black dark:text-white">Reuniones</h2>
              <p className="text-black/60 dark:text-white/60 text-sm">Agenda pública actualizada en tiempo real</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 items-start">
            {/* Calendario embebido */}
            <div className="lg:col-span-2">
        <div className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] shadow">
                <iframe
                  title="Calendario CPC UGR"
                  src={CALENDAR_EMBED_URL}
          className="w-full h-[320px] lg:h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              {/* Acciones del calendario */}
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={CALENDAR_EMBED_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-warm-orange to-warm-red hover:from-warm-red hover:to-warm-orange transition-all duration-200 shadow-md hover:shadow-lg">
                  <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Abrir en Google Calendar
                </a>
                <a href={CALENDAR_ADD_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-black/80 dark:text-white/80 bg-white/70 dark:bg-white/[0.06] border border-black/10 dark:border-white/20 hover:bg-white dark:hover:bg-white/[0.15] transition-all duration-200 shadow-md hover:shadow-lg">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Suscribirse
                </a>
                <a href={prefixPath('/reuniones')} className="group inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-black/80 dark:text-white/80 bg-white/70 dark:bg-white/[0.06] border border-black/10 dark:border-white/20 hover:bg-white dark:hover:bg-white/[0.15] transition-all duration-200 shadow-md hover:shadow-lg">
                  <svg className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Ver reuniones
                </a>
              </div>
            </div>

            {/* Imagen de reunión con info overlay */}
            <div className="relative group/img">
              <div className="relative rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] h-[280px] lg:h-[380px] shadow">
                {REUNION_IMAGE_URL ? (
                  <img
                    src={REUNION_IMAGE_URL}
                    alt="Foto de una reunión del club"
                    className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-orange/15 via-warm-pink/10 to-warm-red/15">
                    <div className="text-center">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-black/40 dark:text-white/40 mx-auto mb-4">
                        <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-5l-3.5 2.5A1 1 0 0 1 4 18V7z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <p className="text-black/60 dark:text-white/60 text-sm">Próximamente: foto de reunión</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 right-3 transform translate-y-2 group-hover/img:translate-y-0 opacity-0 group-hover/img:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-medium text-lg mb-1">Última reunión del club</h3>
                  <p className="text-white/80 text-sm">Compartiendo conocimientos y experiencias</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Secciones: Chat y Colabora - Side by side */}
  <div className="grid gap-6 lg:grid-cols-2">
        {/* Sección: Únete al chat */}
        <section className="relative group">
          <div className="relative rounded-xl p-5 bg-white/60 dark:bg-white/[0.04] backdrop-blur-lg border border-white/10 dark:border-white/10 shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#25D366] to-[#5865F2] flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-light text-black dark:text-white">Únete al chat</h2>
                <p className="text-black/60 dark:text-white/60 text-xs">Avisos, preguntas y recursos</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 items-start">
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-black/70 dark:text-white/70">
                  Espacio rápido para conectar con la comunidad y resolver dudas al instante.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a href={WHATSAPP_INVITE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-[#25D366] hover:bg-[#20b858] transition-all duration-200 shadow-md hover:shadow-lg">
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-200 shadow-md hover:shadow-lg">
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                    Discord
                  </a>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] h-[170px] sm:h-[200px]">
                {CHAT_ILLUSTRATION_URL ? (
                  <img
                    src={CHAT_ILLUSTRATION_URL}
                    alt="Ilustración de chat"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#25D366]/10 via-[#5865F2]/10 to-warm-pink/10 relative overflow-hidden">
                    {/* Animated chat bubbles */}
                    <div className="absolute top-4 left-4 w-7 h-5 bg-[#25D366]/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-8 right-6 w-5 h-4 bg-[#5865F2]/20 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-6 left-6 w-8 h-4 bg-warm-pink/20 rounded-full animate-pulse delay-500"></div>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-black/30 dark:text-white/30">
                      <path d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-3 2v-2H6a3 3 0 0 1-3-3V6z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M18 10h.5A2.5 2.5 0 0 1 21 12.5V16a2 2 0 0 1-2 2h-3l-2 1.5V18" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            </div>
        </section>

        {/* Sección: Colabora */}
        <section className="relative group">
          <div className="relative rounded-xl p-5 bg-white/60 dark:bg-white/[0.04] backdrop-blur-lg border border-white/10 dark:border-white/10 shadow h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-warm-orange to-warm-red flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-light text-black dark:text-white">Colabora</h2>
                <p className="text-black/60 dark:text-white/60 text-xs">Comparte ideas y talleres</p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-sm sm:text-base text-black/70 dark:text-white/70">
                Trae ideas, talleres o retos. Cualquier aporte suma y ayuda a la comunidad a crecer.
              </p>
              
              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-warm-pink/10 to-warm-orange/10 border border-warm-pink/20">
                  <h3 className="font-medium text-black dark:text-white mb-2">✉️ Contacto directo</h3>
                  <p className="text-sm text-black/70 dark:text-white/70 mb-3">¿Dudas o sugerencias? Escríbenos directamente.</p>
                  <button
                    type="button"
                    onClick={openContact}
                    className="inline-flex items-center text-sm font-medium text-warm-pink hover:text-warm-orange transition-colors bg-transparent p-0 border-0 focus:outline-none"
                  >
                    Escríbenos
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

        <div className="mt-5 p-4 rounded-lg bg-warm-red/5 dark:bg-warm-red/10 border border-warm-red/20 text-center">
                <p className="text-sm text-black/70 dark:text-white/70">
                  🚀 <strong>¿Nueva idea?</strong> No dudes en compartirla, por muy pequeña que parezca.
                </p>
              </div>
            </div>
      </div>
        </section>
      </div>

      {/* Footer inspirational message */}
    <section className="relative">
  <div className="rounded-2xl p-6 bg-white/50 dark:bg-white/[0.04] border border-white/10 dark:border-white/10 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-light text-black dark:text-white mb-3">
              Juntos construimos comunidad
            </h3>
            <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
              Nuestra misión es que compartir sea fácil. Si eres nuevo, no te cortes: pregunta, escucha y participa.
              Entre todos construimos un espacio donde aprender es más llevadero y divertido.
            </p>
            <div className="mt-5 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warm-orange rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-warm-pink rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-warm-red rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    {/* Contact overlay */}
    {showContact && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        role="dialog"
        aria-label="Contacto"
        onClick={closeContact}
      >
        <div
          className="relative w-full max-w-sm rounded-xl bg-zinc-900/90 text-white border border-white/10 p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Cerrar contacto"
            onClick={closeContact}
            className="absolute top-3 right-3 inline-flex items-center justify-center rounded-md p-1.5 bg-white/10 hover:bg-white/20 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/50 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </button>
          <h4 className="text-lg font-medium mb-3">Contacto</h4>
          <p className="text-xs text-white/60 mb-4 leading-relaxed">Usa este correo o únete al grupo de WhatsApp para cualquier duda.</p>
          <div className="space-y-5">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">Correo</span>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="px-2 py-1 rounded bg-white/10 text-[13px]">cpcugr@gmail.com</code>
                <button
                  type="button"
                  onClick={() => { navigator.clipboard?.writeText('cpcugr@gmail.com'); }}
                  className="text-[11px] px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                >Copiar</button>
              </div>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">WhatsApp</span>
              <a
                href={WHATSAPP_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium bg-emerald-600/80 hover:bg-emerald-600 text-white transition shadow-md hover:shadow-lg"
              >
                Unirse al grupo
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
  </section>
  );
};

export default Comparte;
