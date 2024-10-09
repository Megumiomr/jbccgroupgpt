import React, { createContext, useContext, useState } from "react";
import { FileState, OptionFileState } from "./option-file-state";

interface OptionContextProps {
    fileState: FileState;
}

export const OptionContext = createContext<OptionContextProps | undefined>(undefined);

export const useOptionContext = () => useContext(OptionContext);

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



