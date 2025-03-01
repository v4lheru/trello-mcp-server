/**
 * Checklist Tool Handlers
 * 
 * Implements the handlers for checklist-related tools.
 * Each handler corresponds to a tool defined in checklist-tools.ts.
 */

import { ServiceFactory } from '../services/service-factory.js';

/**
 * Handlers for checklist-related tools
 */
export const checklistToolHandlers = {
    /**
     * Get a specific checklist by ID
     * @param args - Tool arguments
     * @returns Promise resolving to the checklist
     */
    get_checklist: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.getChecklist(args.checklistId);
    },

    /**
     * Create a new checklist on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the created checklist
     */
    create_checklist: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.createChecklist(args.cardId, args.name, args.pos, args.idChecklistSource);
    },

    /**
     * Update an existing checklist
     * @param args - Tool arguments
     * @returns Promise resolving to the updated checklist
     */
    update_checklist: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        const { checklistId, ...updateData } = args;
        return checklistService.updateChecklist(checklistId, updateData);
    },

    /**
     * Delete a checklist
     * @param args - Tool arguments
     * @returns Promise resolving when deletion is complete
     */
    delete_checklist: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        await checklistService.deleteChecklist(args.checklistId);
        return { success: true, message: 'Checklist deleted successfully' };
    },

    /**
     * Get all checkitems on a checklist
     * @param args - Tool arguments
     * @returns Promise resolving to the checkitems
     */
    get_checkitems: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.getCheckItems(args.checklistId);
    },

    /**
     * Create a new checkitem on a checklist
     * @param args - Tool arguments
     * @returns Promise resolving to the created checkitem
     */
    create_checkitem: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.createCheckItem(
            args.checklistId,
            args.name,
            args.pos,
            args.checked,
            args.due,
            args.memberId
        );
    },

    /**
     * Get a specific checkitem on a checklist
     * @param args - Tool arguments
     * @returns Promise resolving to the checkitem
     */
    get_checkitem: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.getCheckItem(args.checklistId, args.checkItemId);
    },

    /**
     * Update a checkitem on a checklist
     * @param args - Tool arguments
     * @returns Promise resolving to the updated checkitem
     */
    update_checkitem: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        const { checklistId, checkItemId, ...updateData } = args;
        return checklistService.updateCheckItem(checklistId, checkItemId, updateData);
    },

    /**
     * Delete a checkitem from a checklist
     * @param args - Tool arguments
     * @returns Promise resolving when deletion is complete
     */
    delete_checkitem: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        await checklistService.deleteCheckItem(args.checklistId, args.checkItemId);
        return { success: true, message: 'Checkitem deleted successfully' };
    },

    /**
     * Update the name of a checklist
     * @param args - Tool arguments
     * @returns Promise resolving to the updated checklist
     */
    update_checklist_name: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.updateName(args.checklistId, args.name);
    },

    /**
     * Update the position of a checklist on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the updated checklist
     */
    update_checklist_position: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.updatePosition(args.checklistId, args.position);
    },

    /**
     * Get the board a checklist is on
     * @param args - Tool arguments
     * @returns Promise resolving to the board
     */
    get_checklist_board: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.getBoard(args.checklistId);
    },

    /**
     * Get the card a checklist is on
     * @param args - Tool arguments
     * @returns Promise resolving to the card
     */
    get_checklist_card: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.getCard(args.checklistId);
    },

    /**
     * Update a checkitem's state on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the updated checkitem
     */
    update_checkitem_state_on_card: async (args: any) => {
        const checklistService = ServiceFactory.getInstance().getChecklistService();
        return checklistService.updateCheckItemStateOnCard(args.cardId, args.checkItemId, args.state);
    }
};
