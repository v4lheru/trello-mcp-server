/**
 * Configuration Module
 * 
 * Centralizes all configuration settings for the MCP server.
 * Loads environment variables and provides type-safe access to configuration.
 * Validates required settings and provides sensible defaults for optional ones.
 */

import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

/**
 * Configuration interface defining all available settings
 */
export interface Config {
    // API Keys and Authentication
    apiKey: string;

    // Trello Configuration
    trello: {
        apiKey: string;
        token: string;
    };

    // Service Configuration
    serviceUrl: string;
    serviceTimeout: number;

    // Optional Settings
    debug: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * The configuration object with all settings
 * Command line arguments take precedence over environment variables
 */
const configuration: Config = {
    // API Keys and Authentication
    apiKey: envArgs.API_KEY || process.env.API_KEY || '',

    // Trello Configuration
    trello: {
        apiKey: envArgs.TRELLO_API_KEY || process.env.TRELLO_API_KEY || '',
        token: envArgs.TRELLO_TOKEN || process.env.TRELLO_TOKEN || ''
    },

    // Service Configuration
    serviceUrl: envArgs.SERVICE_URL || process.env.SERVICE_URL || 'https://api.example.com',
    serviceTimeout: parseInt(envArgs.SERVICE_TIMEOUT || process.env.SERVICE_TIMEOUT || '30000', 10),

    // Optional Settings
    debug: (envArgs.DEBUG || process.env.DEBUG || 'false').toLowerCase() === 'true',
    logLevel: (envArgs.LOG_LEVEL || process.env.LOG_LEVEL || 'info') as Config['logLevel'],
};

/**
 * Validate required configuration settings
 */
const validateConfig = (config: Config): void => {
    const missingEnvVars: string[] = [];

    // Check top-level required fields
    if (!config.apiKey) {
        missingEnvVars.push('API_KEY');
    }

    // Check Trello configuration
    if (!config.trello.apiKey) {
        missingEnvVars.push('TRELLO_API_KEY');
    }
    if (!config.trello.token) {
        missingEnvVars.push('TRELLO_TOKEN');
    }

    if (missingEnvVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingEnvVars.join(', ')}`
        );
    }
};

// Validate configuration
validateConfig(configuration);

export default configuration;
