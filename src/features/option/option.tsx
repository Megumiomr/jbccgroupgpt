"use client";

import { FC } from "react";
import { OptionFileUI } from "./option-file-ui";
import Typography from "@/components/typography";
import { Card } from "@/components/ui/card";

interface Prop {}

export const Option = () => {

  return (
    <div className="grid grid-cols-1 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-9">
      <Card className="col-span-3 flex flex-col gap-5 p-5 ">
        <Typography variant="h4" className="text-primary">
          ファイル読込
        </Typography>

        <div className="flex flex-col gap-2">
          <OptionFileUI />
        </div>

        
      </Card>
    </div>
  );
};
