import { mediaItems } from "@/shared/content/site-content";
import { SectionHeading } from "@/shared/ui/section-heading";

type MediaHubProps = {
  photosTitle: string;
  videoTitle: string;
};

export function MediaHub({ photosTitle, videoTitle }: MediaHubProps) {
  const photos = mediaItems.filter((item) => item.type === "photo");
  const videos = mediaItems.filter((item) => item.type === "video");

  return (
    <div className="stack-xl">
      <section id="photos" className="scroll-mt">
        <SectionHeading variant="ribbon" title={photosTitle} align="center" />
        <div className="grid grid--media" style={{ marginTop: 28 }}>
          {photos.map((item) => (
            <article key={item.title} className="glass-card media-card">
              <span className="pill">{item.accent}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="video" className="scroll-mt">
        <SectionHeading variant="ribbon" title={videoTitle} align="center" />
        <div className="grid grid--media" style={{ marginTop: 28 }}>
          {videos.map((item) => (
            <article key={item.title} className="glass-card media-card">
              <span className="pill">{item.accent}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
