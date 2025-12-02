# Trello MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with the Trello API.

Credentials are stored securely in your OS credential manager, not in plaintext files.

## Features

- **Secure Credential Storage**: Credentials stored in OS credential manager (Windows Credential Manager, macOS Keychain, or Linux libsecret)
- **No Plaintext Secrets**: No `.env` files, no environment variables for credentials
- **Trello Integration**: Complete access to Trello boards, lists, cards, and more
- **Comprehensive API Coverage**: Support for all major Trello operations
- **Type Safety**: Full TypeScript support with proper typing for Trello objects
- **Error Handling**: Robust error management throughout the codebase

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- Trello API key and token (see below)

**Linux only**: Install libsecret
```bash
# Debian/Ubuntu
sudo apt install libsecret-1-dev

# Fedora
sudo dnf install libsecret-devel

# Arch
sudo pacman -S libsecret
```

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/v4lheru/trello-mcp-server.git
   cd trello-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. **Set up your credentials securely**:
   ```bash
   npm run setup-credentials
   ```

   This will prompt you for your Trello API key and token, then store them in your OS credential manager.

   **To get your credentials:**
   1. Go to https://trello.com/app-key
   2. Copy your API Key
   3. Click "Generate a Token" and copy the token

### Usage

Start the MCP server:
```bash
npm start
```

### Migrating from .env Files

If you have existing credentials in a `.env` file, the setup script will automatically detect them:

```bash
npm run setup-credentials
```

You'll see:
```
📁 Found existing credentials in: /path/to/.env
   Both API Key and Token found.

Migrate these credentials to secure storage? (Y/n):
```

After migration, you can optionally remove the credentials from your `.env` file.

### Managing Credentials

- **Set/update credentials**: `npm run setup-credentials`
- **Delete credentials**: `npm run delete-credentials`

Credentials are stored in:
- **Windows**: Credential Manager → Windows Credentials → `trello-mcp-server`
- **macOS**: Keychain Access → `trello-mcp-server`
- **Linux**: GNOME Keyring / KDE Wallet → `trello-mcp-server`

## Claude Desktop Configuration

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "trello": {
      "command": "node",
      "args": ["C:/path/to/trello-mcp-server/build/index.js"]
    }
  }
}
```

## Available Tools

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

### Card Tools
- `get_card` - Get a specific card by ID
- `create_card` - Create a new card
- `update_card` - Update an existing card
- `delete_card` - Delete a card
- `archive_card` - Archive a card
- `move_card_to_list` - Move a card to a different list
- `add_comment` - Add a comment to a card
- `get_comments` - Get comments on a card
- `add_attachment` - Add an attachment to a card
- `get_attachments` - Get attachments on a card
- `set_due_date` - Set the due date for a card
- `set_due_complete` - Mark a card's due date as complete

### Member Tools
- `get_me` - Get the authenticated member (current user)
- `get_member` - Get a specific member by ID or username
- `get_member_boards` - Get boards that a member belongs to
- `get_member_cards` - Get cards assigned to a member
- `search_members` - Search for members by name

### Label Tools
- `get_label` - Get a specific label by ID
- `create_label` - Create a new label on a board
- `update_label` - Update an existing label
- `delete_label` - Delete a label
- `add_label_to_card` - Add a label to a card
- `remove_label_from_card` - Remove a label from a card

### Checklist Tools
- `get_checklist` - Get a specific checklist by ID
- `create_checklist` - Create a new checklist on a card
- `update_checklist` - Update an existing checklist
- `delete_checklist` - Delete a checklist
- `get_checkitems` - Get all checkitems on a checklist
- `create_checkitem` - Create a new checkitem on a checklist
- `update_checkitem` - Update a checkitem on a checklist
- `delete_checkitem` - Delete a checkitem from a checklist

## Security

Credentials are stored in your OS credential manager (Windows Credential Manager, macOS Keychain, or Linux libsecret) and encrypted using your login credentials.

## License

This project is licensed under the MIT License.
