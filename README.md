# Invoice Management App

A modern invoice management application built with Next.js, Material-UI, and TypeScript. This application helps you create, manage, and track invoices efficiently.

## Features

- Create and manage invoices
- Modern and responsive UI with Material-UI
- Form validation with React Hook Form and Zod
- Built with TypeScript for type safety

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- pnpm (recommended) or npm
- Git

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/yourusername/invoice-hub.git
cd invoice-hub
```

2. Install dependencies

```bash
pnpm install
# or if using npm
npm install
```

3. Start the development server

```bash
pnpm dev
# or if using npm
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Starts the development server
- `pnpm build` - Creates a production build
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs ESLint for code linting

## Tech Stack

- Next.js 14
- React 18
- Material-UI
- TypeScript
- React Hook Form
- Zod for validation
- Emotion for styled components

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable components
├── constants/        # Constants and configuration
├── layouts/          # Layout components
├── utils/           # Utility functions
└── styles/          # Global styles and themes
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
