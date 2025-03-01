/**
 * Trello Types
 * 
 * Type definitions for the Trello API.
 * These types represent the data structures used by the Trello API.
 */

/**
 * Represents a Trello board
 */
export interface TrelloBoard {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** Detailed description */
    desc?: string;
    /** Whether the board is closed (archived) */
    closed: boolean;
    /** ID of the organization the board belongs to */
    idOrganization?: string;
    /** Whether the board is pinned */
    pinned?: boolean;
    /** URL of the board */
    url: string;
    /** Short URL of the board */
    shortUrl: string;
    /** Board preferences */
    prefs?: {
        /** Permission level of the board */
        permissionLevel?: 'private' | 'org' | 'public';
        /** Whether voting is enabled */
        voting?: 'disabled' | 'enabled';
        /** Whether comments are enabled */
        comments?: 'disabled' | 'members' | 'observers' | 'org' | 'public';
        /** Whether invitations are restricted */
        invitations?: 'admins' | 'members';
        /** Whether self-join is enabled */
        selfJoin?: boolean;
        /** Whether card covers are enabled */
        cardCovers?: boolean;
        /** Background color or image */
        background?: string;
        /** Card aging style */
        cardAging?: 'regular' | 'pirate';
    };
    /** Label names */
    labelNames?: {
        green?: string;
        yellow?: string;
        orange?: string;
        red?: string;
        purple?: string;
        blue?: string;
        sky?: string;
        lime?: string;
        pink?: string;
        black?: string;
    };
}

/**
 * Represents a Trello list
 */
export interface TrelloList {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** Whether the list is closed (archived) */
    closed: boolean;
    /** ID of the board the list belongs to */
    idBoard: string;
    /** Position of the list on the board */
    pos: number;
    /** Whether the list is subscribed to */
    subscribed?: boolean;
    /** Soft limit for the list */
    softLimit?: number;
}

/**
 * Represents a Trello card
 */
export interface TrelloCard {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** Detailed description */
    desc?: string;
    /** Whether the card is closed (archived) */
    closed: boolean;
    /** ID of the board the card belongs to */
    idBoard: string;
    /** ID of the list the card belongs to */
    idList: string;
    /** Position of the card in the list */
    pos: number;
    /** Due date of the card */
    due?: string | null;
    /** Start date of the card */
    start?: string | null;
    /** Whether the due date is complete */
    dueComplete?: boolean;
    /** URL of the card */
    url: string;
    /** Short URL of the card */
    shortUrl: string;
    /** Short ID of the card */
    idShort: number;
    /** IDs of the members assigned to the card */
    idMembers?: string[];
    /** IDs of the labels attached to the card */
    idLabels?: string[];
    /** ID of the attachment cover */
    idAttachmentCover?: string | null;
    /** Whether the card is subscribed to */
    subscribed?: boolean;
    /** Card badges */
    badges?: {
        /** Number of votes */
        votes: number;
        /** Whether the viewing member voted */
        viewingMemberVoted: boolean;
        /** Whether the card is subscribed to */
        subscribed: boolean;
        /** Due date */
        due?: string | null;
        /** Whether the due date is complete */
        dueComplete: boolean;
        /** Number of comments */
        comments: number;
        /** Number of attachments */
        attachments: number;
        /** Number of checkitems */
        checkItems: number;
        /** Number of checkitems checked */
        checkItemsChecked: number;
        /** Whether the card has a description */
        description: boolean;
    };
    /** Card labels */
    labels?: TrelloLabel[];
}

/**
 * Represents a Trello label
 */
export interface TrelloLabel {
    /** Unique identifier */
    id: string;
    /** ID of the board the label belongs to */
    idBoard: string;
    /** Display name */
    name?: string;
    /** Color of the label */
    color?: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black' | null;
}

/**
 * Represents a Trello member
 */
export interface TrelloMember {
    /** Unique identifier */
    id: string;
    /** Username */
    username: string;
    /** Full name */
    fullName: string;
    /** Initials */
    initials: string;
    /** Avatar hash */
    avatarHash?: string;
    /** Avatar URL */
    avatarUrl?: string;
    /** Bio */
    bio?: string;
    /** URL of the member */
    url: string;
}

