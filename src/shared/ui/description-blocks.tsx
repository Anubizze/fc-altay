/** Несколько абзацев из текста, разделённого пустыми строками (\n\n). */
export function DescriptionBlocks({ text, className }: { text: string; className?: string }) {
  const parts = text.trim().split(/\n\n+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) {
    return <p className={className}>{parts[0]}</p>;
  }
  return (
    <div className={`description-blocks ${className ?? ""}`.trim()}>
      {parts.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
