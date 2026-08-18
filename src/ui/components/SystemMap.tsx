import type { DevSheet, SheetNode, SheetTab } from "../../data/schema";
import { nodeKindColors, nodeKindLabels, svgTextConfig } from "../../data/presentation";

export function SystemMap({
  sheet,
  tab,
  activeNodeId,
  onSelect,
}: {
  sheet: DevSheet;
  tab: SheetTab;
  activeNodeId: string | null;
  onSelect: (id: string) => void;
}) {
  const map = sheet.maps[tab];
  // Guard: tab must be present in maps, otherwise fall back to first available tab
  if (!map) {
    const fallbackTab = Object.keys(sheet.maps)[0] as SheetTab | undefined;
    if (!fallbackTab) return <div className="map-container">Aucune carte disponible.</div>;
    const fallbackMap = sheet.maps[fallbackTab];
    if (!fallbackMap) return null;
    return renderSystemMapContent(sheet, fallbackTab, fallbackMap, activeNodeId, onSelect);
  }

  return renderSystemMapContent(sheet, tab, map, activeNodeId, onSelect);
}

function renderSystemMapContent(
  sheet: DevSheet,
  tab: SheetTab,
  map: NonNullable<(typeof sheet.maps)[SheetTab]>,
  activeNodeId: string | null,
  onSelect: (id: string) => void,
) {
  const selectableNodes = map.nodes
    .map((node) => ({ mapNode: node, data: sheet.nodes[node.id] }))
    .filter((item): item is { mapNode: (typeof map.nodes)[number]; data: SheetNode } =>
      Boolean(item.data),
    );

  return (
    <>
      <div className="map-container" aria-label={`Carte systémique ${tab}`}>
        <svg
          viewBox={map.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          role="group"
          aria-labelledby={`map-title-${tab}`}
        >
          <title
            id={`map-title-${tab}`}
          >{`Carte systémique ${tab} : ${selectableNodes.length} nœuds explorables`}</title>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#2d3455" />
            </marker>
          </defs>
          {map.edges.map((edge, index) => {
            const { label, ...lineProps } = edge;
            const midX = (edge.x1 + edge.x2) / 2;
            const midY = (edge.y1 + edge.y2) / 2;

            return (
              <g className="edge-group" key={index}>
                <line className="edge" {...lineProps} />
                {label && (
                  <text className="edge-label" x={midX} y={midY - 6} textAnchor="middle">
                    {label}
                  </text>
                )}
              </g>
            );
          })}
          {selectableNodes.map(({ mapNode: node, data }) => {
            const cx = node.x + node.w / 2;
            const cy = node.y + node.h / 2;
            const active = activeNodeId === node.id;
            const labelLines = wrapSvgLabel(
              data.label,
              Math.max(8, Math.floor(node.w / svgTextConfig.widthDivisor)),
            );
            const firstLineY = cy - Math.max(0, labelLines.length - 1) * 7;

            return (
              <g
                aria-label={`Explorer ${data.label}`}
                className={`node-group ${active ? "active-node" : ""}`}
                key={node.id}
                onClick={() => onSelect(node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(node.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <rect
                  className="node-rect"
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="10"
                  fill={nodeKindColors[data.kind]}
                  fillOpacity={active ? "1" : "0.88"}
                />
                <text
                  className="node-label"
                  x={cx}
                  y={firstLineY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {labelLines.map((line, index) => (
                    <tspan
                      x={cx}
                      dy={index === 0 ? 0 : svgTextConfig.lineHeightPx}
                      key={`${node.id}-${line}`}
                      {...getSvgTextFit(line, node.w)}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mobile-map-list" aria-label="Nœuds de la carte">
        {selectableNodes.map(({ mapNode, data }, index) => (
          <button
            className={`mobile-node-card ${activeNodeId === mapNode.id ? "active-node" : ""}`}
            key={mapNode.id}
            onClick={() => onSelect(mapNode.id)}
            type="button"
          >
            <span className="mobile-node-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="mobile-node-main">
              <span className="mobile-node-title">{data.label}</span>
              <span className="mobile-node-meta">
                {nodeKindLabels[data.kind]}
                {data.niveau ? ` · ${data.niveau}` : ""}
              </span>
            </span>
            <span className="mobile-node-dot" style={{ background: nodeKindColors[data.kind] }} />
          </button>
        ))}
      </div>
    </>
  );
}

function wrapSvgLabel(label: string, maxChars: number) {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function getSvgTextFit(line: string, nodeWidth: number) {
  const maxWidth = nodeWidth - 22;
  const estimatedWidth = line.length * svgTextConfig.charWidthPx;

  if (estimatedWidth <= maxWidth) return {};

  return {
    textLength: maxWidth,
    lengthAdjust: "spacingAndGlyphs",
  };
}
