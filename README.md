# Trello MCP Server - Optimized

[![npm version](https://badge.fury.io/js/%40cyberdeep%2Ftrello-mcp-server-optimize.svg)](https://www.npmjs.com/package/@cyberdeep/trello-mcp-server-optimize)
[![Downloads](https://img.shields.io/npm/dm/@cyberdeep/trello-mcp-server-optimize.svg)](https://www.npmjs.com/package/@cyberdeep/trello-mcp-server-optimize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-performance Model Context Protocol (MCP) server for Trello integration with 97% token reduction through intelligent response optimization.

## Installation

### Option 1: Quick Setup (Recommended)

```bash
# Download and run the setup script
curl -O https://raw.githubusercontent.com/Deepankar1993/trello-mcp-server-optimize/master/install.sh && chmod +x install.sh && ./install.sh
```

This will:
- Install the package globally
- Configure your Trello API credentials
- Set up Claude Desktop/CLI automatically

### Option 2: Manual Installation

```bash
# Install globally
npm install -g @cyberdeep/trello-mcp-server-optimize
```

After installation, configure Claude using one of these methods:

#### Claude CLI
```bash
claude mcp add-json trello-mcp-server --scope user '{
  "command": "trello-mcp-optimize",
  "args": [],
  "env": {
    "TRELLO_API_KEY": "your_api_key",
    "TRELLO_TOKEN": "your_token"
  }
}'
```

#### Claude Desktop
Manually add to your config file:
```json
{
  "mcpServers": {
    "trello-mcp-server": {
      "command": "trello-mcp-optimize",
      "args": [],
      "env": {
        "TRELLO_API_KEY": "your_api_key",
        "TRELLO_TOKEN": "your_token"
      }
    }
  }
}
```


## Configuration

### Get Trello API Credentials

1. Visit [Trello Power-Ups Admin](https://trello.com/power-ups/admin)
2. Click "New" and create a Power-Up
3. Generate an API Key and Token

### Alternative: Using NPX (No Install Required)

You can also use npx directly without installing:

#### Claude Desktop Config
Add to your config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "trello-mcp-server": {
      "command": "npx",
      "args": ["-y", "@cyberdeep/trello-mcp-server-optimize"],
      "env": {
        "TRELLO_API_KEY": "your_api_key",
        "TRELLO_TOKEN": "your_token"
      }
    }
  }
}
```


## Features

- **🚀 97% Token Reduction** - Intelligent response filtering and summarization
- **📊 Smart Defaults** - Automatic optimization based on operation type
- **⚡ High Performance** - In-memory caching with smart TTLs
- **🔧 Full Trello API Coverage** - 75+ operations for boards, cards, lists, and more
- **📦 Zero Configuration** - Works out of the box with sensible defaults
- **🔄 100% Backward Compatible** - Drop-in replacement for existing integrations

## Usage Examples

```javascript
// Get your boards (automatically optimized)
"Show me my Trello boards"

// Create a new card
"Create a card called 'Review documentation' in my To Do list"

// Get cards with optimization
"Get the first 10 urgent cards from my project board"

// Summarize large datasets
"Give me a summary of all cards in my backlog"
```

## Performance Comparison

| Operation | Standard API | Optimized | Reduction |
|-----------|-------------|-----------|-----------|
| List Boards | ~800 tokens | ~80 tokens | 90% |
| Get Card Details | ~1200 tokens | ~120 tokens | 90% |
| List Cards (100+) | ~5000 tokens | ~150 tokens | 97% |

## Available Tools

### Board Operations
- `get_boards` - List all boards
- `get_board` - Get board details
- `create_board` - Create new board
- `update_board` - Update board
- `delete_board` - Delete board
- `get_board_lists` - Get lists on board
- `get_board_members` - Get board members
- `get_board_labels` - Get board labels

### Card Operations
- `get_card` - Get card details
- `create_card` - Create new card
- `update_card` - Update card
- `delete_card` - Delete card
- `move_card_to_list` - Move card
- `add_comment` - Add comment to card
- `add_member` - Assign member to card
- `set_due_date` - Set card due date

### List Operations
- `get_list` - Get list details
- `create_list` - Create new list
- `update_list` - Update list
- `archive_list` - Archive list
- `get_cards_in_list` - Get cards in list
- `move_all_cards` - Move all cards

[See full API documentation →](https://github.com/deepankar1993/trello-mcp-server-optimize/blob/master/docs/API_REFERENCE.md)

## Advanced Features

### Optimization Levels

```javascript
// Minimal - Essential fields only (90% reduction)
{ tool: "get_boards", arguments: { detailLevel: "minimal" } }

// Standard - Common fields (default)
{ tool: "get_card", arguments: { cardId: "123" } }

// Detailed - Most fields
{ tool: "get_board", arguments: { boardId: "456", detailLevel: "detailed" } }

// Full - Complete response
{ tool: "get_card", arguments: { cardId: "789", detailLevel: "full" } }
```

### Array Optimization

```javascript
// Limit results
{ tool: "get_cards_in_list", arguments: { listId: "abc", maxItems: 10 } }

// Summarize large datasets (returns 5 items by default with statistics)
{ tool: "get_boards", arguments: { summarize: true } }

// Summarize with custom limit (returns 20 items with statistics)
{ tool: "get_cards_in_list", arguments: { listId: "abc", summarize: true, maxItems: 20 } }
```

**Note on `summarize` parameter:**
- When `summarize: true` is used, the response includes only the first 5 items by default along with summary statistics
- Use `maxItems` together with `summarize: true` to override the default 5-item limit
- Without `summarize` or with `summarize: false`, all items are returned (unless limited by `maxItems`)

## Development

```bash
# Clone repository
git clone https://github.com/Deepankar1993/trello-mcp-server-optimize.git
cd trello-mcp-server-optimize

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## Environment Variables

Required:
- `TRELLO_API_KEY` - Your Trello API key
- `TRELLO_TOKEN` - Your Trello API token

Optional:
- `ENABLE_RESPONSE_OPTIMIZATION` - Enable/disable optimization (default: `true`)
- `DEFAULT_OPTIMIZATION_LEVEL` - Default optimization level (default: `smart`)
- `ENABLE_CACHING` - Enable response caching (default: `true`)

## Troubleshooting

### Connection Issues

If you see "Status: ✘ failed" in Claude:

1. Verify your API credentials are correct
2. Restart Claude Desktop completely
3. Check the logs for errors

### Common Issues

- **NPX not working**: Use global install instead: `npm install -g @cyberdeep/trello-mcp-server-optimize`
- **Permission errors**: Use `sudo npm install -g` or configure npm to use a different directory
- **Server not found**: Make sure the package is installed globally

[Full troubleshooting guide →](https://github.com/Deepankar1993/trello-mcp-server-optimize/blob/master/docs/TROUBLESHOOTING.md)

## Documentation

- [Architecture Guide](https://github.com/deepankar1993/trello-mcp-server-optimize/blob/master/docs/ARCHITECTURE.md)
- [API Reference](https://github.com/deepankar1993/trello-mcp-server-optimize/blob/master/docs/API_REFERENCE.md)
- [Optimization Guide](https://github.com/deepankar1993/trello-mcp-server-optimize/blob/master/docs/OPTIMIZATION_GUIDE.md)
- [Migration Guide](https://github.com/deepankar1993/trello-mcp-server-optimize/blob/master/docs/MIGRATION_GUIDE.md)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

MIT © [Deepankar](https://github.com/Deepankar1993)

## Support

- 🐛 [Report Issues](https://github.com/deepankar1993/trello-mcp-server-optimize/issues)
- 💬 [Discussions](https://github.com/deepankar1993/trello-mcp-server-optimize/discussions)
- 📧 [Email Support](mailto:support@cyberdeep.com)