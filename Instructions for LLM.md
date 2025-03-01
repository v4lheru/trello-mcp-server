# Instructions for Creating a Trello MCP Server

This document provides comprehensive guidance for Language Models (LLMs) on how to create a Trello Model Context Protocol (MCP) server. These instructions emphasize modularity, organization, and maintainability as core requirements.

## Core Requirements

When creating a Trello MCP server, you **MUST** adhere to these fundamental principles:

1. **Modularity**: Break down functionality into logical, self-contained modules with clear responsibilities.
2. **Smaller Files**: Keep individual files focused and concise (ideally under 300 lines) to reduce cognitive load and make them easier to ingest.
3. **Clear Organization**: Follow a consistent directory structure that separates concerns.
4. **Type Safety**: Use TypeScript with proper type definitions throughout the codebase.
5. **Comprehensive Documentation**: Document all components, interfaces, and extension points.

## Project Structure

Organize your Trello MCP server using this structure:

```
trello-mcp-server/
├── src/
│   ├── services/       # Service classes for Trello API interactions
│   │   ├── base-service.ts        # Abstract base service with common functionality
│   │   ├── board-service.ts       # Board-related operations
│   │   ├── list-service.ts        # List-related operations
│   │   ├── card-service.ts        # Card-related operations
│   │   ├── member-service.ts      # Member-related operations
│   │   ├── label-service.ts       # Label-related operations
│   │   ├── checklist-service.ts   # Checklist-related operations
│   │   ├── service-factory.ts     # Factory for creating service instances
│   │   └── trello-service.ts      # Main Trello service
│   ├── tools/          # MCP tool definitions and handlers
│   │   ├── board-tools.ts         # Board tool definitions
│   │   ├── board-tool-handlers.ts # Board tool handlers
│   │   ├── list-tools.ts          # List tool definitions
│   │   ├── list-tool-handlers.ts  # List tool handlers
│   │   ├── card-tools.ts          # Card tool definitions
│   │   ├── card-tool-handlers.ts  # Card tool handlers
│   │   ├── member-tools.ts        # Member tool definitions
│   │   ├── member-tool-handlers.ts # Member tool handlers
│   │   ├── label-tools.ts         # Label tool definitions
│   │   ├── label-tool-handlers.ts # Label tool handlers
│   │   ├── checklist-tools.ts     # Checklist tool definitions
│   │   ├── checklist-tool-handlers.ts # Checklist tool handlers
│   │   ├── trello-tools.ts        # Combined tool definitions
│   │   └── trello-tool-handlers.ts # Combined tool handlers
│   ├── types/          # TypeScript type definitions
│   │   └── trello-types.ts        # Trello-specific type definitions
│   ├── config.ts       # Configuration management
│   └── index.ts        # Main entry point
├── .env.example        # Example environment variables
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Step-by-Step Implementation Guide

### 1. Set Up Project Structure

Begin by creating the directory structure and configuration files:

```bash
mkdir -p src/{services,tools,types}
touch src/config.ts src/index.ts
```

### 2. Define Configuration Management

Create a centralized configuration system in `config.ts` that:
- Loads environment variables
- Provides type-safe access to configuration
- Validates required settings
- Handles command-line arguments

Example:
```typescript
// src/config.ts
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
    trello: {
        apiKey: string;
        token: string;
        apiUrl: string;
    }
}

// Create and validate configuration
const config: Config = {
    trello: {
        apiKey: process.env.TRELLO_API_KEY || '',
        token: process.env.TRELLO_TOKEN || '',
        apiUrl: process.env.TRELLO_API_URL || 'https://api.trello.com/1'
    }
};

// Validate required fields
const missingEnvVars = [];
if (!config.trello.apiKey) missingEnvVars.push('TRELLO_API_KEY');
if (!config.trello.token) missingEnvVars.push('TRELLO_TOKEN');

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default config;
```

### 3. Create Base Service Class

Implement a base service class that handles common functionality:
- HTTP requests with axios
- Error handling
- Rate limiting
- Logging

Example:
```typescript
// src/services/base-service.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export abstract class BaseService {
    protected client: AxiosInstance;
    protected apiKey: string;
    protected token: string;
    
    constructor(apiKey: string, token: string, baseURL: string) {
        this.apiKey = apiKey;
        this.token = token;
        
        this.client = axios.create({
            baseURL,
            params: {
                key: this.apiKey,
                token: this.token
            }
        });
        
        // Add interceptors for error handling, rate limiting, etc.
        this.client.interceptors.response.use(
            response => response,
            error => {
                // Handle rate limiting, authentication errors, etc.
                console.error('API Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }
    
    // Common methods for API requests
    protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(path, config);
        return response.data;
    }
    
    protected async post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(path, data, config);
        return response.data;
    }
    
    protected async put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(path, data, config);
        return response.data;
    }
    
    protected async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(path, config);
        return response.data;
    }
}
```

### 4. Implement Trello-Specific Services

Create service classes that extend the base service and implement Trello-specific functionality:

```typescript
// src/services/board-service.ts
import { BaseService } from './base-service.js';
import { Board, BoardCreateParams, BoardUpdateParams } from '../types/trello-types.js';

