import { fsRead, fsWrite } from './puterService';

const ROOT = '/NexusAI';

/**
 * Persist a brand kit object to the configured brand storage location.
 * @param {Object} brandKit - JSON-serializable object containing brand assets and metadata.
 * @returns {*} The result of the write operation returned by `fsWrite`.
 */
export async function saveBrandKit(brandKit) {
  return fsWrite(`${ROOT}/brand/brandkit.json`, brandKit);
}

/**
 * Load the stored brand kit JSON from the service root.
 *
 * @returns {any} The parsed brand kit object from /NexusAI/brand/brandkit.json.
 */
export async function loadBrandKit() {
  return fsRead(`${ROOT}/brand/brandkit.json`);
}

/**
 * Persist a draft object to the drafts directory using the draft's `id` as the filename.
 * @param {Object} draft - Draft data; must include an `id` property used to name the file (`<id>.json`).
 * @returns {*} The value returned by `fsWrite`.
 */
export async function saveDraft(draft) {
  return fsWrite(`${ROOT}/content/drafts/${draft.id}.json`, draft);
}

/**
 * Builds an in-memory context object by loading the stored brand kit and chat history summary.
 * @returns {{brand: any, history: any}} An object with `brand` containing the parsed brand kit and `history` containing the chat history summary.
 */
export async function buildContextFromMemory() {
  const [brand, history] = await Promise.all([
    fsRead(`${ROOT}/brand/brandkit.json`),
    fsRead(`${ROOT}/system/chat-history/summary.json`)
  ]);
  return { brand, history };
}
