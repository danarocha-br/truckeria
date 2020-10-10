import React from 'react';
import { FiMapPin } from 'react-icons/fi';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import Tag from '~/components/Tag';
import colors from '~/styles/tokens/colors';
import { PreviewContainer, ProfileImg } from './styles';
import EmptyImage from '~/assets/empty_photo.png';

// const Map = ReactMapboxGl({
//   accessToken:
//     'pk.eyJ1IjoiZGFuYXJvY2hhIiwiYSI6ImNrZGlzaTFweDA4MzIzMG1yM3UwdnYzZHMifQ.G13p8kElAiH22j9iWz_FGA',
// });

const Preview = ({ values }) => {
  return (
    <PreviewContainer>
      {values.files[0] ? (
        <ProfileImg src={URL.createObjectURL(values.files[0])} />
      ) : (
        <ProfileImg src={EmptyImage} />
      )}
      <h3>{values.name ? values.name : 'Your Food Truck'}</h3>
      <div className="flex">
        {values.cuisines.length > 0 ? (
          values.cuisines.map((type) => <Tag label={type} key={type} />)
        ) : (
          <>
            <Tag label="food type" isEmpty />
            <Tag label="food type" isEmpty />
            <Tag label="food type" isEmpty />
          </>
        )}
      </div>
      <hr />
      <div className="address">
        <FiMapPin size="18" color={colors.gray900} />
        <p>
          <span>{values.state ? values.state : 'State'}</span>
          <span>{values.city ? values.city : 'City'}</span>
        </p>
      </div>
      {/* <Map
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
  </Map> */}
    </PreviewContainer>
  );
};

export default Preview;
