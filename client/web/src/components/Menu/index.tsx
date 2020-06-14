import React from 'react';
import {
  AiOutlineCar,
  AiOutlineCalendar,
  AiOutlineOrderedList,
  AiOutlinePercentage,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Container, List, Profile } from './styles';
import Item from './Item';
import ProfileImage from '../../assets/sign-in-background.png';

export interface MenuProps {}

const Menu: React.SFC<MenuProps> = () => {
  return (
    <Container>
      <h1 className="text-2xl">Truckeria</h1>

      <nav>
        <List>
          <Item title="overview" icon={AiOutlineCar} to="/" />
          <Item title="schedule" icon={AiOutlineCalendar} to="/schedule" />
          <Item title="menu" icon={AiOutlineOrderedList} to="/menu" />
          <Item title="discounts" icon={AiOutlinePercentage} to="/discounts" />
        </List>
      </nav>

      <Profile>
        <img src={ProfileImage} alt="foodtruck" />
        <div>
          <Link to="/profile">Name LastName</Link>
          <Link to="/">Log out</Link>
        </div>
      </Profile>
    </Container>
  );
};

export default Menu;
