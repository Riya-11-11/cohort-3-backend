import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CohereEmbeddings } from "@langchain/cohere";
import "dotenv/config";
import fs from "fs/promises";
import { Pinecone } from "@pinecone-database/pinecone";

// Initialize PDF parser
const parser = new PDFParse({
  data: await fs.readFile("./story.pdf"),
});

// ------------- Extract all the text from PDF file -------------
const result = await parser.getText({});
const text = result.text;

// ------------- Split the text into chunks -------------
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

const chunks = await textSplitter.splitText(text);

//  ------------- Iniatialize embeddings [embedding model] --------------
const embeddings = new CohereEmbeddings({
  model: "embed-v5.0-fast",
  apiKey: process.env.COHERE_API_KEY,
});

//  -------------- Embed the text chunks into vectors --------------
const vectors = await embeddings.embedDocuments(chunks);

//  -------------- Initialize Pinecone client --------------
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.Index({
  name:"cohortrag",
  host: "https://cohortrag-w43l7py.svc.aped-4627-b74a.pinecone.io"
});

await index.upsertRecords({
  records: vectors.map((vector, index) => {
    return {
      id: `chunk-${index}`,
      embedding: vector,
      content: chunks[index],
    };
  }),
});
