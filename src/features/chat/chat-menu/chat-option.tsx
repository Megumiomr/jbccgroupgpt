"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateChatThread } from "../chat-services/chat-thread-service";
import { ChatMessageEmptyState } from "@/features/chat/chat-ui/chat-empty-state/chat-message-empty-state";

export const ChatOption = () => {

    return (

        <Button
          className="gap-2 rounded-full w-[40px] h-[40px] p-1 text-primary"
          variant={"outline"}
          onClick={() => ChatMessageEmptyState()}
        >
          <PlusCircle size={40} strokeWidth={1.2} />
        </Button>
        
      );

}