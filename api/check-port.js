import net from 'net';

export default async function handler(req, res) {
  // Aktifkan CORS agar dapat dipanggil dari frontend secara langsung
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { host, port } = req.query;
  if (!host || !port) {
    return res.status(400).json({ error: 'Host dan port wajib diisi' });
  }

  const portInt = parseInt(port, 10);
  if (isNaN(portInt) || portInt < 1 || portInt > 65535) {
    return res.status(400).json({ error: 'Nomor port tidak valid (harus antara 1-65535)' });
  }

  const timeout = 3500; // Timeout 3.5 detik
  const socket = new net.Socket();
  let status = 'closed';

  const checkPromise = new Promise((resolve) => {
    socket.setTimeout(timeout);

    socket.on('connect', () => {
      status = 'open';
      socket.destroy();
      resolve();
    });

    socket.on('timeout', () => {
      status = 'closed';
      socket.destroy();
      resolve();
    });

    socket.on('error', () => {
      status = 'closed';
      socket.destroy();
      resolve();
    });

    socket.on('close', () => {
      resolve();
    });

    socket.connect(portInt, host);
  });

  await checkPromise;

  return res.status(200).json({
    host,
    port: portInt,
    status
  });
}
