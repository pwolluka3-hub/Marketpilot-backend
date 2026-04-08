const ensurePuter = () => {
  if (!window.puter) {
    throw new Error('Puter.js is not loaded');
  }
  return window.puter;
};

export const puterAuth = async () => {
  try {
    const puter = ensurePuter();
    return await puter.auth.signIn();
  } catch (error) {
    throw new Error(`Auth failed: ${error.message}`);
  }
};

export const kvGet = async (key) => {
  try {
    const puter = ensurePuter();
    return await puter.kv.get(key);
  } catch (error) {
    throw new Error(`KV get failed: ${error.message}`);
  }
};

export const kvSet = async (key, value) => {
  try {
    const puter = ensurePuter();
    return await puter.kv.set(key, value);
  } catch (error) {
    throw new Error(`KV set failed: ${error.message}`);
  }
};

export const fsWrite = async (path, data) => {
  try {
    const puter = ensurePuter();
    return await puter.fs.write(path, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`FS write failed: ${error.message}`);
  }
};

export const fsRead = async (path) => {
  try {
    const puter = ensurePuter();
    const raw = await puter.fs.read(path);
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const puterText = async ({ model, messages }) => {
  const puter = ensurePuter();
  return puter.ai.chat(messages, { model });
};

export const puterImage = async (prompt) => {
  const puter = ensurePuter();
  return puter.ai.txt2img(prompt);
};
