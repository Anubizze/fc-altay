import { DocumentCard } from "@/entities/documents/document-card";
import { documents } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function DocumentsPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.documents} />

      <section className="section">
        <Container className="grid grid--documents">
          {documents.map((item) => (
            <DocumentCard key={item.title} {...item} downloadLabel={dict.documents.downloadPdf} />
          ))}
        </Container>
      </section>
    </>
  );
}