export class BoardService extends BaseService {
    async getBoards(filter?: string): Promise<Board[]> {
        return this.get<Board[]>(`/members/me/boards${filter ? `?filter=${filter}` : ''}`);
    }
    
    async getBoard(boardId: string): Promise<Board> {
        return this.get<Board>(`/boards/${boardId}`);
    }
    
    async createBoard(params: BoardCreateParams): Promise<Board> {
        return this.post<Board>('/boards', params);
    }
    
    async updateBoard(boardId: string, params: BoardUpdateParams): Promise<Board> {
        return this.put<Board>(`/boards/${boardId}`, params);
    }
    
    async deleteBoard(boardId: string): Promise<void> {
        return this.delete<void>(`/boards/${boardId}`);
    }
    
    // Other board-related methods...
}
```

### 5. Define Type Definitions

Create clear type definitions for Trello objects:

```typescript
// src/types/trello-types.ts
export interface Board {
    id: string;
    name: string;
    desc: string;
    closed: boolean;
    idOrganization: string;
    url: string;
    // Other properties...
}

export interface BoardCreateParams {
    name: string;
    desc?: string;
    idOrganization?: string;
    defaultLists?: boolean;
    // Other properties...
}

export interface BoardUpdateParams {
    name?: string;
    desc?: string;
    closed?: boolean;
    // Other properties...
}

// Define other Trello types (List, Card, Member, etc.)
```

### 6. Define MCP Tools

Define the tools that your Trello MCP server will expose:

```typescript
// src/tools/board-tools.ts
export const boardTools = [
    {
        name: "get_boards",
        description: "Retrieve a list of boards for the authenticated user. Use this tool to get an overview of available boards or to search for specific ones using filters.",
        inputSchema: {
            type: "object",
            properties: {
                filter: {
                    type: "string",
                    enum: ["all", "closed", "members", "open", "organization", "public", "starred", "unpinned"],
                    description: "Filter boards by status or membership"
                },
                fields: {
                    type: "array",
                    items: {
                        type: "string"
                    },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            }
        }
    },
    {
        name: "get_board",
        description: "Retrieve detailed information about a specific board by ID. Use this when you need comprehensive details about a particular board.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to retrieve"
                },
                fields: {
                    type: "array",
                    items: {
                        type: "string"
                    },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            },
            required: ["boardId"]
        }
    },
    // Other board tools...
];
```

### 7. Implement Tool Handlers

Create handlers for each tool that process arguments and call service methods:

```typescript
// src/tools/board-tool-handlers.ts
import { BoardService } from '../services/board-service.js';
import { ServiceFactory } from '../services/service-factory.js';

export const boardToolHandlers = {
    get_boards: async (args: any) => {
        const boardService = ServiceFactory.getBoardService();
        try {
            const boards = await boardService.getBoards(args.filter);
            return boards;
        } catch (error) {
            console.error('Error in get_boards:', error);
            throw new Error(`Failed to get boards: ${error instanceof Error ? error.message : String(error)}`);
        }
    },
    
    get_board: async (args: any) => {
        const boardService = ServiceFactory.getBoardService();
        try {
            const board = await boardService.getBoard(args.boardId);
            return board;
        } catch (error) {
            console.error('Error in get_board:', error);
            throw new Error(`Failed to get board: ${error instanceof Error ? error.message : String(error)}`);
        }
    },
    
    // Other board tool handlers...
};
```

### 8. Create Main Entry Point

Implement the main entry point that initializes services, registers tools, and starts the server:

```typescript
// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ListResourceTemplatesRequestSchema,
    ListPromptsRequestSchema,
    McpError,
    ErrorCode
} from "@modelcontextprotocol/sdk/types.js";

import config from "./config.js";
import { ServiceFactory } from "./services/service-factory.js";
import { trelloTools } from "./tools/trello-tools.js";
import { trelloToolHandlers } from "./tools/trello-tool-handlers.js";

// Redirect console output to stderr to avoid interfering with MCP protocol
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
    process.stderr.write(`[INFO] ${args.join(' ')}\n`);
};

console.error = (...args) => {
    process.stderr.write(`[ERROR] ${args.join(' ')}\n`);
};

