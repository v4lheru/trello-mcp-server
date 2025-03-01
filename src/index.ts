#!/usr/bin/env node

/**
 * Trello MCP Server
 * 
 * A Model Context Protocol server that provides tools for interacting with the Trello API.
 * This server allows AI assistants to perform operations on Trello boards, lists, cards, and more.
 * 
 * Features:
 * - Complete Trello API integration
 * - Support for boards, lists, cards, members, labels, and checklists
 * - Comprehensive error handling and rate limiting
 * - Type safety throughout the codebase
 * 
 * The server is organized into:
 * - Services: Handle Trello API communication and data processing
 * - Tools: Define the MCP tools exposed to clients
 * - Types: Define Trello data structures used throughout the application
 */

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
import { TrelloService } from "./services/trello-service.js";
import { trelloTools } from "./tools/trello-tools.js";
import { trelloToolHandlers } from "./tools/trello-tool-handlers.js";

// Redirect console.log and console.error to stderr to avoid interfering with MCP protocol
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
    process.stderr.write(`[INFO] ${args.join(' ')}\n`);
};

console.error = (...args) => {
    process.stderr.write(`[ERROR] ${args.join(' ')}\n`);
};

/**
 * Main function that initializes and starts the MCP server
 */
async function main() {
    try {
        console.log("Initializing Trello MCP Server...");

        // Initialize services and service factory
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

        // Register resources list handler (empty implementation to prevent errors)
        server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: []
            };
        });

        // Register resource templates list handler (empty implementation to prevent errors)
        server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
            return {
                resourceTemplates: []
            };
        });

        // Register prompts list handler (empty implementation to prevent errors)
        server.setRequestHandler(ListPromptsRequestSchema, async () => {
            return {
                prompts: []
            };
        });

        // Register tool call handler
        server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                const toolName = request.params.name;
                // Use type assertion to tell TypeScript that toolName is a valid key
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
