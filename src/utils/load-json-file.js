export async function loadJSONFile(env, key) {
  const res = await fetch(`${env.ASSETS_BASE_URL}/data/${key}`);
  if (!res.ok) {
    console.error(`Data file ${key} not found`);
    return null;
  }
  return await res.json();
}
