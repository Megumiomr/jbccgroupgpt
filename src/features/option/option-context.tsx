import React, { createContext, useContext, useState } from "react";
import { FileState, OptionFileState } from "./option-file-state";

interface OptionContextProps {
    fileState: FileState;
}

export const OptionContext = createContext<OptionContextProps | null>(null);

const useOptionContext = () => {
    const content = useContext(OptionContext);

    if(!content){
      throw new Error("useOptionContext has to be used within <CurrentUserContext.Provider>")
    }

    return content;
}

export const OptionProvider = ({ children }) => {
    const fileState = OptionFileState();
  
    return (
      <OptionContext.Provider
        value={{
          fileState
        }}
      >
        {children}
      </OptionContext.Provider>
    );
  };



