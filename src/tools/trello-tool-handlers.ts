/**
 * Trello Tool Handlers
 * 
 * Exports all Trello tool handlers for use in the MCP server.
 * This file aggregates all the tool handlers from the individual handler files.
 */

import { boardToolHandlers } from './board-tool-handlers.js';
import { listToolHandlers } from './list-tool-handlers.js';
import { cardToolHandlers } from './card-tool-handlers.js';
import { memberToolHandlers } from './member-tool-handlers.js';
import { labelToolHandlers } from './label-tool-handlers.js';
import { checklistToolHandlers } from './checklist-tool-handlers.js';

/**
 * All Trello tool handlers combined into a single object
 */
export const trelloToolHandlers = {
    ...boardToolHandlers,
    ...listToolHandlers,
    ...cardToolHandlers,
    ...memberToolHandlers,
    ...labelToolHandlers,
    ...checklistToolHandlers
};
