/// <reference types="node" />
import { CommandData } from "../module.base";
import { AIBackend, AIDagExecuteParameters, AIDevice, AIModelExecute, AIModelSetParameters, AIScriptExecuteParameters, AIScriptSetParameters, TensorType } from "./redis-ai.types";
export declare class RedisAICommander {
    /**
     * Setting a tensor
     * @param key The tensor's key name
     * @param type The tensor's data type can be one of: FLOAT , DOUBLE , INT8 , INT16 , INT32 , INT64 , UINT8 or UINT16
     * @param data The tensor's data (binary/numberic)
     * @param shape One or more dimensions, or the number of elements per axis, for the tensor
     */
    tensorset(key: string, type: TensorType, shapes: number[], data?: number[] | Buffer[]): CommandData;
    /**
     * Retrieving a tensor
     * @param key The tensor's key name
     * @param meta Returns the tensor's metadata
     * @param format The tensor's reply format can be one of the following (BLOB/VALUES)
     */
    tensorget(key: string, format?: 'BLOB' | 'VALUES', meta?: boolean): CommandData;
    /**
     * Setting a model
     * @param key The model's key name
     * @param backend The backend of the model
     * @param device The devide of the model
     * @param model The Protobuf-serialized model. Since Redis supports strings up to 512MB, blobs for very large
     * @param options Additional optional parameters
     */
    modelstore(key: string, backend: AIBackend, device: AIDevice, model: Buffer, options?: AIModelSetParameters): CommandData;
    /**
     * Retrieving a model
     * @param key The model's key name
     * @param meta Will return the model's meta information on backend, device and tag
     * @param blob Will return the model's blob containing the serialized model
     */
    modelget(key: string, meta?: boolean, blob?: boolean): CommandData;
    /**
     * Deleting a model
     * @param key The model's key name
     */
    modeldel(key: string): CommandData;
    /**
     * Running a model
     * @param key The model's key name
     * @param parameters The parameters of 'AI.MODELEXECUTE'
     */
    modelexecute(key: string, parameters: AIModelExecute): CommandData;
    /**
     * Scanning a model
     */
    modelscan(): CommandData;
    /**
     * Setting a script
     * @param key The script's key name
     * @param parameters Additional optional parameters
     */
    scriptset(key: string, parameters: AIScriptSetParameters): CommandData;
    /**
     * Retrieving a script
     * @param key The script's key name
     * @param meta The script's device as a String
     * @param source The script's source code as a String
     */
    scriptget(key: string, meta?: boolean, source?: boolean): CommandData;
    /**
     * Deleting a script
     * @param key The script's key name
     */
    scriptdel(key: string): CommandData;
    /**
     * Running a script
     * @param key The script's key nameb
     * @param functionName The name of the function to run
     * @param parameters The parameters of the 'AI.SCRIPTEXECUTE' command
    */
    scriptexecute(key: string, functionName: string, parameters: AIScriptExecuteParameters): CommandData;
    /**
     * Scanning a script
     */
    scriptscan(): CommandData;
    /**
     * Running a DAG
     * @param parameters Additional parameters required for the 'AI.DAGEXECUTE' command
     * @param commands The commands sent to the 'AI.DAGEXECUTE' command
     */
    dagexecute(parameters: AIDagExecuteParameters, commands: string[]): CommandData;
    /**
     * Running a readonly DAG
     * @param parameters Additional parameters required for the 'AI.DAGEXECUTE_RO' command
     * @param commands The commands sent to the 'AI.DAGEXECUTE_RO' command
     */
    dagexecuteRO(parameters: AIDagExecuteParameters, commands: string[]): CommandData;
    /**
     * Generating the dagexecute CLI arguments
     * @param parameters Additional parameters required for the DAG command
     * @param commands The given commands
     */
    private generateDagRunArguments;
    /**
     * Retrieving script/model info
     * @param key The key name of a model or script
     * @param RESETSTAT Resets all statistics associated with the key
     */
    info(key: string, RESETSTAT?: boolean): CommandData;
    /**
     * Restrieving configuration
     * @param path Specifies the default base backends path to path . The backends path is used when dynamically loading a backend (default: '{module_path}/backends', where module_path is the module's path).
     * @param backend  Loads the DL/ML backend specified by the backend identifier from path . If path is relative, it is resolved by prefixing the BACKENDSPATH to it. If path is absolute then it is used as is.
     */
    config(path: string, backend?: AIBackend): CommandData;
}
