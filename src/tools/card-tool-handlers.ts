/**
 * Card Tool Handlers
 * 
 * Implements the handlers for card-related tools.
 * Each handler corresponds to a tool defined in card-tools.ts.
 */

import { ServiceFactory } from '../services/service-factory.js';

/**
 * Handlers for card-related tools
 */
export const cardToolHandlers = {
    /**
     * Get a specific card by ID
     * @param args - Tool arguments
     * @returns Promise resolving to the card
     */
    get_card: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.getCard(args.cardId);
    },

    /**
     * Create a new card
     * @param args - Tool arguments
     * @returns Promise resolving to the created card
     */
    create_card: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.createCard(args);
    },

    /**
     * Update an existing card
     * @param args - Tool arguments
     * @returns Promise resolving to the updated card
     */
    update_card: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        const { cardId, ...updateData } = args;
        return cardService.updateCard(cardId, updateData);
    },

    /**
     * Delete a card
     * @param args - Tool arguments
     * @returns Promise resolving when deletion is complete
     */
    delete_card: async (args: any) => {
        if (!args.confirm) {
            throw new Error('Deletion requires confirmation. Set confirm: true to proceed.');
        }

        const cardService = ServiceFactory.getInstance().getCardService();
        await cardService.deleteCard(args.cardId);
        return { success: true, message: 'Card deleted successfully' };
    },

    /**
     * Archive a card
     * @param args - Tool arguments
     * @returns Promise resolving to the updated card
     */
    archive_card: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.archiveCard(args.cardId);
    },

    /**
     * Unarchive a card
     * @param args - Tool arguments
     * @returns Promise resolving to the updated card
     */
    unarchive_card: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.unarchiveCard(args.cardId);
    },

    /**
     * Move a card to a different list
     * @param args - Tool arguments
     * @returns Promise resolving to the updated card
     */
    move_card_to_list: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.moveCardToList(args.cardId, args.listId);
    },

    /**
     * Add a comment to a card
     * @param args - Tool arguments
     * @returns Promise resolving to the created comment
     */
    add_comment: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.addComment(args.cardId, args.text);
    },

    /**
     * Get comments on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the comments
     */
    get_comments: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.getComments(args.cardId);
    },

    /**
     * Add an attachment to a card
     * @param args - Tool arguments
     * @returns Promise resolving to the created attachment
     */
    add_attachment: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.addAttachment(args.cardId, args.url, args.name);
    },

    /**
     * Get attachments on a card
     * @param args - Tool arguments
     * @returns Promise resolving to the attachments
     */
    get_attachments: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.getAttachments(args.cardId);
    },

    /**
     * Delete an attachment from a card
     * @param args - Tool arguments
     * @returns Promise resolving when deletion is complete
     */
    delete_attachment: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        await cardService.deleteAttachment(args.cardId, args.attachmentId);
        return { success: true, message: 'Attachment deleted successfully' };
    },

    /**
     * Add a member to a card
     * @param args - Tool arguments
     * @returns Promise resolving when the operation is complete
     */
    add_member: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        await cardService.addMember(args.cardId, args.memberId);
        return { success: true, message: 'Member added to card successfully' };
    },

    /**
     * Remove a member from a card
     * @param args - Tool arguments
     * @returns Promise resolving when the operation is complete
     */
    remove_member: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        await cardService.removeMember(args.cardId, args.memberId);
        return { success: true, message: 'Member removed from card successfully' };
    },

    /**
     * Add a label to a card
     * @param args - Tool arguments
     * @returns Promise resolving when the operation is complete
     */
    add_label: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        await labelService.addLabelToCard(args.cardId, args.labelId);
        return { success: true, message: 'Label added to card successfully' };
    },

    /**
     * Remove a label from a card
     * @param args - Tool arguments
     * @returns Promise resolving when the operation is complete
     */
    remove_label: async (args: any) => {
        const labelService = ServiceFactory.getInstance().getLabelService();
        await labelService.removeLabelFromCard(args.cardId, args.labelId);
        return { success: true, message: 'Label removed from card successfully' };
    },

    /**
     * Set the due date for a card
     * @param args - Tool arguments
     * @returns Promise resolving to the updated card
     */
    set_due_date: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.updateCard(args.cardId, { due: args.due });
    },

    /**
     * Mark a card's due date as complete or incomplete
     * @param args - Tool arguments
     * @returns Promise resolving to the updated card
     */
    set_due_complete: async (args: any) => {
        const cardService = ServiceFactory.getInstance().getCardService();
        return cardService.updateCard(args.cardId, { dueComplete: args.dueComplete });
    }
};
