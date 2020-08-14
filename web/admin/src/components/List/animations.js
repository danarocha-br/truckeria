export const listItems = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: 50 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const listGroup = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
