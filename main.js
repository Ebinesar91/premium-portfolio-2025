import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initCursor } from './src/js/ui.js'
import { initAnimations } from './src/js/animations.js'
import { initSupabase } from './src/js/supabase.js'

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// Init App
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initAnimations(gsap, ScrollTrigger);
  initSupabase();

  // Initial Page Load Animation
  const tl = gsap.timeline();
  tl.to('body', { visibility: 'visible', duration: 0.1 })
    .from('.hero-title', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 })
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1')
    .from('.hero-tagline', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
    .from('.hero-cta', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8');
});
