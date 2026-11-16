const START_DATE = new Date("2026-08-18T00:00:00");

function calculateRelationship() {
  const today = new Date();
  const start = new Date(START_DATE);

  let months = (today.getFullYear() - start.getFullYear()) * 12
    + (today.getMonth() - start.getMonth());

  if (today.getDate() < start.getDate()) months--;
  months = Math.max(0, months);

  const days = Math.max(0, Math.floor(
    (today - start) / (1000 * 60 * 60 * 24)
  ));

  document.getElementById("months-count").textContent = months;
  document.getElementById("days-count").textContent = days;

  const next = new Date(today.getFullYear(), today.getMonth(), 18);
  if (today.getDate() >= 18) next.setMonth(next.getMonth() + 1);

  const note = document.getElementById("anniversary-note");

  if (today.getDate() === 18) {
    note.textContent = "¡Hoy celebramos un nuevo capítulo de nuestra historia! ✨";
  } else {
    const remaining = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
    note.textContent = `Faltan ${remaining} día(s) para nuestro próximo día 18.`;
  }
}

function createSky() {
  const sky = document.getElementById("sky");
  if (!sky) return;

  for (let i = 0; i < 75; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
    star.style.setProperty("--delay", `${Math.random() * 5}s`);
    sky.appendChild(star);
  }

  for (let i = 0; i < 5; i++) {
    const meteor = document.createElement("span");
    meteor.className = "shooting-star";
    meteor.style.left = `${25 + Math.random() * 85}%`;
    meteor.style.top = `${Math.random() * 55}%`;
    meteor.style.setProperty("--delay", `${i * 2.4 + Math.random() * 3}s`);
    sky.appendChild(meteor);
  }
}

function configureLetter() {
  const button = document.getElementById("open-letter");
  const content = document.getElementById("letter-content");

  if (!button || !content) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    content.hidden = isOpen;

    button.querySelector("span:last-child").textContent = isOpen
      ? "Toca para abrir tu mensaje"
      : "Cerrar el mensaje";
  });
}

function configureMusic() {
  const music = document.getElementById("background-music");
  const heart = document.getElementById("music-heart");
  const message = document.querySelector(".music-invitation p");

  if (!music || !heart) return;

  music.volume = 0.15;

  heart.addEventListener("click", () => {
    if (music.paused) {
      music.play().then(() => {
        heart.classList.add("is-playing");
        heart.setAttribute("aria-pressed", "true");
        heart.setAttribute("aria-label", "Pausar nuestra canción");
        if (message) message.textContent = "Nuestra canción está sonando ♡";
      }).catch(() => {
        if (message) message.textContent = "No se pudo reproducir la canción. Revisa el archivo de música.";
      });
    } else {
      music.pause();
      heart.classList.remove("is-playing");
      heart.setAttribute("aria-pressed", "false");
      heart.setAttribute("aria-label", "Reproducir nuestra canción");
      if (message) message.textContent = "Dale clic al corazón para escuchar nuestra canción";
    }
  });

  window.addEventListener("pagehide", () => music.pause());
}

createSky();
calculateRelationship();
configureLetter();
configureMusic();
