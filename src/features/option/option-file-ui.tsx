"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { FC } from "react";
import { FileUploadProcess } from "./file-upload-process";
import { useGlobalMessageContext } from "@/features/global-message/global-message-context";
import { FileDeleteProcess } from "./file-delete-process";

export const OptionFileUI: FC = () => {

  const id = "soumu";
  const { showError } = useGlobalMessageContext();

  const { onSubmit } = FileUploadProcess({ id });

  const sendData = async () => {
      await FileDeleteProcess();
  };    


  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          name="file"
          type="file"
          required
          //disabled={isUploadingFile}
          placeholder="Describe the purpose of the document"
          //onChange={(e) => {
          //  setIsFileNull(e.currentTarget.value === null);
          //}}
        />

        <Button
          type="submit"
          value="Upload"
          //disabled={!(!isFileNull && !isUploadingFile)}
          className="flex items-center gap-1"
        >
          Upload
        </Button>

      </form>

      <Button
          className="flex items-center gap-1"
          onClick={async (e) => {
            e.preventDefault();
            const yesDelete = confirm(
              "アップロードしているファイルを削除しますか？"
            );
            if (yesDelete) {
              await sendData();
            }
          }}
      >
        ファイル削除
      </Button>

    
      
    </div>
  );
};
