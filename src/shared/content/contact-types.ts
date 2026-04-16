/** Контактные блоки на странице «Контакты» и в подвале. */
export type ContactItem = {
  title: string;
  value: string;
  /** Вторая строка значения (например улица под городом). */
  valueLine2?: string;
  hint: string;
  valueHref?: string;
};
