/**
 * Trello Service
 * 
 * Main service class for interacting with the Trello API.
 * Provides authentication and common functionality for all Trello resources.
 */

import { BaseService } from './base-service.js';
import config from '../config.js';

/**
 * Service for interacting with the Trello API
 */
export class TrelloService extends BaseService {
    private static instance: TrelloService;
    private apiKey: string;
    private token: string;

    /**
     * Private constructor to enforce singleton pattern
     * @param apiKey - Trello API key
     * @param token - Trello API token
     */
    private constructor(apiKey: string, token: string) {
        super(
            'https://api.trello.com/1',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        );

        this.apiKey = apiKey;
        this.token = token;
    }

    /**
     * Initializes the TrelloService singleton instance
     * @param apiKey - Trello API key
     * @param token - Trello API token
     * @returns The singleton instance of TrelloService
     */
    public static initialize(apiKey: string, token: string): TrelloService {
        if (!TrelloService.instance) {
            TrelloService.instance = new TrelloService(apiKey, token);
        }
        return TrelloService.instance;
    }

    /**
     * Gets the singleton instance of TrelloService
     * @returns The singleton instance of TrelloService
     * @throws Error if service hasn't been initialized
     */
    public static getInstance(): TrelloService {
        if (!TrelloService.instance) {
            throw new Error('TrelloService not initialized. Call initialize() first.');
        }
        return TrelloService.instance;
    }

    /**
     * Adds authentication parameters to a URL
     * @param url - The URL to add authentication to
     * @returns The URL with authentication parameters
     */
    protected addAuth(url: string): string {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}key=${this.apiKey}&token=${this.token}`;
    }

    /**
     * Makes a GET request to the Trello API
     * @param endpoint - The API endpoint to call
     * @param params - Query parameters to include
     * @returns Promise resolving to the response data
     */
    async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
        return this.makeRequest(async () => {
            const queryParams = new URLSearchParams();

            // Add all params to the query string
            for (const [key, value] of Object.entries(params)) {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        queryParams.append(key, value.join(','));
                    } else {
                        queryParams.append(key, String(value));
                    }
                }
            }

            const queryString = queryParams.toString();
            const url = this.addAuth(`${endpoint}${queryString ? `?${queryString}` : ''}`);

            const response = await this.client.get(url);
            return response.data;
        });
    }

    /**
     * Makes a POST request to the Trello API
     * @param endpoint - The API endpoint to call
     * @param data - The data to send in the request body
     * @param params - Additional query parameters
     * @returns Promise resolving to the response data
     */
    async post<T>(endpoint: string, data: any = {}, params: Record<string, any> = {}): Promise<T> {
        return this.makeRequest(async () => {
            const queryParams = new URLSearchParams();

            // Add all params to the query string
            for (const [key, value] of Object.entries(params)) {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        queryParams.append(key, value.join(','));
                    } else {
                        queryParams.append(key, String(value));
                    }
                }
            }

            const queryString = queryParams.toString();
            const url = this.addAuth(`${endpoint}${queryString ? `?${queryString}` : ''}`);

            const response = await this.client.post(url, data);
            return response.data;
        });
    }

    /**
     * Makes a PUT request to the Trello API
     * @param endpoint - The API endpoint to call
     * @param data - The data to send in the request body
     * @param params - Additional query parameters
     * @returns Promise resolving to the response data
     */
    async put<T>(endpoint: string, data: any = {}, params: Record<string, any> = {}): Promise<T> {
        return this.makeRequest(async () => {
            const queryParams = new URLSearchParams();

            // Add all params to the query string
            for (const [key, value] of Object.entries(params)) {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        queryParams.append(key, value.join(','));
                    } else {
                        queryParams.append(key, String(value));
                    }
                }
            }

            const queryString = queryParams.toString();
            const url = this.addAuth(`${endpoint}${queryString ? `?${queryString}` : ''}`);

            const response = await this.client.put(url, data);
            return response.data;
        });
    }

    /**
     * Makes a DELETE request to the Trello API
     * @param endpoint - The API endpoint to call
     * @param params - Query parameters to include
     * @returns Promise resolving to the response data
     */
    async delete<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
        return this.makeRequest(async () => {
            const queryParams = new URLSearchParams();

            // Add all params to the query string
            for (const [key, value] of Object.entries(params)) {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        queryParams.append(key, value.join(','));
                    } else {
                        queryParams.append(key, String(value));
                    }
                }
            }

            const queryString = queryParams.toString();
            const url = this.addAuth(`${endpoint}${queryString ? `?${queryString}` : ''}`);

            const response = await this.client.delete(url);
            return response.data;
        });
    }

    /**
     * Creates a URL with query parameters for the Trello API
     * @param endpoint - The API endpoint
     * @param params - Query parameters to include
     * @returns The URL with query parameters
     */
    protected createUrl(endpoint: string, params: Record<string, any> = {}): string {
        const queryParams = new URLSearchParams();

        // Add all params to the query string
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    queryParams.append(key, value.join(','));
                } else {
                    queryParams.append(key, String(value));
                }
            }
        }

        const queryString = queryParams.toString();
        return this.addAuth(`${endpoint}${queryString ? `?${queryString}` : ''}`);
    }
}
