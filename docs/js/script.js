document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    const scrollTopButton = document.getElementById('scrollTopBtn');

    // Tooltip functionality (retained)
    const customTooltip = document.getElementById('customTooltip');
    const resourceLinksWithTooltip = document.querySelectorAll('.recurso-item-lista[data-tooltip-text]'); // Select based on data-tooltip-text now

    if (customTooltip && resourceLinksWithTooltip) {
        resourceLinksWithTooltip.forEach(link => {
            link.addEventListener('mouseover', function(event) {
                const tooltipText = this.dataset.tooltipText;
                if (tooltipText) {
                    customTooltip.innerHTML = tooltipText;
                    customTooltip.style.display = 'block';
                    customTooltip.style.left = (event.pageX + 15) + 'px';
                    customTooltip.style.top = (event.pageY + 15) + 'px';
                    setTimeout(() => { customTooltip.style.opacity = '1'; }, 10);
                }
            });
            link.addEventListener('mousemove', function(event) {
                if (customTooltip.style.display === 'block') {
                    customTooltip.style.left = (event.pageX + 15) + 'px';
                    customTooltip.style.top = (event.pageY + 15) + 'px';
                }
            });
            link.addEventListener('mouseout', function() {
                customTooltip.style.opacity = '0';
                setTimeout(() => { customTooltip.style.display = 'none'; }, 200);
            });
        });
    }

    // Scroll to top button functionality (retained)
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            if(scrollTopButton) scrollTopButton.classList.add('show');
        } else {
            if(scrollTopButton) scrollTopButton.classList.remove('show');
        }
    };
    if(scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Highlight active navigation link
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html'; // Gets "index.html", "calendario.html", etc.
    const navLinks = document.querySelectorAll('#main-navigation a.nav-link');

    navLinks.forEach(link => {
        // Compare the href of the link with the current filename
        if (link.getAttribute('href') === filename) {
            link.classList.add('active-section-link');
        } else {
            link.classList.remove('active-section-link');
        }
    });
});
