/**
 * UniqueNumber
 *
 * Unique sequential number generator.
 * Useful for IDs.
 */
import { IUniqueNumber } from "./IUniqueNumber";
export declare class UniqueNumber implements IUniqueNumber {
    private unique;
    constructor();
    readonly next: number;
}