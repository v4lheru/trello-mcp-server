/**
 * Label Tool Handlers
 * 
 * Implements the handlers for label-related tools.
 * Each handler corresponds to a tool defined in label-tools.ts.
 */

import { ServiceFactory } from '../services/service-factory.js';

/**
 * Handlers for label-related tools
 */
export const labelToolHandlers = {
    /**
     * Get a specific label by ID
     * @param args - Tool arguments
     * @returns Promise resolving to the label
     */
    get_label: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.getLabel(args.labelId);
    },

    /**
     * Create a new label on a board
     * @param args - Tool arguments
     * @returns Promise resolving to the created label
     */
    create_label: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.createLabel(args.boardId, args.name, args.color);
    },

    /**
     * Update an existing label
     * @param args - Tool arguments
     * @returns Promise resolving to the updated label
     */
    update_label: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        const { labelId, ...updateData } = args;
        return labelService.updateLabel(labelId, updateData);
    },

    /**
     * Delete a label
     * @param args - Tool arguments
     * @returns Promise resolving when deletion is complete
     */
    delete_label: async (args: any) => {
        if (!args.confirm) {
            throw new Error('Deletion requires confirmation. Set confirm: true to proceed.');
        }

        const labelService = ServiceFactory.getInstance().getLabelService();
        await labelService.deleteLabel(args.labelId);
        return { success: true, message: 'Label deleted successfully' };
    },

    /**
     * Get all labels on a board
     * @param args - Tool arguments
     * @returns Promise resolving to the labels
     */
    get_board_labels: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.getBoardLabels(args.boardId);
    },

    /**
     * Update the name of a label
     * @param args - Tool arguments
     * @returns Promise resolving to the updated label
     */
    update_label_name: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.updateName(args.labelId, args.name);
    },

    /**
     * Update the color of a label
     * @param args - Tool arguments
     * @returns Promise resolving to the updated label
     */
    update_label_color: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.updateColor(args.labelId, args.color);
    },

    /**
     * Create a new label directly on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the created label
     */
    create_label_on_card: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.createLabelOnCard(args.cardId, args.name, args.color);
    },

    /**
     * Get all labels on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the labels
     */
    get_card_labels: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        return labelService.getCardLabels(args.cardId);
    },

    /**
     * Add a label to a card
     * @param args - Tool arguments
     * @returns Promise resolving when the operation is complete
     */
    add_label_to_card: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        await labelService.addLabelToCard(args.cardId, args.labelId);
        return { success: true, message: 'Label added to card successfully' };
    },

    /**
     * Remove a label from a card
     * @param args - Tool arguments
     * @returns Promise resolving when the operation is complete
     */
    remove_label_from_card: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        await labelService.removeLabelFromCard(args.cardId, args.labelId);
        return { success: true, message: 'Label removed from card successfully' };
    }
};
