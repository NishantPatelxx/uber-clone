import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainDataProvider = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);

  console.log("CaptainDataProvider initialized"); // Debugging log

  return (
    <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainDataProvider;