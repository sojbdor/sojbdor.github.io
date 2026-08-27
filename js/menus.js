```javascript
document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("site-menus");

  if (!container) {
    console.error("site-menus introuvable");
    return;
  }


  /* =====================================
     MENU 1
     ===================================== */

  const menu1 = document.createElement("div");

  menu1.className = "menu";

  menu1.innerHTML = `

    <a href="../index.html">
      <img
        src="../pix/cartedevisite.png"
        width="50%"
        oncontextmenu="return false"
        ondragstart="return false">
    </a>

    <br><br>

    <a href="../page/album.html">album</a><br>

    <a href="../page/ep.html">ep</a><br>

    <a href="../page/single.html">single</a><br>

    <a href="../page/remix.html">remix</a><br>

    <a href="../page/video.html">film score</a><br>

    <a href="../page/label.html">label</a><br>

  `;


  /* =====================================
     MENU 2
     ===================================== */

  const menu2 = document.createElement("div");

  menu2.className = "menu2";

  menu2.innerHTML = `

    Sukkube is a <b>live performer, DJ and music producer</b>
    based in France. She creates a unique, melodic brand of techno
    using <b>modular synthesisers</b>. Her style is inspired by
    artists such as Ben Klock, Burial and Andy Stott.
    Her music is <b>intense, melancholic and dystopian</b>.

    <br>

    <hr class="ma-ligne">

    RELEASES ON:

    <a href="https://detund.bandcamp.com/merch">
      DETROIT UNDERGROUND
    </a>,

    <a href="https://augmentedresearch.bandcamp.com/merch">
      AUGMENTED RESEARCH
    </a>,

    <a href="https://bcco.bandcamp.com/merch">
      BCCO
    </a>,

    <a href="https://diffusereality.bandcamp.com/">
      DIFFUSE REALITY
    </a>,

    <a href="https://thebrvtalist.bandcamp.com/merch">
      BRVTALIST
    </a>,

    <a href="https://examine-archive.bandcamp.com/merch">
      EXAMINE-ARCHIVE
    </a>,

    <a href="https://fallenmetropolis.bandcamp.com/merch">
      FALLEN METROPOLIS
    </a>,

    <a href="https://muhely.bandcamp.com/merch">
      MUHELY
    </a>

    <br>

    <hr class="ma-ligne">

    Production: Super Brut<br>

    Booking: sojbdor@gmail.com<br>

    Running:
    <a href="https://soundcloud.com/associaterecords">
      Associate Records
    </a><br>

    <a href="https://www.submithub.com/link/sukkube">
      Submithub
    </a>

  `;


  /* =====================================
     MENU 3 — SOUNDCLOUD
     ===================================== */

  const menu3 = document.createElement("div");

  menu3.className = "menu3";

  menu3.innerHTML = `

    <div class="menu3-header">
      <span>RELEASES</span>
    </div>


    <div
      id="playlist"
      class="playlist">

      <div class="loading">
        LOADING...
      </div>

    </div>


    <iframe
      id="soundcloud-player"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1998325212&auto_play=false"
      scrolling="no"
      frameborder="no"
      allow="autoplay; encrypted-media">
    </iframe>

  `;


  /* =====================================
     MENU 4
     ===================================== */

  const menu4 = document.createElement("div");

  menu4.className = "menu4";

  menu4.innerHTML = `

    LONG BIO<br>

    At the age of six, her grandmother gave her a Yamaha
    synthesiser. That was when her musical journey began;
    her mother used to listen to Depeche Mode and Amy Winehouse.
    She learnt to play the guitar with her neighbour and formed
    her first emo rock band. Later, she met Wizard
    (aka Clémentine Méreau), who showed her a few tricks on Ableton.

    <br><br>

    In 2016, she discovered Dommune radio and stumbled across
    DJ sets by the likes of Bruna and Stanislav Tolkachev,
    as well as tracks by Porter Ricks, Positive Centre, DJ Rush,
    Roma Zuckerman and Peter Van Hoesen.

    <br><br>

    After graduating from isdaT (Institute Superior of the Arts
    of Toulouse), she moved to Berlin, where she has been
    performing live since 2021. The same year, she founded
    Associate Records

    <br><br>

    Since 2023, she has been collaborating with Force Inc.
    Mille Plateaux, presenting modular performances. In 2024,
    she joined the IPN collective in Toulouse, where she continues
    to experiment and push the boundaries of her musical creations,
    whilst co-organising events and concerts.

    (Tramhaus, Parnship, Dernière Neige, We Act, Artefact,
    Orchestre Baraque à Free, Collectif 2035, S’enforester,
    Kuunatic, FRB, SNKLS, Leese, Trannie Season...).

    <br><br>

    Renowned for her live sound performances, she has performed
    at iconic venues and festivals within the electronic music scene:

    About Blank (Berlin), Acud Macht Neue (Berlin),
    Superbooth (Berlin), gART.n (Berlin), Fitzroy (Berlin),
    Ved Siden Af (Copenhagen), Forum Klub (Graz),
    Le Groove (Geneva), Metronum (Toulouse) and
    Le Printemps de Bourges (Bourges).

    <br>

    <hr class="ma-ligne">

    Finalist: Les inouïs 2026 du Printemps de Bourges
    crédit mutuel

    <br>

    Opening: Andrea Taeggi, Jessica Kert, Halosaur,
    Abstrs, Vixen

  `;


  /* =====================================
     AJOUT DES MENUS
     ===================================== */

  container.appendChild(menu1);
  container.appendChild(menu2);
  container.appendChild(menu3);
  container.appendChild(menu4);


  console.log("Menus chargés");

});
```
