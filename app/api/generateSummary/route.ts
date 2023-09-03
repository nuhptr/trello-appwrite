import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // todos in the body of the request
  const { todos } = await request.json()
  console.log(todos)

  // communicate with openAI GPT
}
