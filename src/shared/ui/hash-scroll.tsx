"use client";

import { useEffect } from "react";

type HashScrollProps = {
  /** Хеши без «#», к которым разрешён плавный скролл при загрузке. */
  allowed: string[];
};

export function HashScroll({ allowed }: HashScrollProps) {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id || !allowed.includes(id)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [allowed.join(",")]);

  return null;
}
