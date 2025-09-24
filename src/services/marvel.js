import axios from "axios";
import * as CryptoJS from "crypto-js";
import Constants from "expo-constants";

const PUBLIC_KEY = Constants.expoConfig.extra.MARVEL_PUBLIC_KEY;'2f65f392a66b583f3f750e4bcdb562c3'
const PRIVATE_KEY = Constants.expoConfig.extra.MARVEL_PRIVATE_KEY;'f4c6d77d8e4c94d1c14c02a15269d9f1fcfe86a4'

export async function fetchCharacters({ limit = 10, offset = 0, name }) {
  const ts = Date.now().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

  let url = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  if (name) {
    url += `&nameStartsWith=${encodeURIComponent(name)}`;
  }

  const response = await axios.get(url);
  return response.data;
}
