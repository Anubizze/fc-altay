export type AppLocale = "ru" | "kk";

export const LOCALES: AppLocale[] = ["ru", "kk"];

/** Безопасный доступ к полю `{ ru, kk }` по локали (для проверки типов при `next build`). */
export function pickLocalized(bundle: Record<AppLocale, string>, locale: AppLocale): string {
  return bundle[locale];
}

export function withLocale(locale: AppLocale, pathname: string): string {
  const [path, hash] = pathname.split("#");
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefixed = clean === "/" ? `/${locale}` : `/${locale}${clean}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** /ru/club/main → /club/main ; /ru → / */
export function stripLocalePath(pathname: string): string {
  const m = pathname.match(/^\/(ru|kk)(\/.*)?$/);
  if (!m) return pathname;
  return m[2] ?? "/";
}
