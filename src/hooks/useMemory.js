import { buildContextFromMemory } from '../services/memoryService';

/**
 * Exposes memory-related utilities from the memory service.
 *
 * @returns {Object} An object exposing the `buildContextFromMemory` function.
 */
export function useMemory() {
  return { buildContextFromMemory };
}