import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { FC } from "react";

export const OptionFileUI: FC = () => {

  return (
    <div className="flex flex-col gap-2">
      <form className="flex gap-2">
        <Input
          name="file"
          type="file"
          required
          //disabled={isUploadingFile}
          placeholder="Describe the purpose of the document"
          /*onChange={(e) => {
            setIsFileNull(e.currentTarget.value === null);
          }}*/
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
    </div>
  );
};
