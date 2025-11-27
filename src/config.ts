/**
 * Configuration Module
 *
 * Centralizes all configuration settings for the MCP server.
 * Credentials are loaded ONLY from the OS credential store (no plaintext).
 */

import { getCredentials, TrelloCredentials } from './credentials.js';

/**
 * Configuration interface defining all available settings
 */
export interface Config {
    // Trello Configuration (loaded from OS credential store)
    trello: {
        apiKey: string;
        token: string;
    };

    // Optional Settings (from environment, safe to be plaintext)
    debug: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Load configuration asynchronously.
 * Trello credentials are loaded from the OS credential store only.
 */
export async function loadConfig(): Promise<Config> {

    // Load credentials from OS credential store (throws if not found)
    const credentials: TrelloCredentials = await getCredentials();

    // Build configuration object
    const config: Config = {
        trello: {
            apiKey: credentials.apiKey,
            token: credentials.token,
        },

        // Optional settings can still come from environment (non-sensitive)
        debug: (process.env.DEBUG || 'false').toLowerCase() === 'true',
        logLevel: (process.env.LOG_LEVEL || 'info') as Config['logLevel'],
    };

    return config;
}
