/**
 * Service Factory
 * 
 * Factory for creating and managing service instances.
 * Provides a centralized way to access all services.
 */

import { TrelloService } from './trello-service.js';
import { BoardService } from './board-service.js';
import { ListService } from './list-service.js';
import { CardService } from './card-service.js';
import { MemberService } from './member-service.js';
import { LabelService } from './label-service.js';
import { ChecklistService } from './checklist-service.js';

/**
 * Factory for creating and managing service instances
 */
export class ServiceFactory {
    private static instance: ServiceFactory;
    private trelloService: TrelloService;
    private boardService: BoardService;
    private listService: ListService;
    private cardService: CardService;
    private memberService: MemberService;
    private labelService: LabelService;
    private checklistService: ChecklistService;

    /**
     * Private constructor to enforce singleton pattern
     * @param trelloService - The TrelloService instance
     */
    private constructor(trelloService: TrelloService) {
        this.trelloService = trelloService;
        this.boardService = new BoardService(trelloService);
        this.listService = new ListService(trelloService);
        this.cardService = new CardService(trelloService);
        this.memberService = new MemberService(trelloService);
        this.labelService = new LabelService(trelloService);
        this.checklistService = new ChecklistService(trelloService);
    }

    /**
     * Initializes the ServiceFactory singleton instance
     * @param apiKey - Trello API key
     * @param token - Trello API token
     * @returns The singleton instance of ServiceFactory
     */
    public static initialize(apiKey: string, token: string): ServiceFactory {
        if (!ServiceFactory.instance) {
            const trelloService = TrelloService.initialize(apiKey, token);
            ServiceFactory.instance = new ServiceFactory(trelloService);
        }
        return ServiceFactory.instance;
    }

    /**
     * Gets the singleton instance of ServiceFactory
     * @returns The singleton instance of ServiceFactory
     * @throws Error if factory hasn't been initialized
     */
    public static getInstance(): ServiceFactory {
        if (!ServiceFactory.instance) {
            throw new Error('ServiceFactory not initialized. Call initialize() first.');
        }
        return ServiceFactory.instance;
    }

    /**
     * Gets the TrelloService instance
     * @returns The TrelloService instance
     */
    public getTrelloService(): TrelloService {
        return this.trelloService;
    }

    /**
     * Gets the BoardService instance
     * @returns The BoardService instance
     */
    public getBoardService(): BoardService {
        return this.boardService;
    }

    /**
     * Gets the ListService instance
     * @returns The ListService instance
     */
    public getListService(): ListService {
        return this.listService;
    }

    /**
     * Gets the CardService instance
     * @returns The CardService instance
     */
    public getCardService(): CardService {
        return this.cardService;
    }

    /**
     * Gets the MemberService instance
     * @returns The MemberService instance
     */
    public getMemberService(): MemberService {
        return this.memberService;
    }

    /**
     * Gets the LabelService instance
     * @returns The LabelService instance
     */
    public getLabelService(): LabelService {
        return this.labelService;
    }

    /**
     * Gets the ChecklistService instance
     * @returns The ChecklistService instance
     */
    public getChecklistService(): ChecklistService {
        return this.checklistService;
    }
}
