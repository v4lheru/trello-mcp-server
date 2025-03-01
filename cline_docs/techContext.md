# Trello MCP Server - Technical Context

## Technologies Used

### Core Technologies

- **TypeScript**: The entire codebase is written in TypeScript for type safety and better developer experience.
- **Node.js**: The server runs on Node.js, a JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Model Context Protocol (MCP)**: The server implements the MCP specification for communication with AI assistants.

### Libraries and Frameworks

- **@modelcontextprotocol/sdk**: The official SDK for implementing MCP servers.
- **axios**: A promise-based HTTP client for making requests to the Trello API.
- **dotenv**: For loading environment variables from a .env file.

### Development Tools

- **TypeScript Compiler**: For compiling TypeScript code to JavaScript.
- **npm**: For package management and running scripts.

## Development Environment

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- TypeScript
- Trello API key and token

### Project Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with Trello API credentials
4. Build the project with `npm run build`
5. Run the server with `npm start`

## API Integration

### Trello API

The server integrates with the Trello REST API, which provides access to Trello boards, lists, cards, and other resources. The API requires authentication with an API key and token.

#### Authentication

Trello API authentication is handled by including the API key and token as query parameters in each request:

```typescript
protected addAuth(url: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}key=${this.apiKey}&token=${this.token}`;
}
```

#### API Endpoints

The server interacts with various Trello API endpoints:

- `/boards`: For board operations
- `/lists`: For list operations
- `/cards`: For card operations
- `/members`: For member operations
- `/labels`: For label operations
- `/checklists`: For checklist operations

### MCP Integration

The server implements the Model Context Protocol (MCP) to expose tools to AI assistants. This involves:

1. Defining tool schemas with input validation
2. Implementing tool handlers
3. Registering tools with the MCP server
4. Handling tool calls and returning results

```typescript
// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: trelloTools
    };
});

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        const toolName = request.params.name;
        const handler = trelloToolHandlers[toolName];

        if (!handler) {
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Unknown tool: ${toolName}`
            );
        }

        // Execute the tool handler with the provided arguments
        const result = await handler(request.params.arguments);

        // Return the result
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    } catch (error) {
        // Error handling...
    }
});
```

## Configuration

### Environment Variables

The server uses the following environment variables:

- `API_KEY`: A general API key (not currently used)
- `TRELLO_API_KEY`: The Trello API key
- `TRELLO_TOKEN`: The Trello API token
- `SERVICE_URL`: The base URL for the Trello API (defaults to 'https://api.trello.com/1')
- `SERVICE_TIMEOUT`: Timeout for API requests in milliseconds (defaults to 30000)
- `DEBUG`: Whether to enable debug mode (defaults to false)
- `LOG_LEVEL`: The log level to use (defaults to 'info')

### Configuration Loading

Environment variables are loaded using dotenv and can be overridden with command-line arguments:

```typescript
// Load environment variables from .env file
dotenv.config();

// Process command line arguments for environment variables
const args = process.argv.slice(2);
const envArgs: { [key: string]: string } = {};

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--env' && i + 1 < args.length) {
        const [key, value] = args[i + 1].split('=');
        if (key && value) {
            envArgs[key] = value;
        }
        i++;
    }
}
```

## Deployment

### Building for Production

The project can be built for production using:

```bash
npm run build
```

This compiles the TypeScript code to JavaScript and makes the server executable.

### Running in Production

The server can be run in production using:

```bash
npm start
```

### Docker Support

The server can be containerized using Docker for easier deployment. A Dockerfile would look like:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY build ./build

CMD ["node", "build/index.js"]
```

## Security Considerations

- **API Credentials**: Trello API key and token are sensitive and should be kept secure.
- **Rate Limiting**: The Trello API has rate limits that should be respected.
- **Error Handling**: Errors should be handled properly to avoid exposing sensitive information.
