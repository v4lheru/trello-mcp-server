/**
 * Board Tool Handlers
 * 
 * Implements the handlers for board-related tools.
 * Each handler corresponds to a tool defined in board-tools.ts.
 */

import { ServiceFactory } from '../services/service-factory.js';

/**
 * Handlers for board-related tools
 */
export const boardToolHandlers = {
    /**
     * Get boards for the authenticated user
     * @param args - Tool arguments
     * @returns Promise resolving to the boards
     */
    get_boards: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        return boardService.getBoards(args);
    },

    /**
     * Get a specific board by ID
     * @param args - Tool arguments
     * @returns Promise resolving to the board
     */
    get_board: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        return boardService.getBoard(args.boardId);
    },

    /**
     * Create a new board
     * @param args - Tool arguments
     * @returns Promise resolving to the created board
     */
    create_board: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        return boardService.createBoard(args);
    },

    /**
     * Update an existing board
     * @param args - Tool arguments
     * @returns Promise resolving to the updated board
     */
    update_board: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        const { boardId, ...updateData } = args;
        return boardService.updateBoard(boardId, updateData);
    },

    /**
     * Delete a board
     * @param args - Tool arguments
     * @returns Promise resolving when deletion is complete
     */
    delete_board: async (args: any) => {
        if (!args.confirm) {
            throw new Error('Deletion requires confirmation. Set confirm: true to proceed.');
        }

        const boardService = ServiceFactory.getInstance().getBoardService();
        await boardService.deleteBoard(args.boardId);
        return { success: true, message: 'Board deleted successfully' };
    },

    /**
     * Get all lists on a board
     * @param args - Tool arguments
     * @returns Promise resolving to the lists
     */
    get_board_lists: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        return boardService.getLists(args.boardId, args.filter);
    },

    /**
     * Get all members of a board
     * @param args - Tool arguments
     * @returns Promise resolving to the members
     */
    get_board_members: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getBoardMembers(args.boardId);
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
     * Close (archive) a board
     * @param args - Tool arguments
     * @returns Promise resolving to the updated board
     */
    close_board: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        return boardService.updateBoard(args.boardId, { closed: true });
    },

    /**
     * Reopen a closed board
     * @param args - Tool arguments
     * @returns Promise resolving to the updated board
     */
    reopen_board: async (args: any) => {
        const boardService = ServiceFactory.getInstance().getBoardService();
        return boardService.updateBoard(args.boardId, { closed: false });
    }
};
