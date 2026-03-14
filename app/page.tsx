"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const navRef = useRef<HTMLElement>(null);
  const fishSchoolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Mobile menu
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const handleMenuToggle = () => mobileMenu?.classList.toggle("hidden");
    menuBtn?.addEventListener("click", handleMenuToggle);
    const mobileLinks = document.querySelectorAll("#mobile-menu a");
    const closeMobileMenu = () => mobileMenu?.classList.add("hidden");
    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    // Fish school
    if (fishSchoolRef.current) {
      const container = fishSchoolRef.current;
      for (let i = 0; i < 35; i++) {
        const f = document.createElement("div");
        f.className = "fish";
        f.style.top = 15 + Math.random() * 70 + "%";
        f.style.left = 10 + Math.random() * 80 + "%";
        f.style.opacity = String(0.2 + Math.random() * 0.6);
        f.style.transform = "scale(" + (0.6 + Math.random() * 0.8) + ")";
        f.style.animationDelay = Math.random() * 8 + "s";
        f.style.animationDuration = 6 + Math.random() * 6 + "s";
        container.appendChild(f);
      }
    }

    // FAQ accordion
    const faqBtns = document.querySelectorAll(".faq-btn");
    const handleFaqClick = function (this: HTMLElement) {
      const content = this.nextElementSibling as HTMLElement;
      const icon = this.querySelector(".faq-icon") as HTMLElement;
      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
      document.querySelectorAll(".faq-content").forEach((c) => {
        (c as HTMLElement).style.maxHeight = "0px";
      });
      document.querySelectorAll(".faq-icon").forEach((i) => {
        (i as HTMLElement).style.transform = "rotate(0deg)";
      });
      document.querySelectorAll(".faq-btn").forEach((b) => b.setAttribute("aria-expanded", "false"));
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(45deg)";
        this.setAttribute("aria-expanded", "true");
      }
    };
    faqBtns.forEach((btn) => btn.addEventListener("click", handleFaqClick as EventListener));

    // Smooth scroll
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleSmoothScroll = function (this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href")!);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    anchors.forEach((a) => a.addEventListener("click", handleSmoothScroll as EventListener));

    // Nav scroll
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.background =
          window.scrollY > 50 ? "rgba(10,21,32,0.95)" : "rgba(10,21,32,0.85)";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      menuBtn?.removeEventListener("click", handleMenuToggle);
      mobileLinks.forEach((link) => link.removeEventListener("click", closeMobileMenu));
      faqBtns.forEach((btn) => btn.removeEventListener("click", handleFaqClick as EventListener));
      anchors.forEach((a) => a.removeEventListener("click", handleSmoothScroll as EventListener));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-steel focus:text-abyss focus:rounded font-heading"
      >
        Pular para o conteúdo
      </a>

      {/* NAV */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 border-b border-white/[0.04]"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "rgba(10,21,32,0.85)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5">
            <Image src="/images/logo-final/favicon-180.webp" alt="Contra Maré" width={32} height={32} className="rounded" />
            <span className="font-heading text-sm font-bold text-ice">Contra Maré</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="font-heading text-xs font-medium hover:text-steel transition-colors" style={{ color: "var(--text-sec)" }}>Benefícios</a>
            <a href="#mestres" className="font-heading text-xs font-medium hover:text-steel transition-colors" style={{ color: "var(--text-sec)" }}>Os Mestres</a>
            <a href="#preview" className="font-heading text-xs font-medium hover:text-steel transition-colors" style={{ color: "var(--text-sec)" }}>Edições</a>
            <a href="#faq" className="font-heading text-xs font-medium hover:text-steel transition-colors" style={{ color: "var(--text-sec)" }}>FAQ</a>
            <a href="#assinar" className="btn-primary !py-2.5 !px-5 !text-[0.7rem]">Livre-se do cardume</a>
          </div>
          <button id="mobile-menu-btn" className="md:hidden p-2" style={{ color: "var(--text-sec)" }} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div id="mobile-menu" className="hidden md:hidden border-t border-white/[0.04] px-6 pb-4" style={{ background: "rgba(10,21,32,0.95)" }}>
          <a href="#beneficios" className="block py-3 font-heading text-sm" style={{ color: "var(--text-sec)" }}>Benefícios</a>
          <a href="#mestres" className="block py-3 font-heading text-sm" style={{ color: "var(--text-sec)" }}>Os Mestres</a>
          <a href="#preview" className="block py-3 font-heading text-sm" style={{ color: "var(--text-sec)" }}>Edições</a>
          <a href="#faq" className="block py-3 font-heading text-sm" style={{ color: "var(--text-sec)" }}>FAQ</a>
          <a href="#assinar" className="btn-primary !py-2.5 mt-3 text-center w-full block !text-[0.7rem]">Livre-se do cardume</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero-bg-section relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
        <div className="hero-overlay"></div>

        {/* Caustic lights */}
        <div className="caustic-a absolute top-[15%] left-[20%] w-[500px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(59,158,194,0.04) 0%,transparent 70%)", zIndex: 2 }}></div>
        <div className="caustic-b absolute top-[40%] right-[15%] w-[400px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(59,158,194,0.03) 0%,transparent 70%)", zIndex: 2 }}></div>
        <div className="caustic-a absolute bottom-[20%] left-[40%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(232,200,64,0.015) 0%,transparent 70%)", zIndex: 2 }}></div>

        {/* Fish school */}
        <div ref={fishSchoolRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.10]" style={{ zIndex: 2 }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl" style={{ zIndex: 3 }}>
          <div className="mb-8 hero-el flex justify-center">
            <Image src="/images/logo-final/favicon-180.webp" alt="" width={56} height={56} className="rounded-lg" style={{ opacity: 0.25 }} />
          </div>

          <h1 className="font-heading hero-el" style={{ letterSpacing: "-0.03em" }}>
            <span className="block text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.05] text-ice">Você pensa igual</span>
            <span className="block text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.05] text-ice">a todo mundo.</span>
            <span className="block text-[clamp(1.2rem,3vw,2rem)] font-medium mt-3 steel-text">Só não sabe ainda.</span>
          </h1>

          <p className="font-body text-[clamp(0.95rem,1.8vw,1.15rem)] max-w-lg mx-auto leading-relaxed mt-8 hero-el" style={{ color: "var(--text-sec)" }}>
            A newsletter semanal que expõe os vieses cognitivos por trás das suas decisões &quot;geniais&quot;. Grátis, sem guru, com humor ácido.
          </p>

          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto hero-el" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Seu melhor email" className="email-input flex-1" aria-label="Email" required />
            <button type="submit" className="btn-primary whitespace-nowrap" style={{ animation: "cta-pulse 2.5s ease-in-out infinite" }}>Livre-se do cardume</button>
          </form>

          <p className="font-heading text-xs mt-4 hero-el" style={{ color: "var(--text-muted)" }}>Grátis. Semanal. Um clique pra sair.</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ animation: "breathe 3s ease-in-out infinite", zIndex: 3 }}>
          <span className="font-heading text-[0.5rem] tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>Descer</span>
          <div className="w-px h-7" style={{ background: "linear-gradient(to bottom,var(--primary),transparent)" }}></div>
        </div>

        <div className="absolute bottom-0 left-[15%] right-[15%] depth-line" style={{ zIndex: 3 }}></div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="py-10 px-6" style={{ background: "var(--dark-mid)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 reveal">
          <p className="font-body text-sm italic text-center" style={{ color: "var(--text-sec)" }}>
            &quot;A newsletter que te faz rir dos seus próprios erros de pensamento.&quot;
          </p>
          <div className="hidden md:block w-px h-8" style={{ background: "rgba(59,158,194,0.15)" }}></div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-heading text-lg font-bold steel-text">1</div>
              <div className="font-heading text-[0.6rem] uppercase" style={{ color: "var(--text-muted)" }}>viés cognitivo/semana</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-lg font-bold steel-text">5 min</div>
              <div className="font-heading text-[0.6rem] uppercase" style={{ color: "var(--text-muted)" }}>de leitura</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-lg font-bold" style={{ color: "var(--accent)" }}>R$0</div>
              <div className="font-heading text-[0.6rem] uppercase" style={{ color: "var(--text-muted)" }}>pra sempre</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-24 md:py-32 px-6 relative concept-side-section">
        <div className="absolute top-0 left-0 right-0 depth-line"></div>
        <div className="concept-side-bg hidden lg:block" style={{ backgroundImage: "url('/images/conceitos/conceito-05-corrente-invisivel.webp')" }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="font-heading text-[0.6rem] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: "var(--text-muted)" }}>O que você recebe</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold reveal" style={{ letterSpacing: "-0.02em" }}>
              Cada edição <span className="steel-text">disseca um viés cognitivo</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="ocean-card p-7 reveal reveal-d1">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: "rgba(59,158,194,0.08)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-steel">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="font-heading text-sm font-semibold mb-2">Um viés cognitivo por semana</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>Aquelas armadilhas mentais que fazem você tomar decisões ruins achando que foram geniais. Dissecadas com humor, sem jargão.</p>
            </div>

            <div className="ocean-card p-7 reveal reveal-d2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: "rgba(59,158,194,0.08)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-steel">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </div>
              <h3 className="font-heading text-sm font-semibold mb-2">Exemplos reais</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>Reuniões, investimentos, compras por impulso. Decisões que pareciam certas na hora. Só depois você entendeu o estrago.</p>
            </div>

            <div className="ocean-card p-7 reveal reveal-d3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: "rgba(232,200,64,0.08)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" style={{ color: "var(--accent)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </div>
              <h3 className="font-heading text-sm font-semibold mb-2">Humor ácido</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>Baseado em ciência real, escrito por quem sabe que seriedade demais também é viés.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OS MESTRES */}
      <section id="mestres" className="py-24 md:py-32 px-6 relative" style={{ background: "var(--dark-mid)" }}>
        <div className="absolute top-0 left-0 right-0 depth-line"></div>
        <div className="caustic-b absolute top-[30%] right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(59,158,194,0.05) 0%,transparent 70%)" }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="font-heading text-[0.6rem] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: "var(--text-muted)" }}>As fontes que se libertaram do cardume</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold reveal" style={{ letterSpacing: "-0.02em" }}>
              Os mestres que <span className="steel-text">quebraram a ilusão</span>
            </h2>
            <p className="font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed mt-4 reveal" style={{ color: "var(--text-sec)" }}>
              Três cientistas, décadas de pesquisa, e uma conclusão em comum: você não pensa o que acha que pensa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Kahneman */}
            <div className="mestre-card reveal reveal-d1">
              <div className="mestre-img" style={{ backgroundImage: "url('/images/personagens/personagem-kahneman.webp')" }}></div>
              <div className="mestre-body">
                <div className="mestre-role">Nobel de Economia, 2002</div>
                <div className="mestre-name">Daniel Kahneman</div>
                <p className="mestre-desc">O psicólogo que provou que você não pensa. Criou a economia comportamental e mostrou que seu cérebro tem dois sistemas. O preguiçoso comanda 95% do tempo.</p>
                <p className="mestre-quote">&quot;Nós somos cegos para a nossa própria cegueira.&quot;</p>
              </div>
            </div>

            {/* Taleb */}
            <div className="mestre-card reveal reveal-d2">
              <div className="mestre-img" style={{ backgroundImage: "url('/images/personagens/personagem-taleb.webp')" }}></div>
              <div className="mestre-body">
                <div className="mestre-role">Autor de O Cisne Negro</div>
                <div className="mestre-name">Nassim Taleb</div>
                <p className="mestre-desc">O homem que lucrou com o caos. Filósofo, trader e provocador profissional. Provou que o improvável governa o mundo, e que especialistas erram mais que amadores.</p>
                <p className="mestre-quote">&quot;O problema não é que temos poucas informações. É que temos certezas demais.&quot;</p>
              </div>
            </div>

            {/* Ariely */}
            <div className="mestre-card reveal reveal-d3">
              <div className="mestre-img" style={{ backgroundImage: "url('/images/personagens/personagem-ariely.webp')" }}></div>
              <div className="mestre-body">
                <div className="mestre-role">Economista Comportamental</div>
                <div className="mestre-name">Dan Ariely</div>
                <p className="mestre-desc">O professor que mentiu pra provar que você mente. Demonstrou que somos previsivelmente irracionais, e que a irracionalidade segue padrões assustadoramente previsíveis.</p>
                <p className="mestre-quote">&quot;Não somos tão racionais quanto pensamos, nem tão irracionais quanto tememos.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section id="preview" className="py-24 md:py-32 px-6 relative concept-side-section overflow-hidden">
        <div className="absolute top-0 left-0 right-0 depth-line"></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "url('/images/conceitos/conceito-03-aquario.webp') center center / cover no-repeat", opacity: 0.06 }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%,transparent 20%,var(--dark) 85%)" }}></div>
        <div className="caustic-b absolute top-[20%] right-[10%] w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(59,158,194,0.03) 0%,transparent 70%)" }}></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="font-heading text-[0.6rem] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: "var(--text-muted)" }}>Uma edição típica</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold reveal" style={{ letterSpacing: "-0.02em" }}>
              Como <span className="steel-text">funciona</span> na prática
            </h2>
            <p className="font-heading text-sm mt-3 reveal" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Você é o peixe. Não o aquário.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="reveal" style={{ background: "linear-gradient(180deg,rgba(15,31,46,0.95) 0%,rgba(19,42,58,0.95) 100%)", border: "1px solid rgba(59,158,194,0.12)", borderRadius: "12px", backdropFilter: "blur(8px)" }}>
              <div className="p-6 md:p-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: "1px solid rgba(59,158,194,0.08)" }}>
                  <div>
                    <div className="font-heading text-xs font-bold text-ice">Contra Maré</div>
                    <div className="font-heading text-[0.6rem]" style={{ color: "var(--text-muted)" }}>Edição #001</div>
                  </div>
                  <div className="font-heading text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1 rounded" style={{ background: "rgba(59,158,194,0.1)", color: "var(--primary)" }}>O Viés Cognitivo da Semana</div>
                </div>

                {/* Body */}
                <div className="space-y-5">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-ice" style={{ letterSpacing: "-0.02em" }}>Viés de Ancoragem</h3>

                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>
                    Você entrou numa reunião. Alguém sugeriu uma ideia. Três pessoas concordaram. Você concordou também.
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>
                    Parabéns: você acabou de experimentar o <strong className="text-ice">viés de ancoragem</strong> combinado com <strong className="text-ice">pressão social</strong>. A primeira opinião virou âncora. O grupo virou cardume. E você nadou junto achando que estava pensando.
                  </p>
                  <p className="font-body text-sm italic" style={{ color: "var(--text-muted)" }}>
                    &quot;Mas eu realmente concordei porque fazia sentido...&quot;
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>
                    Fazia. Pra todo mundo. Ao mesmo tempo. Sem ninguém questionar. Coincidência bonita, né?
                  </p>

                  <div className="depth-line"></div>

                  <div>
                    <div className="font-heading text-[0.55rem] tracking-[0.15em] uppercase mb-3" style={{ color: "var(--primary)" }}>Na Prática</div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>
                      Da próxima vez que você concordar com algo em menos de 5 segundos numa reunião, pare. Conte até 10. Pergunte: <span style={{ color: "var(--accent)", fontWeight: 600 }}>eu concordo ou o cardume concorda?</span>
                    </p>
                  </div>

                  <div className="depth-line"></div>

                  <div>
                    <div className="font-heading text-[0.55rem] tracking-[0.15em] uppercase mb-3" style={{ color: "var(--accent)" }}>Teste Rápido</div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>
                      Num leilão, o primeiro lance é de R$500. Você acha que o item vale mais ou menos que R$500?
                    </p>
                    <p className="font-body text-sm leading-relaxed mt-2" style={{ color: "var(--text-muted)" }}>
                      Se você pensou &quot;mais&quot;, a âncora já te pegou. Você sequer sabe o que é o item.
                    </p>
                  </div>

                  {/* Sign-off */}
                  <div className="pt-4 mt-2" style={{ borderTop: "1px solid rgba(59,158,194,0.08)" }}>
                    <p className="font-heading text-sm font-semibold" style={{ color: "var(--text-sec)" }}>
                      O cardume segue. Você decide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITAÇÃO */}
      <section className="quote-bg-section py-24 md:py-32 px-6">
        <div className="quote-overlay"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10 reveal">
          <blockquote className="font-body text-xl md:text-2xl italic leading-relaxed" style={{ color: "var(--text-sec)" }}>
            &quot;Quem nada com o cardume nunca sente a <span style={{ color: "var(--primary)", fontStyle: "normal", fontWeight: 600 }}>correnteza</span>. Só quem para é que percebe o quanto foi arrastado.&quot;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-8 h-px" style={{ background: "rgba(59,158,194,0.3)" }}></div>
            <span className="font-heading text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>Contra Maré</span>
            <div className="w-8 h-px" style={{ background: "rgba(59,158,194,0.3)" }}></div>
          </div>
        </div>
      </section>

      {/* CONCEITO */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 depth-line"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="font-heading text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-muted)" }}>O conceito</div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6" style={{ letterSpacing: "-0.02em" }}>
                Nadar contra a <span className="steel-text">correnteza</span> exige saber que ela existe
              </h2>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--text-sec)" }}>
                A maioria das pessoas não toma decisões. Elas seguem padrões invisíveis criados por vieses cognitivos, atalhos mentais que parecem inteligentes na hora, mas cobram o preço depois.
              </p>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--text-sec)" }}>
                O Contra Maré não vai te fazer &quot;pensar melhor&quot;. Mas vai te mostrar por que você pensa do jeito que pensa. O que você faz com isso é problema seu.
              </p>
            </div>
            <div className="reveal reveal-d2 relative">
              <div className="relative w-full" style={{ aspectRatio: "4/3", background: "rgba(10,21,32,0.5)", borderRadius: "12px", border: "1px solid rgba(59,158,194,0.1)", overflow: "hidden" }}>
                <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="water-glow" cx="30%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#132A3A" stopOpacity={1} />
                      <stop offset="100%" stopColor="#0A1520" stopOpacity={1} />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <rect width="400" height="300" fill="url(#water-glow)" />

                  {/* Blue fish school */}
                  <g opacity="0.5">
                    <ellipse cx="220" cy="80" rx="10" ry="5" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="245" cy="72" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.35" />
                    <ellipse cx="260" cy="88" rx="10" ry="5" fill="#3B9EC2" opacity="0.45" />
                    <ellipse cx="280" cy="76" rx="8" ry="4" fill="#3B9EC2" opacity="0.3" />
                    <ellipse cx="300" cy="84" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="200" cy="120" rx="10" ry="5" fill="#3B9EC2" opacity="0.5" />
                    <ellipse cx="225" cy="112" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.45" />
                    <ellipse cx="248" cy="125" rx="10" ry="5" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="270" cy="115" rx="8" ry="4" fill="#3B9EC2" opacity="0.35" />
                    <ellipse cx="290" cy="128" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.5" />
                    <ellipse cx="310" cy="118" rx="10" ry="5" fill="#3B9EC2" opacity="0.3" />
                    <ellipse cx="330" cy="126" rx="8" ry="4" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="190" cy="155" rx="11" ry="5.5" fill="#3B9EC2" opacity="0.55" />
                    <ellipse cx="215" cy="148" rx="10" ry="5" fill="#3B9EC2" opacity="0.5" />
                    <ellipse cx="240" cy="160" rx="11" ry="5.5" fill="#3B9EC2" opacity="0.45" />
                    <ellipse cx="265" cy="150" rx="10" ry="5" fill="#3B9EC2" opacity="0.5" />
                    <ellipse cx="288" cy="162" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="310" cy="152" rx="10" ry="5" fill="#3B9EC2" opacity="0.45" />
                    <ellipse cx="335" cy="158" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.35" />
                    <ellipse cx="355" cy="150" rx="8" ry="4" fill="#3B9EC2" opacity="0.3" />
                    <ellipse cx="210" cy="192" rx="10" ry="5" fill="#3B9EC2" opacity="0.45" />
                    <ellipse cx="235" cy="185" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="258" cy="198" rx="10" ry="5" fill="#3B9EC2" opacity="0.5" />
                    <ellipse cx="280" cy="188" rx="8" ry="4" fill="#3B9EC2" opacity="0.35" />
                    <ellipse cx="305" cy="195" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.45" />
                    <ellipse cx="240" cy="225" rx="9" ry="4.5" fill="#3B9EC2" opacity="0.35" />
                    <ellipse cx="265" cy="218" rx="10" ry="5" fill="#3B9EC2" opacity="0.4" />
                    <ellipse cx="288" cy="228" rx="8" ry="4" fill="#3B9EC2" opacity="0.3" />
                  </g>

                  {/* Yellow fish */}
                  <g filter="url(#glow)">
                    <ellipse cx="120" cy="155" rx="16" ry="8" fill="#E8C840" opacity="0.95" />
                    <polygon points="140,155 152,147 152,163" fill="#E8C840" opacity="0.8" />
                    <circle cx="110" cy="153" r="2" fill="#0A1520" opacity="0.7" />
                  </g>
                  <line x1="155" y1="155" x2="180" y2="155" stroke="#E8C840" strokeWidth="0.5" opacity="0.15" strokeDasharray="3,4" />

                  {/* Light rays */}
                  <line x1="100" y1="0" x2="130" y2="300" stroke="#3B9EC2" strokeWidth="0.5" opacity="0.04" />
                  <line x1="200" y1="0" x2="220" y2="300" stroke="#3B9EC2" strokeWidth="0.5" opacity="0.03" />
                  <line x1="300" y1="0" x2="310" y2="300" stroke="#3B9EC2" strokeWidth="0.5" opacity="0.04" />
                </svg>
              </div>
              <p className="font-heading text-[0.55rem] tracking-[0.15em] uppercase mt-4 text-center" style={{ color: "var(--text-muted)" }}>Um peixe numa direção diferente. É o que basta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32 px-6 relative" style={{ background: "var(--dark-mid)" }}>
        <div className="absolute top-0 left-0 right-0 depth-line"></div>
        <div className="max-w-6xl mx-auto">
          <div className="font-heading text-[0.6rem] tracking-[0.2em] uppercase text-center mb-12 reveal" style={{ color: "var(--text-muted)" }}>O que os leitores dizem</div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="ocean-card p-7 reveal">
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--text-sec)" }}>&quot;Toda segunda eu abro o email e penso: &apos;dessa vez eu não caí nesse viés&apos;. Até o terceiro parágrafo, quando percebo que caí sim.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs" style={{ background: "rgba(59,158,194,0.15)", color: "var(--primary)" }}>RM</div>
                <div>
                  <div className="font-heading text-xs font-semibold text-ice">Ricardo M.</div>
                  <div className="font-heading text-[0.6rem]" style={{ color: "var(--text-muted)" }}>CEO, fintech</div>
                </div>
              </div>
            </div>

            <div className="ocean-card p-7 reveal reveal-d1">
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--text-sec)" }}>&quot;A única newsletter que eu leio inteira. E a única que me faz ficar em silêncio numa reunião antes de concordar com todo mundo.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs" style={{ background: "rgba(232,200,64,0.12)", color: "var(--accent)" }}>CP</div>
                <div>
                  <div className="font-heading text-xs font-semibold text-ice">Carolina P.</div>
                  <div className="font-heading text-[0.6rem]" style={{ color: "var(--text-muted)" }}>Head de Produto</div>
                </div>
              </div>
            </div>

            <div className="ocean-card p-7 reveal reveal-d2">
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--text-sec)" }}>&quot;Mandei pra minha equipe inteira. Agora toda decisão de grupo começa com &apos;será que é viés de ancoragem?&apos;. Irritante e necessário.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs" style={{ background: "rgba(59,158,194,0.15)", color: "var(--primary)" }}>FL</div>
                <div>
                  <div className="font-heading text-xs font-semibold text-ice">Fernando L.</div>
                  <div className="font-heading text-[0.6rem]" style={{ color: "var(--text-muted)" }}>Investidor anjo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 depth-line"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-[600px] max-w-[80vw]" style={{ opacity: 0.04 }}>
            <ellipse cx="180" cy="100" rx="80" ry="40" fill="#E8C840" />
            <polygon points="270,100 320,65 320,135" fill="#E8C840" />
            <circle cx="150" cy="92" r="10" fill="#0A1520" opacity="0.5" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="font-heading text-[0.6rem] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: "var(--text-muted)" }}>Perguntas</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold reveal" style={{ letterSpacing: "-0.02em" }}>
              Antes de <span className="steel-text">decidir</span>
            </h2>
          </div>

          <div className="space-y-2 reveal">
            <div className="ocean-card">
              <button className="faq-btn w-full text-left p-6 flex items-center justify-between" aria-expanded="false">
                <span className="font-heading text-sm font-semibold pr-4">É mais uma newsletter de psicologia?</span>
                <span className="faq-icon text-xl leading-none flex-shrink-0" style={{ color: "var(--primary)" }}>+</span>
              </button>
              <div className="faq-content px-6">
                <p className="font-body text-sm leading-relaxed pb-6" style={{ color: "var(--text-sec)" }}>Não. É sobre vieses cognitivos, aquelas armadilhas do cérebro que fazem você tomar decisões que só depois percebe que foram ruins. Explicados com humor ácido e exemplos do seu dia a dia. Você vai ler achando que é entretenimento. Até perceber que o assunto é sobre você.</p>
              </div>
            </div>

            <div className="ocean-card">
              <button className="faq-btn w-full text-left p-6 flex items-center justify-between" aria-expanded="false">
                <span className="font-heading text-sm font-semibold pr-4">Preciso saber algo de psicologia?</span>
                <span className="faq-icon text-xl leading-none flex-shrink-0" style={{ color: "var(--primary)" }}>+</span>
              </button>
              <div className="faq-content px-6">
                <p className="font-body text-sm leading-relaxed pb-6" style={{ color: "var(--text-sec)" }}>Só precisa ter coragem de descobrir que você não é tão esperto quanto pensa. O resto a gente traduz pra linguagem de bar.</p>
              </div>
            </div>

            <div className="ocean-card">
              <button className="faq-btn w-full text-left p-6 flex items-center justify-between" aria-expanded="false">
                <span className="font-heading text-sm font-semibold pr-4">Qual a frequência?</span>
                <span className="faq-icon text-xl leading-none flex-shrink-0" style={{ color: "var(--primary)" }}>+</span>
              </button>
              <div className="faq-content px-6">
                <p className="font-body text-sm leading-relaxed pb-6" style={{ color: "var(--text-sec)" }}>Semanal. Um viés cognitivo por semana é o suficiente pra você começar a perceber por que tantas decisões &quot;óbvias&quot; deram errado. Ou quase.</p>
              </div>
            </div>

            <div className="ocean-card">
              <button className="faq-btn w-full text-left p-6 flex items-center justify-between" aria-expanded="false">
                <span className="font-heading text-sm font-semibold pr-4">Posso cancelar a qualquer momento?</span>
                <span className="faq-icon text-xl leading-none flex-shrink-0" style={{ color: "var(--primary)" }}>+</span>
              </button>
              <div className="faq-content px-6">
                <p className="font-body text-sm leading-relaxed pb-6" style={{ color: "var(--text-sec)" }}>Um clique. Sem drama. Mas se você cancelar, vai continuar tomando decisões ruins achando que foram boas. Só que sem saber por quê.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="assinar" className="cta-bg-section py-24 md:py-32 px-6">
        <div className="cta-overlay"></div>

        <div className="max-w-xl mx-auto text-center relative z-10">
          <div className="flex justify-center gap-1 mb-8 reveal">
            <div className="w-2 h-1 rounded-full bg-steel opacity-20"></div>
            <div className="w-2 h-1 rounded-full bg-steel opacity-30"></div>
            <div className="w-2 h-1 rounded-full bg-steel opacity-40"></div>
            <div className="w-2 h-1 rounded-full bg-steel opacity-50"></div>
            <div className="w-2 h-1 rounded-full bg-steel opacity-40"></div>
            <div className="w-2 h-1 rounded-full bg-steel opacity-30"></div>
            <div className="w-2 h-1 rounded-full bg-steel opacity-20"></div>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 reveal" style={{ letterSpacing: "-0.02em" }}>
            O cardume segue.
          </h2>
          <p className="font-heading text-xl md:text-2xl font-medium mb-8 reveal" style={{ color: "var(--primary)" }}>
            Você decide.
          </p>
          <p className="font-body leading-relaxed mb-10 reveal" style={{ color: "var(--text-sec)" }}>
            Toda semana, um viés cognitivo dissecado no seu email. Pra você parar de repetir os mesmos erros achando que dessa vez é diferente. Sem custo, sem compromisso.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto reveal" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Seu melhor email" className="email-input flex-1" aria-label="Email" required />
            <button type="submit" className="btn-primary whitespace-nowrap" style={{ animation: "cta-pulse 2.5s ease-in-out infinite" }}>Livre-se do cardume</button>
          </form>

          <p className="font-heading text-xs mt-4 reveal" style={{ color: "var(--text-muted)" }}>Grátis. Semanal. Um clique pra sair.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(59,158,194,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <Image src="/images/logo-final/favicon-180.webp" alt="" width={24} height={24} className="rounded" />
              <span className="font-heading text-sm font-bold text-ice">Contra Maré</span>
            </div>
            <span className="font-body text-xs italic" style={{ color: "var(--text-muted)" }}>O cardume segue. Você decide.</span>
          </div>
          <div className="font-heading text-xs" style={{ color: "var(--text-muted)" }}>&copy; <span id="year"></span> Contra Maré. Todos os direitos reservados.</div>
        </div>
      </footer>
    </>
  );
}
