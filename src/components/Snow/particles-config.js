const particlesConfig = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    opacity: {
      value: 0.7,
      random: false,
      anim: {
        enable: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 3,
      direction: 'bottom',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: false
      },
      onclick: {
        enable: false
      },
      resize: false
    }
  },
  retina_detect: true
}

export default particlesConfig
