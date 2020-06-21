import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

import { Container } from './styles';

const Modal = ({ children, isOpen, width = 35.4 }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? 'open' : 'closed');
  }, [isOpen, controls]);

  const form = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      x: `${width * 3}%`,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <Container
      width={width}
      initial={false}
      variants={form}
      animate={controls}
      drag="x"
      dragElastic={0.1}
      dragConstraints={{
        left: -width,
        right: 0,
      }}
    >
      {children}
    </Container>
  );
};

export default Modal;
