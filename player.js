const iframe =
  document.getElementById("soundcloud-player");

const playlistElement =
  document.getElementById("playlist");

const widget =
  SC.Widget(iframe);


let tracks = [];

let currentTrack = -1;


/* =========================
   SOUNDCLOUD READY
   ========================= */

widget.bind(
  SC.Widget.Events.READY,
  function () {

    console.log("SoundCloud ready");


    widget.getSounds(
      function (sounds) {

        console.log(
          "Morceaux récupérés :",
          sounds
        );


        tracks = sounds || [];


        /* Nettoyage */

        playlistElement.innerHTML = "";


        /* =========================
           CRÉATION DES TRACKS
           ========================= */

        tracks.forEach(
          function (sound, index) {

            const track =
              document.createElement("div");


            track.classList.add("track");


            /*
             * Récupération du titre
             */

            const title =
              sound &&
              sound.title
                ? sound.title
                : "TRACK UNAVAILABLE";


            /*
             * Si le titre n'existe pas,
             * on ajoute la classe unknown.
             */

            if (
              !sound ||
              !sound.title
            ) {

              track.classList.add("unknown");

            }


            track.innerHTML = `

              <span class="track-play">
                ▷
              </span>

              <span class="track-number">
                ${String(index + 1).padStart(2, "0")}
              </span>

              <span class="track-title">
                ${title}
              </span>

            `;


            /* =========================
               CLIC
               ========================= */

            if (
              sound &&
              sound.title
            ) {

              track.addEventListener(
                "click",
                function () {

                  playTrack(index);

                }
              );

            }


            playlistElement.appendChild(
              track
            );

          }
        );

      }
    );

  }
);


/* =========================
   LECTURE
   ========================= */

function playTrack(index) {

  if (!tracks[index]) {

    return;

  }


  currentTrack = index;


  /*
   * Changement de morceau
   */

  widget.skip(index);


  /*
   * Lecture
   */

  widget.play();


  /*
   * Mise à jour visuelle
   */

  updateActiveTrack();

}


/* =========================
   TRACK ACTIF
   ========================= */

function updateActiveTrack() {

  const elements =
    document.querySelectorAll(".track");


  elements.forEach(
    function (element, index) {

      const icon =
        element.querySelector(
          ".track-play"
        );


      element.classList.remove(
        "active"
      );


      if (
        index === currentTrack
      ) {

        element.classList.add(
          "active"
        );

        icon.textContent = "▶";

      }

      else {

        icon.textContent = "▷";

      }

    }
  );

}


/* =========================
   FIN DU MORCEAU
   ========================= */

widget.bind(
  SC.Widget.Events.FINISH,
  function () {


    /*
     * S'il reste un morceau
     */

    if (
      currentTrack <
      tracks.length - 1
    ) {

      currentTrack++;

      playTrack(
        currentTrack
      );

    }


    /*
     * Fin de la playlist
     */

    else {

      currentTrack = -1;

      updateActiveTrack();

    }

  }
);
