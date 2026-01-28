import { db } from "./firebase.js";
import { ref, push, get, onValue, remove, update } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ================= TAMBAH SISWA =================
window.tambahSiswa = async function () {
  const nama = document.getElementById("nama").value.trim().toUpperCase();
  const kelas = document.getElementById("kelas").value.trim().toUpperCase();

  if (!nama || !kelas) {
    alert("Nama dan kelas wajib diisi!");
    return;
  }

  const kelasRef = ref(db, `siswa/${kelas}`);

  // CEK DUPLIKAT
  const snapshot = await get(kelasRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const sudahAda = Object.values(data).some(
      s => s.nama === nama
    );
    if (sudahAda) {
      alert("❌ Siswa sudah ada di kelas ini!");
      return;
    }
  }

  await push(kelasRef, { nama });

  document.getElementById("nama").value = "";
  document.getElementById("kelas").value = "";
};

// ================= TAMPIL DATA SISWA =================
const siswaRef = ref(db, "siswa");

onValue(siswaRef, (snapshot) => {
  const tbody = document.getElementById("listSiswa");
  tbody.innerHTML = "";

  if (!snapshot.exists()) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3">Belum ada data siswa</td>
      </tr>`;
    return;
  }

  const data = snapshot.val();

  for (const kelas in data) {
    for (const id in data[kelas]) {
      const nama = data[kelas][id].nama;

      tbody.innerHTML += `
        <tr>
          <td>${nama}</td>
          <td>${kelas}</td>
          <td>
            <button onclick="editSiswa('${kelas}','${id}','${nama}')">✏️</button>
            <button onclick="hapusSiswa('${kelas}','${id}')">🗑️</button>
          </td>
        </tr>
      `;
    }
  }
});

// ================= EDIT SISWA =================
window.editSiswa = function (kelas, id, namaLama) {
  const namaBaru = prompt("Edit nama siswa:", namaLama);

  if (!namaBaru) return;

  update(ref(db, `siswa/${kelas}/${id}`), {
    nama: namaBaru.trim().toUpperCase()
  });
};

// ================= HAPUS SISWA =================
window.hapusSiswa = function (kelas, id) {
  if (!confirm("Hapus siswa ini?")) return;
  remove(ref(db, `siswa/${kelas}/${id}`));
};
