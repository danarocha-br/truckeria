import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

const Thumb = ({ thumb, file }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    setLoading({ isLoading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        setLoading({ isLoading: false, thumb: reader.result });
      };

      reader.readAsDataURL(file);
    });
  }, [file]);

  if (!file) {
    return null;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <img
      src={thumb}
      alt={file.name}
      className="mt-2"
      height={200}
      width={200}
    />
  );
};

export default Thumb;
