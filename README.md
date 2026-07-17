# Multimodal AI Frontend

> Production-ready frontend for an AI-powered chat application

## Overview

Multimodal AI Frontend is a modern React application built with **React,
Vite and TypeScript**. It delivers a fast, responsive and
production-ready AI chat experience powered by a dedicated backend. The
application supports authentication, project-based conversations,
temporary chats, multiple AI models and real-time streaming responses.

## Links

-   **Frontend Live:** https://multimodal-ai-chi.vercel.app
-   **Frontend Repository:** https://github.com/shubhampatel9977/multimodal-ai-fe.git
-   **Backend Repository:** https://github.com/shubhampatel9977/multimodal-ai-be.git
-   **Backend Live:** https://multimodal-ai-be.onrender.com

## Tech Stack

-   React
-   TypeScript
-   Vite
-   Tailwind CSS v4
-   React Router
-   TanStack Query
-   Axios
-   Zustand
-   React Hook Form
-   React Hot Toast
-   Lucide React
-   Server-Sent Events (Streaming)

## Features

-   Email Authentication
-   Google Login
-   Secure Session Management
-   Project Management
-   Conversation History
-   Temporary Chat
-   Streaming AI Responses
-   Multiple AI Models
-   AI Title Generation
-   Responsive Design
-   Mobile Friendly UI
-   Markdown Rendering
-   Optimistic UI Updates

## Folder Structure

``` text
src/
├── assets
├── components
│   ├── layout
│   └── ui
├── features
│   ├── account
│   ├── auth
│   ├── chat
│   ├── conversations
│   ├── messages
│   ├── models
│   ├── projects
│   └── ui
├── layouts
├── lib
├── mocks
├── routes
├── types
├── utils
├── App.tsx
└── main.tsx
```

## Folder Responsibilities

  Folder       Responsibility
  ------------ --------------------------------------------
  assets       Static assets
  components   Shared reusable UI components
  features     Feature-based modules
  layouts      Application layouts
  lib          Axios client and React Query configuration
  mocks        Mock data
  routes       Routing configuration
  types        Shared TypeScript types
  utils        Utility helpers

## Installation

``` bash
git clone https://github.com/shubhampatel9977/multimodal-ai-fe.git
cd multimodal-ai-fe
npm install
```

## Environment Setup

Rename the environment template before starting the application:

``` bash
cp .env.example .env
```

Update the `.env` file with your values.

Example:

``` env
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=
```

## Running the Project

``` bash
npm run dev
```

## Architecture

``` text
Browser
   │
   ▼
React + TypeScript
   │
React Router
   │
TanStack Query + Axios
   │
Backend API
   │
OpenRouter
   │
LLMs
```

## Authentication Flow

``` text
User
 │
 ▼
Login / Google Login
 │
 ▼
Backend Authentication
 │
 ▼
HTTP Only Cookies
 │
 ▼
Authenticated Requests
```

## Streaming Flow

``` text
Prompt
   │
   ▼
Frontend
   │
Fetch ReadableStream
   │
Backend
   │
OpenRouter
   │
Streaming Response
   ▼
Incremental UI Rendering
```

## State Management

-   TanStack Query for server state.
-   Zustand for global state.
-   React Hooks for local component state.

## Security

-   HTTP Only Cookie Authentication
-   Refresh Token Support
-   Protected Routes
-   Axios Interceptors
-   Environment Variable Isolation

## Performance

-   Code Splitting
-   React Query Caching
-   Optimistic UI
-   Streaming Rendering
-   Responsive Layout

## Deployment

Frontend is deployed on **Vercel**.

## Future Roadmap

-   Voice Conversations
-   Image Generation
-   File Uploads
-   Theme Customization
-   AI Agents
-   RAG Support

## Author

**Shubham Patel**

-   GitHub: https://github.com/shubhampatel9977
-   LinkedIn: https://www.linkedin.com/in/shubhampatel9977

## License

Public repository. No license specified.
