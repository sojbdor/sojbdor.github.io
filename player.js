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

    console.log("Morceaux récupérés :", sounds);

    tracks = sounds || [];




    /* Nettoyage */

    playlistElement.innerHTML = "";


    /* Création de la liste */

    tracks.forEach(function (sound, index) {

      const track = document.createElement("div");

      track.classList.add("track");


      /* Récupération sécurisée du titre */


const title = sound && sound.title
  ? sound.title
  : "UNKNOWN TRACK";

console.log("PISTE", index + 1, sound);


      track.innerHTML = `
        <span class="track-play">▷</span>

        <span class="track-number">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <span class="track-title">
          ${title}
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
   LECTURE
   ========================= */

function playTrack(index) {

  if (!tracks[index]) {
    return;
  }

  currentTrack = index;

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

    const icon =
      element.querySelector(".track-play");


    element.classList.remove("active");


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
