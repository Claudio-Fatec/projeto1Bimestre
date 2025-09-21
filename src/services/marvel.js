import axios from 'axios';
import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';

// Preferível: ler do .env.local ou outro local seguro.
// Aqui uso app config fallbacks — substitua por sua forma de env vars.
const PUBLIC_KEY = Constants.manifest?.extra?.MARVEL_PUBLIC_KEY || process.env.MARVEL_PUBLIC_KEY || '2f65f392a66b583f3f750e4bcdb562c3';
const PRIVATE_KEY = Constants.manifest?.extra?.MARVEL_PRIVATE_KEY || process.env.MARVEL_PRIVATE_KEY || 'f4c6d77d8e4c94d1c14c02a15269d9f1fcfe86a4';

const BASE = 'https://gateway.marvel.com/v1/public';

function authParams() {
  const ts = new Date().getTime().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  return { ts, apikey: PUBLIC_KEY, hash };
}

/**
 * Busca personagens (characters). Accepts options { limit, offset, nameStartsWith }
 */
export async function fetchCharacters({ limit = 20, offset = 0, nameStartsWith } = {}) {
  const params = { ...authParams(), limit, offset };
  if (nameStartsWith) params.nameStartsWith = nameStartsWith;
  const url = `${BASE}/characters`;
  const resp = await axios.get(url, { params });
  return resp.data; // conforma Marvel returns envelope data
}

/**
 * Busca um personagem por ID
 */
export async function fetchCharacterById(id) {
  const params = { ...authParams() };
  const url = `${BASE}/characters/${id}`;
  const resp = await axios.get(url, { params });
  return resp.data;
}
