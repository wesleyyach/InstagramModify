document.addEventListener('DOMContentLoaded', () => {
    const spheres = document.querySelectorAll('.gradient-sphere');
    
    // Posiciona as esferas inicialmente
    spheres.forEach((sphere, index) => {
        const x = Math.random() * (window.innerWidth - 300); // 300 é o tamanho da esfera
        const y = Math.random() * (window.innerHeight - 300);
        sphere.style.left = `${x}px`;
        sphere.style.top = `${y}px`;
    });

    // Cria a animação para cada esfera
    spheres.forEach((sphere, index) => {
        // Animação de movimento suave
        gsap.to(sphere, {
            x: `random(-${(window.innerWidth - 300)/2}, ${(window.innerWidth - 300)/2})`,
            y: `random(-${(window.innerHeight - 300)/2}, ${(window.innerHeight - 300)/2})`,
            duration: `random(15, 25)`,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 2
        });

        // Animação de escala
        gsap.to(sphere, {
            scale: `random(0.8, 1.2)`,
            duration: `random(8, 12)`,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 1.5
        });

        // Animação de opacidade
        gsap.to(sphere, {
            opacity: `random(0.3, 0.7)`,
            duration: `random(5, 8)`,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index
        });
    });

    // Atualiza as animações quando a janela é redimensionada
    window.addEventListener('resize', () => {
        spheres.forEach((sphere, index) => {
            gsap.killTweensOf(sphere);
            
            gsap.to(sphere, {
                x: `random(-${(window.innerWidth - 300)/2}, ${(window.innerWidth - 300)/2})`,
                y: `random(-${(window.innerHeight - 300)/2}, ${(window.innerHeight - 300)/2})`,
                duration: `random(15, 25)`,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 2
            });
        });
    });
}); 