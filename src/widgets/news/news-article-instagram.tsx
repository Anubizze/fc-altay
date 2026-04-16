"use client";

import { useState } from "react";

import type { Dictionary } from "@/shared/i18n/dictionaries";
import { InstagramPostDialog } from "@/shared/ui/instagram-post-dialog";

type NewsArticleInstagramProps = {
  permalink: string;
  dict: Dictionary;
};

export function NewsArticleInstagram({ permalink, dict }: NewsArticleInstagramProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="news-article__instagram">
      <button type="button" className="button button--ghost" onClick={() => setOpen(true)}>
        {dict.news.openPostHint}
      </button>
      <InstagramPostDialog
        open={open}
        onClose={() => setOpen(false)}
        permalink={permalink}
        closeLabel={dict.news.closePost}
      />
    </div>
  );
}
