import createHarfBuzz from './hb.js';    // your Emscripten‐compiled .js
import hbjsWrapper    from './hbjs.js';  // the hbjs wrapper

let _harfbuzz = null;
async function getHarfbuzz() {
  if (_harfbuzz) return _harfbuzz;

  // override Emscripten’s fetch logic so it never tries to read document.currentScript
  const Module = await createHarfBuzz({
    // instantiateWasm is called instead of fetch/locateFile
    instantiateWasm(imports, success) {
      // resolve URL relative to this module
      const wasmURL = new URL('http://localhost:8787/assets/hb.wasm').toString();
      return fetch(wasmURL)
        .then(r => r.arrayBuffer())
        .then(bytes => WebAssembly.instantiate(bytes, imports))
        .then(({ instance, module }) => success(instance, module))
        .then(inst => inst.exports);
    },
    // stub locateFile so we never hit the default URL logic
    locateFile: () => 'hb.wasm',
  });

  _harfbuzz = hbjsWrapper(Module);
  return _harfbuzz;
}

/**
 * Shape `text` with the font in `fontBuf` (Uint8Array) at `fontSize` units → returns
 *   { pathD: string, bbox: "xmin ymin width height" }
 */
export async function shapeToPath(fontBuf, text, fontSize = 1000) {
  const hb = await getHarfbuzz();

  // 1) shape
  const blob = hb.createBlob(fontBuf);
  const face = hb.createFace(blob, 0);
  const font = hb.createFont(face);
  font.setScale(fontSize, fontSize);

  const buf = hb.createBuffer();
  buf.addText(text);
  buf.guessSegmentProperties();
  hb.shape(font, buf);
  const result = buf.json(font);  // [{ g, ax, ay, dx, dy }, ...]

  // 2) collect glyph‐outlines once
  const glyphs = {};
  for (let { g } of result) {
    if (!glyphs[g]) glyphs[g] = font.glyphToJson(g);
  }

  // 3) build absolute commands & measure bbox
  let x = 0, y = 0;
  let xmin = Infinity, ymin = Infinity;
  let xmax = -Infinity, ymax = -Infinity;
  const cmds = [];

  for (let { g, ax, ay, dx, dy } of result) {
    for (let cmd of glyphs[g]) {
      if (cmd.type === 'Z') continue;
      const vals = cmd.values.slice();
      for (let i = 0; i < vals.length; i++) {
        if (i % 2 === 0) {
          // X
          vals[i] = vals[i] + x + dx;
          xmin = Math.min(xmin, vals[i]);
          xmax = Math.max(xmax, vals[i]);
        } else {
          // Y (invert so up is up)
          vals[i] = -(vals[i] + y + dy);
          ymin = Math.min(ymin, vals[i]);
          ymax = Math.max(ymax, vals[i]);
        }
      }
      cmds.push([cmd.type, ...vals]);
    }
    x += ax; y += ay;
  }

  // 4) to path string
  const pathD = cmds
    .map(c => c[0] + ' ' + c.slice(1).join(' '))
    .join(' ')
    .replace(/ -/g, '-');

  // 5) pad & box
  const pad = Math.round(Math.min((xmax-xmin)/10, (ymax-ymin)/10));
  xmin -= pad; ymin -= pad;
  const width  = xmax - xmin + pad*2;
  const height = ymax - ymin + pad*2;
  const bbox   = [xmin, ymin, width, height].join(' ');

  // 6) cleanup
  buf.destroy(); font.destroy(); face.destroy(); blob.destroy();

  return { pathD, bbox };
}
