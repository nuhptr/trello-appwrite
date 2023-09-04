# Trello Appwrite V2

This is a simple Trello clone built with [Next.js](https://nextjs.org/), [Appwrite](https://appwrite.io/), and [Tailwind CSS](https://tailwindcss.com/), also [HeadlessUI](https://headlessui.dev/).

## Getting Started

before you start, you need clone and install dependencies using `npm install` or `yarn install`

if you want access domain withour CORS error in appwrite you can change
domain from localhost to `*` in appwrite dashboard

```bash
# add .env.local file with your appwrite project id and database id
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_TODOS_COLLECTION_ID=

# add openai with your api key
OPENAI_API_KEY=
```

## Dependencies

```bash
# Heroicons
npm install @heroicons/react

# react-avatar
npm install react-avatar --save

# react-beautiful-dnd (Drag and Drop)
npm install react-beautiful-dnd --save & npm install @types/react-beautiful-dnd --save-dev

# appwrite (database)
npm install appwrite

# zustand (state management)
npm install zustand

# openAI (AI)
npm install openai

# headlessUI (modal)
npm install @headlessui/react
```

## Learn More

To learn how to using openAI, take a look at the following resources:

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction) - learn about OpenAI API.
- [OpenAI Playground](https://beta.openai.com/playground) - an interactive OpenAI Playground.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

```
