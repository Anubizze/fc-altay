import { ReactNode } from "react";

import { DescriptionBlocks } from "@/shared/ui/description-blocks";
import { Container } from "@/shared/ui/container";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <Container>
        <div className="page-intro__content">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <DescriptionBlocks text={description} />
          {children}
        </div>
      </Container>
    </section>
  );
}
