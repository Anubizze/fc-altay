import { NextRequest, NextResponse } from "next/server";

function isAllowedHost(host: string): boolean {
  return (
    host === "kffleague.kz" ||
    host === "www.kffleague.kz" ||
    host.endsWith(".kffleague.kz") ||
    host === "r2.thesportsdb.com"
  );
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src) {
    return NextResponse.json({ error: "missing src" }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return NextResponse.json({ error: "bad url" }, { status: 400 });
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return NextResponse.json({ error: "bad protocol" }, { status: 400 });
  }

  if (!isAllowedHost(url.hostname)) {
    return NextResponse.json({ error: "forbidden host" }, { status: 403 });
  }

  const upstream = await fetch(url.toString(), {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; FCAltaiOskemen/1.0)",
      Accept: "image/*,*/*"
    },
    next: { revalidate: 86_400 }
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  const buf = await upstream.arrayBuffer();
  let ct = upstream.headers.get("content-type") ?? "application/octet-stream";
  if (!ct.startsWith("image/")) {
    ct = "image/png";
  }

  return new NextResponse(buf, {
    headers: {
      "Content-Type": ct,
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}
