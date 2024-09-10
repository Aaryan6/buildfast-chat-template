import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { CHUNK_OVERLAP, CHUNK_SIZE, STORAGE_DIR } from "./constants.mjs";

dotenv.config({ path: ".env.local" });

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function AddEmbeddings() {
  const loader = new DirectoryLoader(STORAGE_DIR, {
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);

  //   Add filename to metadata in splitDocs array
  const splitDocsWithFilename = splitDocs.map((doc) => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      filename: "ayurveda",
    },
  }));

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "table_name",
    queryName: "query_name",
  });
  const res = await vectorStore.addDocuments(splitDocsWithFilename);
  console.log(res);
}

AddEmbeddings();
