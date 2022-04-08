import { CommandData } from "../module.base";
import { RGGetExecutionParameters, RGPyExecuteParameters } from "./redisgears.types";
export declare class GearsCommander {
    /**
     * Aborting an existing execution
     * @param id The id of the execution
     */
    abortExecution(id: string): CommandData;
    /**
     * Retrieving key's configuration
     * @param key A list of keys
     */
    configGet(key: string[]): CommandData;
    /**
     * Setting key's configuration
     * @param keyvalue A key value array, i.e. [['key', 'value]]
     */
    configSet(keyvalues: string[][]): CommandData;
    /**
     * Dropping an existing execution
     * @param id The id of the execution
     */
    dropExecution(id: string): CommandData;
    /**
     * Dumping all of the executions
     */
    dumpExecutions(): CommandData;
    /**
     * Dumping all of the registrations
     */
    dumpRegistrations(): CommandData;
    /**
     * Retrieving an execution
     * @param id The id of the execution
     * @param options The additional optional parameters
     */
    getExecution(id: string, options?: RGGetExecutionParameters): CommandData;
    /**
     * Retrieving the results
     * @param id The id of the execution
     */
    getResults(id: string): CommandData;
    /**
     * Retrieving the results that have 'UNBLOCKING' argument (And removing it)
     * @param id The id of the execution
     */
    getResultsBlocking(id: string): CommandData;
    /**
     * Retrieving information about the cluster
     */
    infocluster(): CommandData;
    /**
     * Executing a python function
     * @param func The function
     * @param options The additional optional arguments
     */
    pyexecute(func: string, options?: RGPyExecuteParameters): CommandData;
    /**
     * Retrieving memory usage statistics from the 'Python interpreter'
     */
    pystats(): CommandData;
    /**
     * Retrieving a list of all the python requirements available
     */
    pydumpreqs(): CommandData;
    /**
     * Refreshing the node's view of the cluster's topology
     */
    refreshCluster(): CommandData;
    /**
     * Triggering the execution of a registered 'CommandReader' function
     * @param trigger The trigger's name
     * @param args The additional arguments
     */
    trigger(trigger: string, args: string[]): CommandData;
    /**
     * Removing the registration of a function
     * @param id The id of the execution
     */
    unregister(id: string): CommandData;
}
