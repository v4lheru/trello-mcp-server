/**
 * Member Tools
 * 
 * Defines the tools for interacting with Trello members.
 * Each tool includes a name, description, and input schema.
 */

/**
 * Defines the tools related to Trello members
 * Each tool has a name, description, and input schema following JSON Schema format
 */
export const memberTools = [
    {
        name: "get_me",
        description: "Retrieve information about the authenticated member (current user). Use this to get details about your own account.",
        inputSchema: {
            type: "object",
            properties: {
                fields: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            }
        }
    },
    {
        name: "get_member",
        description: "Retrieve information about a specific member by ID or username. Use this to get details about another Trello user.",
        inputSchema: {
            type: "object",
            properties: {
                memberIdOrUsername: {
                    type: "string",
                    description: "ID or username of the member to retrieve"
                },
                fields: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            },
            required: ["memberIdOrUsername"]
        }
    },
    {
        name: "get_member_boards",
        description: "Get boards that a member belongs to. Use this to see what boards a member has access to.",
        inputSchema: {
            type: "object",
            properties: {
                memberIdOrUsername: {
                    type: "string",
                    description: "ID or username of the member"
                },
                filter: {
                    type: "string",
                    enum: ["all", "closed", "members", "open", "organization", "public", "starred"],
                    description: "Filter boards by status or membership (default: all)"
                }
            },
            required: ["memberIdOrUsername"]
        }
    },
    {
        name: "get_member_cards",
        description: "Get cards assigned to a member. Use this to see what tasks a member is responsible for.",
        inputSchema: {
            type: "object",
            properties: {
                memberIdOrUsername: {
                    type: "string",
                    description: "ID or username of the member"
                }
            },
            required: ["memberIdOrUsername"]
        }
    },
    {
        name: "get_boards_invited",
        description: "Get boards that a member has been invited to. Use this to see pending board invitations.",
        inputSchema: {
            type: "object",
            properties: {
                memberIdOrUsername: {
                    type: "string",
                    description: "ID or username of the member"
                }
            },
            required: ["memberIdOrUsername"]
        }
    },
    {
        name: "get_member_organizations",
        description: "Get organizations that a member belongs to. Use this to see what workspaces a member is part of.",
        inputSchema: {
            type: "object",
            properties: {
                memberIdOrUsername: {
                    type: "string",
                    description: "ID or username of the member"
                }
            },
            required: ["memberIdOrUsername"]
        }
    },
    {
        name: "get_notifications",
        description: "Get notifications for the authenticated member. Use this to see recent activity and updates.",
        inputSchema: {
            type: "object",
            properties: {
                filter: {
                    type: "string",
                    description: "Filter for notification types (comma-separated list)"
                },
                readFilter: {
                    type: "string",
                    enum: ["all", "read", "unread"],
                    description: "Filter by read status (default: all)"
                },
                limit: {
                    type: "integer",
                    minimum: 1,
                    maximum: 1000,
                    description: "Maximum number of notifications to return (max 1000, default: 50)"
                }
            }
        }
    },
    {
        name: "update_me",
        description: "Update the authenticated member's information. Use this to modify your own profile details.",
        inputSchema: {
            type: "object",
            properties: {
                fullName: {
                    type: "string",
                    description: "New full name for the member"
                },
                initials: {
                    type: "string",
                    description: "New initials for the member"
                },
                username: {
                    type: "string",
                    description: "New username for the member"
                },
                bio: {
                    type: "string",
                    description: "New bio for the member"
                },
                avatarSource: {
                    type: "string",
                    enum: ["gravatar", "upload", "none"],
                    description: "Avatar source for the member"
                },
                prefs: {
                    type: "object",
                    properties: {
                        colorBlind: {
                            type: "boolean",
                            description: "Whether the member is color blind"
                        },
                        locale: {
                            type: "string",
                            description: "Locale for the member"
                        },
                        minutesBetweenSummaries: {
                            type: "integer",
                            description: "Minutes between email summaries"
                        }
                    },
                    description: "Member preferences"
                }
            }
        }
    },
    {
        name: "get_avatar",
        description: "Get the authenticated member's avatar. Use this to retrieve the profile picture URL.",
        inputSchema: {
            type: "object",
            properties: {
                size: {
                    type: ["string", "integer"],
                    enum: [30, 50, 170, "original"],
                    description: "Size of the avatar (30, 50, 170, or original) (default: original)"
                }
            }
        }
    },
    {
        name: "search_members",
        description: "Search for members by name. Use this to find Trello users by their name or username.",
        inputSchema: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search query"
                },
                limit: {
                    type: "integer",
                    minimum: 1,
                    maximum: 20,
                    description: "Maximum number of results to return (max 20, default: 8)"
                }
            },
            required: ["query"]
        }
    },
    {
        name: "get_board_members",
        description: "Get members of a board. Use this to see who has access to a board.",
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
        name: "get_organization_members",
        description: "Get members of an organization. Use this to see who belongs to a workspace.",
        inputSchema: {
            type: "object",
            properties: {
                organizationId: {
                    type: "string",
                    description: "ID of the organization"
                }
            },
            required: ["organizationId"]
        }
    },
    {
        name: "get_card_members",
        description: "Get members assigned to a card. Use this to see who is responsible for a task.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                }
            },
            required: ["cardId"]
        }
    }
];
