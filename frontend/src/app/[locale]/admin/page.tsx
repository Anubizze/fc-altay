import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function AdminPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.admin} />

      <section className="section">
        <Container>
          <p className="glass-card admin-card" style={{ marginBottom: 24 }}>
            {dict.adminCms.lead}
          </p>
          <div className="admin-grid">
            <form className="glass-card admin-card stack-md" aria-label={dict.adminCms.newsBlock}>
              <h2>{dict.adminCms.newsBlock}</h2>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>Title</span>
                <input type="text" name="title" placeholder="..." />
              </label>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>Category</span>
                <select name="category" defaultValue="">
                  <option value="">—</option>
                  <option value="main">main</option>
                </select>
              </label>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>Body</span>
                <textarea name="body" rows={4} placeholder="..." />
              </label>
              <button type="button" className="button" disabled>
                Save
              </button>
            </form>

            <form className="glass-card admin-card stack-md" aria-label={dict.adminCms.matchesBlock}>
              <h2>{dict.adminCms.matchesBlock}</h2>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>Date</span>
                <input type="text" name="date" placeholder="DD.MM.YYYY" />
              </label>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>Score</span>
                <input type="text" name="score" placeholder="2:1" />
              </label>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>PDF protocol URL</span>
                <input type="url" name="pdf" placeholder="https://..." />
              </label>
              <button type="button" className="button" disabled>
                Save
              </button>
            </form>

            <form className="glass-card admin-card stack-md" aria-label={dict.adminCms.documentsBlock}>
              <h2>{dict.adminCms.documentsBlock}</h2>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>Title</span>
                <input type="text" name="docTitle" placeholder="..." />
              </label>
              <label className="stack-sm" style={{ display: "grid", gap: 6 }}>
                <span>File</span>
                <input type="file" name="file" accept="application/pdf" />
              </label>
              <button type="button" className="button" disabled>
                Upload
              </button>
            </form>
          </div>
          <p style={{ marginTop: 20, color: "var(--muted)", fontSize: 14 }}>{dict.adminCms.hint}</p>
        </Container>
      </section>
    </>
  );
}
