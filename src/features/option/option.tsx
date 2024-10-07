"use client";

import { FC } from "react";
import { OptionFileUI } from "./option-file-ui";

interface Prop {}

export const Option = () => {

  return (
    <div className="h-full relative overflow-hidden flex-1 bg-card rounded-md shadow-md">
   
    <OptionFileUI />

    </div>
  );
};
