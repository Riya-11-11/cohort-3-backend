import { ChatCohere, CohereEmbeddings } from "@langchain/cohere";
import "dotenv/config";

const userInput = "Tell me about Arav's internship";


//initialize Embedding model
const embedding = apiKey

const model = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: process.env.COHERE_API_KEY,
});

const response = await model.invoke(userInput);
console.log(response);
