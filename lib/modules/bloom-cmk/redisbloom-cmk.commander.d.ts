import { CommandData } from "../module.base";
import { CMKIncrbyItems } from "./redisbloom-cmk.types";
export declare class BloomCmkCommander {
    /**
     * Initializes a Count-Min Sketch to dimensions specified by user.
     * @param key The name of the sketch.
     * @param width The number of counter in each array. Reduces the error size.
     * @param depth The number of counter-arrays. Reduces the probability for an error of a certain size (percentage of total count).
     */
    initbydim(key: string, width: number, depth: number): CommandData;
    /**
     * Initializes a Count-Min Sketch to accommodate requested capacity.
     * @param key The name of the sketch.
     * @param errorSize Estimate size of error. The error is a percent of total counted items. This effects the width of the sketch.
     * @param probability The desired probability for inflated count.
     */
    initbyprob(key: string, errorSize: number, probability: number): CommandData;
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    incrby(key: string, items: CMKIncrbyItems[]): CommandData;
    /**
     * Returns count for item's.
     * @param key The name of the sketch.
     * @param items A list of items.
     */
    query(key: string, items: string[]): CommandData;
    /**
     * Merges several sketches into one sketch.
     * @param dest The name of destination sketch.
     * @param numKeys The number of sketches to be merged.
     * @param sources The names of source sketches to be merged.
     * @param weights A multiple of each sketch. Default =1.
     */
    merge(dest: string, numKeys: number, sources: string[], weights?: number[]): CommandData;
    /**
     * Returning information about a key
     * @param key The key of the 'CMS.INFO' command
     */
    info(key: string): CommandData;
}
