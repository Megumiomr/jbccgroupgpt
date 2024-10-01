import Typography from "@/components/typography";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { useChatContext } from "../chat-context";
import { ChatFileUI } from "../chat-file/chat-file-ui";
import { ChatStyleSelector } from "./chat-style-selector";
import { ChatTypeSelector } from "./chat-type-selector";
import { AI_NAME } from "@/features/theme/customise";
import { useSession } from "next-auth/react";

interface Prop {}

export const ChatMessageEmptyState: FC<Prop> = (props) => {
  const { fileState } = useChatContext();
  const { data: session } = useSession();

  const { showFileUpload } = fileState;

  return (
    <div className="grid grid-cols-1 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-9">
      <Card className="col-span-3 flex flex-col gap-5 p-5 ">
        <Typography variant="h4" className="text-primary">
          機能設定
        </Typography>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
          温度を設定します
          </p>
          <ChatStyleSelector disable={false} />
        </div>

        <ChatFileUI />

      </Card>
    </div>
  );
};
