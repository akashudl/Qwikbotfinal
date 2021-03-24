import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userdetails, setuserdetails] = useState([]);


  return (
    <UserContext.Provider
      value={{
        userdetails,
        setuserdetails,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
