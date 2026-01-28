import { db } from "./firebase.js";
import { ref, get, set } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.loadSiswa = async function () {
  const kelas = document.getElementById("kelas").value;
  const tanggal = document.getElementById("tanggal").value;
  const tbody = document.getElementById("listAbsensi");

  tbody.innerHTML = "";

  if (!kelas || !tanggal) {
    alert("Pilih kelas dan tanggal!");
    return;
  }

  // 🔥 ambil siswa berdasarkan kelas
  const siswaRef = ref(db, `siswa/${kelas}`);
  const snapshot = await get(siswaRef);

  if (!snapshot.exists()) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2">Tidak ada siswa</td>
      </tr>`;
    return;
  }

  const data = snapshot.val();

  for (const id in data) {
    const nama = data[id].nama;

    tbody.innerHTML += `
      <tr>
        <td>${nama}</td>
        <td>
          <select onchange="simpanAbsensi('${id}', '${nama}', this.value)">
            <option value="">Pilih</option>
            <option value="Hadir">Hadir</option>
            <option value="Alpha">Alpha</option>
          </select>
        </td>
      </tr>
    `;
  }
};

window.simpanAbsensi = async function (id, nama, status) {
  const kelas = document.getElementById("kelas").value;
  const tanggal = document.getElementById("tanggal").value;

  if (!status) return;

  const absensiRef = ref(db, `absensi/${tanggal}/${kelas}/${id}`);

  await set(absensiRef, {
    nama: nama,
    status: status
  });
};
