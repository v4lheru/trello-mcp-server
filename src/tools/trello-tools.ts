/**
 * Trello Tools
 * 
 * Exports all Trello tools for use in the MCP server.
 * This file aggregates all the tool definitions from the individual tool files.
 */

import { boardTools } from './board-tools.js';
import { listTools } from './list-tools.js';
import { cardTools } from './card-tools.js';
import { memberTools } from './member-tools.js';
import { labelTools } from './label-tools.js';
import { checklistTools } from './checklist-tools.js';

/**
 * All Trello tools combined into a single array
 */
export const trelloTools = [
    ...boardTools,
    ...listTools,
    ...cardTools,
    ...memberTools,
    ...labelTools,
    ...checklistTools
];
