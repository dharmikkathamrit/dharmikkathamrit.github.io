// Ticks live only in this browser (localStorage), so a reader's own year stays theirs without any sign-in.
// Storage can be blocked in a private window; the page then still works, it just forgets on reload.
(() => {
  const KEY = document.querySelector(".cal").dataset.key; // one store per calendar page
  let done = new Set();
  try { done = new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch (_) {}
  const tiles = [...document.querySelectorAll(".cal .t")];
  const count = document.getElementById("done");
  const paint = () => {
    tiles.forEach((t) => {
      const on = done.has(t.dataset.iso);
      t.classList.toggle("on", on);
      t.querySelector(".ck").setAttribute("aria-pressed", on);
    });
    count.textContent = done.size;
  };
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest(".cal .ck");
    if (!b) return;
    const iso = b.closest(".t").dataset.iso;
    done.has(iso) ? done.delete(iso) : done.add(iso);
    try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch (_) {}
    paint();
  });
  // the next Ekadashi from today gets a ring; before 2027 the page says the year's first one is ahead
  const today = new Date().toISOString().slice(0, 10);
  const next = tiles.find((t) => t.dataset.iso >= today);
  if (next) {
    next.classList.add("upcoming");
    const p = document.getElementById("next");
    const name = next.querySelector(".n").firstChild.textContent;
    const month = next.closest(".mc").querySelector("h2").textContent;
    p.textContent = `${document.querySelector(".cal").dataset.next}: ${next.querySelector(".d").textContent} ${month}, ${name}`;
    p.hidden = false;
  }
  paint();
})();
