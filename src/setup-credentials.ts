#!/usr/bin/env node

/**
 * Setup Credentials CLI
 *
 * Interactive CLI to store Trello credentials in the OS credential manager.
 * Supports Windows Credential Manager, macOS Keychain, and Linux libsecret.
 *
 * Features:
 * - Auto-migration from .env files
 * - Interactive credential entry
 * - Credential deletion (--delete flag)
 */

import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { setCredentials, hasCredentials, deleteCredentials } from './credentials.js';

let rl: readline.Interface | null = null;

function getReadline(): readline.Interface {

    if (!rl) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    return rl;
}

function closeReadline(): void {

    if (rl) {
        rl.close();
        rl = null;
    }
}

function question(prompt: string): Promise<string> {

    return new Promise((resolve) => {
        getReadline().question(prompt, (answer) => {
            resolve(answer.trim());
        });
    });
}

interface EnvCredentials {
    apiKey: string | null;
    token: string | null;
    envPath: string;
}

/**
 * Check for existing .env file and extract Trello credentials
 */
function findEnvCredentials(): EnvCredentials | null {

    const possiblePaths = [
        path.join(process.cwd(), '.env'),
        path.join(process.cwd(), '.env.local'),
    ];

    for (const envPath of possiblePaths) {
        if (fs.existsSync(envPath)) {
            try {
                const content = fs.readFileSync(envPath, 'utf-8');
                const lines = content.split('\n');

                let apiKey: string | null = null;
                let token: string | null = null;

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;

                    const [key, ...valueParts] = trimmed.split('=');
                    const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');

                    if (key === 'TRELLO_API_KEY' && value && value !== 'your_trello_api_key_here') {
                        apiKey = value;
                    }
                    if (key === 'TRELLO_TOKEN' && value && value !== 'your_trello_token_here') {
                        token = value;
                    }
                }

                if (apiKey || token) {
                    return { apiKey, token, envPath };
                }
            } catch {
                // Ignore read errors
            }
        }
    }

    return null;
}

async function migrateFromEnv(envCreds: EnvCredentials): Promise<boolean> {

    console.log(`\n📁 Found existing credentials in: ${envCreds.envPath}`);

    if (envCreds.apiKey && envCreds.token) {
        console.log('   Both API Key and Token found.\n');
    } else if (envCreds.apiKey) {
        console.log('   API Key found (Token missing).\n');
    } else {
        console.log('   Token found (API Key missing).\n');
    }

    const migrate = await question('Migrate these credentials to secure storage? (Y/n): ');
    if (migrate.toLowerCase() === 'n') {
        return false;
    }

    let apiKey = envCreds.apiKey;
    let token = envCreds.token;

    // Prompt for missing credentials
    if (!apiKey) {
        apiKey = await question('Enter your Trello API Key: ');
        if (!apiKey) {
            console.error('\n❌ API Key cannot be empty.');
            return false;
        }
    }

    if (!token) {
        token = await question('Enter your Trello Token: ');
        if (!token) {
            console.error('\n❌ Token cannot be empty.');
            return false;
        }
    }

    // Store credentials
    try {
        await setCredentials(apiKey, token);
        console.log('\n✅ Credentials migrated to secure storage.');

        // Offer to remove .env credentials (default yes for security)
        const removeEnv = await question('\nRemove credentials from .env file? (Y/n): ');
        if (removeEnv.toLowerCase() !== 'n') {
            try {
                let content = fs.readFileSync(envCreds.envPath, 'utf-8');
                content = content
                    .split('\n')
                    .filter(line => {
                        const key = line.split('=')[0]?.trim();
                        return key !== 'TRELLO_API_KEY' && key !== 'TRELLO_TOKEN';
                    })
                    .join('\n');

                // Only write if there's still content, otherwise delete the file
                const hasContent = content.trim().length > 0;
                if (hasContent) {
                    fs.writeFileSync(envCreds.envPath, content);
                    console.log(`✅ Removed Trello credentials from ${envCreds.envPath}`);
                } else {
                    fs.unlinkSync(envCreds.envPath);
                    console.log(`✅ Deleted empty ${envCreds.envPath}`);
                }
            } catch (err) {
                console.log(`⚠️  Could not modify ${envCreds.envPath}: ${err}`);
            }
        }

        return true;
    } catch (error) {
        console.error('\n❌ Failed to store credentials:', error);
        return false;
    }
}

async function main() {

    console.log('\n=== Trello MCP Server - Credential Setup ===\n');
    console.log('This will store your Trello credentials securely in your OS credential manager.');
    console.log('  - Windows: Credential Manager');
    console.log('  - macOS: Keychain');
    console.log('  - Linux: libsecret (GNOME Keyring)\n');

    // Check for .env migration opportunity
    const envCreds = findEnvCredentials();
    if (envCreds) {
        const migrated = await migrateFromEnv(envCreds);
        if (migrated) {
            console.log('\nYou can now start the MCP server with: npm start');
            closeReadline();
            return;
        }
        console.log(''); // Add spacing before continuing to manual entry
    }

    // Check if credentials already exist in secure storage
    const existing = await hasCredentials();
    if (existing) {
        console.log('⚠️  Credentials already exist in your credential store.\n');
        const overwrite = await question('Do you want to overwrite them? (y/N): ');
        if (overwrite.toLowerCase() !== 'y') {
            console.log('\nSetup cancelled. Existing credentials unchanged.');
            closeReadline();
            process.exit(0);
        }
        console.log('');
    }

    console.log('To get your Trello credentials:');
    console.log('  1. Go to https://trello.com/app-key');
    console.log('  2. Copy your API Key');
    console.log('  3. Click "Generate a Token" and copy the token\n');

    // Get API Key
    const apiKey = await question('Enter your Trello API Key: ');
    if (!apiKey) {
        console.error('\n❌ API Key cannot be empty.');
        closeReadline();
        process.exit(1);
    }

    // Get Token
    const token = await question('Enter your Trello Token: ');
    if (!token) {
        console.error('\n❌ Token cannot be empty.');
        closeReadline();
        process.exit(1);
    }

    // Store credentials
    try {
        await setCredentials(apiKey, token);
        console.log('\n✅ Credentials stored successfully in your OS credential manager.');
        console.log('\nYou can now start the MCP server with: npm start');
    } catch (error) {
        console.error('\n❌ Failed to store credentials:', error);
        closeReadline();
        process.exit(1);
    }

    closeReadline();
}

// Handle --delete flag
if (process.argv.includes('--delete')) {
    deleteCredentials()
        .then(() => {
            console.log('✅ Credentials deleted from OS credential manager.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Failed to delete credentials:', error);
            process.exit(1);
        });
} else {
    main().catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });
}
