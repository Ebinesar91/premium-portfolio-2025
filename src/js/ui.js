export function initCursor() {
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, .magnetic-area');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Trail effect could be added here if needed, but keeping it performant
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });

        // Magnetic Effect
        if (link.classList.contains('magnetic-area')) {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Move the child button
                const btn = link.querySelector('.btn');
                if (btn) {
                    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                }
            });

            link.addEventListener('mouseleave', () => {
                const btn = link.querySelector('.btn');
                if (btn) {
                    btn.style.transform = `translate(0px, 0px)`;
                }
            });
        }
    });
}

export function initCertificates(gsap) {
    const cards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalInfo = document.getElementById('modal-info');
    const modalObject = document.getElementById('modal-object');
    const modalDownload = document.getElementById('modal-download');
    const modalFallback = document.getElementById('modal-fallback');
    const modalContainer = modal.querySelector('.modal-container');

    // Open Modal
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.dataset.src;
            const title = card.dataset.title;
            const info = card.dataset.info;

            // Populate Content
            modalTitle.innerText = title;
            modalInfo.innerText = info;
            modalObject.data = src;
            modalDownload.href = src;
            modalFallback.href = src;
            document.getElementById('modal-mobile-view').href = src;

            // Show Modal (CSS + GSAP)
            modal.classList.add('active');

            // GSAP Animation
            gsap.fromTo(modalContainer,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            );
            gsap.fromTo(modal,
                { backgroundColor: 'rgba(0,0,0,0)' },
                { backgroundColor: 'rgba(0,0,0,0.85)', duration: 0.3 }
            );
        });
    });

    // Close Function
    const closeModal = () => {
        gsap.to(modalContainer, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
                modalObject.data = ""; // Reset to stop playing if video/audio, or just clear
            }
        });
        gsap.to(modal, {
            backgroundColor: 'rgba(0,0,0,0)',
            duration: 0.3
        });
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on Outside Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
