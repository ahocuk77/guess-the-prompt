// Firebase init
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const gameRef = db.ref("game");
const playersRef = db.ref("players");

// ---- Helpers ----
function uid() {
  let id = localStorage.getItem("gp_uid");
  if (!id) { id = "u_" + Math.random().toString(36).slice(2, 10); localStorage.setItem("gp_uid", id); }
  return id;
}
function esc(s){ return (s||"").replace(/[&<>"]/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c])); }

// Initial game state shape (admin writes this)
// game = {
//   phase: "lobby" | "guess" | "show" | "vote" | "winner" | "reveal" | "final",
//   currentPhoto: 0,
//   photos: [ {url, realPrompt} ],
//   timer: { running, endsAt, duration },
//   guesses: { photoIndex: { uid: {name, text} } },
//   votes:   { photoIndex: { voterUid: votedUid } }
// }
