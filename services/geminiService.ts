
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we rely on the host to provide the key.
    console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateSqlQuery(schema: string, prompt: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const fullPrompt = `
    Based on the SQL schema provided below, write a SQL query to answer the user's request.

    **Schema:**
    \`\`\`sql
    ${schema}
    \`\`\`

    **User Request:**
    "${prompt}"

    **Instructions:**
    - ONLY output the raw SQL query.
    - Do not include any explanatory text, introduction, or conclusion.
    - Do not wrap the query in markdown backticks (e.g., \`\`\`sql).
    - Ensure the query is valid for PostgreSQL.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });
    
    // Clean up the response to remove potential markdown and extra whitespace
    let query = response.text.trim();
    if (query.startsWith('```sql')) {
      query = query.substring(5).trim();
    }
    if (query.endsWith('```')) {
      query = query.substring(0, query.length - 3).trim();
    }
    
    return query;
  } catch (error) {
    console.error("Error generating SQL query:", error);
    throw new Error("Failed to generate SQL query. Please check your API key and network connection.");
  }
}
