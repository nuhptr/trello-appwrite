# Trello Appwrite V2

This is a simple Trello clone built with [Next.js](https://nextjs.org/), [Appwrite](https://appwrite.io/), and [Tailwind CSS](https://tailwindcss.com/), also [HeadlessUI](https://headlessui.dev/).

![Trello Image](https://github.com/nuhptr/nextjs-tsm/assets/50306963/a5c38769-567b-47fc-a5c6-f604c407ea69)

## Getting Started

before you start, you need clone and install dependencies using `npm install` or `yarn install`

if you want access domain withour CORS error in appwrite you can change
domain from localhost to `*` in appwrite dashboard

add .env.local file with your appwrite project id and database id

- NEXT_PUBLIC_APPWRITE_PROJECT_ID=
- NEXT_PUBLIC_DATABASE_ID=
- NEXT_PUBLIC_TODOS_COLLECTION_ID=

add openai with your api key

- OPENAI_API_KEY=

## Dependencies

- [@heroicons/react](https://github.com/tailwindlabs/heroicons#readme) - npm install @heroicons/react
- [react-avatar](https://www.npmjs.com/package/react-avatar) - npm install react-avatar --save
- [react-beautiful-dnd (Drag and Drop)](https://www.npmjs.com/package/react-beautiful-dnd) - npm install react-beautiful-dnd --save & npm install @types/react-beautiful-dnd --save-dev
- [appwrite (database)](https://appwrite.io/) - npm install appwrite
- [zustand (state management)](https://github.com/pmndrs/zustand) - npm install zustand
- [openAI (AI)](https://www.npmjs.com/package/openai) - npm install openai
- [headlessUI (modal)](https://headlessui.com/) - npm install @headlessui/react

## Learn More

To learn how to use openAI, take a look at the following resources:

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction) - learn about OpenAI API.
- [OpenAI Playground](https://beta.openai.com/playground) - an interactive OpenAI Playground.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
