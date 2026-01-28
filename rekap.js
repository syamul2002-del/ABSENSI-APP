import { db } from "./firebase.js";
import { ref, get } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.loadRekap = async function () {
  const kelas = document.getElementById("kelas").value;
  const tanggal = document.getElementById("tanggal").value;
  const tbody = document.getElementById("rekapData");
  const summary = document.getElementById("summary");

  tbody.innerHTML = "";
  summary.innerHTML = "";

  if (!kelas || !tanggal) {
    alert("Pilih kelas dan tanggal!");
    return;
  }

  const rekapRef = ref(db, `absensi/${tanggal}/${kelas}`);
  const snapshot = await get(rekapRef);

  if (!snapshot.exists()) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2">Tidak ada data absensi</td>
      </tr>`;
    return;
  }

  let hadir = 0;
  let alpha = 0;

  const data = snapshot.val();
  for (const id in data) {
    const { nama, status } = data[id];

    if (status === "Hadir") hadir++;
    else alpha++;

    tbody.innerHTML += `
      <tr>
        <td>${nama}</td>
        <td>${status}</td>
      </tr>
    `;
  }

  summary.innerHTML = `
    <p>✅ Hadir: <b>${hadir}</b></p>
    <p>❌ Alpha: <b>${alpha}</b></p>
  `;
};
