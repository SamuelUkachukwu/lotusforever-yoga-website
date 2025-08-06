const menuButton = document.getElementById('menu');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-links a');

function stopScrolling(e) {
    e.preventDefault();
}

function disableScroll() {
    document.documentElement.addEventListener('touchmove', stopScrolling, { passive: false });
    document.documentElement.addEventListener('wheel', stopScrolling, { passive: false });
}

function enableScroll() {
    document.documentElement.removeEventListener('touchmove', stopScrolling);
    document.documentElement.removeEventListener('wheel', stopScrolling);
}

menuButton.addEventListener('click', function () {
    this.classList.toggle('open');
    mobileNav.classList.toggle('active');

    if (mobileNav.classList.contains('active')) {
        disableScroll();
    } else {
        enableScroll();
    }
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuButton.classList.remove('open');
        enableScroll();
    });
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
        mobileNav.classList.remove('active');
        menuButton.classList.remove('open');
        enableScroll();
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero-container',
            pin: true,
            start: 'top top',
            end: '+=200%',
            scrub: 2,
            // markers: true,
        }
    });

    //Fade the fixed hero content
    tl.to('.hero-content', {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out"
    }, 0);

    //Animate box to full screen
    tl.to('.hero-animation', {
        width: "100vw",
        height: "100vh",
        duration: 2,
        rotation: 360,
        ease: "power1.inOut"
    });

    //Curve border to circles
    tl.to('.hero-blinds', {
        borderRadius: "50%",
        duration: 1,
        ease: "power2.inOut",
    }, 0.3);

    //Display the Hero Text
    tl.to('.hero-text', {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'none'
    }, 0.7);
});
