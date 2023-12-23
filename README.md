# SocketScale chat

This is a real-time chat application built with Next.js, Redis, and WebSockets, designed for scalability and high-performance communication.

## Features

- **Real-time Communication:** SocketScale Chat uses WebSockets to provide instant messaging and real-time updates.
- **Scalability with Redis:** The app leverages Redis to scale WebSockets and handle increased loads seamlessly.
- **Auth0 Integration:** Securely authenticate users using Auth0, with support for Google sign-in.
- **Built with Next.js:** The frontend is powered by Next.js, a React framework that enables server-side rendering and a great developer experience.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `server`: [Node.js](https://nodejs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