async function main() {
    try {
        console.log("Initializing Trello MCP Server...");

        // Initialize services
        const serviceFactory = ServiceFactory.initialize(
            config.trello.apiKey,
            config.trello.token
        );

        // Create MCP server
        const server = new Server(
            {
                name: "trello-mcp-server",
                version: "0.1.0",
            },
            {
                capabilities: {
                    tools: {},
                    resources: {},
                    prompts: {}
                }
            }
        );

        // Set up error handling
        server.onerror = (error) => {
            console.error("[MCP Server Error]", error);
        };

        // Handle process termination
        process.on("SIGINT", async () => {
            console.log("Shutting down server...");
            await server.close();
            process.exit(0);
        });

        // Register tool list handler
        server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: trelloTools
            };
        });

        // Register resources list handler (empty implementation)
        server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: []
            };
        });

        // Register resource templates list handler (empty implementation)
        server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
            return {
                resourceTemplates: []
            };
        });

        // Register prompts list handler (empty implementation)
        server.setRequestHandler(ListPromptsRequestSchema, async () => {
            return {
                prompts: []
            };
        });

        // Register tool call handler
        server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                const toolName = request.params.name;
                const handler = trelloToolHandlers[toolName as keyof typeof trelloToolHandlers];

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
                console.error("Error handling tool call:", error);

                // If it's already an MCP error, rethrow it
                if (error instanceof McpError) {
                    throw error;
                }

                // Otherwise, wrap it in an MCP error
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`
                        }
                    ],
                    isError: true
                };
            }
        });

        // Connect to transport
        const transport = new StdioServerTransport();
        await server.connect(transport);

        console.log("Trello MCP Server running on stdio");
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

// Start the server
main().catch(console.error);
```

## Best Practices for Trello MCP Server Development

### Modularity Guidelines

1. **Single Responsibility Principle**: Each service class should handle one type of Trello entity (boards, lists, cards, etc.).
2. **Interface Segregation**: Define clear interfaces between components.
3. **Dependency Injection**: Use the ServiceFactory to create and manage service instances.
4. **Separation of Concerns**: Keep tool definitions separate from their implementations.

### File Size and Organization

1. **Keep Files Small**: Aim for files under 300 lines of code.
2. **Logical Grouping**: Group related functionality in the same directory.
3. **Consistent Naming**: Use a consistent naming convention for files and directories.
4. **Export Patterns**: Be explicit about what each module exports.

### Error Handling

1. **Comprehensive Error Handling**: Handle errors at all levels (service, tool, server).
2. **Informative Error Messages**: Provide clear error messages that help diagnose issues.
3. **Error Propagation**: Properly propagate errors up the call stack.
4. **Logging**: Log errors with appropriate context for debugging.

### Documentation

1. **JSDoc Comments**: Document all classes, methods, and interfaces.
2. **README**: Provide comprehensive documentation on how to use and extend the server.
3. **Code Examples**: Include examples of how to add new tools and services.
4. **Architecture Overview**: Document the overall architecture and design decisions.

## Extension Patterns

When extending the Trello MCP server with new functionality, follow these patterns:

### Adding a New Trello Entity

1. Create a new service class in `src/services/`.
2. Extend the base service class.
3. Implement entity-specific methods.
4. Add any necessary type definitions in `src/types/trello-types.ts`.
5. Create tool definitions in `src/tools/entity-tools.ts`.
6. Implement tool handlers in `src/tools/entity-tool-handlers.ts`.
7. Add the tools to the combined tools list in `src/tools/trello-tools.ts`.
8. Add the handlers to the combined handlers in `src/tools/trello-tool-handlers.ts`.

### Adding New Tools for Existing Entities

1. Add new tool definitions to the appropriate `src/tools/entity-tools.ts` file.
2. Implement handlers in the corresponding `src/tools/entity-tool-handlers.ts` file.
3. Update the combined tools and handlers files.

## Testing Your Trello MCP Server

To test your Trello MCP server:

1. Set up environment variables in `.env` file:
   ```
   TRELLO_API_KEY=your_api_key
   TRELLO_TOKEN=your_token
   ```
2. Build the project: `npm run build`
3. Run the server: `npm start`
4. Test with an MCP client or using the MCP CLI tool.

## Common Pitfalls to Avoid

1. **Monolithic Files**: Avoid putting too much functionality in a single file.
2. **Tight Coupling**: Avoid tight coupling between components.
3. **Inconsistent Error Handling**: Ensure consistent error handling throughout the codebase.
4. **Missing Documentation**: Document all components and extension points.
5. **Hardcoded Configuration**: Use the configuration system instead of hardcoding values.
6. **Console Output in Stdout**: Redirect all console output to stderr to avoid interfering with the MCP protocol.

By following these guidelines, you will create a Trello MCP server that is modular, maintainable, and easy to extend.
