/**
 * Label Service
 * 
 * Service for interacting with Trello labels.
 * Provides methods for creating, reading, updating, and deleting labels.
 */

import { TrelloService } from './trello-service.js';
import { TrelloLabel } from '../types/trello-types.js';

/**
 * Service for interacting with Trello labels
 */
export class LabelService {
    private trelloService: TrelloService;

    /**
     * Creates a new LabelService instance
     * @param trelloService - The TrelloService instance
     */
    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }

    /**
     * Get a specific label by ID
     * @param labelId - ID of the label to retrieve
     * @returns Promise resolving to the label
     */
    async getLabel(labelId: string): Promise<TrelloLabel> {
        return this.trelloService.get<TrelloLabel>(`/labels/${labelId}`);
    }

    /**
     * Create a new label on a board
     * @param boardId - ID of the board
     * @param name - Name of the label
     * @param color - Color of the label
     * @returns Promise resolving to the created label
     */
    async createLabel(
        boardId: string,
        name: string,
        color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black' | null
    ): Promise<TrelloLabel> {
        return this.trelloService.post<TrelloLabel>('/labels', {
            idBoard: boardId,
            name,
            color
        });
    }

    /**
     * Update an existing label
     * @param labelId - ID of the label to update
     * @param data - Label update data
     * @returns Promise resolving to the updated label
     */
    async updateLabel(
        labelId: string,
        data: {
            name?: string;
            color?: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black' | null;
        }
    ): Promise<TrelloLabel> {
        return this.trelloService.put<TrelloLabel>(`/labels/${labelId}`, data);
    }

    /**
     * Delete a label
     * @param labelId - ID of the label to delete
     * @returns Promise resolving when deletion is complete
     */
    async deleteLabel(labelId: string): Promise<void> {
        return this.trelloService.delete<void>(`/labels/${labelId}`);
    }

    /**
     * Get all labels on a board
     * @param boardId - ID of the board
     * @returns Promise resolving to an array of labels
     */
    async getBoardLabels(boardId: string): Promise<TrelloLabel[]> {
        return this.trelloService.get<TrelloLabel[]>(`/boards/${boardId}/labels`);
    }

    /**
     * Update the name of a label
     * @param labelId - ID of the label to update
     * @param name - New name for the label
     * @returns Promise resolving to the updated label
     */
    async updateName(labelId: string, name: string): Promise<TrelloLabel> {
        return this.trelloService.put<TrelloLabel>(`/labels/${labelId}/name`, { value: name });
    }

    /**
     * Update the color of a label
     * @param labelId - ID of the label to update
     * @param color - New color for the label
     * @returns Promise resolving to the updated label
     */
    async updateColor(
        labelId: string,
        color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black' | null
    ): Promise<TrelloLabel> {
        return this.trelloService.put<TrelloLabel>(`/labels/${labelId}/color`, { value: color });
    }

    /**
     * Create a label directly on a card
     * @param cardId - ID of the card
     * @param name - Name of the label
     * @param color - Color of the label
     * @returns Promise resolving to the created label
     */
    async createLabelOnCard(
        cardId: string,
        name: string,
        color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black' | null
    ): Promise<TrelloLabel> {
        return this.trelloService.post<TrelloLabel>(`/cards/${cardId}/labels`, {
            name,
            color
        });
    }

    /**
     * Get all labels on a card
     * @param cardId - ID of the card
     * @returns Promise resolving to an array of labels
     */
    async getCardLabels(cardId: string): Promise<TrelloLabel[]> {
        return this.trelloService.get<TrelloLabel[]>(`/cards/${cardId}/labels`);
    }

    /**
     * Add a label to a card
     * @param cardId - ID of the card
     * @param labelId - ID of the label to add
     * @returns Promise resolving when the operation is complete
     */
    async addLabelToCard(cardId: string, labelId: string): Promise<void> {
        return this.trelloService.post<void>(`/cards/${cardId}/idLabels`, {
            value: labelId
        });
    }

    /**
     * Remove a label from a card
     * @param cardId - ID of the card
     * @param labelId - ID of the label to remove
     * @returns Promise resolving when the operation is complete
     */
    async removeLabelFromCard(cardId: string, labelId: string): Promise<void> {
        return this.trelloService.delete<void>(`/cards/${cardId}/idLabels/${labelId}`);
    }
}
