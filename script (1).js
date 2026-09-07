const API = "https://qz5b64rw5e.execute-api.eu-north-1.amazonaws.com";

let takenReminders = {};

// ===================== SAVE =====================
function setReminder() {
  const name = document.getElementById("name").value;
  const medicine = document.getElementById("medicine").value;
  const time = document.getElementById("time").value;
  const status = document.getElementById("status");

  if (!name || !medicine || !time) {
    status.innerText = "⚠ Fill all fields";
    return;
  }

  status.innerText = "Saving...";

  fetch(API + "/save", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name, medicine, time })
  })
  .then(res => res.json())
  .then(() => {
    status.innerText = "Saved!";
    setTimeout(()=>{
      window.location.href = "dashboard.html";
    }, 500); // small delay (important)
  })
  .catch(err => {
    console.log(err);
    status.innerText = "❌ Error saving";
  });
}


// ===================== LOAD =====================
function loadReminders() {
  fetch(API + "/getReminders")
    .then(res => res.json())
    .then(data => {
      window.allData = data;
      render(data);
    })
    .catch(err => console.log(err));
}


// ===================== RENDER =====================
function render(data) {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  if (!list) return;

  list.innerHTML = "";

  if (!data || data.length === 0) {
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  data.sort((a,b)=>a.time.localeCompare(b.time));

  data.forEach(r => {
    list.innerHTML += `
      <div class="card">
        <b>${r.name}</b><br>
        💊 ${r.medicine}<br>
        ⏰ ${r.time}<br>

        <button class="taken-btn"
          onclick="markTaken(this,'${r.id}')">
          ${takenReminders[r.id] ? "✔ Taken":"Taken"}
        </button>

        <button class="delete-btn"
          onclick="deleteReminder('${r.id}')">
          Delete
        </button>
      </div>
    `;
  });
}


// ===================== DELETE =====================
function deleteReminder(id) {

  if (!confirm("Delete this reminder?")) return;

  console.log("Deleting ID:", id);

  fetch(API + "/delete/" + id, {
    method: "DELETE"
  })
  .then(res => {
    console.log("Response status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("Delete response:", data);

    alert("Deleted successfully ✅");

    loadReminders(); // refresh UI
  })
  .catch(err => {
    console.log("Delete error:", err);
    alert("Delete failed ❌");
  });
}


// ===================== SEARCH =====================
function searchReminder() {
  const val = document.getElementById("search").value.toLowerCase();

  const filtered = window.allData.filter(r =>
    r.name.toLowerCase().includes(val) ||
    r.medicine.toLowerCase().includes(val)
  );

  render(filtered);
}


// ===================== TAKEN =====================
function markTaken(btn, id) {
  takenReminders[id] = true;
  btn.innerText = "✔ Taken";
}


// ===================== DARK MODE =====================
function toggleMode() {
  document.body.classList.toggle("dark");

  localStorage.setItem("mode",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

// load theme
if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark");
}


// ===================== CLOCK =====================
setInterval(() => {
  const now = new Date();
  const clock = document.getElementById("clock");

  if (clock) {
    clock.innerText = "Current Time: " + now.toLocaleTimeString();
  }
}, 1000);


// ===================== NEXT REMINDER (FIXED) =====================
function loadFrontPageData() {
  fetch(API + "/getReminders")
    .then(res => res.json())
    .then(data => {

      if (!data || data.length === 0) {
        document.getElementById("nextReminder").innerText = "No reminders";
        document.getElementById("stats").innerText = "0 reminders";
        return;
      }

      data.sort((a,b)=>a.time.localeCompare(b.time));

      const now = new Date();
      const current =
        now.getHours().toString().padStart(2,'0') + ":" +
        now.getMinutes().toString().padStart(2,'0');

      let next = data.find(r => r.time >= current);

      if (!next) next = data[0];

      document.getElementById("nextReminder").innerText =
        `${next.medicine} at ${next.time}`;

      document.getElementById("stats").innerText =
        `Total: ${data.length} reminders`;
    })
    .catch(err => {
      console.log(err);
      document.getElementById("nextReminder").innerText = "Error loading";
    });
}


// ===================== ALERT =====================
function triggerAlarm(medicine){
  const popup = document.getElementById("popup");
  const text = document.getElementById("popupText");

  if (popup && text) {
    text.innerText = "⏰ Take " + medicine;
    popup.classList.remove("hidden");
  }

  const audio = document.getElementById("alarmSound");
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  }
}

function closePopup(){
  const popup = document.getElementById("popup");
  if (popup) popup.classList.add("hidden");
}


// ===================== ALERT CHECK =====================
setInterval(() => {
  const now = new Date();

  const current =
    now.getHours().toString().padStart(2,'0') + ":" +
    now.getMinutes().toString().padStart(2,'0');

  fetch(API + "/getReminders")
    .then(res => res.json())
    .then(data => {
      data.forEach(r => {
        if (r.time === current && !takenReminders[r.id]) {
          triggerAlarm(r.medicine);
          takenReminders[r.id] = true;
        }
      });
    });

}, 10000);


// ===================== AUTO LOAD =====================
if (window.location.pathname.includes("dashboard")) {
  loadReminders();
}

if (!window.location.pathname.includes("dashboard")) {
  loadFrontPageData();
}


if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function showNotification(msg){
  if (Notification.permission === "granted") {
    new Notification("Medicine Reminder", { body: msg });
  }
}


function updateDashboardExtra() {

  fetch(API + "/getReminders")
    .then(res => res.json())
    .then(data => {

      if (!data || data.length === 0) return;

      const total = data.length;
      const taken = Object.keys(takenReminders).length;
      const pending = total - taken;

      const statsDash = document.getElementById("statsDash");
      if (statsDash) {
        statsDash.innerText =
          `Total: ${total} | Taken: ${taken} | Pending: ${pending}`;
      }

      const now = new Date();

      let future = data.filter(r => {
        const [h,m] = r.time.split(":");
        const t = new Date();
        t.setHours(h,m,0);
        return t > now;
      });

      future.sort((a,b)=>a.time.localeCompare(b.time));

      let next = future[0];

      const nextDose = document.getElementById("nextDose");

      if (next && nextDose) {
        const [h,m] = next.time.split(":");
        const t = new Date();
        t.setHours(h,m,0);

        const diff = Math.floor((t - now)/60000);
        const hrs = Math.floor(diff/60);
        const mins = diff%60;

        nextDose.innerText =
          `${next.medicine} in ${hrs}h ${mins}m`;
      }
    });
}

setInterval(updateDashboardExtra,10000);
updateDashboardExtra();




function snooze(){
  closePopup();

  setTimeout(()=>{
    alert("⏰ Reminder again!");
  },60000);
}