/**
 * Board Service
 * 
 * Service for interacting with Trello boards.
 * Provides methods for creating, reading, updating, and deleting boards.
 */

import { TrelloService } from './trello-service.js';
import {
    TrelloBoard,
    CreateBoardData,
    UpdateBoardData,
    BoardFilters,
    TrelloList
} from '../types/trello-types.js';

/**
 * Service for interacting with Trello boards
 */
export class BoardService {
    private trelloService: TrelloService;

    /**
     * Creates a new BoardService instance
     * @param trelloService - The TrelloService instance
     */
    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }

    /**
     * Get all boards for the authenticated user
     * @param filters - Optional filters to apply
     * @returns Promise resolving to an array of boards
     */
    async getBoards(filters?: BoardFilters): Promise<TrelloBoard[]> {
        return this.trelloService.get<TrelloBoard[]>('/members/me/boards', filters);
    }

    /**
     * Get a specific board by ID
     * @param boardId - ID of the board to retrieve
     * @returns Promise resolving to the board
     */
    async getBoard(boardId: string): Promise<TrelloBoard> {
        return this.trelloService.get<TrelloBoard>(`/boards/${boardId}`);
    }

    /**
     * Create a new board
     * @param data - Board creation data
     * @returns Promise resolving to the created board
     */
    async createBoard(data: CreateBoardData): Promise<TrelloBoard> {
        return this.trelloService.post<TrelloBoard>('/boards', data);
    }

    /**
     * Update an existing board
     * @param boardId - ID of the board to update
     * @param data - Board update data
     * @returns Promise resolving to the updated board
     */
    async updateBoard(boardId: string, data: UpdateBoardData): Promise<TrelloBoard> {
        return this.trelloService.put<TrelloBoard>(`/boards/${boardId}`, data);
    }

    /**
     * Delete a board
     * @param boardId - ID of the board to delete
     * @returns Promise resolving when deletion is complete
     */
    async deleteBoard(boardId: string): Promise<void> {
        return this.trelloService.delete<void>(`/boards/${boardId}`);
    }

    /**
     * Get all lists on a board
     * @param boardId - ID of the board
     * @param filter - Optional filter (all, closed, none, open)
     * @returns Promise resolving to an array of lists
     */
    async getLists(boardId: string, filter: 'all' | 'closed' | 'none' | 'open' = 'open'): Promise<TrelloList[]> {
        return this.trelloService.get<TrelloList[]>(`/boards/${boardId}/lists`, { filter });
    }

    /**
     * Close (archive) a board
     * @param boardId - ID of the board to close
     * @returns Promise resolving to the updated board
     */
    async closeBoard(boardId: string): Promise<TrelloBoard> {
        return this.updateBoard(boardId, { closed: true });
    }

    /**
     * Reopen a closed board
     * @param boardId - ID of the board to reopen
     * @returns Promise resolving to the updated board
     */
    async reopenBoard(boardId: string): Promise<TrelloBoard> {
        return this.updateBoard(boardId, { closed: false });
    }

    /**
     * Get boards that belong to an organization
     * @param organizationId - ID of the organization
     * @param filters - Optional filters to apply
     * @returns Promise resolving to an array of boards
     */
    async getOrganizationBoards(organizationId: string, filters?: BoardFilters): Promise<TrelloBoard[]> {
        return this.trelloService.get<TrelloBoard[]>(`/organizations/${organizationId}/boards`, filters);
    }

    /**
     * Get boards that the authenticated user is a member of
     * @param filters - Optional filters to apply
     * @returns Promise resolving to an array of boards
     */
    async getMemberBoards(filters?: BoardFilters): Promise<TrelloBoard[]> {
        return this.trelloService.get<TrelloBoard[]>('/members/me/boards', filters);
    }

    /**
     * Get starred boards for the authenticated user
     * @returns Promise resolving to an array of starred boards
     */
    async getStarredBoards(): Promise<TrelloBoard[]> {
        return this.trelloService.get<TrelloBoard[]>('/members/me/boards', { filter: 'starred' });
    }
}
