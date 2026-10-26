
/* ==================================================
   SUKKUBE — SOUNDCLOUD PLAYER
   ================================================== */

(function () {
  "use strict";

  const iframe = document.getElementById("soundcloud-player");
  const playlistElement = document.getElementById("playlist");

  // Le lecteur n'est pas présent sur cette page.
  if (!iframe || !playlistElement) {
    return;
  }

  // Vérifier que l'API SoundCloud est chargée.
  if (typeof SC === "undefined" || typeof SC.Widget !== "function") {
    console.error("SUKKUBE : l'API SoundCloud n'est pas chargée.");
    playlistElement.textContent = "SoundCloud indisponible.";
    return;
  }

  const widget = SC.Widget(iframe);

  let tracks = [];
  let currentTrack = -1;
  let ready = false;

  /* ------------------------------------------
     Afficher le morceau actif
     ------------------------------------------ */

  function updateActiveTrack() {
    const elements = playlistElement.querySelectorAll(".track");

    elements.forEach(function (element, index) {
      const icon = element.querySelector(".track-play");
      const isActive = index === currentTrack;

      element.classList.toggle("active", isActive);

      if (icon) {
        icon.textContent = isActive ? "▶" : "▷";
      }

      if (isActive) {
        element.setAttribute("aria-current", "true");
      } else {
        element.removeAttribute("aria-current");
      }
    });
  }

  /* ------------------------------------------
     Lancer un morceau
     ------------------------------------------ */

  function playTrack(index) {
    if (!ready) return;
    if (!Number.isInteger(index)) return;
    if (index < 0 || index >= tracks.length) return;

    const sound = tracks[index];

    // Ne pas lancer les entrées sans titre.
    if (!sound || !sound.title) return;

    currentTrack = index;
    updateActiveTrack();

    widget.skip(index);
    widget.play();
  }

  /* ------------------------------------------
     Construire la playlist
     ------------------------------------------ */

  function renderPlaylist() {
    playlistElement.replaceChildren();

    if (tracks.length === 0) {
      const message = document.createElement("div");
      message.className = "loading";
      message.textContent = "Aucun morceau disponible.";
      playlistElement.appendChild(message);
      return;
    }
      
      tracks.slice(0, 5).forEach(function (sound, index) {
      const track = document.createElement("div");
      track.className = "track";
      track.setAttribute("role", "button");
      track.setAttribute("tabindex", "0");

      const icon = document.createElement("span");
      icon.className = "track-play";
      icon.textContent = "▷";
      icon.setAttribute("aria-hidden", "true");

      const number = document.createElement("span");
      number.className = "track-number";
      number.textContent = String(index + 1).padStart(2, "0");
      number.setAttribute("aria-hidden", "true");

      const title = document.createElement("span");
      title.className = "track-title";
      title.textContent =
        sound && sound.title
          ? sound.title
          : "TRACK UNAVAILABLE";

      track.append(icon, number, title);

      if (sound && sound.title) {
        track.setAttribute("aria-label", "Play " + sound.title);

        track.addEventListener("click", function () {
          playTrack(index);
        });

        // Permet aussi la sélection au clavier.
        track.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            playTrack(index);
          }
        });
      } else {
        track.classList.add("unknown");
        track.removeAttribute("tabindex");
        track.removeAttribute("role");
      }

      playlistElement.appendChild(track);
    });

    updateActiveTrack();
  }

  /* ------------------------------------------
     Initialisation du lecteur
     ------------------------------------------ */

  widget.bind(SC.Widget.Events.READY, function () {
    ready = true;

    playlistElement.textContent = "LOADING...";

    widget.getSounds(function (sounds) {
      tracks = Array.isArray(sounds) ? sounds : [];
      renderPlaylist();

      console.log(
        "SUKKUBE : " + tracks.length + " morceaux récupérés."
      );
    });

    // Si une lecture a déjà commencé, repérer le morceau.
    widget.getCurrentSound(function (sound) {
      if (!sound) return;

      const index = tracks.findIndex(function (track) {
        return track && track.id === sound.id;
      });

      if (index !== -1) {
        currentTrack = index;
        updateActiveTrack();
      }
    });
  });

  /* ------------------------------------------
     Synchroniser la sélection avec SoundCloud
     ------------------------------------------ */

  widget.bind(SC.Widget.Events.PLAY, function () {
    widget.getCurrentSound(function (sound) {
      if (!sound) return;

      const index = tracks.findIndex(function (track) {
        return track && track.id === sound.id;
      });

      if (index !== -1) {
        currentTrack = index;
        updateActiveTrack();
      }
    });
  });

  /* ------------------------------------------
     Passer au morceau suivant à la fin
     ------------------------------------------ */

  widget.bind(SC.Widget.Events.FINISH, function () {
    if (currentTrack >= 0 && currentTrack < tracks.length - 1) {
      playTrack(currentTrack + 1);
    } else {
      currentTrack = -1;
      updateActiveTrack();
    }
  });

})();
