import { fsRead, fsWrite } from './puterService';

const ROOT = '/NexusAI';

export async function saveBrandKit(brandKit) {
  return fsWrite(`${ROOT}/brand/brandkit.json`, brandKit);
}

export async function loadBrandKit() {
  return fsRead(`${ROOT}/brand/brandkit.json`);
}

export async function saveDraft(draft) {
  return fsWrite(`${ROOT}/content/drafts/${draft.id}.json`, draft);
}

export async function buildContextFromMemory() {
  const [brand, history] = await Promise.all([
    fsRead(`${ROOT}/brand/brandkit.json`),
    fsRead(`${ROOT}/system/chat-history/summary.json`)
  ]);
  return { brand, history };
}
