import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAnimation } from 'framer-motion';

import { Container, Title } from './styles';

const Modal = ({ children, width = 35.4  }) => {

  // const [theme, setTheme] = useState('theme', dark);

  // useEffect(() => {
  //   setTheme(theme.title === 'dark' ? dark : light);
  // }, [])

  // console.log('Current theme: ', theme);

  const controls = useAnimation();
  const isOpen = useSelector(state => state.modal.isOpen);

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
      <div className="relative h-full">

      <Title>
        <h1>Add Schedule</h1>
        <a href="/">X</a>
      </Title>
      {children}
      </div>
    </Container>
  );
};

export default Modal;
