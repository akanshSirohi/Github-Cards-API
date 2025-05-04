// src/patch-hindi.js
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import { shapeToPath } from './libs/hb-shaper.js';

const SVGNS = 'http://www.w3.org/2000/svg';

export async function patchHindi(svgString, env, { fontBuf, text }) {
  // 1) shape → SVG path + bbox
  const { pathD, bbox } = await shapeToPath(fontBuf, text, /* fontSize */ 1000);

  // 2) parse existing SVG
  const dom    = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  const svg    = dom.documentElement;
  const victim = svg.querySelector('svg > path:last-of-type');
  if (!victim) throw new Error('Could not find target <path>');

  // 3) replace it
  const neo = dom.createElementNS(SVGNS, 'path');
  neo.setAttribute('d', pathD);
  for (let { name, value } of Array.from(victim.attributes)) {
    if (name !== 'd') neo.setAttribute(name, value);
  }
  victim.replaceWith(neo);
  svg.setAttribute('viewBox', bbox);

  // 4) serialize back
  return new XMLSerializer().serializeToString(svg);
}
