(() => {
  "use strict";

  const message = `Dear Harini,

Happy Birthday to my dear best friend! 💙

Today is a special day because someone as wonderful
as you came into this world.

Thank you for being such a beautiful part of my life.
Your smile, your kindness, and the memories we share
make our friendship truly special.

I hope your life is always filled with happiness,
success, love, laughter, and beautiful surprises.

May every dream you have come true, and may you
always find a reason to smile.

No matter how busy life gets or how much things change,
I will always treasure our friendship.

Happy Birthday, Harini! 🎂💙

With lots of love,
Your Dear Best Friend ♾️`;

  const typedText = document.querySelector("#typed-text");
  const cursor = document.querySelector(".typing-cursor");
  const messageSection = document.querySelector("#message");
  const confettiLayer = document.querySelector(".confetti-layer");
  const toast = document.querySelector(".toast");
  const musicButton = document.querySelector(".music-toggle");
  let typingTimer;
  let toastTimer;
  let audioContext;
  let musicTimer;
  let musicPlaying = false;
  let noteIndex = 0;
  let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeMessage() {
    window.clearInterval(typingTimer);
    typedText.textContent = "";
    cursor.hidden = false;
    let index = 0;
    typingTimer = window.setInterval(() => {
      typedText.textContent += message[index];
      index += 1;
      if (index >= message.length) {
        window.clearInterval(typingTimer);
        cursor.hidden = true;
      }
    }, reducedMotion ? 0 : 29);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const messageObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      typeMessage();
      messageObserver.disconnect();
    }
  }, { threshold: 0.25 });
  messageObserver.observe(messageSection);

  document.querySelector(".open-surprise").addEventListener("click", () => {
    document.querySelector("#celebration").scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    launchCelebration(80);
    startMusic();
  });

  document.querySelectorAll(".special-card").forEach((card) => {
    card.addEventListener("click", () => {
      const opening = card.getAttribute("aria-expanded") !== "true";
      card.setAttribute("aria-expanded", String(opening));
    });
  });

  document.querySelector(".replay-message").addEventListener("click", typeMessage);

  const letterButton = document.querySelector(".envelope-button");
  const letterPaper = document.querySelector(".letter-paper");
  let letterBackdrop;
  function closeLetter() {
    letterButton.setAttribute("aria-expanded", "false");
    letterPaper.classList.remove("open");
    letterPaper.setAttribute("aria-hidden", "true");
    letterBackdrop?.remove();
    letterButton.focus();
  }
  letterButton.addEventListener("click", () => {
    letterButton.setAttribute("aria-expanded", "true");
    letterPaper.classList.add("open");
    letterPaper.setAttribute("aria-hidden", "false");
    letterBackdrop = document.createElement("div");
    letterBackdrop.className = "letter-backdrop";
    letterBackdrop.addEventListener("click", closeLetter);
    document.body.append(letterBackdrop);
    document.querySelector(".close-letter").focus();
    launchCelebration(18);
  });
  document.querySelector(".close-letter").addEventListener("click", closeLetter);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && letterPaper.classList.contains("open")) closeLetter();
  });

  document.querySelector(".wish-button").addEventListener("click", () => {
    document.querySelector(".wish-result").classList.add("visible");
    launchCelebration(130);
    startMusic();
  });

  const photoInput = document.querySelector("#photo-upload");
  photoInput.addEventListener("change", (event) => {
    const files = [...event.target.files];
    const available = Math.max(0, 12 - document.querySelectorAll(".memory-card").length);
    if (files.length > available) showToast(`You can add ${available} more ${available === 1 ? "photo" : "photos"}.`);
    files.slice(0, available).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const imageUrl = URL.createObjectURL(file);
      const card = document.createElement("article");
      card.className = "memory-card reveal is-visible";
      const art = document.createElement("div");
      art.className = "memory-art uploaded-art";
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") || "A favorite memory";
      image.style.cssText = "width:100%;height:100%;object-fit:cover;display:block";
      const caption = document.createElement("span");
      caption.className = "art-caption";
      caption.textContent = "a little moment to keep";
      art.append(image, caption);
      const description = document.createElement("p");
      description.append(document.createTextNode("A memory made brighter with you "));
      const heart = document.createElement("span");
      heart.textContent = "💙";
      description.append(heart);
      card.append(art, description);
      document.querySelector("#memory-grid").append(card);
    });
    if (files.length && available > 0) showToast("Your lovely memories are in the gallery ✨");
    photoInput.value = "";
  });

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function launchCelebration(count) {
    if (reducedMotion) count = Math.min(count, 24);
    const colors = ["#7bc8ed", "#b5e6fa", "#f3aac4", "#f8d587", "#c8b5ec", "#ffffff"];
    for (let index = 0; index < count; index += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty("--duration", `${2.3 + Math.random() * 2.2}s`);
      piece.style.setProperty("--sway", `${Math.round(Math.random() * 180 - 90)}px`);
      piece.style.setProperty("--spin", `${Math.round(Math.random() * 900 + 360)}deg`);
      confettiLayer.append(piece);
      window.setTimeout(() => piece.remove(), 5000);
    }
    for (let index = 0; index < 12; index += 1) {
      const star = document.createElement("span");
      star.className = "star-burst";
      star.textContent = Math.random() > .5 ? "✦" : "✧";
      star.style.left = `${5 + Math.random() * 90}%`;
      star.style.top = `${10 + Math.random() * 75}%`;
      star.style.animationDelay = `${Math.random() * .6}s`;
      confettiLayer.append(star);
      window.setTimeout(() => star.remove(), 2200);
    }
  }

  function playNote() {
    if (!audioContext || audioContext.state !== "running") return;
    const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5, 880, 783.99, 659.25, 587.33];
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(melody[noteIndex % melody.length], now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(.045, now + .06);
    gain.gain.exponentialRampToValueAtTime(.001, now + .55);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + .56);
    noteIndex += 1;
  }

  async function startMusic() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        showToast("Music is not supported in this browser.");
        return;
      }
      audioContext ??= new AudioContextClass();
      await audioContext.resume();
      if (musicPlaying) return;
      musicPlaying = true;
      musicButton.setAttribute("aria-pressed", "true");
      musicButton.setAttribute("aria-label", "Pause birthday music");
      musicButton.classList.add("music-playing");
      playNote();
      musicTimer = window.setInterval(playNote, 620);
    } catch (error) {
      console.error("Could not start birthday music:", error);
      showToast("The birthday music could not start. Try the music button again.");
    }
  }

  async function stopMusic() {
    musicPlaying = false;
    window.clearInterval(musicTimer);
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.setAttribute("aria-label", "Play birthday music");
    musicButton.classList.remove("music-playing");
    if (audioContext?.state === "running") await audioContext.suspend();
  }

  musicButton.addEventListener("click", () => musicPlaying ? stopMusic() : startMusic());

  function createFloatingHearts() {
    const holder = document.querySelector(".floating-hearts");
    for (let index = 0; index < 13; index += 1) {
      const heart = document.createElement("span");
      heart.textContent = index % 2 ? "♡" : "✧";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${12 + Math.random() * 18}s`;
      heart.style.animationDelay = `${Math.random() * -25}s`;
      heart.style.fontSize = `${12 + Math.random() * 14}px`;
      holder.append(heart);
    }
  }
  createFloatingHearts();

  function restart() {
    if (letterPaper.classList.contains("open")) closeLetter();
    stopMusic();
    document.querySelectorAll(".special-card").forEach((card) => card.setAttribute("aria-expanded", "false"));
    document.querySelector(".wish-result").classList.remove("visible");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
    launchCelebration(25);
  }
  document.querySelector(".restart-button").addEventListener("click", restart);
  document.querySelector(".restart-final").addEventListener("click", restart);
})();
