"use server";

import { userHashedId } from "@/features/auth/helpers";
import { CosmosDBContainer } from "@/features/common/cosmos";

import { uniqueId } from "@/features/common/util";
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import { SqlQuerySpec } from "@azure/cosmos";
import {
  AzureCogDocumentIndex,
  ensureIndexIsCreated,
  indexDocuments,
  deleteAllDocuments,
} from "@/features/chat/chat-services/azure-cog-search/azure-cog-vector-store";
import { chunkDocumentWithOverlap } from "@/features/chat/chat-services/text-chunk";

const MAX_DOCUMENT_SIZE = 20000000;

export interface UploadActionResponse<T> {
    success: boolean;
    error: string;
    response: T;
}

export const UploadDocument = async (
  formData: FormData
): Promise<UploadActionResponse<string[]>> => {
  try {
    await ensureSearchIsConfigured();

    const { docs } = await LoadFile(formData);
    const splitDocuments = chunkDocumentWithOverlap(docs.join("\n"));

    return {
      success: true,
      error: "",
      response: splitDocuments,
    };
  } catch (e) {
    return {
      success: false,
      error: (e as Error).message,
      response: [],
    };
  }
};

const LoadFile = async (formData: FormData) => {
  try {
    const file: File | null = formData.get("file") as unknown as File;

    if (file && file.size < MAX_DOCUMENT_SIZE) {
      const client = initDocumentIntelligence();

      const blob = new Blob([file], { type: file.type });

      const poller = await client.beginAnalyzeDocument(
        "prebuilt-read",
        await blob.arrayBuffer()
      );
      const { paragraphs } = await poller.pollUntilDone();

      const docs: Array<string> = [];

      if (paragraphs) {
        for (const paragraph of paragraphs) {
          docs.push(paragraph.content);
        }
      }

      return { docs };
    }
  } catch (e) {
    const error = e as any;

    if (error.details) {
      if (error.details.length > 0) {
        throw new Error(error.details[0].message);
      } else {
        throw new Error(error.details.error.innererror.message);
      }
    }

    throw new Error(error.message);
  }

  throw new Error("Invalid file format or size. Only PDF files are supported.");
};

export const IndexDocuments = async (
  fileName: string,
  docs: string[],
  chatThreadId: string
): Promise<UploadActionResponse<AzureCogDocumentIndex[]>> => {
  try {
    const documentsToIndex: AzureCogDocumentIndex[] = [];

    for (const doc of docs) {
      const docToAdd: AzureCogDocumentIndex = {
        id: uniqueId(),
        chatThreadId,
        user: await userHashedId(),
        pageContent: doc,
        metadata: fileName,
        chatType: "data",
        embedding: [],
      };

      documentsToIndex.push(docToAdd);
    }

    await indexDocuments(documentsToIndex);

    return {
        success: true,
        error: "",
        response: documentsToIndex,
    };

  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: (e as Error).message,
      response: [],
    };
  }
};

export const initDocumentIntelligence = () => {
  const client = new DocumentAnalysisClient(
    process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY)
  );

  return client;
};

export const ensureSearchIsConfigured = async () => {
  var isSearchConfigured =
    isNotNullOrEmpty(process.env.AZURE_SEARCH_NAME) &&
    isNotNullOrEmpty(process.env.AZURE_SEARCH_API_KEY) &&
    isNotNullOrEmpty(process.env.AZURE_SEARCH_INDEX_NAME) &&
    isNotNullOrEmpty(process.env.AZURE_SEARCH_API_VERSION);

  if (!isSearchConfigured) {
    throw new Error("Azure search environment variables are not configured.");
  }

  var isDocumentIntelligenceConfigured =
    isNotNullOrEmpty(process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT) &&
    isNotNullOrEmpty(process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY);

  if (!isDocumentIntelligenceConfigured) {
    throw new Error(
      "Azure document intelligence environment variables are not configured."
    );
  }

  var isEmbeddingsConfigured = isNotNullOrEmpty(
    process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME
  );

  if (!isEmbeddingsConfigured) {
    throw new Error("Azure openai embedding variables are not configured.");
  }

  await ensureIndexIsCreated();
};


export const isNotNullOrEmpty = (value?: string) => {
    return value !== null && value !== undefined && value !== "";
};


export const AllDelete = async () => {

  await deleteAllDocuments();

};