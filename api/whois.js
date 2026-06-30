import net from 'net';

function queryWhoisServer(server, query) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    let response = '';

    socket.setTimeout(5000);

    socket.connect(43, server, () => {
      socket.write(query + '\r\n');
    });

    socket.on('data', (chunk) => {
      response += chunk.toString();
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('Connection timeout to WHOIS server'));
    });

    socket.on('error', (err) => {
      socket.destroy();
      reject(err);
    });

    socket.on('close', () => {
      resolve(response);
    });
  });
}

export default async function handler(req, res) {
  // Enable CORS
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

  const { domain } = req.query;
  if (!domain) {
    return res.status(400).json({ error: 'Domain wajib diisi' });
  }

  // Clean domain input (remove http, https, paths, etc.)
  let cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];

  try {
    // Langkah 1: Tanya IANA untuk mencari WHOIS server spesifik TLD-nya
    const ianaResponse = await queryWhoisServer('whois.iana.org', cleanDomain);
    
    // Cari baris refer: atau whois:
    const referMatch = ianaResponse.match(/refer:\s+(\S+)/i) || ianaResponse.match(/whois:\s+(\S+)/i);
    
    let whoisData = '';
    if (referMatch && referMatch[1]) {
      const specificServer = referMatch[1].trim();
      // Langkah 2: Tanya WHOIS server spesifik tersebut
      whoisData = await queryWhoisServer(specificServer, cleanDomain);
    } else {
      // Jika IANA tidak memberikan referensi, gunakan respon dari IANA saja
      whoisData = ianaResponse;
    }

    return res.status(200).json({
      domain: cleanDomain,
      rawData: whoisData
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Gagal melakukan WHOIS lookup.' });
  }
}
