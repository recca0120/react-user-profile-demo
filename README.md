# User Profile Demo

![CI/CD](https://github.com/recca0120/react-user-profile-demo/workflows/CI%2FCD/badge.svg)
![Test](https://github.com/recca0120/react-user-profile-demo/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/recca0120/react-user-profile-demo/branch/main/graph/badge.svg)](https://codecov.io/gh/recca0120/react-user-profile-demo)

A simple React TypeScript application demonstrating a user profile component with MSW (Mock Service Worker) for API mocking.

## Features

- 🚀 Built with React 18 and TypeScript
- 🎨 Responsive user profile component
- 🔧 MSW for API mocking in development
- ✅ Comprehensive test suite with Vitest
- 📦 Vite for fast development and building
- 🔍 Type checking with TypeScript
- 🚨 GitHub Actions for CI/CD

## Prerequisites

- Node.js 18.x or 20.x
- npm 8.x or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/recca0120/react-user-profile-demo.git
cd react-user-profile-demo

# Install dependencies
npm install

# Initialize MSW (if not already done)
npm run msw:init
```

## Development

```bash
# Start the development server
npm run dev

# Run type checking
npm run typecheck

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

## Building

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
user-profile/
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── public/
│   └── mockServiceWorker.js  # MSW service worker
├── src/
│   ├── components/
│   │   ├── UserProfile.tsx      # Main profile component
│   │   ├── UserProfile.test.tsx # Component tests
│   │   └── UserProfile.css      # Component styles
│   ├── mocks/
│   │   ├── browser.ts    # MSW browser setup
│   │   └── handlers.ts   # API mock handlers
│   ├── types/
│   │   └── user.ts       # TypeScript interfaces
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── vite-env.d.ts     # Vite environment types
├── vitest.setup.ts       # Test setup
├── vite.config.ts        # Vite configuration
├── vitest.config.ts      # Vitest configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## Testing

The project uses Vitest for unit testing with React Testing Library.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm run test:coverage
```

## GitHub Actions

The project includes several GitHub Actions workflows:

1. **CI/CD** (`ci.yml`): Main workflow for continuous integration and deployment
   - Type checking
   - Running tests on Node.js 18.x and 20.x
   - Building the project
   - Deploying to GitHub Pages (on main branch)

2. **Test** (`test.yml`): Focused testing workflow
   - Runs tests on multiple Node.js versions
   - Generates coverage reports

3. **PR Check** (`pr-check.yml`): Pull request validation
   - Quick checks for type safety and tests
   - Comments results on the PR

## API Mocking

The application uses MSW (Mock Service Worker) to mock API responses in development:

- `/api/user/:id` - Returns user profile data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.