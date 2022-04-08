import { RISSet } from "./ris.types";
export declare class RedisIntervalSetsHelpers {
    /**
     * Parsing the iset.get command response
     * @param sets The list of sets
     */
    parseGet(sets: string[][]): RISSet[];
}
