// --- Local fallback images ---
import E1 from "@/assets/E1.jpg";
import M1 from "@/assets/M1.jpg";
import M2 from "@/assets/M2.jpg";
import S1 from "@/assets/S1.jpg";
import Y1 from "@/assets/Y1.jpg";

const fallbackImages = [E1, M1, M2, S1, Y1];

export function getRandomLocalImage() {
  const index = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[index];
}

// --- API for random anime image ---
const API_URL = "https://api.waifu.pics/sfw/waifu";

export async function getRandomImage() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error("API error");
    const data = await res.json();

    if (!data?.url) throw new Error("Invalid API format");

    return data.url;
  } catch (error) {
    return getRandomLocalImage(); // fallback local
  }
}
