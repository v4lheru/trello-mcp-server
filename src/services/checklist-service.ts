/**
 * Checklist Service
 * 
 * Service for interacting with Trello checklists.
 * Provides methods for creating, reading, updating, and deleting checklists and checklist items.
 */

import { TrelloService } from './trello-service.js';
import { TrelloChecklist, TrelloCheckItem } from '../types/trello-types.js';

/**
 * Service for interacting with Trello checklists
 */
export class ChecklistService {
    private trelloService: TrelloService;

    /**
     * Creates a new ChecklistService instance
     * @param trelloService - The TrelloService instance
     */
    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }

    /**
     * Get a specific checklist by ID
     * @param checklistId - ID of the checklist to retrieve
     * @returns Promise resolving to the checklist
     */
    async getChecklist(checklistId: string): Promise<TrelloChecklist> {
        return this.trelloService.get<TrelloChecklist>(`/checklists/${checklistId}`);
    }

    /**
     * Create a new checklist on a card
     * @param cardId - ID of the card
     * @param name - Name of the checklist
     * @param pos - Position of the checklist (top, bottom, or a positive number)
     * @param idChecklistSource - ID of a checklist to copy from
     * @returns Promise resolving to the created checklist
     */
    async createChecklist(
        cardId: string,
        name: string,
        pos?: 'top' | 'bottom' | number,
        idChecklistSource?: string
    ): Promise<TrelloChecklist> {
        const data: any = {
            idCard: cardId,
            name
        };

        if (pos !== undefined) {
            data.pos = pos;
        }

        if (idChecklistSource) {
            data.idChecklistSource = idChecklistSource;
        }

        return this.trelloService.post<TrelloChecklist>('/checklists', data);
    }

    /**
     * Update an existing checklist
     * @param checklistId - ID of the checklist to update
     * @param data - Checklist update data
     * @returns Promise resolving to the updated checklist
     */
    async updateChecklist(
        checklistId: string,
        data: {
            name?: string;
            pos?: 'top' | 'bottom' | number;
        }
    ): Promise<TrelloChecklist> {
        return this.trelloService.put<TrelloChecklist>(`/checklists/${checklistId}`, data);
    }

    /**
     * Delete a checklist
     * @param checklistId - ID of the checklist to delete
     * @returns Promise resolving when deletion is complete
     */
    async deleteChecklist(checklistId: string): Promise<void> {
        return this.trelloService.delete<void>(`/checklists/${checklistId}`);
    }

    /**
     * Get all checkitems on a checklist
     * @param checklistId - ID of the checklist
     * @returns Promise resolving to an array of checkitems
     */
    async getCheckItems(checklistId: string): Promise<TrelloCheckItem[]> {
        return this.trelloService.get<TrelloCheckItem[]>(`/checklists/${checklistId}/checkItems`);
    }

    /**
     * Create a new checkitem on a checklist
     * @param checklistId - ID of the checklist
     * @param name - Name of the checkitem
     * @param pos - Position of the checkitem (top, bottom, or a positive number)
     * @param checked - Whether the checkitem is checked
     * @param due - Due date for the checkitem
     * @param memberId - ID of the member assigned to the checkitem
     * @returns Promise resolving to the created checkitem
     */
    async createCheckItem(
        checklistId: string,
        name: string,
        pos?: 'top' | 'bottom' | number,
        checked?: boolean,
        due?: string,
        memberId?: string
    ): Promise<TrelloCheckItem> {
        const data: any = { name };

        if (pos !== undefined) {
            data.pos = pos;
        }

        if (checked !== undefined) {
            data.checked = checked;
        }

        if (due) {
            data.due = due;
        }

        if (memberId) {
            data.idMember = memberId;
        }

        return this.trelloService.post<TrelloCheckItem>(`/checklists/${checklistId}/checkItems`, data);
    }

    /**
     * Get a specific checkitem on a checklist
     * @param checklistId - ID of the checklist
     * @param checkItemId - ID of the checkitem
     * @returns Promise resolving to the checkitem
     */
    async getCheckItem(checklistId: string, checkItemId: string): Promise<TrelloCheckItem> {
        return this.trelloService.get<TrelloCheckItem>(`/checklists/${checklistId}/checkItems/${checkItemId}`);
    }

    /**
     * Update a checkitem on a checklist
     * @param checklistId - ID of the checklist
     * @param checkItemId - ID of the checkitem
     * @param data - Checkitem update data
     * @returns Promise resolving to the updated checkitem
     */
    async updateCheckItem(
        checklistId: string,
        checkItemId: string,
        data: {
            name?: string;
            state?: 'complete' | 'incomplete';
            pos?: 'top' | 'bottom' | number;
            due?: string | null;
            idMember?: string | null;
        }
    ): Promise<TrelloCheckItem> {
        return this.trelloService.put<TrelloCheckItem>(`/checklists/${checklistId}/checkItems/${checkItemId}`, data);
    }

    /**
     * Delete a checkitem from a checklist
     * @param checklistId - ID of the checklist
     * @param checkItemId - ID of the checkitem to delete
     * @returns Promise resolving when deletion is complete
     */
    async deleteCheckItem(checklistId: string, checkItemId: string): Promise<void> {
        return this.trelloService.delete<void>(`/checklists/${checklistId}/checkItems/${checkItemId}`);
    }

    /**
     * Update the name of a checklist
     * @param checklistId - ID of the checklist
     * @param name - New name for the checklist
     * @returns Promise resolving to the updated checklist
     */
    async updateName(checklistId: string, name: string): Promise<TrelloChecklist> {
        return this.trelloService.put<TrelloChecklist>(`/checklists/${checklistId}/name`, { value: name });
    }

    /**
     * Update the position of a checklist
     * @param checklistId - ID of the checklist
     * @param pos - New position for the checklist
     * @returns Promise resolving to the updated checklist
     */
    async updatePosition(checklistId: string, pos: 'top' | 'bottom' | number): Promise<TrelloChecklist> {
        return this.trelloService.put<TrelloChecklist>(`/checklists/${checklistId}/pos`, { value: pos });
    }

    /**
     * Get the board a checklist is on
     * @param checklistId - ID of the checklist
     * @returns Promise resolving to the board
     */
    async getBoard(checklistId: string): Promise<any> {
        return this.trelloService.get<any>(`/checklists/${checklistId}/board`);
    }

    /**
     * Get the card a checklist is on
     * @param checklistId - ID of the checklist
     * @returns Promise resolving to the card
     */
    async getCard(checklistId: string): Promise<any> {
        return this.trelloService.get<any>(`/checklists/${checklistId}/cards`);
    }

    /**
     * Update a checkitem's state on a card
     * @param cardId - ID of the card
     * @param checkItemId - ID of the checkitem
     * @param state - New state for the checkitem
     * @returns Promise resolving to the updated checkitem
     */
    async updateCheckItemStateOnCard(
        cardId: string,
        checkItemId: string,
        state: 'complete' | 'incomplete'
    ): Promise<TrelloCheckItem> {
        return this.trelloService.put<TrelloCheckItem>(`/cards/${cardId}/checkItem/${checkItemId}`, { state });
    }
}
