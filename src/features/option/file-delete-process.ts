"use server";

import { useGlobalMessageContext } from "@/features/global-message/global-message-context";
import { deleteAllDocuments } from "@/features/chat/chat-services/azure-cog-search/azure-cog-vector-store";

export const FileDeleteProcess = async () => {

    const { showError } = useGlobalMessageContext();

    try {
        await deleteAllDocuments();
    } catch (e) {
        showError("" + e);
    }

};