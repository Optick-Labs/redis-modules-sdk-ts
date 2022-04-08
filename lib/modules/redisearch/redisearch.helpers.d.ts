import { FTAggregateResponse, FTSpellCheckResponse } from "./redisearch.types";
export declare class RedisearchHelpers {
    /**
     * Parses `spellcheck` response into a list of objects.
     * @param response The response array from the spellcheck command
     */
    handleSpellcheckResponse(response: any): FTSpellCheckResponse[];
    /**
     * Handling the response of the aggregate function
     * @param response The raw response from the command execution
     * @returns A parsed response of the raw response
     */
    handleAggregateResponse(response: any): FTAggregateResponse;
    /**
     * Parsing the response of Search QUERY
     * @param response The raw response from Redis
     * @returns A parsed or processed response
     */
    handleQueryResponse(response: any): any;
}
