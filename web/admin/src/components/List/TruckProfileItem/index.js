import React from 'react';
import { FiMapPin } from 'react-icons/fi';

import { Container, ProfileImg, Footer } from './styles';
import EmptyImage from '~/assets/empty_photo.png';

function TruckProfileItem({title, cuisines, src, city, state, onClick}) {
  return (
    <Container onClick={onClick}>
      <header>
        <ProfileImg src={src ? src : EmptyImage } alt=""/>
        <h1 className="text-gray-900 text-lg font-bold px-2">{title}</h1>
        <span>{cuisines && cuisines.map(cuisine => <p>{cuisine}</p>)}</span>
      </header>

      <hr/>

      <Footer>
        <span>$$</span>
        <address><FiMapPin color='text-white' /> {city}, {state}</address>
      </Footer>

    </Container>);
}

export default TruckProfileItem;
