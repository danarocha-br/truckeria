export const modal = {
  open: {
    opacity: 1,
    x: 0,
    zIndex: 99,
    transition: {
      type: 'spring',
      damping: 13,
      stiffness: 100,
    },
  },
  closed: {
    opacity: 0,
    width: 0,
    x: 500,
    zIndex: -1,
    transition: {
      delay: 0.5,
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
};

export const overlay = {
  open: {
    opacity: .5,
    zIndex: 1,
  },
  closed: {
    opacity: 0,
    zIndex: -1,
  },
};
