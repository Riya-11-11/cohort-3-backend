import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";

dotenv.config();

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (true) {
  const userInput = await readline.question("Enter your input: ");
  // const response = await model.invoke(userInput);
  const stream = await model.stream([
    {
      role: "user",
      content: userInput,
    },
  ]);

  //User -> GROQ server -> LLM
  //run when LLM produce token and recieve by User
  for await (const chunk of stream) {
    process.stdout.write(chunk.content);
  }

  process.stdout.write("\n");
}
