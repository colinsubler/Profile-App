import React, { createContext, useState, useEffect, useContext } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
  }, [dark]);

  const toggleMode = () => setDark((prev) => !prev);

  return (
    <ModeContext.Provider value={{ dark, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);

export default ModeContext;
