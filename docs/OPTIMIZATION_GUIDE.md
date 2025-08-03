# Trello MCP Server Optimization Guide

## Table of Contents
- [Overview](#overview)
- [Optimization Levels](#optimization-levels)
- [Using Optimization](#using-optimization)
- [Operation-Specific Optimization](#operation-specific-optimization)
- [Performance Benefits](#performance-benefits)
- [Best Practices](#best-practices)
- [Configuration](#configuration)
- [Examples](#examples)

## Overview

The Trello MCP Server implements advanced response optimization to reduce token usage by 70-80% while maintaining all essential functionality. This guide explains how to leverage these optimizations for maximum efficiency.

### Why Optimization Matters
- **Reduced Token Usage**: Lower costs for AI API usage
- **Faster Processing**: Smaller responses process faster
- **Better Context Management**: More room for conversation history
- **Improved Performance**: Less data transfer and parsing

## Optimization Levels

### 1. Minimal (`minimal`)
**Use Case**: Listing operations, quick lookups
**Token Reduction**: ~80%
**Fields Included**: `id`, `name`, basic status fields

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Project Board",
  "closed": false
}
```

### 2. Standard (`standard`)
**Use Case**: Most common operations
**Token Reduction**: ~70%
**Fields Included**: Common operational fields

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Project Board",
  "desc": "Main project tracking board",
  "closed": false,
  "url": "https://trello.com/b/abcd1234",
  "dateLastActivity": "2023-12-15T10:30:00.000Z"
}
```

### 3. Detailed (`detailed`)
**Use Case**: Complex operations, full context needed
**Token Reduction**: ~40%
**Fields Included**: Extended operational fields

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Project Board",
  "desc": "Main project tracking board",
  "closed": false,
  "url": "https://trello.com/b/abcd1234",
  "prefs": {
    "permissionLevel": "private",
    "background": "blue"
  },
  "memberships": [...],
  "dateLastActivity": "2023-12-15T10:30:00.000Z"
}
```

### 4. Full (`full`)
**Use Case**: Complete data export, debugging
**Token Reduction**: 0% (no optimization)
**Fields Included**: All available fields

## Using Optimization

### Method 1: Optimization Level Parameter
Add `optimizationLevel` to any read operation:

```json
{
  "boardId": "507f1f77bcf86cd799439011",
  "optimizationLevel": "minimal"
}
```

### Method 2: Custom Field Selection
Specify exact fields needed:

```json
{
  "boardId": "507f1f77bcf86cd799439011",
  "fields": ["id", "name", "url", "lists", "members"]
}
```

### Method 3: Array Summarization
Use `summarize` for large list operations:

```json
// Get summary with default 5 items
{
  "listId": "507f1f77bcf86cd799439011",
  "summarize": true
}

// Get summary with custom limit
{
  "listId": "507f1f77bcf86cd799439011",
  "summarize": true,
  "maxItems": 20
}
```

**Important:** When `summarize: true` is used:
- Returns only the first 5 items by default
- Includes summary statistics (total count, stats)
- Use `maxItems` to override the 5-item default
- Response format changes to include metadata

### Method 4: Default Configuration
Set a global default in environment:

```bash
OPTIMIZATION_LEVEL=standard
```

## Operation-Specific Optimization

### Board Operations

#### get_boards
- **Default**: `minimal`
- **Recommended**: Use `minimal` for board lists
- **Rationale**: Board lists often contain many items

#### get_board
- **Default**: `standard`
- **Recommended**: Use `detailed` when needing preferences
- **Rationale**: Single board queries benefit from more context

### Card Operations

#### get_card
- **Default**: `standard`
- **Recommended**: Use `detailed` for card editing
- **Includes**: Description, due dates, members, labels

#### get_cards_in_list
- **Default**: `minimal`
- **Recommended**: Use `minimal` for large lists
- **Upgrade to**: `standard` when needing assignments

### List Operations

#### get_board_lists
- **Default**: `minimal`
- **Fields**: `id`, `name`, `closed`, `pos`
- **Use Case**: Board structure overview

### Member Operations

#### get_member_boards
- **Default**: `minimal`
- **Recommended**: Perfect for board selection
- **Fields**: `id`, `name`, `closed`

## Performance Benefits

### Token Usage Comparison

| Operation | Full Response | Optimized | Reduction |
|-----------|--------------|-----------|-----------|
| get_boards (10 boards) | 15,000 tokens | 3,000 tokens | 80% |
| get_card | 2,500 tokens | 750 tokens | 70% |
| get_board_lists | 5,000 tokens | 1,000 tokens | 80% |
| get_comments (20) | 8,000 tokens | 2,400 tokens | 70% |

### Processing Speed
- Minimal responses: 2-3x faster parsing
- Standard responses: 1.5-2x faster parsing
- Network transfer: 70-80% reduction

## Best Practices

### 1. Start Minimal, Upgrade as Needed
```javascript
// First, get minimal board list
const boards = await getBoards({ 
  optimizationLevel: "minimal" 
});

// Then get detailed info for selected board
const board = await getBoard({ 
  boardId: selectedId,
  optimizationLevel: "detailed"
});
```

### 2. Use Field Selection for Precision
```javascript
// Get only what you need
const card = await getCard({
  cardId: "123abc",
  fields: ["name", "desc", "due", "idMembers"]
});
```

### 3. Batch Operations Efficiently
```javascript
// Get all lists with minimal data
const lists = await getBoardLists({
  boardId: "456def",
  optimizationLevel: "minimal"
});

// Process specific lists with more detail
for (const list of selectedLists) {
  const details = await getList({
    listId: list.id,
    optimizationLevel: "standard"
  });
}
```

### 4. Use Summarization for Large Datasets
```javascript
// When dealing with boards that have many cards
const cards = await getCardsInList({
  listId: "789ghi",
  summarize: true,
  maxItems: 10  // Get 10 cards instead of default 5
});

// Response will look like:
// {
//   totalCount: 150,
//   items: [...10 cards...],
//   stats: {
//     withDueDate: 45,
//     overdue: 12,
//     completed: 23
//   },
//   hasMore: true,
//   remainingCount: 140
// }
```

### 5. Cache Optimization Level Per Use Case
```javascript
const OPTIMIZATION_PROFILES = {
  boardOverview: "minimal",
  cardEditing: "detailed",
  quickSearch: "minimal",
  reporting: "standard"
};
```

## Configuration

### Global Configuration
Set defaults in `optimization.config.json`:

```json
{
  "defaultLevel": "standard",
  "enforceOptimization": true,
  "customLevels": {
    "superMinimal": {
      "fields": ["id", "name"]
    }
  }
}
```

### Operation-Specific Configuration
Configure per operation in `optimization-presets/`:

```json
{
  "board": {
    "get_boards": {
      "level": "minimal",
      "fields": ["id", "name", "closed", "starred"]
    },
    "get_board": {
      "level": "standard",
      "additionalFields": ["prefs", "labelNames"]
    }
  }
}
```

### Environment Variables
```bash
# Set default optimization level
OPTIMIZATION_LEVEL=standard

# Enable performance monitoring
PERFORMANCE_MONITORING=true

# Enable response caching (future)
CACHE_ENABLED=true
```

## Examples

### Example 1: Dashboard Overview
```javascript
// Get all boards (minimal)
const boards = await trello.get_boards({
  filter: "open",
  optimizationLevel: "minimal"
});

// Get cards for each board (minimal)
for (const board of boards) {
  const lists = await trello.get_board_lists({
    boardId: board.id,
    optimizationLevel: "minimal"
  });
}
```

### Example 2: Card Detail View
```javascript
// Get full card details
const card = await trello.get_card({
  cardId: "789xyz",
  optimizationLevel: "detailed"
});

// Get comments (standard)
const comments = await trello.get_comments({
  cardId: "789xyz",
  optimizationLevel: "standard"
});
```

### Example 3: Bulk Operations
```javascript
// Move cards between lists
const cards = await trello.get_cards_in_list({
  listId: sourceList,
  optimizationLevel: "minimal"  // Just need IDs
});

for (const card of cards) {
  await trello.move_card_to_list({
    cardId: card.id,
    listId: targetList
  });
}
```

### Example 4: Custom Field Selection
```javascript
// Get specific fields for reporting
const boardData = await trello.get_board({
  boardId: "123abc",
  fields: [
    "name",
    "dateLastActivity",
    "prefs.permissionLevel",
    "memberships[*].idMember",
    "lists[*].name"
  ]
});
```

## Monitoring Performance

### Token Usage Tracking
The server automatically tracks token usage:

```javascript
// Response includes optimization metadata
{
  "data": { /* optimized response */ },
  "_optimization": {
    "level": "standard",
    "originalSize": 2500,
    "optimizedSize": 750,
    "reduction": "70%"
  }
}
```

### Performance Metrics
Monitor optimization effectiveness:

```bash
# View performance logs
tail -f logs/performance.log

# Sample output
[2023-12-15 10:30:45] get_boards: 80% reduction (15KB → 3KB)
[2023-12-15 10:31:02] get_card: 70% reduction (2.5KB → 0.75KB)
```

## Troubleshooting

### Missing Required Fields
If optimization removes needed fields:

1. Upgrade optimization level
2. Use custom field selection
3. Check operation-specific presets

### Performance Not Improving
1. Verify optimization is enabled
2. Check response sizes in logs
3. Ensure proper level selection

### Debugging
Use `full` optimization level to see all available fields:

```javascript
const fullData = await trello.get_board({
  boardId: "123abc",
  optimizationLevel: "full"
});
console.log(Object.keys(fullData)); // See all fields
```

## Future Enhancements

### Planned Features
1. **Response Caching**: Cache optimized responses
2. **Smart Field Detection**: Auto-detect needed fields
3. **Compression**: Additional size reduction
4. **Streaming Responses**: For large datasets

### Optimization Roadmap
- Custom optimization profiles
- Context-aware optimization
- Predictive field selection
- Multi-level caching