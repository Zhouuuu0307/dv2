/* Vega-Lite embedder for "A Country Known by Its Animals" */
const opt = { actions: false, renderer: "svg" };

/* ── Projection presets for chart5 / chart12 ── */
const ZOOM_PRESETS = {
  "All Australia":      { center: [134, -28],    scale: 650,   tx: 360, ty: 260 },
  "New South Wales":    { center: [146, -32],    scale: 2400,  tx: 360, ty: 260 },
  "Victoria":           { center: [144.5, -37],  scale: 3600,  tx: 360, ty: 260 },
  "Queensland":         { center: [145, -22],    scale: 1600,  tx: 360, ty: 260 },
  "South Australia":    { center: [135, -30],    scale: 2000,  tx: 360, ty: 260 },
  "Western Australia":  { center: [122, -26],    scale: 950,   tx: 360, ty: 260 },
  "Tasmania":           { center: [146.5, -42],  scale: 5000,  tx: 360, ty: 260 },
  "Northern Territory": { center: [133, -19],    scale: 1700,  tx: 360, ty: 260 },
  "ACT":                { center: [149.1, -35.5],scale: 13000, tx: 360, ty: 260 }
};

/* ── Projection presets for chart6 (smaller canvas: 440×400) ── */
const ZOOM_PRESETS_6 = {
  "All Australia":      { center: [134, -27],    scale: 490,   tx: 220, ty: 205 },
  "New South Wales":    { center: [146, -32],    scale: 1700,  tx: 220, ty: 205 },
  "Victoria":           { center: [144.5, -37],  scale: 2500,  tx: 220, ty: 205 },
  "Queensland":         { center: [145, -22],    scale: 1100,  tx: 220, ty: 205 },
  "South Australia":    { center: [135, -30],    scale: 1400,  tx: 220, ty: 205 },
  "Western Australia":  { center: [122, -26],    scale: 660,   tx: 220, ty: 205 },
  "Tasmania":           { center: [146.5, -42],  scale: 3500,  tx: 220, ty: 205 },
  "Northern Territory": { center: [133, -19],    scale: 1200,  tx: 220, ty: 205 },
  "ACT":                { center: [149.1, -35.5],scale: 9000,  tx: 220, ty: 205 }
};

/* ── Generic map zoom embedder ── */
function embedMap(chartId, specFile, presetName) {
  const presets = chartId === "chart6" ? ZOOM_PRESETS_6 : ZOOM_PRESETS;
  const p = presets[presetName] || presets["All Australia"];
  fetch(specFile)
    .then(r => r.json())
    .then(spec => {
      spec.projection.center    = p.center;
      spec.projection.scale     = p.scale;
      spec.projection.translate = [p.tx, p.ty];
      return vegaEmbed("#" + chartId, spec, opt);
    })
    .catch(err => console.error("Failed to load " + chartId + ":", err));
}

/* ── Embed all non-map charts ── */
["chart1","chart2","chart3","chart4",
 "chart7","chart8","chart9","chart10","chart11"].forEach(id => {
  vegaEmbed("#" + id, "vis/" + id + ".json", opt)
    .catch(err => console.error("Failed to load " + id + ":", err));
});

/* ── Initial embed for the three maps ── */
embedMap("chart5",  "vis/chart5.json",  "All Australia");
embedMap("chart6",  "vis/chart6.json",  "All Australia");
embedMap("chart12", "vis/chart12.json", "All Australia");

/* ── Wire up zoom selects ── */
document.addEventListener("DOMContentLoaded", () => {
  [
    { selectId: "chart5-zoom",  chartId: "chart5",  specFile: "vis/chart5.json"  },
    { selectId: "chart6-zoom",  chartId: "chart6",  specFile: "vis/chart6.json"  },
    { selectId: "chart12-zoom", chartId: "chart12", specFile: "vis/chart12.json" }
  ].forEach(({ selectId, chartId, specFile }) => {
    const sel = document.getElementById(selectId);
    if (sel) {
      sel.addEventListener("change", () => embedMap(chartId, specFile, sel.value));
    }
  });
});
