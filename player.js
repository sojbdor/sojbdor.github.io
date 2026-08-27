const iframe = document.getElementById("soundcloud-player");

const playlistElement = document.getElementById("playlist");

const trackCountElement = document.getElementById("track-count");

const widget = SC.Widget(iframe);

let tracks = [];

let currentTrack = -1;


/* =========================
   SOUNDCLOUD PRÊT
   ========================= */

widget.bind(SC.Widget.Events.READY, function () {

  console.log("SoundCloud ready");


  widget.getSounds(function (sounds) {

    tracks = sounds;


    /* Nombre de morceaux */

    trackCountElement.textContent =
      String(tracks.length).padStart(2, "0");


    /* Nettoyage */

    playlistElement.innerHTML = "";


    /* Création de la liste */

    tracks.forEach(function (sound, index) {

      const track = document.createElement("div");

      track.classList.add("track");


      track.innerHTML = `
        <span class="track-play">▷</span>
        <span class="track-number">
          ${String(index + 1).padStart(2, "0")}
        </span>
        <span class="track-title">
          ${sound.title}
        </span>
      `;


      /* Clic sur le morceau */

      track.addEventListener("click", function () {

        playTrack(index);

      });


      playlistElement.appendChild(track);

    });

  });

});


/* =========================
   LECTURE D'UN MORCEAU
   ========================= */

function playTrack(index) {

  if (!tracks[index]) {
    return;
  }


  currentTrack = index;


  /*
   * On demande à SoundCloud
   * de jouer le morceau.
   */

  widget.skip(index);

  widget.play();


  updateActiveTrack();

}


/* =========================
   MORCEAU ACTIF
   ========================= */

function updateActiveTrack() {

  const elements =
    document.querySelectorAll(".track");


  elements.forEach(function (element, index) {

    element.classList.remove("active");


    const icon =
      element.querySelector(".track-play");


    if (index === currentTrack) {

      element.classList.add("active");

      icon.textContent = "▶";

    } else {

      icon.textContent = "▷";

    }

  });

}


/* =========================
   MORCEAU TERMINÉ
   ========================= */

widget.bind(SC.Widget.Events.FINISH, function () {

  if (currentTrack < tracks.length - 1) {

    currentTrack++;

    playTrack(currentTrack);

  } else {

    currentTrack = -1;

    updateActiveTrack();

  }

});
