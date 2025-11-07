// src/particles-config.js

export const particlesConfig = {
  fullScreen: {
    enable: false, // This is important, we'll control the container
  },
  particles: {
    number: {
      value: 80, // Number of particles
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#555555", // Particle color
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: false,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#555555", // Line color
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2, // Particle movement speed
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab", // 'grab' or 'repulse'
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_opacity: 1,
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
  background: {
    color: "transparent", // Make background transparent
  },
};