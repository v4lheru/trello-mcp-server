/**
 * Credentials Module
 *
 * Secure credential storage using the OS native credential manager.
 * - Windows: Credential Manager
 * - macOS: Keychain
 * - Linux: libsecret (GNOME Keyring)
 *
 * NO PLAINTEXT FALLBACKS - credentials must be in the OS credential store.
 */

import keytar from 'keytar';

const SERVICE_NAME = 'trello-mcp-server';

export interface TrelloCredentials {
    apiKey: string;
    token: string;
}

/**
 * Get Trello credentials from the OS credential store.
 * Throws an error if credentials are not found - no plaintext fallback.
 */
export async function getCredentials(): Promise<TrelloCredentials> {

    const apiKey = await keytar.getPassword(SERVICE_NAME, 'api_key');
    const token = await keytar.getPassword(SERVICE_NAME, 'token');

    if (!apiKey || !token) {
        const missing: string[] = [];
        if (!apiKey) missing.push('api_key');
        if (!token) missing.push('token');

        throw new Error(
            `Trello credentials not found in OS credential store (missing: ${missing.join(', ')}).\n\n` +
            `Run 'npm run setup-credentials' to securely store your Trello API key and token.\n\n` +
            `To get your credentials:\n` +
            `  1. Go to https://trello.com/app-key to get your API key\n` +
            `  2. Click "Generate a Token" on that page to get your token`
        );
    }

    return { apiKey, token };
}

/**
 * Store Trello credentials in the OS credential store.
 */
export async function setCredentials(apiKey: string, token: string): Promise<void> {

    await keytar.setPassword(SERVICE_NAME, 'api_key', apiKey);
    await keytar.setPassword(SERVICE_NAME, 'token', token);
}

/**
 * Delete Trello credentials from the OS credential store.
 */
export async function deleteCredentials(): Promise<void> {

    await keytar.deletePassword(SERVICE_NAME, 'api_key');
    await keytar.deletePassword(SERVICE_NAME, 'token');
}

/**
 * Check if credentials exist in the OS credential store.
 */
export async function hasCredentials(): Promise<boolean> {

    const apiKey = await keytar.getPassword(SERVICE_NAME, 'api_key');
    const token = await keytar.getPassword(SERVICE_NAME, 'token');

    return apiKey !== null && token !== null;
}
