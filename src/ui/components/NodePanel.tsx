import { ArrowLeft, Pause, Play, Volume2, VolumeX } from "lucide-react";
import {
  buildReadableNodeQueue,
  buildReadableSections,
  type ReadableSection,
  type ReadableSectionKind,
} from "../../audio/readableContent";
import { useSpeechReader, type SpeechReader } from "../../audio/useSpeechReader";
import type { PracticeConception, PracticeSection, SheetNode, SheetPart } from "../../data/schema";
import { nodeKindColors, nodeLevelColors, section4Titles } from "../../data/presentation";
import { prepareRichText } from "../richText";
import { AudioPlayerBar } from "./AudioPlayerBar";

export function NodePanel({
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
  const isNodeReaderActive =
    reader.activeSection?.nodeId === node.id && reader.queue.length > 1 && reader.status !== "idle";
  const isNodeReaderRunning =
    isNodeReaderActive && (reader.status === "playing" || reader.status === "starting");
  const isNodeReaderPaused = isNodeReaderActive && reader.status === "paused";
  const isNodeReaderError = isNodeReaderActive && reader.status === "error";
  const nodeReaderLabel = !reader.isSupported
    ? "Lecture audio indisponible"
    : isNodeReaderError
      ? "Réessayer la lecture"
      : isNodeReaderRunning
        ? "Mettre la lecture en pause"
        : isNodeReaderPaused
          ? "Reprendre la lecture"
          : "Écouter le nœud";

  return (
    <section className="zoom-panel visible">
      <button className="zoom-back" onClick={onClose} type="button">
        <ArrowLeft size={16} />
        Retour
      </button>

      <div className="zoom-header">
        <div className="zoom-header-main">
          <div
            className="zoom-icon"
            style={{
              background: `${nodeKindColors[node.kind]}22`,
              color: nodeKindColors[node.kind],
            }}
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
            if (isNodeReaderError) {
              reader.retry();
              return;
            }
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
          {isNodeReaderRunning ? <Pause size={16} /> : <Play size={16} />}
          <span>
            {isNodeReaderError
              ? "Réessayer"
              : isNodeReaderPaused
                ? "Reprendre"
                : isNodeReaderActive
                  ? "Pause"
                  : "Écouter"}
          </span>
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
        <ChoiceSectionView
          node={node}
          readableSection={getReadableSection("choice")}
          reader={reader}
        />
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
        <PracticeSectionView
          node={node}
          readableSection={getReadableSection("practice")}
          reader={reader}
        />
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

/**
 * Renders pre-authored HTML markup from versioned sheet data. Inline Markdown
 * code spans are escaped before injection so examples such as `<div onClick>`
 * stay code instead of becoming live DOM.
 */
function RichText({
  html,
  className,
  as: Tag = "div",
}: {
  html: string;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: prepareRichText(html) }} />;
}

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
      <RichText html={body} />
    </section>
  );
}

function ChoiceSectionView({
  node,
  readableSection,
  reader,
}: { node: SheetNode } & SectionReaderProps) {
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
        <RichText html={cho.html} />
      ) : (
        <>
          <RichText html={cho.main} />
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

function PracticeSectionView({
  node,
  readableSection,
  reader,
}: { node: SheetNode } & SectionReaderProps) {
  const practice = node.sections.practice;

  if (isPracticeConception(practice)) {
    return (
      <PracticeConceptionView
        practice={practice}
        readableSection={readableSection}
        reader={reader}
      />
    );
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
      {practice.verification && <div className="practice-check">{practice.verification}</div>}
      <div className="debt">{practice.debt}</div>
    </section>
  );
}

function PracticeConceptionView({
  practice,
  readableSection,
  reader,
}: { practice: PracticeConception } & SectionReaderProps) {
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
              <RichText as="li" key={`${ex.titre}-${i}`} html={e} />
            ))}
          </ol>
          <div className="exercice-output">
            <strong>Output attendu :</strong> <RichText as="span" html={ex.output} />
          </div>
          <div className="exercice-critere">
            <strong>Critère :</strong> <RichText as="span" html={ex.critere} />
          </div>
        </div>
      ))}
      <RichText html={practice.piege} className="piege" />
    </section>
  );
}

function VerificationSection({
  questions,
  readableSection,
  reader,
}: { questions: string[] } & SectionReaderProps) {
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
          <li key={`${i}-${question}`}>
            <span className="verif-num">Q{i + 1}</span>
            <RichText as="span" html={question} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionReaderButton({ readableSection, reader }: SectionReaderProps) {
  const isActive = isReaderActiveForSection(reader, readableSection);
  const isPlaying = isActive && (reader.status === "playing" || reader.status === "starting");
  const isPaused = isActive && reader.status === "paused";
  const isError = isActive && reader.status === "error";
  const label = !reader.isSupported
    ? "Lecture audio indisponible"
    : isError
      ? `Réessayer : ${readableSection?.title}`
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
        if (isError) {
          reader.retry();
          return;
        }
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
      {!reader.isSupported ? (
        <VolumeX size={15} />
      ) : isPlaying ? (
        <Pause size={15} />
      ) : (
        <Volume2 size={15} />
      )}
    </button>
  );
}

function isReaderActiveForSection(reader: SpeechReader, section?: ReadableSection) {
  return Boolean(section && reader.activeSection?.id === section.id && reader.status !== "idle");
}
