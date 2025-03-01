# Trello MCP Server - System Patterns

## Architecture Overview

The Trello MCP Server follows a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────┐
│             MCP Server              │
└───────────────────┬─────────────────┘
                    │
┌───────────────────▼─────────────────┐
│           Tool Handlers             │
└───────────────────┬─────────────────┘
                    │
┌───────────────────▼─────────────────┐
│           Service Layer             │
└───────────────────┬─────────────────┘
                    │
┌───────────────────▼─────────────────┐
│            Trello API               │
└─────────────────────────────────────┘
```

## Key Design Patterns

### 1. Singleton Pattern

The `TrelloService` and `ServiceFactory` classes use the Singleton pattern to ensure only one instance exists throughout the application.

```typescript
// Example from TrelloService
private static instance: TrelloService;

public static initialize(apiKey: string, token: string): TrelloService {
    if (!TrelloService.instance) {
        TrelloService.instance = new TrelloService(apiKey, token);
    }
    return TrelloService.instance;
}

public static getInstance(): TrelloService {
    if (!TrelloService.instance) {
        throw new Error('TrelloService not initialized. Call initialize() first.');
    }
    return TrelloService.instance;
}
```

### 2. Factory Pattern

The `ServiceFactory` class implements the Factory pattern to create and manage service instances.

```typescript
export class ServiceFactory {
    private static instance: ServiceFactory;
    private trelloService: TrelloService;
    private boardService: BoardService;
    // Other services...

    public static initialize(apiKey: string, token: string): ServiceFactory {
        if (!ServiceFactory.instance) {
            const trelloService = TrelloService.initialize(apiKey, token);
            ServiceFactory.instance = new ServiceFactory(trelloService);
        }
        return ServiceFactory.instance;
    }

    public getBoardService(): BoardService {
        return this.boardService;
    }
    // Other getters...
}
```

### 3. Dependency Injection

Services are injected into other services to promote loose coupling and testability.

```typescript
export class BoardService {
    private trelloService: TrelloService;

    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }
    // Methods using trelloService...
}
```

### 4. Adapter Pattern

The service classes act as adapters between the Trello API and the tool handlers, providing a simplified interface.

```typescript
export class CardService {
    private trelloService: TrelloService;

    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }

    async getCard(cardId: string): Promise<TrelloCard> {
        return this.trelloService.get<TrelloCard>(`/cards/${cardId}`);
    }
    // Other methods...
}
```

### 5. Command Pattern

Each tool handler implements the Command pattern, encapsulating a request as an object.

```typescript
export const cardToolHandlers = {
    get_card: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.getCard(args.cardId);
    },
    // Other handlers...
};
```

## Error Handling Strategy

The system implements a multi-layered error handling approach:

1. **Service Layer**: Catches and transforms API errors into application-specific errors.
2. **Tool Handlers**: Handle errors from services and provide meaningful responses.
3. **MCP Server**: Provides protocol-level error handling.

```typescript
// Example error handling in tool handler
try {
    const result = await handler(request.params.arguments);
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
    // Error handling logic...
}
```

## Configuration Management

The system uses a centralized configuration approach with environment variables and command-line arguments.

```typescript
const configuration: Config = {
    // API Keys and Authentication
    apiKey: envArgs.API_KEY || process.env.API_KEY || '',

    // Trello Configuration
    trello: {
        apiKey: envArgs.TRELLO_API_KEY || process.env.TRELLO_API_KEY || '',
        token: envArgs.TRELLO_TOKEN || process.env.TRELLO_TOKEN || ''
    },
    // Other configuration...
};
```

## Type System

The system uses TypeScript interfaces to define the shape of data throughout the application:

```typescript
export interface TrelloCard {
    id: string;
    name: string;
    desc: string;
    closed: boolean;
    idBoard: string;
    idList: string;
    // Other properties...
}
```

## Module Organization

The codebase is organized into focused modules:

- **services/**: Service classes for API interactions
- **tools/**: Tool definitions and handlers
- **types/**: TypeScript type definitions
- **config.ts**: Configuration management
- **index.ts**: Main entry point
