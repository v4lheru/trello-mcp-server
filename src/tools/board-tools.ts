/**
 * Board Tools
 * 
 * Defines the tools for interacting with Trello boards.
 * Each tool includes a name, description, and input schema.
 */

/**
 * Defines the tools related to Trello boards
 * Each tool has a name, description, and input schema following JSON Schema format
 */
export const boardTools = [
    {
        name: "get_boards",
        description: "Retrieve a list of boards for the authenticated user. Use this tool to get an overview of available boards or to search for specific ones using filters.",
        inputSchema: {
            type: "object",
            properties: {
                filter: {
                    type: "string",
                    enum: ["all", "closed", "members", "open", "organization", "public", "starred", "unpinned"],
                    description: "Filter boards by status or membership"
                },
                fields: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            }
        }
    },
    {
        name: "get_board",
        description: "Retrieve detailed information about a specific board by ID. Use this when you need comprehensive details about a particular board.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to retrieve"
                },
                fields: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            },
            required: ["boardId"]
        }
    },
    {
        name: "create_board",
        description: "Create a new board with the specified properties. Use this tool when you need to add a new board to Trello.",
        inputSchema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Name of the board"
                },
                desc: {
                    type: "string",
                    description: "Description of the board"
                },
                idOrganization: {
                    type: "string",
                    description: "ID of the organization the board should belong to"
                },
                defaultLabels: {
                    type: "boolean",
                    description: "Whether to use the default set of labels (default: true)"
                },
                defaultLists: {
                    type: "boolean",
                    description: "Whether to add the default set of lists (To Do, Doing, Done) (default: true)"
                },
                idBoardSource: {
                    type: "string",
                    description: "ID of a board to copy into the new board"
                },
                keepFromSource: {
                    type: "string",
                    enum: ["none", "cards"],
                    description: "What to copy from the source board (default: none)"
                },
                powerUps: {
                    type: "string",
                    enum: ["all", "calendar", "cardAging", "recap", "voting"],
                    description: "Power-ups to enable on the board"
                },
                prefs_permissionLevel: {
                    type: "string",
                    enum: ["private", "org", "public"],
                    description: "Permission level of the board (default: private)"
                },
                prefs_voting: {
                    type: "string",
                    enum: ["disabled", "members", "observers", "org", "public"],
                    description: "Who can vote on this board (default: disabled)"
                },
                prefs_comments: {
                    type: "string",
                    enum: ["disabled", "members", "observers", "org", "public"],
                    description: "Who can comment on cards (default: members)"
                },
                prefs_invitations: {
                    type: "string",
                    enum: ["members", "admins"],
                    description: "Who can invite people to the board (default: members)"
                },
                prefs_selfJoin: {
                    type: "boolean",
                    description: "Whether organization members can join the board themselves (default: true)"
                },
                prefs_cardCovers: {
                    type: "boolean",
                    description: "Whether to show card cover images (default: true)"
                },
                prefs_background: {
                    type: "string",
                    description: "Background color or image (default: blue)"
                },
                prefs_cardAging: {
                    type: "string",
                    enum: ["regular", "pirate"],
                    description: "Card aging style (default: regular)"
                }
            },
            required: ["name"]
        }
    },
    {
        name: "update_board",
        description: "Update an existing board with new properties. Use this tool to modify board details, preferences, or settings.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to update"
                },
                name: {
                    type: "string",
                    description: "New name for the board"
                },
                desc: {
                    type: "string",
                    description: "New description for the board"
                },
                closed: {
                    type: "boolean",
                    description: "Whether the board is closed (archived)"
                },
                subscribed: {
                    type: "boolean",
                    description: "Whether the authenticated user is subscribed to the board"
                },
                idOrganization: {
                    type: "string",
                    description: "ID of the organization the board should belong to"
                },
                prefs_permissionLevel: {
                    type: "string",
                    enum: ["private", "org", "public"],
                    description: "Permission level of the board"
                },
                prefs_selfJoin: {
                    type: "boolean",
                    description: "Whether organization members can join the board themselves"
                },
                prefs_cardCovers: {
                    type: "boolean",
                    description: "Whether to show card cover images"
                },
                prefs_hideVotes: {
                    type: "boolean",
                    description: "Whether to hide votes"
                },
                prefs_invitations: {
                    type: "string",
                    enum: ["members", "admins"],
                    description: "Who can invite people to the board"
                },
                prefs_voting: {
                    type: "string",
                    enum: ["disabled", "members", "observers", "org", "public"],
                    description: "Who can vote on this board"
                },
                prefs_comments: {
                    type: "string",
                    enum: ["disabled", "members", "observers", "org", "public"],
                    description: "Who can comment on cards"
                },
                prefs_background: {
                    type: "string",
                    description: "Background color or image"
                },
                prefs_cardAging: {
                    type: "string",
                    enum: ["regular", "pirate"],
                    description: "Card aging style"
                },
                labelNames_green: {
                    type: "string",
                    description: "Name for the green label"
                },
                labelNames_yellow: {
                    type: "string",
                    description: "Name for the yellow label"
                },
                labelNames_orange: {
                    type: "string",
                    description: "Name for the orange label"
                },
                labelNames_red: {
                    type: "string",
                    description: "Name for the red label"
                },
                labelNames_purple: {
                    type: "string",
                    description: "Name for the purple label"
                },
                labelNames_blue: {
                    type: "string",
                    description: "Name for the blue label"
                }
            },
            required: ["boardId"]
        }
    },
    {
        name: "delete_board",
        description: "Permanently delete a board. Use this tool with caution as deletion cannot be undone.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to delete"
                },
                confirm: {
                    type: "boolean",
                    description: "Confirmation flag to prevent accidental deletion"
                }
            },
            required: ["boardId", "confirm"]
        }
    },
    {
        name: "get_board_lists",
        description: "Get all lists on a board. Use this tool to see the structure of a board and its lists.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board"
                },
                filter: {
                    type: "string",
                    enum: ["all", "closed", "none", "open"],
                    description: "Filter lists by status (default: open)"
                }
            },
            required: ["boardId"]
        }
    },
    {
        name: "get_board_members",
        description: "Get all members of a board. Use this tool to see who has access to a board.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board"
                }
            },
            required: ["boardId"]
        }
    },
    {
        name: "get_board_labels",
        description: "Get all labels on a board. Use this tool to see the available labels on a board.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board"
                }
            },
            required: ["boardId"]
        }
    },
    {
        name: "close_board",
        description: "Close (archive) a board. Use this tool to archive a board without deleting it.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to close"
                }
            },
            required: ["boardId"]
        }
    },
    {
        name: "reopen_board",
        description: "Reopen a closed board. Use this tool to unarchive a previously archived board.",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to reopen"
                }
            },
            required: ["boardId"]
        }
    }
];
