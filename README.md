# Instagram Messaging Interface

This project is a secure, functional user interface that allows users to log in, send messages via Instagram, and handle responses. It utilizes v0 for the UI and agentql for back-end actions.

## Features

- User authentication with NextAuth
- Secure message sending to Instagram users
- JSON input support for advanced users
- Rate limiting to prevent abuse
- CSRF protection
- Comprehensive error handling and logging

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:
```
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
SESSION_PASSWORD=your_session_password_here
AGENTQL_API_KEY=your_agentql_api_key_here
```

## Usage

1. Access the application at `http://localhost:3000`
2. Log in with your Instagram credentials
3. Send messages to other Instagram users
4. Use the JSON input feature for advanced usage

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.