# Panduan Mengganti Sandi WiFi ZTE (IndiHome)

Modem/Router ZTE sangat umum digunakan oleh penyedia layanan internet seperti IndiHome. Berikut adalah cara mudah mengubah kata sandinya.

## Langkah 1: Akses Halaman Admin

Pastikan Anda terhubung ke jaringan WiFi Anda, lalu buka browser dan ketik alamat IP default ZTE:
`http://192.168.1.1`

## Langkah 2: Login

Gunakan kredensial default untuk pelanggan. Biasanya menggunakan kata sandi `user`.

```json
{
  "username": "user",
  "password": "user"
}
```
*Catatan: Jika `user` tidak berhasil, terkadang teknisi menggunakan password `user1234` atau menggunakan akun `admin` (hubungi teknisi jika tidak tahu password admin).*

## Langkah 3: Ubah Kata Sandi

1. Setelah masuk ke halaman utama (Dashboard), pilih tab **Network** di bagian atas.
2. Di sebelah kiri, buka menu **WLAN** > **Security**.
3. Di halaman ini, cari kotak isian yang bernama **WPA Passphrase**.
4. Centang kotak *Show Password* (jika ada) untuk melihat apa yang Anda ketik, lalu ganti sandi di kolom **WPA Passphrase** tersebut dengan sandi baru Anda.

## Langkah 4: Simpan
Klik tombol **Submit** di bagian bawah. Jaringan WiFi Anda akan terputus sesaat. Anda harus login ulang ke WiFi menggunakan kata sandi yang baru saja Anda buat.
