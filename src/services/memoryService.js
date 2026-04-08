import { fsRead, fsWrite } from './puterService';

const ROOT = '/NexusAI';

/**
 * Save the brand kit to the project's brand/brandkit.json file.
 * @param {object} brandKit - Brand kit data to persist.
 * @returns {*} The result of the file write operation.
 */
export async function saveBrandKit(brandKit) {
  return fsWrite(`${ROOT}/brand/brandkit.json`, brandKit);
}

/**
 * Load the brand kit configuration from storage.
 * @returns {Object} The brand kit object parsed from /NexusAI/brand/brandkit.json.
 */
export async function loadBrandKit() {
  return fsRead(`${ROOT}/brand/brandkit.json`);
}

/**
 * Persist a draft object to the drafts directory using its `id` as the filename.
 *
 * @param {Object} draft - Draft object that must include an `id` property; the file will be saved to `content/drafts/{id}.json`.
 * @returns {any} The result of writing the draft file (value returned by `fsWrite`).
 */
export async function saveDraft(draft) {
  return fsWrite(`${ROOT}/content/drafts/${draft.id}.json`, draft);
}

/**
 * Construct a context object by loading the persisted brand kit and chat-history summary from disk.
 *
 * @returns {{brand: any, history: any}} An object with `brand` containing the contents of `brand/brandkit.json` and `history` containing the contents of `system/chat-history/summary.json`.
 */
export async function buildContextFromMemory() {
  const [brand, history] = await Promise.all([
    fsRead(`${ROOT}/brand/brandkit.json`),
    fsRead(`${ROOT}/system/chat-history/summary.json`)
  ]);
  return { brand, history };
}