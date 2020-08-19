import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { AnimatedContainer, PreviewContainer, ProfileImg } from './styles';
import Form from './Form';
import AuthLayout from '../../_layouts/auth';
import Tag from '../../../components/Tag';
import colors from '../../../styles/tokens/colors';

const FoodTruckSetup = () => {
  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZGFuYXJvY2hhIiwiYSI6ImNrZGlzaTFweDA4MzIzMG1yM3UwdnYzZHMifQ.G13p8kElAiH22j9iWz_FGA',
  });
  return (
    <AuthLayout>
      <AnimatedContainer>
        <div>
          <h1>Your food truck's info</h1>
          <p>Tell your customers as much as possibile about your food truck!</p>

          <Form />
        </div>
      </AnimatedContainer>

      <PreviewContainer>
        <ProfileImg />
        <h3>Food Truck Name</h3>
        <div className="flex">
          <Tag label="Vegan-friendly" />
          <Tag label="Salad" />
          <Tag label="Burger" />
        </div>
        <hr />
        <div className="address">
          <FiMapPin size="18" color={colors.gray900} />
          <p>
            <span>State</span>
            <span>City</span>
          </p>
        </div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '250px',
            width: '100%',
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
        ;
      </PreviewContainer>
    </AuthLayout>
  );
};

export default FoodTruckSetup;
