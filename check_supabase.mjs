import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read from .env.local manually for the node script
const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL="(.*?)"/);
const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY="(.*?)"/);

if (!urlMatch || !keyMatch) {
  console.log('Kunci tidak ditemukan di .env.local');
  process.exit(1);
}

const supabase = createClient(urlMatch[1], keyMatch[1]);

async function check() {
  const { data, error } = await supabase.from('tutorials').select('slug, title');
  
  if (error) {
    console.error('ERROR (Gagal Konek / Tabel Belum Ada):', error.message);
  } else {
    console.log('BERHASIL! Data di dalam tabel tutorials:');
    console.table(data);
  }
}

check();
