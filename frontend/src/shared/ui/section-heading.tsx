import { DescriptionBlocks } from "@/shared/ui/description-blocks";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Центрированный заголовок с красной чертой, как на спортивных лендингах. */
  variant?: "default" | "ribbon";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "default"
}: SectionHeadingProps) {
  const isRibbon = variant === "ribbon";

  return (
    <div
      className={`section-heading ${align === "center" || isRibbon ? "section-heading--center" : ""} ${isRibbon ? "section-heading--ribbon" : ""}`}
    >
      {eyebrow ? (
        <span className={`eyebrow ${isRibbon ? "eyebrow--ribbon" : ""}`}>{eyebrow}</span>
      ) : null}
      <h2 className={isRibbon ? "section-heading__title section-heading__title--ribbon" : undefined}>{title}</h2>
      {description ? <DescriptionBlocks text={description} /> : null}
    </div>
  );
}
