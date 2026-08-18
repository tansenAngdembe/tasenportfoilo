// Pexels API client and curated royalty-free image provider for developer blogs

const PEXELS_API_KEY = "4S8pcyWLjeyjUc52eUYcR2JKTIN9sLqVJ7uxcoSWriM9nWdvTN74oM9h";

// Curated high quality web-optimized fallback tech imagery
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Spring Boot & Java": "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "AWS": "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "AWS Troubleshooting": "https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Docker": "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Linux": "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "MySQL & Database": "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Redis": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "REST API": "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Git & GitHub": "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "IntelliJ IDEA": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Java Advanced": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Cloudflare & Hosting": "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Troubleshooting": "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "default": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

const imageCache = new Map<string, string>();

/**
 * Fetch a high-quality developer-oriented photo from Pexels API with fallback
 */
export async function getPexelsImage(query: string, category?: string): Promise<string> {
  const cacheKey = `${query}_${category || "default"}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const fallback = (category && CATEGORY_FALLBACK_IMAGES[category]) || CATEGORY_FALLBACK_IMAGES.default;

  try {
    const searchQuery = encodeURIComponent(`${query} software technology programming`);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      imageCache.set(cacheKey, fallback);
      return fallback;
    }

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      const photoUrl = data.photos[0].src.large2x || data.photos[0].src.large || fallback;
      imageCache.set(cacheKey, photoUrl);
      return photoUrl;
    }
  } catch (err) {
    console.warn("Pexels fetch failed, using fallback", err);
  }

  imageCache.set(cacheKey, fallback);
  return fallback;
}

export function getCategoryFallbackImage(category: string): string {
  return CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.default;
}
