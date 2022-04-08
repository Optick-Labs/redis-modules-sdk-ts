import { FTIndexType, FTSchemaField, FTCreateParameters, FTSearchParameters, FTAggregateParameters, FTFieldType, FTFieldOptions, FTSugAddParameters, FTSugGetParameters, FTSpellCheck } from "./redisearch.types";
import { CommandData } from "../module.base";
export declare class SearchCommander {
    /**
     * Creating an index with a given spec
     * @param index The index of the schema
     * @param indexType The index type of the schema
     * @param schemaFields The filter set after the 'SCHEMA' argument
     * @param parameters The additional parameters of the spec
     * @returns 'OK' or error
     */
    create(index: string, indexType: FTIndexType, schemaFields: FTSchemaField[], parameters?: FTCreateParameters): CommandData;
    /**
     * Searching the index with a textual query
     * @param index The index
     * @param query The query
     * @param parameters The additional optional parameter
     * @returns Array reply, where the first element is the total number of results, and then pairs of document id, and a nested array of field/value.
     */
    search(index: string, query: string, parameters?: FTSearchParameters): CommandData;
    /**
     * Runs a search query on an index, and performs aggregate transformations on the results, extracting statistics etc from them
     * @param index The index
     * @param query The query
     * @param parameters The additional optional parameters
     * @returns Array Response. Each row is an array and represents a single aggregate result
     */
    aggregate(index: string, query: string, parameters?: FTAggregateParameters): CommandData;
    /**
     * Retrieving the execution plan for a complex query
     * @param index The index
     * @param query The query
     * @returns Returns the execution plan for a complex query
     */
    explain(index: string, query: string): CommandData;
    /**
     * Retrieving the execution plan for a complex query but formatted for easier reading without using redis-cli --raw
     * @param index The index
     * @param query The query
     * @returns A string representing the execution plan.
     */
    explainCLI(index: string, query: string): CommandData;
    /**
     * Adding a new field to the index
     * @param index The index
     * @param field The field name
     * @param fieldType The field type
     * @param options The additional optional parameters
     * @returns 'OK' or error
     */
    alter(index: string, field: string, fieldType: FTFieldType, options?: FTFieldOptions): CommandData;
    /**
     * Deleting the index
     * @param index The index
     * @param deleteHash If set, the drop operation will delete the actual document hashes.
     * @returns 'OK' or error
     */
    dropindex(index: string, deleteHash?: boolean): CommandData;
    /**
     * Adding alias fron an index
     * @param name The alias name
     * @param index The alias index
     * @returns 'OK' or error
     */
    aliasadd(name: string, index: string): CommandData;
    /**
     * Updating alias index
     * @param name The alias name
     * @param index The alias index
     * @returns 'OK' or error
     */
    aliasupdate(name: string, index: string): CommandData;
    /**
     * Deleting alias fron an index
     * @param name The alias name
     * @returns 'OK' or error
     */
    aliasdel(name: string): CommandData;
    /**
     * Retrieving the distinct tags indexed in a Tag field
     * @param index The index
     * @param field The field name
     * @returns The distinct tags indexed in a Tag field
     */
    tagvals(index: string, field: string): CommandData;
    /**
     * Adds a suggestion string to an auto-complete suggestion dictionary
     * @param key The key
     * @param suggestion The suggestion
     * @param score The score
     * @param options The additional optional parameters
     * @returns The current size of the suggestion dictionary
     */
    sugadd(key: string, suggestion: string, score: number, options?: FTSugAddParameters): CommandData;
    /**
     * Retrieving completion suggestions for a prefix
     * @param key The key
     * @param prefix The prefix of the suggestion
     * @param options The additional optional parameter
     * @returns A list of the top suggestions matching the prefix, optionally with score after each entry
     */
    sugget(key: string, prefix: string, options?: FTSugGetParameters): CommandData;
    /**
     * Deleting a string from a suggestion index
     * @param key The key
     * @param suggestion The suggestion
     */
    sugdel(key: string, suggestion: string): CommandData;
    /**
     * Retrieving the size of an auto-complete suggestion dictionary
     * @param key The key
     */
    suglen(key: string): CommandData;
    /**
     * Updating a synonym group
     * @param index The index
     * @param groupId The group id
     * @param terms A list of terms
     * @param skipInitialScan If set, we do not scan and index.
     * @returns 'OK'
     */
    synupdate(index: string, groupId: number, terms: string[], skipInitialScan?: boolean): CommandData;
    /**
     * Dumps the contents of a synonym group
     * @param index The index
     * @returns A list of synonym terms and their synonym group ids.
     */
    syndump(index: string): CommandData;
    /**
     * Performs spelling correction on a query
     * @param index The index
     * @param query The query
     * @param options The additional optional parameters
     * @returns An array, in which each element represents a misspelled term from the query
     */
    spellcheck(index: string, query: string, options?: FTSpellCheck): CommandData;
    /**
     * Adding terms to a dictionary
     * @param dict The dictionary
     * @param terms A list of terms
     * @returns The number of new terms that were added
     */
    dictadd(dict: string, terms: string[]): CommandData;
    /**
     * Deleting terms from a dictionary
     * @param dict The dictionary
     * @param terms A list of terms
     * @returns The number of terms that were deleted
     */
    dictdel(dict: string, terms: string[]): CommandData;
    /**
     * Dumps all terms in the given dictionary
     * @param dict The dictionary
     * @returns An array, where each element is term
     */
    dictdump(dict: string): CommandData;
    /**
     * Retrieving infromation and statistics on the index
     * @param index The index
     * @returns A nested array of keys and values.
     */
    info(index: string): CommandData;
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param command The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    config(command: 'GET' | 'SET' | 'HELP', option: string, value?: string): CommandData;
}
