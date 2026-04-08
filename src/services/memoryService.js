import { fsRead, fsWrite } from './puterService';

const ROOT = '/NexusAI';

/**
 * Persist the provided brand kit to the service's brand storage.
 *
 * @param {Object} brandKit - Brand kit data to save (written to /NexusAI/brand/brandkit.json).
 * @returns {any} The result returned by the underlying filesystem write operation.
 */
export async function saveBrandKit(brandKit) {
  return fsWrite(`${ROOT}/brand/brandkit.json`, brandKit);
}

/**
 * Load the project's brand kit from persistent storage.
 * @returns {Promise<Object>} The brand kit object loaded from storage.
 */
export async function loadBrandKit() {
  return fsRead(`${ROOT}/brand/brandkit.json`);
}

/**
 * Save a draft object to the content/drafts directory using its `id` as the filename.
 * @param {Object} draft - Draft to save; must include an `id` property used to name the file (`${id}.json`).
 * @returns {*} The result returned by the filesystem write operation.
 */
export async function saveDraft(draft) {
  return fsWrite(`${ROOT}/content/drafts/${draft.id}.json`, draft);
}

/**
 * Load stored brand kit and chat history summary into a context object.
 * @returns {{brand: any, history: any}} An object with `brand` (contents of /NexusAI/brand/brandkit.json) and `history` (contents of /NexusAI/system/chat-history/summary.json).
 */
export async function buildContextFromMemory() {
  const [brand, history] = await Promise.all([
    fsRead(`${ROOT}/brand/brandkit.json`),
    fsRead(`${ROOT}/system/chat-history/summary.json`)
  ]);
  return { brand, history };
}