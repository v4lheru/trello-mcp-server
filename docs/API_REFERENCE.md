# Trello MCP Server API Reference

## Table of Contents
- [Overview](#overview)
- [Board Tools](#board-tools)
- [Card Tools](#card-tools)
- [List Tools](#list-tools)
- [Member Tools](#member-tools)
- [Label Tools](#label-tools)
- [Checklist Tools](#checklist-tools)
- [Common Parameters](#common-parameters)
- [Response Formats](#response-formats)
- [Error Handling](#error-handling)

## Overview

The Trello MCP Server provides 80+ tools for comprehensive Trello management. Each tool follows consistent naming conventions and parameter patterns for ease of use.

### Tool Naming Convention
- `get_*` - Retrieve resources
- `create_*` - Create new resources
- `update_*` - Modify existing resources
- `delete_*` - Remove resources
- `add_*` - Add relationships
- `remove_*` - Remove relationships
- `move_*` - Move resources between containers

### Optimization Parameters
Most read operations support optimization parameters:
- `detailLevel`: One of `minimal`, `standard`, `detailed`, `full` - Controls which fields are included in the response
- `fields`: Array of specific fields to include (overrides detailLevel)
- `maxItems`: Maximum number of items to return for list operations
- `summarize`: Boolean (true/false) - For list operations only, returns summary statistics with limited items

**Important Notes on `summarize`:**
- When `summarize: true`, only the first 5 items are returned by default along with summary statistics
- Use `maxItems` with `summarize: true` to override the default 5-item limit
- Example: `{ summarize: true, maxItems: 20 }` returns 20 items with summary
- Without `summarize`, all items are returned unless limited by `maxItems`

## Board Tools

### get_boards
Retrieve a list of boards for the authenticated user.

**Parameters:**
- `filter` (optional): `all`, `closed`, `members`, `open`, `organization`, `public`, `starred`, `unpinned`
- `fields` (optional): Array of field names
- `detailLevel` (optional): Response detail level
- `maxItems` (optional): Maximum number of boards to return
- `summarize` (optional): Return summary with limited items (default: false)

**Examples:**
```json
// Basic usage
{
  "filter": "open",
  "detailLevel": "minimal"
}

// With summarize (returns 5 boards by default)
{
  "filter": "open",
  "summarize": true
}

// With summarize and custom limit
{
  "filter": "open",
  "summarize": true,
  "maxItems": 10
}
```

**Response:** Array of board objects (or summary object if summarize is true)

### get_board
Retrieve detailed information about a specific board.

**Parameters:**
- `boardId` (required): ID of the board
- `fields` (optional): Array of field names
- `optimizationLevel` (optional): Response detail level

### create_board
Create a new board.

**Parameters:**
- `name` (required): Board name
- `desc` (optional): Board description
- `idOrganization` (optional): Organization ID
- `idBoardSource` (optional): Board to copy from
- `prefs_permissionLevel` (optional): `private`, `org`, `public`
- `prefs_background` (optional): Background color/image
- Additional preference parameters...

### update_board
Update an existing board.

**Parameters:**
- `boardId` (required): ID of the board
- `name` (optional): New name
- `desc` (optional): New description
- `closed` (optional): Archive status
- Various preference parameters...

### delete_board
Permanently delete a board.

**Parameters:**
- `boardId` (required): ID of the board
- `confirm` (required): Boolean confirmation

### close_board / reopen_board
Archive or unarchive a board.

**Parameters:**
- `boardId` (required): ID of the board

### Board Relationship Tools
- `get_board_lists`: Get all lists on a board
- `get_board_members`: Get board members
- `get_board_labels`: Get board labels

## Card Tools

### get_card
Retrieve detailed card information.

**Parameters:**
- `cardId` (required): ID of the card
- `fields` (optional): Array of field names
- `optimizationLevel` (optional): Response detail level

### create_card
Create a new card.

**Parameters:**
- `name` (required): Card title
- `idList` (required): List ID
- `desc` (optional): Card description
- `due` (optional): Due date (ISO-8601)
- `dueComplete` (optional): Due date completion status
- `idMembers` (optional): Array of member IDs
- `idLabels` (optional): Array of label IDs
- `pos` (optional): Position (`top`, `bottom`, or number)

### update_card
Update existing card.

**Parameters:**
- `cardId` (required): ID of the card
- `name` (optional): New title
- `desc` (optional): New description
- `idList` (optional): Move to different list
- `due` (optional): Due date or null to remove
- `closed` (optional): Archive status
- Additional fields...

### delete_card
Permanently delete a card.

**Parameters:**
- `cardId` (required): ID of the card
- `confirm` (required): Boolean confirmation

### Card Actions
- `archive_card` / `unarchive_card`: Change archive status
- `move_card_to_list`: Move between lists
- `add_comment`: Add card comment
- `get_comments`: Retrieve comments
- `add_attachment` / `get_attachments`: Manage attachments
- `add_member` / `remove_member`: Manage assignees
- `add_label` / `remove_label`: Manage labels
- `set_due_date` / `set_due_complete`: Manage deadlines

## List Tools

### get_list
Retrieve list information.

**Parameters:**
- `listId` (required): ID of the list
- `fields` (optional): Array of field names
- `optimizationLevel` (optional): Response detail level

### create_list
Create a new list.

**Parameters:**
- `name` (required): List name
- `idBoard` (required): Board ID
- `pos` (optional): Position

### update_list
Update existing list.

**Parameters:**
- `listId` (required): ID of the list
- `name` (optional): New name
- `closed` (optional): Archive status
- `pos` (optional): New position

### List Actions
- `archive_list` / `unarchive_list`: Change archive status
- `move_list_to_board`: Move to different board
- `get_cards_in_list`: Get all cards
- `archive_all_cards`: Archive all cards in list
- `move_all_cards`: Move all cards to another list

## Member Tools

### get_me
Get authenticated member information.

**Parameters:**
- `fields` (optional): Array of field names

### get_member
Get specific member information.

**Parameters:**
- `memberIdOrUsername` (required): ID or username
- `fields` (optional): Array of field names

### Member Queries
- `get_member_boards`: Get member's boards
- `get_member_cards`: Get assigned cards
- `get_member_organizations`: Get workspaces
- `get_notifications`: Get member notifications
- `search_members`: Search for members by name

### update_me
Update authenticated member profile.

**Parameters:**
- `fullName` (optional): Display name
- `bio` (optional): Profile bio
- `username` (optional): Username
- Preference parameters...

## Label Tools

### get_label
Retrieve label information.

**Parameters:**
- `labelId` (required): ID of the label

### create_label
Create new board label.

**Parameters:**
- `boardId` (required): Board ID
- `name` (required): Label name
- `color` (required): Color or null

**Colors:** `green`, `yellow`, `orange`, `red`, `purple`, `blue`, `sky`, `lime`, `pink`, `black`, null

### update_label
Update existing label.

**Parameters:**
- `labelId` (required): ID of the label
- `name` (optional): New name
- `color` (optional): New color

### Label Actions
- `delete_label`: Remove label
- `create_label_on_card`: Create and add to card
- `add_label_to_card` / `remove_label_from_card`: Manage card labels

## Checklist Tools

### get_checklist
Retrieve checklist information.

**Parameters:**
- `checklistId` (required): ID of the checklist

### create_checklist
Create new checklist on card.

**Parameters:**
- `cardId` (required): Card ID
- `name` (required): Checklist name
- `idChecklistSource` (optional): Copy from checklist
- `pos` (optional): Position

### Checklist Items
- `create_checkitem`: Add checklist item
- `update_checkitem`: Modify item
- `delete_checkitem`: Remove item
- `update_checkitem_state_on_card`: Toggle completion

**CheckItem Parameters:**
- `name`: Item text
- `state`: `complete` or `incomplete`
- `due`: Due date (ISO-8601)
- `idMember`: Assigned member

## Common Parameters

### Position Values
- `"top"`: First position
- `"bottom"`: Last position
- Number: Specific position value

### Date Format
ISO-8601 format: `2023-12-31T12:00:00Z`

### Field Selection
Common fields across entities:
- `id`: Unique identifier
- `name`: Display name
- `desc`: Description
- `closed`: Archive status
- `url`: Web URL
- `dateLastActivity`: Last modification

## Response Formats

### Success Response
```json
{
  "id": "123abc",
  "name": "Example Item",
  "desc": "Description text",
  // Additional fields based on optimization
}
```

### Array Response
```json
[
  {
    "id": "123abc",
    "name": "Item 1"
  },
  {
    "id": "456def",
    "name": "Item 2"
  }
]
```

### Optimized Response
With `optimizationLevel: "minimal"`:
```json
{
  "id": "123abc",
  "name": "Example",
  "closed": false
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid board ID",
    "details": {
      "field": "boardId",
      "value": "invalid"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid parameters
- `NOT_FOUND`: Resource doesn't exist
- `AUTHENTICATION_ERROR`: Invalid credentials
- `RATE_LIMIT_ERROR`: Too many requests
- `SERVER_ERROR`: Trello API error

### Rate Limiting
The server implements automatic retry with exponential backoff for rate limits. No manual handling required.

## Examples

### Create a new card with full details
```json
{
  "name": "Implement new feature",
  "idList": "5f8d3e2a1234567890abcdef",
  "desc": "Feature description with requirements",
  "due": "2023-12-31T17:00:00Z",
  "idMembers": ["507f1f77bcf86cd799439011"],
  "idLabels": ["5f8d3e2a9876543210fedcba"],
  "pos": "top"
}
```

### Get optimized board list
```json
{
  "filter": "open",
  "optimizationLevel": "minimal",
  "fields": ["id", "name", "url", "dateLastActivity"]
}
```

### Move card with comment
```javascript
// First move the card
{
  "cardId": "123abc",
  "listId": "456def"
}

// Then add comment
{
  "cardId": "123abc",
  "text": "Moved to In Progress for review"
}
```