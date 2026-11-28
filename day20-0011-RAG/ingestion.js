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

console.log("Extracted text length:", text.length);
console.log("Total chunks:", chunks.length);

// Initialize embeddings
const embeddings = new CohereEmbeddings({
  model: "embed-v5.0-fast",
  apiKey: process.env.COHERE_API_KEY,
});

// Generate vectors
const vectors = await embeddings.embedDocuments(chunks);

console.log("Total vectors:", vectors.length);

// -------------- Initialize Pinecone client --------------

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.Index({
  name: "cohortrag-vectors",
  host: "https://cohortrag-vectors-w43l7py.svc.aped-4627-b74a.pinecone.io",
});

// -------------- Upsert vectors into Pinecone --------------

await index.upsert({
  records: vectors.map((vector, index) => {
    return {
      id: `chunk-${index}`,
      values: vector,
      metadata: {
        text: chunks[index],
      },
    };
  }),
});

console.log("Data successfully stored in Pinecone!");