import { buildContextFromMemory } from '../services/memoryService';

/**
 * Exposes memory service utilities to callers.
 * @returns {{buildContextFromMemory: function}} An object with `buildContextFromMemory`, a function that builds a conversation context from persisted memory.
 */
export function useMemory() {
  return { buildContextFromMemory };
}
