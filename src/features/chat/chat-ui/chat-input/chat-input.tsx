import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatContext } from "@/features/chat/chat-ui/chat-context";
import { useGlobalConfigContext } from "@/features/global-config/global-client-config-context";
import { Loader, Send } from "lucide-react";
import { FC, FormEvent, useRef } from "react";
//import { ChatFileSlider } from "../chat-file/chat-file-slider";
import { Microphone } from "../chat-speech/microphone";
import { useChatInputDynamicHeight } from "./use-chat-input-dynamic-height";

interface Props {}

const ChatInput: FC<Props> = (props) => {
  const { setInput, handleSubmit, isLoading, input, chatBody } =
    useChatContext();

  const { speechEnabled } = useGlobalConfigContext();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { rows, resetRows, onKeyDown, onKeyUp } = useChatInputDynamicHeight({
    buttonRef,
  });


  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    resetRows();
    setInput("");
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <form
      onSubmit={submit}
      className="absolute bottom-0 w-full flex items-center"
    >
      <div className="container mx-auto max-w-4xl relative py-4 flex gap-2 items-center">
        <Textarea
          rows={rows}
          value={input}
          placeholder="メッセージを送る"
          className="min-h-fit bg-background shadow-sm resize-y py-4 pr-[80px]"
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onChange={onChange}
        ></Textarea>
        <div className="absolute right-0 bottom-0 px-8 flex items-end h-full mr-2 mb-4">
          {speechEnabled && <Microphone disabled={isLoading} />}
          <Button
            size="icon"
            type="submit"
            variant={"ghost"}
            ref={buttonRef}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
