"use server";

import { deleteAllDocuments } from "@/features/chat/chat-services/azure-cog-search/azure-cog-vector-store";

export const FileDeleteProcess = async () => {

    await deleteAllDocuments();

};