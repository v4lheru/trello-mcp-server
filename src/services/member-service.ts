/**
 * Member Service
 * 
 * Service for interacting with Trello members.
 * Provides methods for retrieving and managing members.
 */

import { TrelloService } from './trello-service.js';
import { TrelloMember, TrelloBoard, TrelloCard } from '../types/trello-types.js';

/**
 * Service for interacting with Trello members
 */
export class MemberService {
    private trelloService: TrelloService;

    /**
     * Creates a new MemberService instance
     * @param trelloService - The TrelloService instance
     */
    constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
    }

    /**
     * Get the authenticated member (current user)
     * @returns Promise resolving to the member
     */
    async getMe(): Promise<TrelloMember> {
        return this.trelloService.get<TrelloMember>('/members/me');
    }

    /**
     * Get a specific member by ID or username
     * @param memberIdOrUsername - ID or username of the member to retrieve
     * @returns Promise resolving to the member
     */
    async getMember(memberIdOrUsername: string): Promise<TrelloMember> {
        return this.trelloService.get<TrelloMember>(`/members/${memberIdOrUsername}`);
    }

    /**
     * Get boards that a member belongs to
     * @param memberIdOrUsername - ID or username of the member
     * @param filter - Optional filter (all, closed, members, open, organization, public, starred)
     * @returns Promise resolving to an array of boards
     */
    async getMemberBoards(
        memberIdOrUsername: string,
        filter: 'all' | 'closed' | 'members' | 'open' | 'organization' | 'public' | 'starred' = 'all'
    ): Promise<TrelloBoard[]> {
        return this.trelloService.get<TrelloBoard[]>(`/members/${memberIdOrUsername}/boards`, { filter });
    }

    /**
     * Get cards assigned to a member
     * @param memberIdOrUsername - ID or username of the member
     * @returns Promise resolving to an array of cards
     */
    async getMemberCards(memberIdOrUsername: string): Promise<TrelloCard[]> {
        return this.trelloService.get<TrelloCard[]>(`/members/${memberIdOrUsername}/cards`);
    }

    /**
     * Get boards that a member has been invited to
     * @param memberIdOrUsername - ID or username of the member
     * @returns Promise resolving to an array of boards
     */
    async getBoardsInvited(memberIdOrUsername: string): Promise<TrelloBoard[]> {
        return this.trelloService.get<TrelloBoard[]>(`/members/${memberIdOrUsername}/boardsInvited`);
    }

    /**
     * Get organizations that a member belongs to
     * @param memberIdOrUsername - ID or username of the member
     * @returns Promise resolving to an array of organizations
     */
    async getMemberOrganizations(memberIdOrUsername: string): Promise<any[]> {
        return this.trelloService.get<any[]>(`/members/${memberIdOrUsername}/organizations`);
    }

    /**
     * Get notifications for the authenticated member
     * @param filter - Optional filter for notification types
     * @param readFilter - Optional filter for read status (all, read, unread)
     * @param limit - Maximum number of notifications to return (max 1000)
     * @returns Promise resolving to an array of notifications
     */
    async getNotifications(
        filter?: string,
        readFilter: 'all' | 'read' | 'unread' = 'all',
        limit: number = 50
    ): Promise<any[]> {
        return this.trelloService.get<any[]>('/members/me/notifications', {
            filter,
            read_filter: readFilter,
            limit: Math.min(limit, 1000)
        });
    }

    /**
     * Update the authenticated member's information
     * @param data - Member update data
     * @returns Promise resolving to the updated member
     */
    async updateMe(data: {
        fullName?: string;
        initials?: string;
        username?: string;
        bio?: string;
        avatarSource?: 'gravatar' | 'upload' | 'none';
        prefs?: {
            colorBlind?: boolean;
            locale?: string;
            minutesBetweenSummaries?: number;
        };
    }): Promise<TrelloMember> {
        return this.trelloService.put<TrelloMember>('/members/me', data);
    }

    /**
     * Get the authenticated member's avatar
     * @param size - Size of the avatar (30, 50, 170, or original)
     * @returns Promise resolving to the avatar URL
     */
    async getAvatar(size: 30 | 50 | 170 | 'original' = 'original'): Promise<string> {
        const me = await this.getMe();
        if (!me.avatarUrl) {
            throw new Error('Member does not have an avatar');
        }

        if (size === 'original') {
            return me.avatarUrl;
        }

        // Construct URL for specific size
        return `${me.avatarUrl}/${size}.png`;
    }

    /**
     * Search for members by name
     * @param query - Search query
     * @param limit - Maximum number of results to return (max 20)
     * @returns Promise resolving to an array of members
     */
    async searchMembers(query: string, limit: number = 8): Promise<TrelloMember[]> {
        return this.trelloService.get<TrelloMember[]>('/search/members', {
            query,
            limit: Math.min(limit, 20)
        });
    }

    /**
     * Get members of a board
     * @param boardId - ID of the board
     * @returns Promise resolving to an array of members
     */
    async getBoardMembers(boardId: string): Promise<TrelloMember[]> {
        return this.trelloService.get<TrelloMember[]>(`/boards/${boardId}/members`);
    }

    /**
     * Get members of an organization
     * @param organizationId - ID of the organization
     * @returns Promise resolving to an array of members
     */
    async getOrganizationMembers(organizationId: string): Promise<TrelloMember[]> {
        return this.trelloService.get<TrelloMember[]>(`/organizations/${organizationId}/members`);
    }

    /**
     * Get members assigned to a card
     * @param cardId - ID of the card
     * @returns Promise resolving to an array of members
     */
    async getCardMembers(cardId: string): Promise<TrelloMember[]> {
        return this.trelloService.get<TrelloMember[]>(`/cards/${cardId}/members`);
    }
}
