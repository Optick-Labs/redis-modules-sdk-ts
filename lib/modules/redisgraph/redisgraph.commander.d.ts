import { CommandData } from "../module.base";
export declare class GraphCommander {
    /**
     * Executing the given query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    query(name: string, query: string, params?: {
        [key: string]: string;
    }): CommandData;
    /**
     * Executing the given readonly query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    readonlyQuery(name: string, query: string, params?: {
        [key: string]: string;
    }): CommandData;
    /**
     * Building the cypher params of a query
     * @param query The query
     * @param params The params of the query
     * @returns Returning an array of arguments
     */
    private buildQueryCommand;
    /**
     * Executing a query and produces an execution plan augmented with metrics for each operation's execution
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan, with details on results produced by and time spent in each operation.
     */
    profile(name: string, query: string): CommandData;
    /**
     * Completely removing the graph and all of its entities
     * @param name The name of the graph
     * @returns String indicating if operation succeeded or failed.
     */
    delete(name: string): CommandData;
    /**
     * Constructing a query execution plan but does not run it. Inspect this execution plan to better understand how your query will get executed
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan
     */
    explain(name: string, query: string): CommandData;
    /**
     * Retrieving a list containing up to 10 of the slowest queries
     * @param id The id of the graph
     * @returns A list containing up to 10 of the slowest queries issued against the given graph ID.
     */
    slowlog(id: number): CommandData;
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param command The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    config(command: 'GET' | 'SET' | 'HELP', option: string, value?: string): CommandData;
    /**
     * Formatting given param value to string
     * @param paramValue The given param value
     * @returns A param value converted to string
     */
    paramToString(paramValue: string): string;
}
