import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { buildReadableNodeQueue, buildReadableSections, type ReadableSection, type ReadableSectionKind } from "../audio/readableContent";
import { useSpeechReader, type SpeechReader, type SpeechReaderRate } from "../audio/useSpeechReader";
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
          <span className="meta-line">{sheet.readingTime} de lecture</span>
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
        {!activeNodeId && <div className="map-hint">Clique sur un nœud pour l'explorer</div>}
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
          key={activeNode.id}
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
  const selectableNodes = map.nodes
    .map((node) => ({ mapNode: node, data: sheet.nodes[node.id] }))
    .filter((item): item is { mapNode: typeof map.nodes[number]; data: SheetNode } => Boolean(item.data));

  return (
    <>
      <div className="map-container" aria-label={`Carte systémique ${tab}`}>
        <svg viewBox={map.viewBox} xmlns="http://www.w3.org/2000/svg" width="100%" role="img">
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
            const labelLines = wrapSvgLabel(data.label, Math.max(8, Math.floor(node.w / svgTextConfig.widthDivisor)));
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
              <span className="mobile-node-meta">{nodeKindLabels[data.kind]}{data.niveau ? ` · ${data.niveau}` : ""}</span>
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

function NodePanel({
  node,
  part,
  onClose,
}: {
  node: SheetNode;
  part: SheetPart;
  onClose: () => void;
}) {
  const reader = useSpeechReader();
  const readableSections = buildReadableSections(node, part);
  const readableNodeQueue = buildReadableNodeQueue(node, part);
  const readableByKind = new Map(readableSections.map((section) => [section.kind, section]));
  const getReadableSection = (kind: ReadableSectionKind) => readableByKind.get(kind);
  const isNodeReaderActive = reader.activeSection?.nodeId === node.id && reader.queue.length > 1 && reader.status !== "idle";
  const nodeReaderLabel = !reader.isSupported
    ? "Lecture audio indisponible"
    : isNodeReaderActive && reader.status === "playing"
      ? "Mettre la lecture en pause"
      : isNodeReaderActive && reader.status === "paused"
        ? "Reprendre la lecture"
        : "Écouter le nœud";

  return (
    <section className="zoom-panel visible">
      <button className="zoom-back" onClick={onClose}>
        <ArrowLeft size={16} />
        Retour
      </button>

      <div className="zoom-header">
        <div className="zoom-header-main">
          <div
            className="zoom-icon"
            style={{ background: `${nodeKindColors[node.kind]}22`, color: nodeKindColors[node.kind] }}
          >
            {node.icon}
          </div>
          <div>
            <div className="zoom-title">{node.label}</div>
            <div className="zoom-tags">
              {node.osLabel && node.osLabel !== "Universel" && (
                <span
                  className="zoom-os-tag"
                  style={{
                    color: nodeKindColors[node.kind],
                    borderColor: `${nodeKindColors[node.kind]}55`,
                  }}
                >
                  {node.osLabel}
                </span>
              )}
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
        <button
          className={`node-reader-button ${isNodeReaderActive ? "active" : ""}`}
          disabled={!reader.isSupported || readableNodeQueue.length === 0}
          onClick={() => {
            if (isNodeReaderActive) {
              reader.toggle();
              return;
            }
            reader.playQueue(readableNodeQueue);
          }}
          title={nodeReaderLabel}
          aria-label={nodeReaderLabel}
          type="button"
        >
          {isNodeReaderActive && reader.status === "playing" ? <Pause size={16} /> : <Play size={16} />}
          <span>{isNodeReaderActive && reader.status === "paused" ? "Reprendre" : isNodeReaderActive ? "Pause" : "Écouter"}</span>
        </button>
      </div>

      <div className="sections-grid">
        <InfoSection
          kind="why"
          icon="⚡"
          title="Pourquoi ça existe"
          body={node.sections.why}
          readableSection={getReadableSection("why")}
          reader={reader}
        />
        <InfoSection
          kind="sys"
          icon="🔗"
          title="Sa place dans le système"
          body={node.sections.system}
          readableSection={getReadableSection("system")}
          reader={reader}
        />
        <ChoiceSectionView node={node} readableSection={getReadableSection("choice")} reader={reader} />
        <InfoSection
          kind="sen"
          icon="🧠"
          title={section4Titles[part]}
          body={node.sections.senior}
          readableSection={getReadableSection("senior")}
          reader={reader}
        />
        <InfoSection
          kind="err"
          icon="⚠"
          title="Les erreurs classiques"
          body={node.sections.errors}
          readableSection={getReadableSection("errors")}
          reader={reader}
        />
        <InfoSection
          kind="inv"
          icon="♾"
          title="Les invariants"
          body={node.sections.invariants}
          readableSection={getReadableSection("invariants")}
          reader={reader}
        />
        <PracticeSectionView node={node} readableSection={getReadableSection("practice")} reader={reader} />
        {node.sections.verification && (
          <VerificationSection
            questions={node.sections.verification}
            readableSection={getReadableSection("verification")}
            reader={reader}
          />
        )}
      </div>
      <AudioPlayerBar reader={reader} />
    </section>
  );
}

type SectionReaderProps = {
  readableSection?: ReadableSection;
  reader: SpeechReader;
};

function InfoSection({
  kind,
  icon: Icon,
  title,
  body,
  readableSection,
  reader,
}: {
  kind: string;
  icon: string;
  title: string;
  body: string;
} & SectionReaderProps) {
  const isReading = isReaderActiveForSection(reader, readableSection);

  return (
    <section className={`section s-${kind} ${isReading ? "is-reading" : ""}`}>
      <div className="section-header">
        <div className="section-icon">{Icon}</div>
        <div className="section-title">{title}</div>
        <SectionReaderButton readableSection={readableSection} reader={reader} />
      </div>
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}

function ChoiceSectionView({ node, readableSection, reader }: { node: SheetNode } & SectionReaderProps) {
  const cho = node.sections.choice;
  const isReading = isReaderActiveForSection(reader, readableSection);

  return (
    <section className={`section s-cho ${isReading ? "is-reading" : ""}`}>
      <div className="section-header">
        <div className="section-icon">⚖</div>
        <div className="section-title">Le choix conscient</div>
        <SectionReaderButton readableSection={readableSection} reader={reader} />
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

function PracticeSectionView({ node, readableSection, reader }: { node: SheetNode } & SectionReaderProps) {
  const practice = node.sections.practice;

  if (isPracticeConception(practice)) {
    return <PracticeConceptionView practice={practice} readableSection={readableSection} reader={reader} />;
  }

  const isReading = isReaderActiveForSection(reader, readableSection);

  return (
    <section className={`section s-pra section-full ${isReading ? "is-reading" : ""}`}>
      <div className="section-header">
        <div className="section-icon">⌨</div>
        <div className="section-title">Pratique</div>
        <SectionReaderButton readableSection={readableSection} reader={reader} />
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

function PracticeConceptionView({ practice, readableSection, reader }: { practice: PracticeConception } & SectionReaderProps) {
  const isReading = isReaderActiveForSection(reader, readableSection);

  return (
    <section className={`section s-pra section-full ${isReading ? "is-reading" : ""}`}>
      <div className="section-header">
        <div className="section-icon">⌨</div>
        <div className="section-title">Pratique</div>
        <SectionReaderButton readableSection={readableSection} reader={reader} />
      </div>
      {practice.exercices.map((ex) => (
        <div className="exercice-item" key={ex.titre}>
          <div className="exercice-titre">{ex.titre}</div>
          <ol className="exercice-etapes">
            {ex.etapes.map((e, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: e }} />
            ))}
          </ol>
          <div className="exercice-output">
            <strong>Output attendu :</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: ex.output }} />
          </div>
          <div className="exercice-critere">
            <strong>Critère :</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: ex.critere }} />
          </div>
        </div>
      ))}
      <div className="piege" dangerouslySetInnerHTML={{ __html: practice.piege }} />
    </section>
  );
}

function VerificationSection({ questions, readableSection, reader }: { questions: string[] } & SectionReaderProps) {
  const isReading = isReaderActiveForSection(reader, readableSection);

  return (
    <section className={`section s-ver section-full ${isReading ? "is-reading" : ""}`}>
      <div className="section-header">
        <div className="section-icon">✦</div>
        <div className="section-title">Vérifie ta compréhension</div>
        <SectionReaderButton readableSection={readableSection} reader={reader} />
      </div>
      <p className="verif-intro">
        Réponds mentalement à chacune de ces questions avant de passer au nœud suivant. Si tu
        hésites, relis la section concernée.
      </p>
      <ol className="verification-list">
        {questions.map((question, i) => (
          <li key={i}>
            <span className="verif-num">Q{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: question }} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionReaderButton({ readableSection, reader }: SectionReaderProps) {
  const isActive = isReaderActiveForSection(reader, readableSection);
  const isPlaying = isActive && reader.status === "playing";
  const isPaused = isActive && reader.status === "paused";
  const label = !reader.isSupported
    ? "Lecture audio indisponible"
    : isPlaying
      ? `Mettre en pause : ${readableSection?.title}`
      : isPaused
        ? `Reprendre : ${readableSection?.title}`
        : `Écouter : ${readableSection?.title}`;

  return (
    <button
      className={`section-reader-button ${isActive ? "active" : ""}`}
      disabled={!reader.isSupported || !readableSection}
      onClick={() => {
        if (!readableSection) return;
        if (isActive) {
          reader.toggle();
          return;
        }
        reader.playSection(readableSection);
      }}
      title={label}
      aria-label={label}
      aria-pressed={isActive}
      type="button"
    >
      {!reader.isSupported ? <VolumeX size={15} /> : isPlaying ? <Pause size={15} /> : <Volume2 size={15} />}
    </button>
  );
}

function AudioPlayerBar({ reader }: { reader: SpeechReader }) {
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false);
  const voiceMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!voiceMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!voiceMenuRef.current?.contains(event.target as Node)) {
        setVoiceMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVoiceMenuOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [voiceMenuOpen]);

  if (reader.status === "idle" || reader.status === "unsupported") return null;

  const activeTitle = reader.activeSection?.title ?? "Lecture audio";
  const selectedVoice = reader.availableVoices.find((voice) => voice.voiceURI === reader.selectedVoiceURI);
  const voiceLabel = selectedVoice ? getShortVoiceLabel(selectedVoice) : "Voix auto";

  return (
    <aside className={`audio-player-bar ${reader.status === "error" ? "is-error" : ""}`} aria-label="Lecteur audio">
      <div className="audio-player-main">
        <span className="audio-player-eyebrow">Audio</span>
        <span className="audio-player-title">{reader.error ?? activeTitle}</span>
      </div>
      <div className="audio-player-controls">
        <button
          className="audio-icon-button"
          disabled={!reader.canGoPrevious}
          onClick={reader.previous}
          title="Carte précédente"
          aria-label="Carte précédente"
          type="button"
        >
          <SkipBack size={17} />
        </button>
        <button
          className="audio-icon-button primary"
          onClick={reader.toggle}
          title={reader.status === "playing" ? "Pause" : "Reprendre"}
          aria-label={reader.status === "playing" ? "Pause" : "Reprendre"}
          type="button"
        >
          {reader.status === "playing" ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          className="audio-icon-button"
          disabled={!reader.canGoNext}
          onClick={reader.next}
          title="Carte suivante"
          aria-label="Carte suivante"
          type="button"
        >
          <SkipForward size={17} />
        </button>
      </div>
      <div className="audio-voice-picker" ref={voiceMenuRef}>
        <button
          className="audio-voice-trigger"
          onClick={() => setVoiceMenuOpen((open) => !open)}
          aria-expanded={voiceMenuOpen}
          aria-haspopup="menu"
          type="button"
        >
          <span>{voiceLabel}</span>
          <ChevronDown size={15} />
        </button>
        {voiceMenuOpen && (
          <div className="audio-voice-menu" role="menu">
            <button
              className={`audio-voice-option ${reader.selectedVoiceURI === null ? "active" : ""}`}
              onClick={() => {
                reader.setVoiceURI(null);
                setVoiceMenuOpen(false);
              }}
              role="menuitem"
              type="button"
            >
              <span>
                <strong>Voix auto recommandée</strong>
                <small>Priorise les voix françaises fiables</small>
              </span>
              {reader.selectedVoiceURI === null && <Check size={15} />}
            </button>
            {reader.availableVoices.length > 0 ? (
              reader.availableVoices.map((voice) => (
                <button
                  className={`audio-voice-option ${reader.selectedVoiceURI === voice.voiceURI ? "active" : ""}`}
                  onClick={() => {
                    reader.setVoiceURI(voice.voiceURI);
                    setVoiceMenuOpen(false);
                  }}
                  key={voice.voiceURI}
                  role="menuitem"
                  type="button"
                >
                  <span>
                    <strong>{getShortVoiceLabel(voice)}</strong>
                    <small>{getVoiceMetaLabel(voice)}</small>
                  </span>
                  {reader.selectedVoiceURI === voice.voiceURI && <Check size={15} />}
                </button>
              ))
            ) : (
              <div className="audio-voice-empty">Aucune voix française détectée</div>
            )}
          </div>
        )}
      </div>
      <label className="audio-setting-slider audio-rate-slider">
        <span>{formatSpeechRate(reader.rate)}</span>
        <input
          type="range"
          min="0.75"
          max="1.6"
          step="0.05"
          value={reader.rate}
          onChange={(event) => reader.setRate(parseSpeechReaderRate(event.target.value))}
          aria-label="Vitesse de lecture"
        />
      </label>
      <label className="audio-setting-slider audio-breath-slider" title="Respiration">
        <span>{formatBreathMs(reader.breathMs)}</span>
        <input
          type="range"
          min="0"
          max="700"
          step="50"
          value={reader.breathMs}
          onChange={(event) => reader.setBreathMs(parseBreathMs(event.target.value))}
          aria-label="Respiration entre les segments"
        />
      </label>
      <button
        className="audio-icon-button audio-close-button"
        onClick={reader.stop}
        title="Fermer le lecteur"
        aria-label="Fermer le lecteur"
        type="button"
      >
        <X size={17} />
      </button>
    </aside>
  );
}

function isReaderActiveForSection(reader: SpeechReader, section?: ReadableSection) {
  return Boolean(section && reader.activeSection?.id === section.id && reader.status !== "idle");
}

function parseSpeechReaderRate(value: string): SpeechReaderRate {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 1;
  return Math.min(1.6, Math.max(0.75, Math.round(numericValue * 20) / 20));
}

function formatSpeechRate(rate: number) {
  return `${rate.toFixed(2)}x`;
}

function parseBreathMs(value: string) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.min(700, Math.max(0, Math.round(numericValue / 50) * 50));
}

function formatBreathMs(breathMs: number) {
  return `${breathMs}ms`;
}

function getShortVoiceLabel(voice: SpeechSynthesisVoice) {
  return voice.name
    .replace(/\s*-\s*French\s*/gi, " ")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getVoiceMetaLabel(voice: SpeechSynthesisVoice) {
  const online = `${voice.name} ${voice.voiceURI}`.toLowerCase().includes("online");
  return `${voice.lang}${voice.localService ? " · locale" : online ? " · en ligne" : ""}`;
}
