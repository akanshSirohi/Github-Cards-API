/**
 * gradientFactory.js
 * ------------------------------------------------------------
 * Export one function that returns a CSS gradient string.
 * The gradient is either linear or radial and uses 2-5
 * analogous colours expressed as HEX codes (e.g. #ff6699).
 * ------------------------------------------------------------
 */

export function generateRandomGradient() {
    /* ---------- helpers ---------- */
    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    // convert HSL → HEX --------------------------------------------------------
    const hslToHex = (h, s, l) => {
        s /= 100; l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))))
                .toString(16)
                .padStart(2, "0");
        return `#${f(0)}${f(8)}${f(4)}`; // R G B
    };

    /* ---------- pick gradient meta ---------- */
    const type = Math.random() < 0.5 ? "linear" : "radial";
    const angle = Math.round(rand(0, 360));      // linear only
    const shape = pick(["circle", "ellipse"]);   // radial only
    const extent = pick([
        "closest-side",
        "farthest-side",
        "closest-corner",
        "farthest-corner",
    ]);

    /* ---------- build harmonious palette ---------- */
    const stopCount = Math.floor(rand(2, 6)); // 2-5 stops
    const baseHue = rand(0, 360);
    const offsets = [0];

    for (let i = 1; i < stopCount; i++) {
        const delta = rand(10, 30) * (i % 2 === 0 ? 1 : -1); // ±30° window
        offsets.push(delta);
    }

    const colourStops = offsets.map((off, i) => {
        const h = (baseHue + off + 360) % 360;
        const s = rand(60, 80);      // lively but not neon
        const l = rand(45, 65);      // avoid mud / glare
        const hex = hslToHex(h, s, l);
        const pos = Math.round((i / (stopCount - 1)) * 100);
        return `${hex} ${pos}%`;
    });

    /* ---------- assemble CSS gradient ---------- */
    return type === "linear"
        ? `linear-gradient(${angle}deg, ${colourStops.join(", ")})`
        : `radial-gradient(${shape} ${extent} at ${Math.round(rand(20, 80))}% ${Math.round(
            rand(20, 80)
        )}%, ${colourStops.join(", ")})`;
}  