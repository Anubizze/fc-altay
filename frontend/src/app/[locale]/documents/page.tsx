import { DocumentCard } from "@/entities/documents/document-card";
import { documents } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function DocumentsPage({ params }: { params: { locale: string } }) {
  const locale: AppLocale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.documents} />

      <section className="section">
        <Container className="grid grid--documents">
          {documents.map((item) => (
            <DocumentCard
              key={item.pdfUrl}
              title={
                typeof item.title === "string"
                  ? item.title
                  : locale === "kk"
                    ? item.title.kk
                    : item.title.ru
              }
              description={
                typeof item.description === "string"
                  ? item.description
                  : locale === "kk"
                    ? item.description.kk
                    : item.description.ru
              }
              format={item.format}
              pdfUrl={item.pdfUrl}
              downloadLabel={dict.documents.downloadPdf}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
