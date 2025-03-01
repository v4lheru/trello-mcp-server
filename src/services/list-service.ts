/**
 * List Service
 * 
 * Service for interacting with Trello lists.
 * Provides methods for creating, reading, updating, and deleting lists.
 */

import { TrelloService } from './trello-service.js';
import {
    TrelloList,
    CreateListData,
    UpdateListData,
    ListFilters,
    TrelloCard
} from '../types/trello-types.js';

/**
 * Service for interacting with Trello lists
 */
export class ListService {
    private trelloService: TrelloService;

    /**
     * Creates a new ListService instance
     * @param trelloService - The TrelloService instance
     */
    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }

    /**
     * Get a specific list by ID
     * @param listId - ID of the list to retrieve
     * @returns Promise resolving to the list
     */
    async getList(listId: string): Promise<TrelloList> {
        return this.trelloService.get<TrelloList>(`/lists/${listId}`);
    }

    /**
     * Create a new list
     * @param data - List creation data
     * @returns Promise resolving to the created list
     */
    async createList(data: CreateListData): Promise<TrelloList> {
        return this.trelloService.post<TrelloList>('/lists', data);
    }

    /**
     * Update an existing list
     * @param listId - ID of the list to update
     * @param data - List update data
     * @returns Promise resolving to the updated list
     */
    async updateList(listId: string, data: UpdateListData): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}`, data);
    }

    /**
     * Archive a list
     * @param listId - ID of the list to archive
     * @returns Promise resolving to the updated list
     */
    async archiveList(listId: string): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}/closed`, { value: true });
    }

    /**
     * Unarchive a list
     * @param listId - ID of the list to unarchive
     * @returns Promise resolving to the updated list
     */
    async unarchiveList(listId: string): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}/closed`, { value: false });
    }

    /**
     * Move a list to a different board
     * @param listId - ID of the list to move
     * @param boardId - ID of the destination board
     * @returns Promise resolving to the updated list
     */
    async moveListToBoard(listId: string, boardId: string): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}/idBoard`, { value: boardId });
    }

    /**
     * Get all cards in a list
     * @param listId - ID of the list
     * @param filter - Optional filter (all, closed, none, open)
     * @returns Promise resolving to an array of cards
     */
    async getCards(listId: string, filter: 'all' | 'closed' | 'none' | 'open' = 'open'): Promise<TrelloCard[]> {
        return this.trelloService.get<TrelloCard[]>(`/lists/${listId}/cards`, { filter });
    }

    /**
     * Archive all cards in a list
     * @param listId - ID of the list
     * @returns Promise resolving when the operation is complete
     */
    async archiveAllCards(listId: string): Promise<void> {
        return this.trelloService.post<void>(`/lists/${listId}/archiveAllCards`);
    }

    /**
     * Move all cards in a list to another list
     * @param sourceListId - ID of the source list
     * @param destinationListId - ID of the destination list
     * @param boardId - ID of the board (required by Trello API)
     * @returns Promise resolving when the operation is complete
     */
    async moveAllCards(sourceListId: string, destinationListId: string, boardId: string): Promise<void> {
        return this.trelloService.post<void>(`/lists/${sourceListId}/moveAllCards`, {
            idBoard: boardId,
            idList: destinationListId
        });
    }

    /**
     * Update the position of a list
     * @param listId - ID of the list to update
     * @param position - New position (top, bottom, or a positive number)
     * @returns Promise resolving to the updated list
     */
    async updatePosition(listId: string, position: 'top' | 'bottom' | number): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}/pos`, { value: position });
    }

    /**
     * Update the name of a list
     * @param listId - ID of the list to update
     * @param name - New name for the list
     * @returns Promise resolving to the updated list
     */
    async updateName(listId: string, name: string): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}/name`, { value: name });
    }

    /**
     * Subscribe or unsubscribe from a list
     * @param listId - ID of the list
     * @param subscribed - Whether to subscribe (true) or unsubscribe (false)
     * @returns Promise resolving to the updated list
     */
    async updateSubscribed(listId: string, subscribed: boolean): Promise<TrelloList> {
        return this.trelloService.put<TrelloList>(`/lists/${listId}/subscribed`, { value: subscribed });
    }
}
