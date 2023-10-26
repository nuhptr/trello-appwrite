import openai from "@/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
   /**
    * Get todos from the request body
    */
   const { todos } = await request.json()
   console.log(todos)

   /**
    * Create a completion using the engine specified in the model parameter.
    */
   const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
         {
            role: "system",
            content: `When responding, welcome the user always as Mr. Adi and say welcome to TRELLO! limit the response to 20 characters.`,
         },
         {
            role: "user",
            content: `Hi there, provided a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
               todos
            )}`,
         },
      ],
   })

   /**
    * new response format for getting data from openai
    * instead of using { data }, now we access the data directly
    */
   const { created, model, choices } = response

   console.log(created, model, choices)
   console.log(choices[0].message)

   return NextResponse.json(choices[0].message)
}
