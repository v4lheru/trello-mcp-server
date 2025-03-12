# Trello MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with the Trello API. Built on the Generic MCP Server Template.

## Features

- **Trello Integration**: Complete access to Trello boards, lists, cards, and more
- **Comprehensive API Coverage**: Support for all major Trello operations
- **Modular Architecture**: Clear separation of concerns with a well-defined structure
- **Type Safety**: Full TypeScript support with proper typing for Trello objects
- **Error Handling**: Robust error management throughout the codebase

## Project Structure

```
trello-mcp-server/
├── src/
│   ├── services/       # Service classes for Trello API interactions
│   │   ├── base-service.ts        # Abstract base service with common functionality
│   │   ├── trello-service.ts      # Core Trello API service
│   │   ├── board-service.ts       # Service for Trello boards
│   │   ├── list-service.ts        # Service for Trello lists
│   │   ├── card-service.ts        # Service for Trello cards
│   │   ├── member-service.ts      # Service for Trello members
│   │   ├── label-service.ts       # Service for Trello labels
│   │   ├── checklist-service.ts   # Service for Trello checklists
│   │   └── service-factory.ts     # Factory for creating service instances
│   ├── tools/          # MCP tool definitions and handlers
│   │   ├── board-tools.ts         # Board tool definitions
│   │   ├── board-tool-handlers.ts # Board tool handlers
│   │   ├── list-tools.ts          # List tool definitions
│   │   ├── list-tool-handlers.ts  # List tool handlers
│   │   ├── card-tools.ts          # Card tool definitions
│   │   ├── card-tool-handlers.ts  # Card tool handlers
│   │   ├── member-tools.ts        # Member tool definitions
│   │   ├── member-tool-handlers.ts # Member tool handlers
│   │   ├── label-tools.ts         # Label tool definitions
│   │   ├── label-tool-handlers.ts # Label tool handlers
│   │   ├── checklist-tools.ts     # Checklist tool definitions
│   │   ├── checklist-tool-handlers.ts # Checklist tool handlers
│   │   ├── trello-tools.ts        # Combined tool definitions
│   │   └── trello-tool-handlers.ts # Combined tool handlers
│   ├── types/          # TypeScript type definitions
│   │   └── trello-types.ts        # Trello type definitions
│   ├── config.ts       # Configuration management
│   └── index.ts        # Main entry point
├── .env.example        # Example environment variables
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Trello API key and token

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/trello-mcp-server.git
   cd trello-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your Trello API key and token:
   ```
   TRELLO_API_KEY=your_trello_api_key
   TRELLO_TOKEN=your_trello_token
   ```

   You can obtain these from the [Trello Developer Portal](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).

### Building and Running

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the server:
   ```bash
   npm start
   ```

## Available Tools

The server provides tools for interacting with all major Trello resources:

### Board Tools
- `get_boards` - Get all boards for the authenticated user
- `get_board` - Get a specific board by ID
- `create_board` - Create a new board
- `update_board` - Update an existing board
- `delete_board` - Delete a board
- `get_board_lists` - Get all lists on a board
- `get_board_members` - Get all members of a board
- `get_board_labels` - Get all labels on a board
- `close_board` - Close (archive) a board
- `reopen_board` - Reopen a closed board

### List Tools
- `get_list` - Get a specific list by ID
- `create_list` - Create a new list on a board
- `update_list` - Update an existing list
- `archive_list` - Archive a list
- `unarchive_list` - Unarchive a list
- `move_list_to_board` - Move a list to a different board
- `get_cards_in_list` - Get all cards in a list
- `archive_all_cards` - Archive all cards in a list
- `move_all_cards` - Move all cards in a list to another list
- `update_list_position` - Update the position of a list on a board
- `update_list_name` - Update the name of a list
- `subscribe_to_list` - Subscribe to a list

### Card Tools
- `get_card` - Get a specific card by ID
- `create_card` - Create a new card
- `update_card` - Update an existing card
- `delete_card` - Delete a card
- `archive_card` - Archive a card
- `unarchive_card` - Unarchive a card
- `move_card_to_list` - Move a card to a different list
- `add_comment` - Add a comment to a card
- `get_comments` - Get comments on a card
- `add_attachment` - Add an attachment to a card
- `get_attachments` - Get attachments on a card
- `delete_attachment` - Delete an attachment from a card
- `add_member` - Add a member to a card
- `remove_member` - Remove a member from a card
- `add_label` - Add a label to a card
- `remove_label` - Remove a label from a card
- `set_due_date` - Set the due date for a card
- `set_due_complete` - Mark a card's due date as complete or incomplete

### Member Tools
- `get_me` - Get the authenticated member (current user)
- `get_member` - Get a specific member by ID or username
- `get_member_boards` - Get boards that a member belongs to
- `get_member_cards` - Get cards assigned to a member
- `get_boards_invited` - Get boards that a member has been invited to
- `get_member_organizations` - Get organizations that a member belongs to
- `get_notifications` - Get notifications for the authenticated member
- `update_me` - Update the authenticated member's information
- `get_avatar` - Get the authenticated member's avatar
- `search_members` - Search for members by name
- `get_board_members` - Get members of a board
- `get_organization_members` - Get members of an organization
- `get_card_members` - Get members assigned to a card

### Label Tools
- `get_label` - Get a specific label by ID
- `create_label` - Create a new label on a board
- `update_label` - Update an existing label
- `delete_label` - Delete a label
- `get_board_labels` - Get all labels on a board
- `update_label_name` - Update the name of a label
- `update_label_color` - Update the color of a label
- `create_label_on_card` - Create a new label directly on a card
- `get_card_labels` - Get all labels on a card
- `add_label_to_card` - Add a label to a card
- `remove_label_from_card` - Remove a label from a card

### Checklist Tools
- `get_checklist` - Get a specific checklist by ID
- `create_checklist` - Create a new checklist on a card
- `update_checklist` - Update an existing checklist
- `delete_checklist` - Delete a checklist
- `get_checkitems` - Get all checkitems on a checklist
- `create_checkitem` - Create a new checkitem on a checklist
- `get_checkitem` - Get a specific checkitem on a checklist
- `update_checkitem` - Update a checkitem on a checklist
- `delete_checkitem` - Delete a checkitem from a checklist
- `update_checklist_name` - Update the name of a checklist
- `update_checklist_position` - Update the position of a checklist on a card
- `get_checklist_board` - Get the board a checklist is on
- `get_checklist_card` - Get the card a checklist is on
- `update_checkitem_state_on_card` - Update a checkitem's state on a card

## Configuration

The server uses a centralized configuration system in `src/config.ts`. Configuration can be provided through:

- Environment variables
- Command line arguments (with `--env KEY=VALUE`)
- Default values in the code

Required environment variables:
- `TRELLO_API_KEY` - Your Trello API key
- `TRELLO_TOKEN` - Your Trello API token

## Error Handling

The server includes comprehensive error handling:

- Service-level error handling with rate limiting support
- Tool-level error handling with proper error messages
- MCP protocol error handling
- Trello API error handling

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/v4lheru/trello-mcp-server/blob/master/LICENSE) file for details.
