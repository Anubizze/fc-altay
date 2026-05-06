import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

/** Имя файла на диске → допустимый slug в URL. */
const SLUG_TO_CANDIDATE_FILENAMES: Record<string, string[]> = {
  "karzhylyq-esepilik-2025": ["Отчёт 05.05.2026.pdf", "Отчет 05.05.2026.pdf"]
};

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const candidates = SLUG_TO_CANDIDATE_FILENAMES[params.slug];
  if (!candidates?.length) {
    return new Response("Not found", { status: 404 });
  }

  const docsDir = path.join(process.cwd(), "docs");
  let resolvedName: string | null = null;
  for (const name of candidates) {
    const full = path.join(docsDir, name);
    if (existsSync(full)) {
      resolvedName = name;
      break;
    }
  }

  if (!resolvedName) {
    return new Response("PDF file not found in /docs", { status: 404 });
  }

  const filePath = path.join(docsDir, resolvedName);
  const body = await readFile(filePath);
  const asciiName = "karzhylyq-esepilik-2025.pdf";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(resolvedName)}`
    }
  });
}
