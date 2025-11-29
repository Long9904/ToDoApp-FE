// --- Local fallback images ---
import E1 from "@/assets/E1.jpg";
import M1 from "@/assets/M1.jpg";
import M2 from "@/assets/M2.jpg";
import S1 from "@/assets/S1.jpg";
import Y1 from "@/assets/Y1.jpg";

const fallbackImages = [E1, M1, M2, S1, Y1];

export async function getRandomImage() {
  const index = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[index];
}
