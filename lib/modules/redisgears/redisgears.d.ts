import * as Redis from 'ioredis';
import { Module, RedisModuleOptions } from '../module.base';
import { RGGetExecutionParameters, RGPyExecuteParameters } from './redisgears.types';
export declare class RedisGears extends Module {
    private gearsCommander;
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param clusterNodes The nodes of the cluster
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     * @param clusterOptions The options of the clusters
     */
    constructor(clusterNodes: Redis.ClusterNode[], moduleOptions?: RedisModuleOptions, clusterOptions?: Redis.ClusterOptions);
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param redisOptions The options of the redis database
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     */
    constructor(redisOptions: Redis.RedisOptions, moduleOptions?: RedisModuleOptions);
    /**
     * Aborting an existing execution
     * @param id The id of the execution
     */
    abortExecution(id: string): Promise<'OK'>;
    /**
     * Retrieving key's configuration
     * @param key A list of keys
     */
    configGet(key: string[]): Promise<number>;
    /**
     * Setting key's configuration
     * @param keyvalue A key value array, i.e. [['key', 'value]]
     */
    configSet(keyvalues: string[][]): Promise<'OK'[]>;
    /**
     * Dropping an existing execution
     * @param id The id of the execution
     */
    dropExecution(id: string): Promise<'OK'>;
    /**
     * Dumping all of the executions
     */
    dumpExecutions(): Promise<string[][]>;
    /**
     * Dumping all of the registrations
     */
    dumpRegistrations(): Promise<string[][]>;
    /**
     * Retrieving an execution
     * @param id The id of the execution
     * @param options The additional optional parameters
     */
    getExecution(id: string, options?: RGGetExecutionParameters): Promise<string[][]>;
    /**
     * Retrieving the results
     * @param id The id of the execution
     */
    getResults(id: string): Promise<string>;
    /**
     * Retrieving the results that have 'UNBLOCKING' argument (And removing it)
     * @param id The id of the execution
     */
    getResultsBlocking(id: string): Promise<string>;
    /**
     * Retrieving information about the cluster
     */
    infocluster(): Promise<string[]>;
    /**
     * Executing a python function
     * @param func The function
     * @param options The additional optional arguments
     */
    pyexecute(func: string, options?: RGPyExecuteParameters): Promise<string>;
    /**
     * Retrieving memory usage statistics from the 'Python interpreter'
     */
    pystats(): Promise<string[]>;
    /**
     * Retrieving a list of all the python requirements available
     */
    pydumpreqs(): Promise<string[]>;
    /**
     * Refreshing the node's view of the cluster's topology
     */
    refreshCluster(): Promise<'OK'>;
    /**
     * Triggering the execution of a registered 'CommandReader' function
     * @param trigger The trigger's name
     * @param args The additional arguments
     */
    trigger(trigger: string, args: string[]): Promise<string[]>;
    /**
     * Removing the registration of a function
     * @param id The id of the execution
     */
    unregister(id: string): Promise<'OK'>;
}
