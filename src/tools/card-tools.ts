/**
 * Card Tools
 * 
 * Defines the tools for interacting with Trello cards.
 * Each tool includes a name, description, and input schema.
 */

/**
 * Defines the tools related to Trello cards
 * Each tool has a name, description, and input schema following JSON Schema format
 */
export const cardTools = [
    {
        name: "get_card",
        description: "Retrieve detailed information about a specific card by ID. Use this when you need comprehensive details about a particular card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to retrieve"
                },
                fields: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific fields to include in the response (default: all fields)"
                }
            },
            required: ["cardId"]
        }
    },
    {
        name: "create_card",
        description: "Create a new card on a list. Use this tool when you need to add a new card to a list.",
        inputSchema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Name of the card"
                },
                idList: {
                    type: "string",
                    description: "ID of the list the card should belong to"
                },
                desc: {
                    type: "string",
                    description: "Description of the card"
                },
                pos: {
                    type: ["string", "number"],
                    description: "Position of the card (top, bottom, or a positive number)"
                },
                due: {
                    type: ["string", "null"],
                    description: "Due date for the card (ISO-8601 format, e.g., 2023-12-31T12:00:00Z)"
                },
                start: {
                    type: ["string", "null"],
                    description: "Start date for the card (ISO-8601 format, e.g., 2023-12-31T12:00:00Z)"
                },
                dueComplete: {
                    type: "boolean",
                    description: "Whether the due date is complete"
                },
                idMembers: {
                    type: "array",
                    items: { type: "string" },
                    description: "IDs of members to assign to the card"
                },
                idLabels: {
                    type: "array",
                    items: { type: "string" },
                    description: "IDs of labels to add to the card"
                },
                urlSource: {
                    type: "string",
                    description: "URL to attach to the card"
                },
                idCardSource: {
                    type: "string",
                    description: "ID of a card to copy from"
                },
                keepFromSource: {
                    type: "string",
                    description: "What to copy from the source card (all or a comma-separated list of: attachments, checklists, comments, due, labels, members, stickers)"
                },
                address: {
                    type: "string",
                    description: "Address for the card"
                },
                locationName: {
                    type: "string",
                    description: "Location name for the card"
                },
                coordinates: {
                    type: "string",
                    description: "Coordinates for the card (latitude,longitude)"
                }
            },
            required: ["name", "idList"]
        }
    },
    {
        name: "update_card",
        description: "Update an existing card with new properties. Use this tool to modify card details, move it to a different list, or change other attributes.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to update"
                },
                name: {
                    type: "string",
                    description: "New name for the card"
                },
                desc: {
                    type: "string",
                    description: "New description for the card"
                },
                closed: {
                    type: "boolean",
                    description: "Whether the card is closed (archived)"
                },
                idMembers: {
                    type: "array",
                    items: { type: "string" },
                    description: "IDs of members to assign to the card (replaces existing members)"
                },
                idAttachmentCover: {
                    type: ["string", "null"],
                    description: "ID of the attachment to use as cover, or null for none"
                },
                idList: {
                    type: "string",
                    description: "ID of the list the card should belong to"
                },
                idLabels: {
                    type: "array",
                    items: { type: "string" },
                    description: "IDs of labels to add to the card (replaces existing labels)"
                },
                idBoard: {
                    type: "string",
                    description: "ID of the board the card should belong to"
                },
                pos: {
                    type: ["string", "number"],
                    description: "Position of the card (top, bottom, or a positive number)"
                },
                due: {
                    type: ["string", "null"],
                    description: "Due date for the card (ISO-8601 format, e.g., 2023-12-31T12:00:00Z), or null to remove"
                },
                start: {
                    type: ["string", "null"],
                    description: "Start date for the card (ISO-8601 format, e.g., 2023-12-31T12:00:00Z), or null to remove"
                },
                dueComplete: {
                    type: "boolean",
                    description: "Whether the due date is complete"
                },
                subscribed: {
                    type: "boolean",
                    description: "Whether the authenticated user is subscribed to the card"
                },
                address: {
                    type: "string",
                    description: "Address for the card"
                },
                locationName: {
                    type: "string",
                    description: "Location name for the card"
                },
                coordinates: {
                    type: "string",
                    description: "Coordinates for the card (latitude,longitude)"
                },
                cover: {
                    type: "object",
                    properties: {
                        color: {
                            type: "string",
                            enum: ["pink", "yellow", "lime", "blue", "black", "orange", "red", "purple", "sky", "green"],
                            description: "Color for the cover"
                        },
                        brightness: {
                            type: "string",
                            enum: ["dark", "light"],
                            description: "Brightness of the cover"
                        },
                        url: {
                            type: "string",
                            description: "URL for the cover image"
                        },
                        idAttachment: {
                            type: "string",
                            description: "ID of the attachment to use as cover"
                        },
                        size: {
                            type: "string",
                            enum: ["normal", "full"],
                            description: "Size of the cover"
                        }
                    },
                    description: "Cover settings for the card"
                }
            },
            required: ["cardId"]
        }
    },
    {
        name: "delete_card",
        description: "Permanently delete a card. Use this tool with caution as deletion cannot be undone.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to delete"
                },
                confirm: {
                    type: "boolean",
                    description: "Confirmation flag to prevent accidental deletion"
                }
            },
            required: ["cardId", "confirm"]
        }
    },
    {
        name: "archive_card",
        description: "Archive a card. Use this tool to archive a card without deleting it.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to archive"
                }
            },
            required: ["cardId"]
        }
    },
    {
        name: "unarchive_card",
        description: "Unarchive a card. Use this tool to restore a previously archived card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to unarchive"
                }
            },
            required: ["cardId"]
        }
    },
    {
        name: "move_card_to_list",
        description: "Move a card to a different list. Use this tool to change the status of a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to move"
                },
                listId: {
                    type: "string",
                    description: "ID of the destination list"
                }
            },
            required: ["cardId", "listId"]
        }
    },
    {
        name: "add_comment",
        description: "Add a comment to a card. Use this tool to add notes or feedback to a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                text: {
                    type: "string",
                    description: "Text of the comment"
                }
            },
            required: ["cardId", "text"]
        }
    },
    {
        name: "get_comments",
        description: "Get all comments on a card. Use this tool to see the discussion on a card.",
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
    },
    {
        name: "add_attachment",
        description: "Add an attachment to a card. Use this tool to attach a URL to a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                url: {
                    type: "string",
                    description: "URL to attach"
                },
                name: {
                    type: "string",
                    description: "Name for the attachment"
                }
            },
            required: ["cardId", "url"]
        }
    },
    {
        name: "get_attachments",
        description: "Get all attachments on a card. Use this tool to see the files and links attached to a card.",
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
    },
    {
        name: "delete_attachment",
        description: "Delete an attachment from a card. Use this tool to remove a file or link from a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                attachmentId: {
                    type: "string",
                    description: "ID of the attachment to delete"
                }
            },
            required: ["cardId", "attachmentId"]
        }
    },
    {
        name: "add_member",
        description: "Add a member to a card. Use this tool to assign someone to a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                memberId: {
                    type: "string",
                    description: "ID of the member to add"
                }
            },
            required: ["cardId", "memberId"]
        }
    },
    {
        name: "remove_member",
        description: "Remove a member from a card. Use this tool to unassign someone from a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                memberId: {
                    type: "string",
                    description: "ID of the member to remove"
                }
            },
            required: ["cardId", "memberId"]
        }
    },
    {
        name: "add_label",
        description: "Add a label to a card. Use this tool to categorize a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                labelId: {
                    type: "string",
                    description: "ID of the label to add"
                }
            },
            required: ["cardId", "labelId"]
        }
    },
    {
        name: "remove_label",
        description: "Remove a label from a card. Use this tool to update the categorization of a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                labelId: {
                    type: "string",
                    description: "ID of the label to remove"
                }
            },
            required: ["cardId", "labelId"]
        }
    },
    {
        name: "set_due_date",
        description: "Set the due date for a card. Use this tool to add or update a deadline for a card.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                due: {
                    type: ["string", "null"],
                    description: "Due date (ISO-8601 format, e.g., 2023-12-31T12:00:00Z), or null to remove"
                }
            },
            required: ["cardId", "due"]
        }
    },
    {
        name: "set_due_complete",
        description: "Mark a card's due date as complete or incomplete. Use this tool to update the status of a deadline.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                dueComplete: {
                    type: "boolean",
                    description: "Whether the due date is complete"
                }
            },
            required: ["cardId", "dueComplete"]
        }
    }
];
