export async function loadJSONFile(env, key) {
  const res = await fetch(`${env.ASSETS_BASE_URL}/data/${key}`);
  if (!res.ok) {
    throw new Error(`Mock file ${key} not found`);
  }
  return await res.json();
}
