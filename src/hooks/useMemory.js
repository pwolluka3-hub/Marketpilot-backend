import { buildContextFromMemory } from '../services/memoryService';

/**
 * Exposes memory utilities for building a context from stored memory.
 * @returns {{buildContextFromMemory: function}} An object containing `buildContextFromMemory`, a function that constructs a context from memory data.
 */
export function useMemory() {
  return { buildContextFromMemory };
}