import React from "react";
import { useState, useEffect } from "react";
import "./search.css";

// import Typewriter from "react-simple-typewriter";
// import "react-simple-typewriter/dist/index.css";

export const Search = ({
  placeholder: passedPlaceholder = "",
  ...passedProps
}) => {
  const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intr = setInterval(() => {
      setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
      if (placeholderIndex + 1 > passedPlaceholder.length) {
        setTimeout(() => {
          setPlaceholderIndex(0);
        }, 3000);
        clearInterval(intr);
      } else {
        setPlaceholderIndex(placeholderIndex + 1);
      }
    }, 160);
    return () => {
      clearInterval(intr);
    };
  });

  return (
    <input
      id="restaurant_search"
      placeholder={placeholder}
      onChange={passedProps.handlesearch}
    />
  );
};
