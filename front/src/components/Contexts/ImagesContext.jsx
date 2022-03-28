import React, { useState } from "react";

export const ImagesContext = React.createContext();

export const ImagesProvider = (props) => {
  const [images, setImages] = useState([]);
  const [trigger, setTrigger] = useState(false);
  console.log(images);
  return (
    <ImagesContext.Provider
      value={{ images: [images, setImages], triggerAll: [trigger, setTrigger] }}
    >
      {props.children}
    </ImagesContext.Provider>
  );
};
