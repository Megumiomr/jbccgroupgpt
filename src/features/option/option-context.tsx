import React, { createContext, useContext, useState } from "react";
import { FileState, OptionFileState } from "./option-file-state";

interface OptionContextProps {
    fileState: FileState;
}

export const OptionContext = createContext<OptionContextProps | null>(null);

export const useOptionContext = () => {
    const context = useContext(OptionContext);

    if(!context){
      throw new Error("OptionContext is null");
    }

    return context;

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



