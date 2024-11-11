# Instagram Messaging Interface

A secure, functional user interface that allows users to log in, send messages via Instagram, and handle responses. Built with Next.js, utilizing v0 for the UI components and agentql for back-end actions.

## Features

### Authentication & Security
- Secure user authentication with NextAuth.js
- Session management for persistent login
- CSRF protection
- Secure credential handling
- Rate limiting to prevent abuse

### Messaging Interface
- Dual input modes:
  - Manual form input
  - JSON-based API input
- Real-time input validation
- Comprehensive error handling and feedback
- Toggle switch between input modes

### Technical Implementation
- Built with Next.js and TypeScript
- v0 UI components for consistent design
- agentql integration for Instagram actions
- Session state management
- Detailed error logging system

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Instagram account credentials
- agentql API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/kaochihhui/instagram-messaging-interface.git
cd instagram-messaging-interface
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables by creating `.env.local`:
```
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
SESSION_PASSWORD=your_session_password_here
AGENTQL_API_KEY=your_agentql_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## Usage

### Manual Input Mode
1. Access the application at `http://localhost:3000`
2. Log in with your Instagram credentials
3. Enter recipient username and message
4. Click "Send Message"

### JSON Input Mode
1. Toggle the "Use JSON Input" switch
2. Input JSON in the following format:
```
json
{
"username": "example_username",
"password": "example_password",
"recipient": "instagram_user",
"message": "Hello, this is a test message!"
}
```
3. Review the parsed input
4. Confirm to send the message

### Error Handling
The interface provides detailed feedback for:
- Invalid login credentials
- Nonexistent Instagram recipients
- Rate limiting violations
- Network errors
- CSRF token mismatches

## Security Features

- Secure password handling with no plain-text storage
- CSRF protection on all POST requests
- Rate limiting to prevent abuse
- Session-based authentication
- Secure credential transmission

## Development

### Code Structure
- `/src/components` - UI components and forms
- `/src/app/api` - API routes and handlers
- `/src/lib` - Utility functions and services
- `/src/types` - TypeScript type definitions


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.