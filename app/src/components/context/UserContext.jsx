import React, { createContext, useState } from "react";

export const DataUser = createContext();

export const DataProvider = ({ children }) => {
  const [userglobal, setUserglobal] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
    
      
    
      
    
  return (
    <DataUser.Provider
      value={{
        userglobal,
        setUserglobal,
      }}
    >
      {children}
    </DataUser.Provider>
  );


};
