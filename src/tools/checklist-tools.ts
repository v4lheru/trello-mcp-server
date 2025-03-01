/**
 * Checklist Tools
 * 
 * Defines the tools for interacting with Trello checklists.
 * Each tool includes a name, description, and input schema.
 */

/**
 * Defines the tools related to Trello checklists
 * Each tool has a name, description, and input schema following JSON Schema format
 */
export const checklistTools = [
    {
        name: "get_checklist",
        description: "Retrieve detailed information about a specific checklist by ID. Use this when you need comprehensive details about a particular checklist.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist to retrieve"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "create_checklist",
        description: "Create a new checklist on a card. Use this tool when you need to add a new checklist to a card for tracking subtasks.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                name: {
                    type: "string",
                    description: "Name of the checklist"
                },
                pos: {
                    type: ["string", "number"],
                    description: "Position of the checklist (top, bottom, or a positive number)"
                },
                idChecklistSource: {
                    type: "string",
                    description: "ID of a checklist to copy from"
                }
            },
            required: ["cardId", "name"]
        }
    },
    {
        name: "update_checklist",
        description: "Update an existing checklist with new properties. Use this tool to modify a checklist's name or position.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist to update"
                },
                name: {
                    type: "string",
                    description: "New name for the checklist"
                },
                pos: {
                    type: ["string", "number"],
                    description: "New position for the checklist (top, bottom, or a positive number)"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "delete_checklist",
        description: "Delete a checklist. Use this tool to remove a checklist from a card.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist to delete"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "get_checkitems",
        description: "Get all checkitems on a checklist. Use this tool to see the items in a checklist.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "create_checkitem",
        description: "Create a new checkitem on a checklist. Use this tool to add a new item to a checklist.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                },
                name: {
                    type: "string",
                    description: "Name of the checkitem"
                },
                pos: {
                    type: ["string", "number"],
                    description: "Position of the checkitem (top, bottom, or a positive number)"
                },
                checked: {
                    type: "boolean",
                    description: "Whether the checkitem is checked"
                },
                due: {
                    type: "string",
                    description: "Due date for the checkitem (ISO-8601 format, e.g., 2023-12-31T12:00:00Z)"
                },
                memberId: {
                    type: "string",
                    description: "ID of the member assigned to the checkitem"
                }
            },
            required: ["checklistId", "name"]
        }
    },
    {
        name: "get_checkitem",
        description: "Get a specific checkitem on a checklist. Use this tool to get details about a particular checkitem.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                },
                checkItemId: {
                    type: "string",
                    description: "ID of the checkitem"
                }
            },
            required: ["checklistId", "checkItemId"]
        }
    },
    {
        name: "update_checkitem",
        description: "Update a checkitem on a checklist. Use this tool to modify a checkitem's name, state, position, due date, or assigned member.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                },
                checkItemId: {
                    type: "string",
                    description: "ID of the checkitem"
                },
                name: {
                    type: "string",
                    description: "New name for the checkitem"
                },
                state: {
                    type: "string",
                    enum: ["complete", "incomplete"],
                    description: "New state for the checkitem"
                },
                pos: {
                    type: ["string", "number"],
                    description: "New position for the checkitem (top, bottom, or a positive number)"
                },
                due: {
                    type: ["string", "null"],
                    description: "New due date for the checkitem (ISO-8601 format, e.g., 2023-12-31T12:00:00Z), or null to remove"
                },
                idMember: {
                    type: ["string", "null"],
                    description: "ID of the member to assign to the checkitem, or null to remove"
                }
            },
            required: ["checklistId", "checkItemId"]
        }
    },
    {
        name: "delete_checkitem",
        description: "Delete a checkitem from a checklist. Use this tool to remove an item from a checklist.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                },
                checkItemId: {
                    type: "string",
                    description: "ID of the checkitem to delete"
                }
            },
            required: ["checklistId", "checkItemId"]
        }
    },
    {
        name: "update_checklist_name",
        description: "Update the name of a checklist. Use this tool to rename a checklist.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                },
                name: {
                    type: "string",
                    description: "New name for the checklist"
                }
            },
            required: ["checklistId", "name"]
        }
    },
    {
        name: "update_checklist_position",
        description: "Update the position of a checklist on a card. Use this tool to reorder checklists on a card.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                },
                position: {
                    type: ["string", "number"],
                    description: "New position for the checklist (top, bottom, or a positive number)"
                }
            },
            required: ["checklistId", "position"]
        }
    },
    {
        name: "get_checklist_board",
        description: "Get the board a checklist is on. Use this tool to find out which board a checklist belongs to.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "get_checklist_card",
        description: "Get the card a checklist is on. Use this tool to find out which card a checklist belongs to.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "update_checkitem_state_on_card",
        description: "Update a checkitem's state on a card. Use this tool to mark a checkitem as complete or incomplete.",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card"
                },
                checkItemId: {
                    type: "string",
                    description: "ID of the checkitem"
                },
                state: {
                    type: "string",
                    enum: ["complete", "incomplete"],
                    description: "New state for the checkitem"
                }
            },
            required: ["cardId", "checkItemId", "state"]
        }
    }
];