/**
 * Represents a Trello checklist
 */
export interface TrelloChecklist {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** ID of the board the checklist belongs to */
    idBoard: string;
    /** ID of the card the checklist belongs to */
    idCard: string;
    /** Position of the checklist on the card */
    pos: number;
    /** Checklist items */
    checkItems?: TrelloCheckItem[];
}

/**
 * Represents a Trello checklist item
 */
export interface TrelloCheckItem {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** ID of the checklist the item belongs to */
    idChecklist: string;
    /** Position of the item in the checklist */
    pos: number;
    /** State of the item */
    state: 'complete' | 'incomplete';
    /** Due date of the item */
    due?: string | null;
    /** ID of the member assigned to the item */
    idMember?: string | null;
}

/**
 * Represents a Trello attachment
 */
export interface TrelloAttachment {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** URL of the attachment */
    url: string;
    /** MIME type of the attachment */
    mimeType?: string;
    /** Whether the attachment was uploaded */
    isUpload: boolean;
    /** Date the attachment was added */
    date: string;
    /** ID of the member who added the attachment */
    idMember: string;
    /** Bytes of the attachment */
    bytes?: number | null;
    /** Position of the attachment */
    pos: number;
}

/**
 * Data required to create a new board
 */
export interface CreateBoardData {
    /** Display name (required) */
    name: string;
    /** Detailed description (optional) */
    desc?: string;
    /** ID of the organization (optional) */
    idOrganization?: string;
    /** Whether to use default labels (optional) */
    defaultLabels?: boolean;
    /** Whether to use default lists (optional) */
    defaultLists?: boolean;
    /** Source board ID to copy from (optional) */
    idBoardSource?: string;
    /** What to keep from source board (optional) */
    keepFromSource?: 'none' | 'cards';
    /** Power-ups to enable (optional) */
    powerUps?: 'all' | 'calendar' | 'cardAging' | 'recap' | 'voting';
    /** Permission level (optional) */
    prefs_permissionLevel?: 'private' | 'org' | 'public';
    /** Voting preference (optional) */
    prefs_voting?: 'disabled' | 'members' | 'observers' | 'org' | 'public';
    /** Comments preference (optional) */
    prefs_comments?: 'disabled' | 'members' | 'observers' | 'org' | 'public';
    /** Invitations preference (optional) */
    prefs_invitations?: 'members' | 'admins';
    /** Self-join preference (optional) */
    prefs_selfJoin?: boolean;
    /** Card covers preference (optional) */
    prefs_cardCovers?: boolean;
    /** Background preference (optional) */
    prefs_background?: string;
    /** Card aging preference (optional) */
    prefs_cardAging?: 'regular' | 'pirate';
}

/**
 * Data required to create a new list
 */
export interface CreateListData {
    /** Display name (required) */
    name: string;
    /** ID of the board (required) */
    idBoard: string;
    /** Position of the list (optional) */
    pos?: number | 'top' | 'bottom';
}

/**
 * Data required to create a new card
 */
export interface CreateCardData {
    /** Display name (required) */
    name: string;
    /** ID of the list (required) */
    idList: string;
    /** Detailed description (optional) */
    desc?: string;
    /** Position of the card (optional) */
    pos?: number | 'top' | 'bottom';
    /** Due date (optional) */
    due?: string | null;
    /** Start date (optional) */
    start?: string | null;
    /** Whether the due date is complete (optional) */
    dueComplete?: boolean;
    /** IDs of the members (optional) */
    idMembers?: string[];
    /** IDs of the labels (optional) */
    idLabels?: string[];
    /** URL source for attachment (optional) */
    urlSource?: string;
    /** ID of the card to copy from (optional) */
    idCardSource?: string;
    /** What to keep from source card (optional) */
    keepFromSource?: 'all' | 'attachments' | 'checklists' | 'comments' | 'due' | 'labels' | 'members' | 'stickers';
    /** Address for card (optional) */
    address?: string;
    /** Location name for card (optional) */
    locationName?: string;
    /** Coordinates for card (optional) */
    coordinates?: string;
}

