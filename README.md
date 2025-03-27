# Personal Project Manager

A purpose-built project management tool built with modern Rails 8 technologies. This is a private project - not open source.

## Technologies Used

- Ruby 3.4.2
- Rails 8
- PostgreSQL
- TailwindCSS
- Vite Rails
- Inertia.js + React
- Apollo Client + GraphQL
- Solid Cable
- Solid Queue
- Solid Cache

## Development Setup

### Prerequisites

- Ruby 3.4.2 (using rbenv on Mac)
- PostgreSQL
- Node.js/npm

### Getting Started

1. Clone the repository (private access required)
```
git clone https://github.com/jarydkrish/manager.git
cd manager
```

2. Install dependencies
```
bundle install
npm install
```

3. Setup database
```
bin/rails db:create db:migrate
```

4. Start the development server
```
bin/dev
```

This will start all necessary processes defined in Procfile.dev:
- Rails server
- Vite development server
- SolidQueue worker
- Other background processes

Access the application at `http://localhost:3000`

### Development Notes

- Uses Inertia.js to handle routing and React component rendering
- Tailwind for styling UI components
- Vite handles all JavaScript/asset bundling
- Background jobs processed by SolidQueue
- Real-time updates via SolidCable
- Caching through SolidCache (no Redis dependency)

## GraphQL and Apollo Client

This application uses GraphQL with Apollo Client for data fetching. The Apollo Client is configured to work with Rails' CSRF protection.

For detailed information about the Apollo Client setup, see the [Apollo Client Setup Documentation](docs/apollo-client-setup.md).

Key features:
- GraphQL API endpoint at `/graphql`
- Apollo Client configured with CSRF token handling
- Complete integration with Inertia.js and React components

## Frontend Documentation

- [Inertia.js Navigation with HeroUI Components](app/javascript/docs/NAVIGATION.md) - Best practices for SPA navigation
