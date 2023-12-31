// FOR LEARN PURPOSE ONLY
import formatTodoForAI from "./format-todo-for-ai"

const fetchSuggestion = async (board: Board) => {
   const todos = formatTodoForAI(board)

   const response = await fetch("/api/generateSummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos }),
   })

   const GPTData = await response.json()
   const { content } = GPTData
   return content
}

export default fetchSuggestion
