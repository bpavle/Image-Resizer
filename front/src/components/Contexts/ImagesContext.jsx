import React, { useState } from "react";

export const ImagesContext = React.createContext();

export const ImagesProvider = (props) => {
  const [images, setImages] = useState([]);
  console.log(images);
  return (
    <ImagesContext.Provider value={[images, setImages]}>
      {props.children}
    </ImagesContext.Provider>
  );
};
