import { CommandData } from "../module.base";
import { TDigestAddParameters } from "./redisbloom-tdigest.types";
export declare class BloomTdigestCommander {
    /**
     * Allocate the memory and initialize the t-digest
     * @param key The name of the sketch
     * @param compression The compression parameter. 100 is a common value for normal uses. 1000 is extremely large. See the further notes bellow.
     * @returns OK on success, error otherwise
     */
    create(key: string, compression: number): CommandData;
    /**
     * Reset the sketch to zero - empty out the sketch and re-initialize it
     * @param key The name of the sketch
     * @returns OK on success, error otherwise
     */
    reset(key: string): CommandData;
    /**
     * Adds one or more samples to a sketch
     * @param key The name of the sketch
     * @param parameters The parameters of the command
     * @returns OK on success, error otherwise
     */
    add(key: string, parameters: TDigestAddParameters[]): CommandData;
    /**
     * Merges all of the values from 'from' to 'this' sketch
     * @param fromKey Sketch to copy values to
     * @param toKey Sketch to copy values from
     * @returns OK on success, error otherwise
     */
    merge(fromKey: string, toKey: string): CommandData;
    /**
     * Get minimum value from the sketch. Will return DBL_MAX if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MAX if the sketch is empty
     */
    min(key: string): CommandData;
    /**
     * Get maximum value from the sketch. Will return DBL_MIN if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MIN if the sketch is empty
     */
    max(key: string): CommandData;
    /**
     * Returns an estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     * @param key The name of the sketch
     * @param quantile The desired fraction ( between 0 and 1 inclusively )
     * @returns Double value estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     */
    quantile(key: string, quantile: number): CommandData;
    /**
     * Returns the fraction of all points added which are <= value
     * @param key The name of the sketch
     * @param value Upper limit for which the fraction of all points added which are <= value
     * @returns Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight
     */
    cdf(key: string, value: number): CommandData;
    /**
     * Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight.
     * @param key The name of the sketch
     */
    info(key: string): CommandData;
}
