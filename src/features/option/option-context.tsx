import React, { createContext, useContext, useState } from "react";
import { FileState, OptionFileState } from "./option-file-state";

interface OptionContextProps {
    fileState: FileState;
}

export const OptionContext = createContext<OptionContextProps>(null);

const fileState = OptionFileState();

export const useOptionContext = () => useContext(OptionContext);