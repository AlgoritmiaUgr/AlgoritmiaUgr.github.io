// Red neuronal optimizada para mejor rendimiento
class SimpleNeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.maxNodes = 50; // Restaurado a 50 nodos como solicitado
        this.frameCount = 0;
        this.connectionUpdateInterval = 60; // Actualizar conexiones cada 60 frames
        
        this.resize();
        this.init();
        this.animate();
        
        // Throttle resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 100);
        });
        
        // Actualizar canvas cuando el contenido de la página cambie
        let contentResizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(contentResizeTimeout);
            contentResizeTimeout = setTimeout(() => this.resize(), 200);
        });
        resizeObserver.observe(document.body);
        
        // Eliminar event listener del mouse para mejor rendimiento
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = Math.max(window.innerHeight, document.body.scrollHeight); // Cubrir toda la página
        
        // Reposicionar nodos si el canvas cambia de tamaño
        this.nodes.forEach(node => {
            if (node.x > this.canvas.width) node.x = this.canvas.width * Math.random();
            if (node.y > this.canvas.height) node.y = this.canvas.height * Math.random();
        });
    }
    
    init() {
        for (let i = 0; i < this.maxNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
        
        this.updateConnections();
    }
    
    updateConnections() {
        this.connections = [];
        const maxDistance = 150; // Reducido de 200 a 150
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        nodeA: this.nodes[i],
                        nodeB: this.nodes[j],
                        distance: distance,
                        opacity: (maxDistance - distance) / maxDistance
                    });
                }
            }
        }
    }
    
    distance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
    
    animate() {
        this.frameCount++;
        
        // Clear canvas with solid background for better performance
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update nodes position (sin interacción del mouse)
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary checks con rebote suave
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -0.8;
                node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -0.8;
                node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            }
            
            // Damping suave para movimiento natural
            node.vx *= 0.998;
            node.vy *= 0.998;
            
            // Pequeña fuerza aleatoria para mantener movimiento
            if (Math.random() < 0.005) {
                node.vx += (Math.random() - 0.5) * 0.1;
                node.vy += (Math.random() - 0.5) * 0.1;
            }
        });
        
        // Update connections less frequently
        if (this.frameCount % this.connectionUpdateInterval === 0) {
            this.updateConnections();
        }
        
        // Draw connections
        this.ctx.strokeStyle = 'rgba(51, 51, 51, 0.15)'; // Pre-calculated style
        this.ctx.lineWidth = 1;
        this.connections.forEach(conn => {
            this.ctx.globalAlpha = conn.opacity * 0.2;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.nodeA.x, conn.nodeA.y);
            this.ctx.lineTo(conn.nodeB.x, conn.nodeB.y);
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'rgba(51, 51, 51, 0.7)';
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Funcionalidad general del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Detección de rendimiento del dispositivo
    const isLowPerformanceDevice = () => {
        // Detectar dispositivos móviles o de bajo rendimiento
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
                                (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        
        return isMobile || isSlowConnection || hasLowMemory;
    };

    // Inicializar red neuronal solo en dispositivos de alto rendimiento
    const canvas = document.getElementById('neural-canvas');
    if (canvas && !isLowPerformanceDevice()) {
        new SimpleNeuralNetwork(canvas);
    } else if (canvas) {
        // Fondo simple para dispositivos de bajo rendimiento
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Crear patrón simple estático
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(51, 51, 51, 0.1)';
            ctx.fill();
        }
    }

    // Funcionalidad de navegación activa
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Marcar enlace de navegación activo
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Funcionalidad de año actual
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Botón de scroll hacia arriba optimizado
    const scrollTopButton = document.getElementById('scrollTopBtn');
    if (scrollTopButton) {
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    if (scrollTop > 100) {
                        scrollTopButton.classList.add('show');
                    } else {
                        scrollTopButton.classList.remove('show');
                    }
                    scrollTimeout = null;
                }, 10); // Throttled scroll event
            }
        }, { passive: true });

        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Funcionalidad de tooltip optimizada
    const customTooltip = document.getElementById('customTooltip');
    const resourceLinksWithTooltip = document.querySelectorAll('.recurso-item-lista[data-tooltip-text]');

    if (customTooltip && resourceLinksWithTooltip.length > 0) {
        let tooltipTimeout;
        
        resourceLinksWithTooltip.forEach(link => {
            link.addEventListener('mouseover', function(event) {
                clearTimeout(tooltipTimeout);
                const tooltipText = this.dataset.tooltipText;
                if (tooltipText) {
                    customTooltip.innerHTML = tooltipText;
                    customTooltip.style.display = 'block';
                    customTooltip.style.left = (event.pageX + 15) + 'px';
                    customTooltip.style.top = (event.pageY + 15) + 'px';
                    customTooltip.style.opacity = '1';
                }
            });

            link.addEventListener('mousemove', function(event) {
                if (customTooltip.style.display === 'block') {
                    customTooltip.style.left = (event.pageX + 15) + 'px';
                    customTooltip.style.top = (event.pageY + 15) + 'px';
                }
            });

            link.addEventListener('mouseout', function() {
                tooltipTimeout = setTimeout(() => {
                    customTooltip.style.opacity = '0';
                    customTooltip.style.display = 'none';
                }, 100); // Reducido de 200ms
            });
        });
    }

    // Funcionalidad para tarjetas de sugerencias clickeables (landing page)
    const suggestionCards = document.querySelectorAll('.suggestion-card[data-link]');
    suggestionCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });

    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animaciones de entrada optimizadas
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Dejar de observar una vez animado para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones (con throttling)
    const animatedElements = document.querySelectorAll('.content-card, .suggestion-card, .platform-card, .content-section');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)'; // Reducido de 20px
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; // Reducido de 0.6s
        
        // Retrasar la observación para evitar sobrecargar el observer
        setTimeout(() => {
            observer.observe(el);
        }, index * 10);
    });

    // Funcionalidad de filtrado (si existe)
    const filterButtons = document.querySelectorAll('[data-filter]');
    const filterableItems = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar elementos
            filterableItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });

    // Preloader simple (si existe)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }

    // Funcionalidad de búsqueda (si existe)
    const searchInput = document.getElementById('searchInput');
    const searchableItems = document.querySelectorAll('[data-searchable]');

    if (searchInput && searchableItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            searchableItems.forEach(item => {
                const searchText = item.dataset.searchable.toLowerCase();
                if (searchText.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    }

    // Dark mode toggle (preparado para futuro)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Cargar preferencia de dark mode
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    console.log('CPC UGR - Sitio web cargado correctamente');
});
