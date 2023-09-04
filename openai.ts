import { OpenAI } from 'openai'

/**
 * Create an instance of the OpenAI class with your API key
 * New method of instantiating the OpenAI class
 * */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-tlvpOHLRhO8U4uazZ7lvYDOv',
})

export default openai
