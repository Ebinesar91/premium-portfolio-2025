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
