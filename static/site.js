// Swap the picture for the YouTube player only when the reader taps it: the page stays light on a phone and
// no YouTube cookie is set before they choose to watch.
document.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".player button");
  if (!btn) return;
  const box = btn.parentElement;
  const f = document.createElement("iframe");
  f.src = `https://www.youtube-nocookie.com/embed/${box.dataset.id}?autoplay=1&rel=0`;
  f.title = btn.getAttribute("aria-label") || "वीडियो";
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  box.replaceChildren(f);
});
