import { useEffect, useRef, useState } from "react";
import { isSheetTab } from "../data/schema";
import type { SheetNode, SheetTab } from "../data/schema";
import { buildSheetPath, type AppPath, type NormalizedDevSheet } from "../data/catalog";
import { nodeKindColors, nodeKindLabels } from "../data/presentation";
import { PositioningBand } from "./components/PositioningBand";
import { SystemMap } from "./components/SystemMap";
import { NodePanel } from "./components/NodePanel";
import { resolveAppHref } from "./routing";

export function SheetView({
  sheet,
  nodeId,
  tabId,
  currentSearch,
  onNavigate,
  onReplace,
}: {
  sheet: NormalizedDevSheet;
  nodeId: string | null;
  tabId: string | null;
  currentSearch: string;
  onNavigate: (path: AppPath) => void;
  onReplace: (path: AppPath) => void;
}) {
  const fallbackTab = sheet.tabs[0]?.id ?? (Object.keys(sheet.maps)[0] as SheetTab | undefined);
  const requestedTab = isSheetTab(tabId) ? tabId : null;
  const currentTab =
    (requestedTab && sheet.maps[requestedTab] ? requestedTab : fallbackTab) ?? "universel";
  const mapNodeIds = new Set((sheet.maps[currentTab]?.nodes ?? []).map((node) => node.id));
  const activeNodeId = nodeId && sheet.nodes[nodeId] && mapNodeIds.has(nodeId) ? nodeId : null;
  const activeNode = activeNodeId ? sheet.nodes[activeNodeId] : null;
  const [titleLine1, titleLine2] = sheet.titleLines;
  const mapAreaRef = useRef<HTMLElement | null>(null);
  const [mapState, setMapState] = useState<"visible" | "hiding" | "hidden">(
    activeNodeId ? "hidden" : "visible",
  );

  useEffect(() => {
    if (activeNodeId) {
      setMapState("hiding");
      const el = mapAreaRef.current;
      if (!el) return;
      const onEnd = () => setMapState("hidden");
      el.addEventListener("animationend", onEnd, { once: true });
      return () => el.removeEventListener("animationend", onEnd);
    }

    setMapState("visible");
  }, [activeNodeId]);

  useEffect(() => {
    if (tabId && tabId !== currentTab) {
      onReplace(
        buildSheetPath(sheet, currentTab, activeNodeId, new URLSearchParams(currentSearch)),
      );
      return;
    }
    if (nodeId && !activeNodeId) {
      onReplace(buildSheetPath(sheet, currentTab, null, new URLSearchParams(currentSearch)));
    }
  }, [activeNodeId, currentSearch, currentTab, nodeId, onReplace, sheet, tabId]);

  const visibleKinds = Array.from(
    new Set(
      (sheet.maps[currentTab]?.nodes ?? []).map((n) => sheet.nodes[n.id]?.kind).filter(Boolean),
    ),
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
          {sheet.tabs.map((tab) => {
            const path = buildSheetPath(
              sheet,
              tab.id,
              null,
              new URLSearchParams(currentSearch),
            );

            return (
              <a
                className={`os-tab ${currentTab === tab.id ? "active" : ""}`}
                href={resolveAppHref(path)}
                key={tab.id}
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                  )
                    return;
                  event.preventDefault();
                  onNavigate(path);
                }}
              >
                {tab.label}
              </a>
            );
          })}
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
            onNavigate(
              buildSheetPath(sheet, currentTab, nextNodeId, new URLSearchParams(currentSearch)),
            )
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
          onClose={() =>
            onNavigate(buildSheetPath(sheet, currentTab, null, new URLSearchParams(currentSearch)))
          }
        />
      )}
    </article>
  );
}
