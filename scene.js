const SCENE = {
    swimmers: [
        { symbol: "fish",   groups: 4, school: 5, top: [22, 70], size: [26, 44],   dur: [30, 50],  face: 1,  opacity: 0.6,  colors: ["#ffb347", "#ff8b6b", "#ffd166", "#9be7ef"] },
        { symbol: "fish",   groups: 3, school: 1, top: [50, 90], size: [50, 80],   dur: [40, 60],  face: 1,  opacity: 0.45, colors: ["#6fd0e8", "#b8a4ff", "#7be0b0"] },
        { symbol: "turtle", groups: 2, school: 1, top: [35, 65], size: [90, 120],  dur: [90, 120], face: 1,  opacity: 0.5,  colors: ["#7fb88a", "#9cc47a"] },
        { symbol: "whale",  groups: 1, school: 1, top: [68, 82], size: [380, 460], dur: [160, 200], face: -1, opacity: 0.28, colors: ["#0b3550"] }
    ],
    drifters: [{ symbol: "jelly", count: 6, top: [30, 88], size: [34, 60], dur: [8, 14], opacity: 0.55, colors: ["#ff9ad5", "#c9a7ff", "#9ef3ff"] }],
    bubbles: 18,
    seabed: [
        { symbol: "weed",  left: 2,  size: 54,  color: "#2f9e6b" },  { symbol: "coral", left: 7,  size: 90,  color: "#ff6f91" },
        { symbol: "fan",   left: 14, size: 120, color: "#b46bff" },  { symbol: "tube",  left: 22, size: 80,  color: "#ffb347" },
        { symbol: "weed",  left: 29, size: 70,  color: "#3dbb7a" },  { symbol: "coral", left: 37, size: 110, color: "#ff8f5a" },
        { symbol: "tube",  left: 46, size: 70,  color: "#ff6fb5" },  { symbol: "fan",   left: 54, size: 100, color: "#ff5e7e" },
        { symbol: "weed",  left: 61, size: 60,  color: "#2f9e6b" },  { symbol: "coral", left: 68, size: 95,  color: "#c58bff" },
        { symbol: "tube",  left: 76, size: 90,  color: "#ffd166" },  { symbol: "fan",   left: 84, size: 115, color: "#ff8f5a" },
        { symbol: "coral", left: 91, size: 85,  color: "#ff6f91" },  { symbol: "weed",  left: 96, size: 56,  color: "#3dbb7a" }
    ],
    crabs: 2
};

(() => {
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sized = (symbol) => {
        const vb = document.getElementById(symbol).getAttribute("viewBox").split(" ");
        return `<svg viewBox="${vb.join(" ")}"><use href="#${symbol}"/></svg>`;
    };

    const ocean = document.getElementById("ocean");
    const seabed = document.getElementById("seabed");
    const bubbles = document.getElementById("bubbles");

    seabed.innerHTML = SCENE.seabed.map((s, i) =>
        `<span class="reef" style="--left:${s.left}%;--size:${s.size}px;--c:${s.color};--delay:${(-rnd(0, 6)).toFixed(1)}s;--sway:${rnd(4, 7).toFixed(1)}s">${sized(s.symbol)}</span>`
    ).join("") + Array.from({ length: SCENE.crabs }, () =>
        `<span class="crab" style="--top:${rnd(0, 14).toFixed(0)}px;--dur:${rnd(18, 30).toFixed(0)}s;--delay:${(-rnd(0, 20)).toFixed(0)}s">${sized("crab")}</span>`
    ).join("");

    if (still) return;

    const html = [];
    SCENE.swimmers.forEach((cfg) => {
        for (let g = 0; g < cfg.groups; g++) {
            const dir = Math.random() < 0.5 ? 1 : -1;
            const top = rnd(...cfg.top), size = rnd(...cfg.size), dur = rnd(...cfg.dur), delay = -rnd(0, dur), color = pick(cfg.colors);
            for (let k = 0; k < cfg.school; k++) {
                const s = size * rnd(0.85, 1.15);
                html.push(`<div class="creature swimmer" style="--top:calc(${top.toFixed(1)}% + ${(k * rnd(8, 18) * (k % 2 ? 1 : -1)).toFixed(0)}px);--size:${s.toFixed(0)}px;--dur:${dur.toFixed(1)}s;--delay:${(delay - k * rnd(0.4, 1.2)).toFixed(1)}s;--from:${dir === 1 ? "-25vw" : "110vw"};--to:${dir === 1 ? "110vw" : "-25vw"};--flip:${dir * cfg.face};--c:${color};--o:${cfg.opacity}"><span class="bob" style="--bob:${rnd(3, 6).toFixed(1)}s">${sized(cfg.symbol)}</span></div>`);
            }
        }
    });
    SCENE.drifters.forEach((cfg) => {
        for (let n = 0; n < cfg.count; n++) {
            html.push(`<div class="creature drifter" style="--top:${rnd(...cfg.top).toFixed(1)}%;--left:${rnd(2, 92).toFixed(0)}%;--size:${rnd(...cfg.size).toFixed(0)}px;--dur:${rnd(...cfg.dur).toFixed(1)}s;--delay:${(-rnd(0, 10)).toFixed(1)}s;--c:${pick(cfg.colors)};--o:${cfg.opacity}">${sized(cfg.symbol)}</div>`);
        }
    });
    ocean.innerHTML = html.join("");

    bubbles.innerHTML = Array.from({ length: SCENE.bubbles }, () =>
        `<i style="--x:${rnd(0, 100).toFixed(0)}%;--s:${rnd(5, 14).toFixed(0)}px;--dur:${rnd(10, 22).toFixed(0)}s;--delay:${(-rnd(0, 22)).toFixed(0)}s"></i>`
    ).join("");
})();