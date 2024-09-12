# BuildFast Chat Template

Here's a comprehensive documentation for the project, including its structure and instructions on how you can make a new bot:

# App Showcase Documentation

## Project Overview

This project is a versatile AI chatbot platform that supports multiple specialized bots, each with unique capabilities. The platform is built using Next.js and integrates various AI models and APIs to provide a rich conversational experience.

## Project Structure

The project follows a typical Next.js structure with some custom organization:

```
/src
  /app
    /(bots)
      /app_name
        /chat
          /[id]
            page.tsx
        page.tsx
    page.tsx
  /components
  /lib
    /bots
    /rag
  /actions
  /utils
  /scripts
/public
```

Key directories:

- `/src/app/(bots)`: Contains individual bot implementations
- `/src/components`: Reusable React components
- `/src/components/ui`: Just for shadcn ui components
- `/src/lib`: Utility functions and constants
- `/src/actions`: Server actions for database operations
- `/src/utils`: Helper functions
- `/src/scripts`: Scripts for data processing and embeddings generation

## Models Snippets

- `/openai`:
  - src/actions/models/openai/server.ts
  - src/actions/models/openai/route.ts
- `/perplexity`:
  - src/actions/models/perplexity/server.ts
  - src/actions/models/perplexity/route.ts
- `/groq`:
  - src/actions/models/groq/server.ts
- `/anthropic`:
  - src/actions/models/anthropic/server.ts
- `/cohere`:
  - src/actions/models/cohere/server.ts
  - src/actions/models/cohere/route.ts
- `/google`:
  - src/actions/models/google/server.ts
  - src/actions/models/google/route.ts
- `/mistral`:
  - src/actions/models/mistral/server.ts
  - src/actions/models/mistral/route.ts

## Core Components

1. **Chat Component**: The main interface for user interactions with bots.

2. **Message UI Components**: Render bot and user messages.

```1:141:src/components/chat/message-ui.tsx
Bot Message: <BotMessage message={''} botImage={''} />
User Message: <UserMessage message={''} />
Loading UI: <BotLoading botImage={''} />
```

3. **Bot Info**: Displays information about the current bot.

## Key Features

1. **Support Images**: You can send images to the bot and it will respond with text.

## Adding a New Bot

To add a new bot to the platform, follow these steps:

1. **Change the app_name folder**:
   Add a new directory under `/src/app/(bots)/app_name` with your bot's name.

2. **Change API Route (app_name)**:
   Add a new API route for your bot under `/src/app/api/app_name/chat/route.ts`.

3. **Implement Bot Logic**:
   In the API route, implement the bot's specific logic, including any necessary AI model integrations.

4. **Add Embeddings (if needed)**:
   If your bot requires RAG, generate and store embeddings using the script in:

```1:53:src/lib/rag/generate-embeddings.mjs
src/lib/rag/generate-embeddings.mjs
```

7. **Update Chat Component**:
   Ensure the Chat component in your bot's page is configured correctly with the appropriate props and API endpoint.

8. **Test and Refine**:
   Thoroughly test your new bot and refine its responses and functionality as needed.

## Key Technologies

- Next.js
- React
- TypeScript
- OpenAI API
- Supabase (for database and vector store)
- Langchain (for RAG and embeddings)
- Vercel AI SDK (for making chatbots)

By following this structure and guidelines, you can maintain consistency across the platform while easily expanding its capabilities with new bots and features.
