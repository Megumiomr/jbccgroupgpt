"use client";

import { FC } from "react";
import { ChatMessageEmptyState } from "@/features/chat/chat-ui/chat-empty-state/chat-message-empty-state";

interface Prop {}

export const Option = () => {

  return (
    <div className="h-full relative overflow-hidden flex-1 bg-card rounded-md shadow-md">
   
     <ChatMessageEmptyState />

    </div>
  );
};
