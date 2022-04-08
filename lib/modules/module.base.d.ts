import * as IORedis from 'ioredis';
export declare class Module {
    name: string;
    redis: IORedis.Redis;
    redisOptions: IORedis.RedisOptions;
    cluster: IORedis.Cluster;
    clusterNodes: IORedis.ClusterNode[];
    clusterOptions: IORedis.ClusterOptions;
    isHandleError: boolean;
    showDebugLogs: boolean;
    returnRawResponse: boolean;
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param clusterNodes The nodes of the cluster
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     * @param clusterOptions The options of the clusters
     */
    constructor(name: string, clusterNodes: IORedis.ClusterNode[], moduleOptions?: RedisModuleOptions, clusterOptions?: IORedis.ClusterOptions);
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param redisOptions The options of the redis database
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     */
    constructor(name: string, redisOptions: IORedis.RedisOptions, moduleOptions?: RedisModuleOptions);
    /**
     * Connecting to the Redis database with the module
     */
    connect(): Promise<void>;
    /**
     * Disconnecting from the Redis database with the module
     */
    disconnect(): Promise<void>;
    /**
     * Running a Redis command
     * @param command The redis command
     * @param args The args of the redis command
     */
    sendCommand(data: CommandData): Promise<any>;
    /**
     * Handling a error
     * @param module The name of the module
     * @param error The message of the error
     */
    handleError(error: string): any;
    /**
     * Simpilizing the response of the Module command
     * @param response The array response from the module
     * @param isSearchQuery If we should try to build search result object from result array (default: false)
     */
    handleResponse(response: any): any;
    /**
     * Check if array is fully two dimensional. Only items in the array are arrays.
     * @param array The potential two dimensional array
     */
    isOnlyTwoDimensionalArray(array: any[]): boolean;
    /**
     * Reducing an array by one level. i.e. from two dimensional to 1 dimensional.
     * @param array The potentional two dimensional array
     */
    reduceArrayDimension(array: any[][]): any[];
    /**
     * Formatting given param value to string
     * @param paramValue The given param value
     * @returns A param value converted to string
     */
    paramToString(paramValue: string): string;
}
/**
 * Logging a message
 * @param level The level of the log
 * @param msg The log message
 */
export declare function log(level: LogLevel, msg: string): void;
/**
 * Enum representing the log levels
 */
export declare enum LogLevel {
    INFO = 0,
    DEBUG = 1,
    Error = 2
}
/**
 * The Redis module class options
 */
export declare type RedisModuleOptions = {
    /**
    * If to throw exception in case of error
    */
    isHandleError?: boolean;
    /**
    *  If to print debug logs
    */
    showDebugLogs?: boolean;
    /**
     * In some cases functions are parsing responses into a JS object, setting true here will disable that ability.
     */
    returnRawResponse?: boolean;
};
/**
 * The command object send to the sendCommand function
 */
export declare type CommandData = {
    /**
     * The full Redis command
     */
    command: string;
    /**
     * A list of arguments passed to the Redis command
     */
    args?: any[];
};
