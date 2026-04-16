import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { HashScroll } from "@/shared/ui/hash-scroll";
import { PageIntro } from "@/shared/ui/page-intro";
import { MediaHub } from "@/widgets/media/media-hub";

export default function MediaPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <HashScroll allowed={["photos", "video"]} />
      <PageIntro {...dict.intros.media} />

      <section className="section">
        <Container>
          <MediaHub photosTitle={dict.mediaSections.photos} videoTitle={dict.mediaSections.video} />
        </Container>
      </section>
    </>
  );
}
