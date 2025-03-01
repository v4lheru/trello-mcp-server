/**
 * Member Tool Handlers
 * 
 * Implements the handlers for member-related tools.
 * Each handler corresponds to a tool defined in member-tools.ts.
 */

import { ServiceFactory } from '../services/service-factory.js';

/**
 * Handlers for member-related tools
 */
export const memberToolHandlers = {
    /**
     * Get the authenticated member (current user)
     * @param args - Tool arguments
     * @returns Promise resolving to the member
     */
    get_me: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getMe();
    },

    /**
     * Get a specific member by ID or username
     * @param args - Tool arguments
     * @returns Promise resolving to the member
     */
    get_member: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getMember(args.memberIdOrUsername);
    },

    /**
     * Get boards that a member belongs to
     * @param args - Tool arguments
     * @returns Promise resolving to the boards
     */
    get_member_boards: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getMemberBoards(args.memberIdOrUsername, args.filter);
    },

    /**
     * Get cards assigned to a member
     * @param args - Tool arguments
     * @returns Promise resolving to the cards
     */
    get_member_cards: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getMemberCards(args.memberIdOrUsername);
    },

    /**
     * Get boards that a member has been invited to
     * @param args - Tool arguments
     * @returns Promise resolving to the boards
     */
    get_boards_invited: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getBoardsInvited(args.memberIdOrUsername);
    },

    /**
     * Get organizations that a member belongs to
     * @param args - Tool arguments
     * @returns Promise resolving to the organizations
     */
    get_member_organizations: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getMemberOrganizations(args.memberIdOrUsername);
    },

    /**
     * Get notifications for the authenticated member
     * @param args - Tool arguments
     * @returns Promise resolving to the notifications
     */
    get_notifications: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getNotifications(args.filter, args.readFilter, args.limit);
    },

    /**
     * Update the authenticated member's information
     * @param args - Tool arguments
     * @returns Promise resolving to the updated member
     */
    update_me: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.updateMe(args);
    },

    /**
     * Get the authenticated member's avatar
     * @param args - Tool arguments
     * @returns Promise resolving to the avatar URL
     */
    get_avatar: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getAvatar(args.size);
    },

    /**
     * Search for members by name
     * @param args - Tool arguments
     * @returns Promise resolving to the members
     */
    search_members: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.searchMembers(args.query, args.limit);
    },

    /**
     * Get members of a board
     * @param args - Tool arguments
     * @returns Promise resolving to the members
     */
    get_board_members: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getBoardMembers(args.boardId);
    },

    /**
     * Get members of an organization
     * @param args - Tool arguments
     * @returns Promise resolving to the members
     */
    get_organization_members: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getOrganizationMembers(args.organizationId);
    },

    /**
     * Get members assigned to a card
     * @param args - Tool arguments
     * @returns Promise resolving to the members
     */
    get_card_members: async (args: any) => {
        const memberService = ServiceFactory.getInstance().getMemberService();
        return memberService.getCardMembers(args.cardId);
    }
};
