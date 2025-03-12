
// Animation variants for framer-motion
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number = 0) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        delay
      }
    }
  };
};

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
};

export const textVariant = (delay: number = 0.1) => {
  return {
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.6,
        delay
      }
    }
  };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number = 0) => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
      opacity: 0
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        delay
      }
    }
  };
};

export const scaleIn = (delay: number = 0) => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        delay
      }
    }
  };
};

// CSS Animation Utility Classes
export const cssAnimationClasses = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  zoomIn: 'animate-zoom-in',
  float: 'animate-float',
  pulseSubtle: 'animate-pulse-subtle',
  spinSlow: 'animate-spin-slow'
};

// Helper to add delayed animation classes
export const getDelayClass = (index: number, baseDelay: number = 100): string => {
  const delay = baseDelay * index;
  return `delay-[${delay}ms]`;
};
