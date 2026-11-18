const titles = [
  ["Midnight Harbor","98% Match · 2024 · 2 Seasons","images/midnight-harbor.svg","https://picsum.photos/seed/midnight-harbor/400/580","https://picsum.photos/seed/midnight-harbor/1200/520"],["Neon Drift","95% Match · 2023 · Movie","images/neon-drift.svg","https://picsum.photos/seed/neon-drift/400/580","https://picsum.photos/seed/neon-drift/1200/520"],
  ["The Last Orchard","91% Match · 2024 · 1 Season","images/last-orchard.svg","https://picsum.photos/seed/last-orchard/400/580","https://picsum.photos/seed/last-orchard/1200/520"],["Static","97% Match · 2022 · Movie","images/static.svg","https://picsum.photos/seed/static/400/580","https://picsum.photos/seed/static/1200/520"],
  ["Paper Kingdoms","89% Match · 2024 · 3 Seasons","images/paper-kingdoms.svg","https://picsum.photos/seed/paper-kingdoms/400/580","https://picsum.photos/seed/paper-kingdoms/1200/520"],["Glass Tide","94% Match · 2023 · Movie","images/glass-tide.svg","https://picsum.photos/seed/glass-tide/400/580","https://picsum.photos/seed/glass-tide/1200/520"],
  ["Embers","92% Match · 2024 · 2 Seasons","images/embers.svg","https://picsum.photos/seed/embers/400/580","https://picsum.photos/seed/embers/1200/520"],["Quiet Orbit","96% Match · 2021 · Movie","images/quiet-orbit.svg","https://picsum.photos/seed/quiet-orbit/400/580","https://picsum.photos/seed/quiet-orbit/1200/520"]
];
const hues = [350, 210, 30, 270, 150, 190, 10, 320];

function buildRow(id, offset) {
  const row = document.getElementById(id);
  titles.forEach((t, i) => {
    const n = (i + offset) % titles.length;
    const h = hues[n];
    const b = document.createElement("button");
    b.className = "card";
    b.textContent = titles[n][0];
    b.style.backgroundColor = `hsl(${h} 60% 25%)`;
    b.style.backgroundImage = `linear-gradient(transparent 55%, #000d), url("${titles[n][3]}"), url("${titles[n][2]}")`;
    b.style.backgroundSize = "cover";
    b.style.backgroundPosition = "center";
    b.addEventListener("click", () => openModal(titles[n], h));
    row.appendChild(b);
  });
}
buildRow("row1", 0);
buildRow("row2", 3);

document.querySelectorAll(".row-wrap").forEach(w => {
  const row = w.querySelector(".row");
  w.querySelector(".left").onclick = () => row.scrollBy({ left: -row.clientWidth * 0.8 });
  w.querySelector(".right").onclick = () => row.scrollBy({ left: row.clientWidth * 0.8 });
});

const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 60));

const form = document.getElementById("emailForm");
const email = document.getElementById("email");
const msg = document.getElementById("msg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.classList.toggle("error", !ok);
  msg.classList.toggle("ok", ok);
  msg.textContent = ok ? "Thanks! Check your inbox to finish signing up." : "Enter a valid email address.";
});

document.querySelectorAll(".q").forEach(q => {
  q.addEventListener("click", () => {
    const panel = q.nextElementSibling;
    const open = q.classList.toggle("open");
    panel.style.maxHeight = open ? panel.scrollHeight + "px" : 0;
  });
});

const modal = document.getElementById("modal");
function openModal(t, h) {
  document.getElementById("modalTitle").textContent = t[0];
  document.getElementById("modalMeta").textContent = t[1];
  const art = document.getElementById("modalArt");
  art.style.backgroundImage = `url("${t[4]}"), url("${t[2]}")`;
  art.style.backgroundSize = "cover";
  art.style.backgroundPosition = "center";
  modal.hidden = false;
}
const closeModal = () => (modal.hidden = true);
document.getElementById("close").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
