"use client";

import { useEffect, useId, useRef } from "react";

import { instagramPermalinkToEmbedSrc } from "@/shared/lib/instagram-news";

type InstagramPostDialogProps = {
  open: boolean;
  onClose: () => void;
  permalink: string;
  closeLabel: string;
};

export function InstagramPostDialog({ open, onClose, permalink, closeLabel }: InstagramPostDialogProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const src = instagramPermalinkToEmbedSrc(permalink);
  if (!src) return null;

  return (
    <div className="instagram-post-dialog" role="presentation">
      <button
        type="button"
        className="instagram-post-dialog__backdrop"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div
        className="instagram-post-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="instagram-post-dialog__head">
          <h2 id={titleId} className="instagram-post-dialog__title">
            Instagram
          </h2>
          <button ref={closeRef} type="button" className="instagram-post-dialog__close" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        <div className="instagram-post-dialog__frame-wrap">
          <iframe
            className="instagram-post-dialog__frame"
            src={src}
            title="Instagram"
            loading="lazy"
            allow="encrypted-media"
          />
        </div>
      </div>
    </div>
  );
}
