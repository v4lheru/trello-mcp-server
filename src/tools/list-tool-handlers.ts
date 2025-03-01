/**
 * List Tool Handlers
 * 
 * Implements the handlers for list-related tools.
 * Each handler corresponds to a tool defined in list-tools.ts.
 */

import { ServiceFactory } from '../services/service-factory.js';

/**
 * Handlers for list-related tools
 */
export const listToolHandlers = {
    /**
     * Get a specific list by ID
     * @param args - Tool arguments
     * @returns Promise resolving to the list
     */
    get_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.getList(args.listId);
    },

    /**
     * Create a new list on a board
     * @param args - Tool arguments
     * @returns Promise resolving to the created list
     */
    create_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.createList(args);
    },

    /**
     * Update an existing list
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    update_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        const { listId, ...updateData } = args;
        return listService.updateList(listId, updateData);
    },

    /**
     * Archive a list
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    archive_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.archiveList(args.listId);
    },

    /**
     * Unarchive a list
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    unarchive_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.unarchiveList(args.listId);
    },

    /**
     * Move a list to a different board
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    move_list_to_board: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.moveListToBoard(args.listId, args.boardId);
    },

    /**
     * Get all cards in a list
     * @param args - Tool arguments
     * @returns Promise resolving to the cards
     */
    get_cards_in_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.getCards(args.listId, args.filter);
    },

    /**
     * Archive all cards in a list
     * @param args - Tool arguments
     * @returns Promise resolving when operation is complete
     */
    archive_all_cards: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        await listService.archiveAllCards(args.listId);
        return { success: true, message: 'All cards in the list have been archived' };
    },

    /**
     * Move all cards in a list to another list
     * @param args - Tool arguments
     * @returns Promise resolving when operation is complete
     */
    move_all_cards: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        await listService.moveAllCards(args.sourceListId, args.destinationListId, args.boardId);
        return { success: true, message: 'All cards have been moved to the destination list' };
    },

    /**
     * Update the position of a list on a board
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    update_list_position: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.updatePosition(args.listId, args.position);
    },

    /**
     * Update the name of a list
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    update_list_name: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.updateName(args.listId, args.name);
    },

    /**
     * Subscribe to a list
     * @param args - Tool arguments
     * @returns Promise resolving to the updated list
     */
    subscribe_to_list: async (args: any) => {
        const listService = ServiceFactory.getInstance().getListService();
        return listService.updateSubscribed(args.listId, args.subscribed);
    }
};