/**
 * Data for updating a board
 */
export interface UpdateBoardData {
    /** Updated display name */
    name?: string;
    /** Updated description */
    desc?: string;
    /** Whether the board is closed */
    closed?: boolean;
    /** Whether the board is subscribed to */
    subscribed?: boolean;
    /** ID of the organization */
    idOrganization?: string;
    /** Permission level preference */
    prefs_permissionLevel?: 'private' | 'org' | 'public';
    /** Self-join preference */
    prefs_selfJoin?: boolean;
    /** Card covers preference */
    prefs_cardCovers?: boolean;
    /** Hide votes preference */
    prefs_hideVotes?: boolean;
    /** Invitations preference */
    prefs_invitations?: 'members' | 'admins';
    /** Voting preference */
    prefs_voting?: 'disabled' | 'members' | 'observers' | 'org' | 'public';
    /** Comments preference */
    prefs_comments?: 'disabled' | 'members' | 'observers' | 'org' | 'public';
    /** Background preference */
    prefs_background?: string;
    /** Card aging preference */
    prefs_cardAging?: 'regular' | 'pirate';
    /** Calendar feed enabled preference */
    prefs_calendarFeedEnabled?: boolean;
    /** Label names */
    labelNames_green?: string;
    labelNames_yellow?: string;
    labelNames_orange?: string;
    labelNames_red?: string;
    labelNames_purple?: string;
    labelNames_blue?: string;
}

/**
 * Data for updating a list
 */
export interface UpdateListData {
    /** Updated display name */
    name?: string;
    /** Whether the list is closed */
    closed?: boolean;
    /** ID of the board */
    idBoard?: string;
    /** Position of the list */
    pos?: number | 'top' | 'bottom';
    /** Whether the list is subscribed to */
    subscribed?: boolean;
}

/**
 * Data for updating a card
 */
export interface UpdateCardData {
    /** Updated display name */
    name?: string;
    /** Updated description */
    desc?: string;
    /** Whether the card is closed */
    closed?: boolean;
    /** IDs of the members */
    idMembers?: string[];
    /** ID of the attachment cover */
    idAttachmentCover?: string | null;
    /** ID of the list */
    idList?: string;
    /** IDs of the labels */
    idLabels?: string[];
    /** ID of the board */
    idBoard?: string;
    /** Position of the card */
    pos?: number | 'top' | 'bottom';
    /** Due date */
    due?: string | null;
    /** Start date */
    start?: string | null;
    /** Whether the due date is complete */
    dueComplete?: boolean;
    /** Whether the card is subscribed to */
    subscribed?: boolean;
    /** Address for card */
    address?: string;
    /** Location name for card */
    locationName?: string;
    /** Coordinates for card */
    coordinates?: string;
    /** Cover for card */
    cover?: {
        color?: 'pink' | 'yellow' | 'lime' | 'blue' | 'black' | 'orange' | 'red' | 'purple' | 'sky' | 'green';
        brightness?: 'dark' | 'light';
        url?: string;
        idAttachment?: string;
        size?: 'normal' | 'full';
    };
}

/**
 * Filter options for listing boards
 */
export interface BoardFilters {
    /** Filter by member */
    filter?: 'all' | 'closed' | 'members' | 'open' | 'organization' | 'public' | 'starred' | 'unpinned';
    /** Fields to include */
    fields?: string[];
}

/**
 * Filter options for listing lists
 */
export interface ListFilters {
    /** Filter by status */
    filter?: 'all' | 'closed' | 'none' | 'open';
    /** Fields to include */
    fields?: string[];
}

/**
 * Filter options for listing cards
 */
export interface CardFilters {
    /** Filter by status */
    filter?: 'all' | 'closed' | 'none' | 'open' | 'visible';
    /** Fields to include */
    fields?: string[];
}
