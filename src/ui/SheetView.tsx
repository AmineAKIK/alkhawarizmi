import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { sheetTabs } from "../data/schema";
import type {
  DevSheet,
  PracticeConception,
  PracticeSection,
  SheetNode,
  SheetPart,
  SheetTab,
} from "../data/schema";
import { buildSheetPath, type AppPath } from "../data/catalog";
import { nodeKindColors, nodeKindLabels, nodeLevelColors, positioningText, section4Titles, svgTextConfig } from "../data/presentation";

export function SheetView({
  sheet,
  nodeId,
  tabId,
  currentSearch,
  onNavigate,
  onReplace,
}: {
  sheet: DevSheet;
  nodeId: string | null;
  tabId: string | null;
  currentSearch: string;
  onNavigate: (path: AppPath) => void;
  onReplace: (path: AppPath) => void;
}) {
  const fallbackTab = sheet.tabs[0]?.id ?? (Object.keys(sheet.maps)[0] as SheetTab | undefined);
  const requestedTab = isSheetTab(tabId) ? tabId : null;
  const currentTab = (requestedTab && sheet.maps[requestedTab] ? requestedTab : fallbackTab) ?? "universel";
  const mapNodeIds = new Set((sheet.maps[currentTab]?.nodes ?? []).map((node) => node.id));
  const activeNodeId = nodeId && sheet.nodes[nodeId] && mapNodeIds.has(nodeId) ? nodeId : null;
  const activeNode = activeNodeId ? sheet.nodes[activeNodeId] : null;
  const [titleLine1, titleLine2] = sheet.titleLines!;
  const mapAreaRef = useRef<HTMLElement | null>(null);
  const [mapState, setMapState] = useState<"visible" | "hiding" | "hidden">(activeNodeId ? "hidden" : "visible");

  useEffect(() => {
    if (activeNodeId) {
      setMapState("hiding");
      const el = mapAreaRef.current;
      if (!el) return;
      const onEnd = () => setMapState("hidden");
      el.addEventListener("animationend", onEnd, { once: true });
      return () => el.removeEventListener("animationend", onEnd);
    } else {
      setMapState("visible");
    }
  }, [activeNodeId]);

  useEffect(() => {
    if (tabId && tabId !== currentTab) {
      onReplace(buildSheetPath(sheet, currentTab, activeNodeId, new URLSearchParams(currentSearch)));
      return;
    }
    if (nodeId && !activeNodeId) {
      onReplace(buildSheetPath(sheet, currentTab, null, new URLSearchParams(currentSearch)));
    }
  }, [activeNodeId, currentSearch, currentTab, nodeId, onReplace, sheet, tabId]);

  const visibleKinds = Array.from(
    new Set(
      (sheet.maps[currentTab]?.nodes ?? [])
        .map((n) => sheet.nodes[n.id]?.kind)
        .filter(Boolean)
    )
  ) as SheetNode["kind"][];

  return (
    <article className="sheet-shell">
      <header className="sheet-header">
        <div>
          <div className="badge">{sheet.badge}</div>
          <h1>
            {titleLine1}
            <br />
            <span>{titleLine2}</span>
          </h1>
          <p>{sheet.subtitle}</p>
        </div>
        <div className="header-meta">
          {sheet.meta.map((line) => (
            <span className="meta-line" key={line}>
              {line}
              <br />
            </span>
          ))}
          <span>● {sheet.status}</span>
        </div>
      </header>

      <PositioningBand />

      {sheet.tabs.length > 1 && (
        <div className="os-tabs">
          {sheet.tabs.map((tab) => (
            <a
              className={`os-tab ${currentTab === tab.id ? "active" : ""}`}
              href={buildSheetPath(sheet, tab.id, null, new URLSearchParams(currentSearch))}
              key={tab.id}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                onNavigate(buildSheetPath(sheet, tab.id, null, new URLSearchParams(currentSearch)));
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      )}

      <section
        className={`map-area${mapState === "visible" ? " is-visible" : mapState === "hiding" ? " is-hiding" : ""}`}
        ref={mapAreaRef}
      >
        <div className="map-hint">↓ Clique sur un nœud pour explorer</div>
        <SystemMap
          sheet={sheet}
          tab={currentTab}
          activeNodeId={activeNodeId}
          onSelect={(nextNodeId) =>
            onNavigate(buildSheetPath(sheet, currentTab, nextNodeId, new URLSearchParams(currentSearch)))
          }
        />
        <div className="legend">
          {visibleKinds.map((kind) => (
            <span className="legend-item" key={kind}>
              <span className="legend-dot" style={{ background: nodeKindColors[kind] }} />
              {nodeKindLabels[kind]}
            </span>
          ))}
        </div>
      </section>

      {activeNode && (
        <NodePanel
          node={activeNode}
          part={sheet.part}
          onClose={() => onNavigate(buildSheetPath(sheet, currentTab, null, new URLSearchParams(currentSearch)))}
        />
      )}
    </article>
  );
}

function PositioningBand() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("positioning-band-dismissed") === "1");

  if (dismissed) return null;

  return (
    <section className="positioning-band">
      <p>{positioningText}</p>
      <button
        className="positioning-band-close"
        aria-label="Fermer"
        onClick={() => {
          localStorage.setItem("positioning-band-dismissed", "1");
          setDismissed(true);
        }}
      >
        ✕
      </button>
    </section>
  );
}

function SystemMap({
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

function isSheetTab(value: string | null): value is SheetTab {
  return value !== null && (sheetTabs as readonly string[]).includes(value);
}

function renderSystemMapContent(
  sheet: DevSheet,
  tab: SheetTab,
  map: NonNullable<(typeof sheet.maps)[SheetTab]>,
  activeNodeId: string | null,
  onSelect: (id: string) => void,
) {
  return (
    <div className="map-container">
      <svg viewBox={map.viewBox} xmlns="http://www.w3.org/2000/svg" width="100%">
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
        {map.nodes.map((node) => {
          const data = sheet.nodes[node.id];
          if (!data) return null;
          const cx = node.x + node.w / 2;
          const cy = node.y + node.h / 2;
          const active = activeNodeId === node.id;
          const labelLines = wrapSvgLabel(data.label, Math.max(8, Math.floor(node.w / svgTextConfig.widthDivisor)));
          const firstLineY = cy - Math.max(0, labelLines.length - 1) * 7;

          return (
            <g
              className={`node-group ${active ? "active-node" : ""}`}
              key={node.id}
              onClick={() => onSelect(node.id)}
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

function NodePanel({
  node,
  part,
  onClose,
}: {
  node: SheetNode;
  part: SheetPart;
  onClose: () => void;
}) {
  return (
    <section className="zoom-panel visible">
      <button className="zoom-back" onClick={onClose}>
        <ArrowLeft size={16} />
        Retour à la carte
      </button>

      <div className="zoom-header">
        <div
          className="zoom-icon"
          style={{ background: `${nodeKindColors[node.kind]}22`, color: nodeKindColors[node.kind] }}
        >
          {node.icon}
        </div>
        <div>
          <div className="zoom-title">{node.label}</div>
          <div className="zoom-tags">
            <span
              className="zoom-os-tag"
              style={{
                color: nodeKindColors[node.kind],
                borderColor: `${nodeKindColors[node.kind]}55`,
              }}
            >
              {node.osLabel}
            </span>
            {node.niveau && (
              <span
                className="zoom-level-tag"
                style={{
                  color: nodeLevelColors[node.niveau],
                  borderColor: `${nodeLevelColors[node.niveau]}55`,
                }}
              >
                {node.niveau}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="sections-grid">
        <InfoSection kind="why" icon="⚡" title="Pourquoi ça existe" body={node.sections.why} />
        <InfoSection
          kind="sys"
          icon="🔗"
          title="Sa place dans le système"
          body={node.sections.system}
        />
        <ChoiceSectionView node={node} />
        <InfoSection
          kind="sen"
          icon="🧠"
          title={section4Titles[part]}
          body={node.sections.senior}
        />
        <InfoSection
          kind="err"
          icon="⚠"
          title="Les erreurs classiques"
          body={node.sections.errors}
        />
        <InfoSection kind="inv" icon="♾" title="Les invariants" body={node.sections.invariants} />
        <PracticeSectionView node={node} />
        {node.sections.verification && (
          <VerificationSection questions={node.sections.verification} />
        )}
      </div>
    </section>
  );
}

function InfoSection({
  kind,
  icon: Icon,
  title,
  body,
}: {
  kind: string;
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <section className={`section s-${kind}`}>
      <div className="section-header">
        <div className="section-icon">{Icon}</div>
        <div className="section-title">{title}</div>
      </div>
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}

function ChoiceSectionView({ node }: { node: SheetNode }) {
  const cho = node.sections.choice;

  return (
    <section className="section s-cho">
      <div className="section-header">
        <div className="section-icon">⚖</div>
        <div className="section-title">Le choix conscient</div>
      </div>
      {cho.kind === "free" ? (
        <div className="rich-text" dangerouslySetInnerHTML={{ __html: cho.html }} />
      ) : (
        <>
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: cho.main }} />
          <div className="alts">
            {cho.alternatives.map((alt) => (
              <div className="alt-item" key={alt.name}>
                <div className="alt-name">{alt.name}</div>
                <div className="alt-desc">{alt.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function isPracticeConception(p: PracticeSection | PracticeConception): p is PracticeConception {
  return "exercices" in p;
}

function PracticeSectionView({ node }: { node: SheetNode }) {
  const practice = node.sections.practice;

  if (isPracticeConception(practice)) {
    return <PracticeConceptionView practice={practice} />;
  }

  return (
    <section className="section s-pra section-full">
      <div className="section-header">
        <div className="section-icon">⌨</div>
        <div className="section-title">Pratique</div>
      </div>
      <div className="cmd-list">
        {practice.commands.map((command) => (
          <div
            className={`cmd ${command.type === "comment" ? "comment" : ""} ${command.type === "snippet" ? "snippet" : ""}`}
            key={`${command.type}-${command.value}`}
          >
            {command.value}
          </div>
        ))}
      </div>
      {practice.verification && (
        <div className="practice-check">{practice.verification}</div>
      )}
      <div className="debt">{practice.debt}</div>
    </section>
  );
}

function PracticeConceptionView({ practice }: { practice: PracticeConception }) {
  return (
    <section className="section s-pra section-full">
      <div className="section-header">
        <div className="section-icon">⌨</div>
        <div className="section-title">Pratique</div>
      </div>
      {practice.exercices.map((ex) => (
        <div className="exercice-item" key={ex.titre}>
          <div className="exercice-titre">{ex.titre}</div>
          <ol className="exercice-etapes">
            {ex.etapes.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ol>
          <div className="exercice-output">
            <strong>Output attendu :</strong> {ex.output}
          </div>
          <div className="exercice-critere">
            <strong>Critère :</strong> {ex.critere}
          </div>
        </div>
      ))}
      <div className="piege">{practice.piege}</div>
    </section>
  );
}

function VerificationSection({ questions }: { questions: string[] }) {
  return (
    <section className="section s-ver section-full">
      <div className="section-header">
        <div className="section-icon">✦</div>
        <div className="section-title">Vérifie ta compréhension</div>
      </div>
      <p className="verif-intro">
        Réponds mentalement à chacune de ces questions avant de passer au nœud suivant. Si tu
        hésites, relis la section concernée.
      </p>
      <ol className="verification-list">
        {questions.map((question, i) => (
          <li key={question}>
            <span className="verif-num">Q{i + 1}</span>
            {question}
          </li>
        ))}
      </ol>
    </section>
  );
}
