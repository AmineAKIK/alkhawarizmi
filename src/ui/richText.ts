const inlineCodePattern = /`([^`\n]+)`/g;

/**
 * Sheet prose is authored as trusted HTML, but some pedagogical examples use
 * Markdown-style inline backticks. Backticks do not escape HTML when passed to
 * dangerouslySetInnerHTML, so convert those spans to escaped <code> elements
 * before rendering.
 */
export function prepareRichText(html: string) {
  return html.replace(inlineCodePattern, (_match, code: string) => `<code>${escapeHtml(code)}</code>`);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
