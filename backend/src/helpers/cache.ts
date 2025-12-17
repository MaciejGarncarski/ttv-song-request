import { dirname, join } from "node:path";
import { existsSync } from "fs";

export const PROJECT_ROOT = join(dirname(import.meta.dir), "..");
export const CACHE_DIR = join(PROJECT_ROOT, "cache");

export function checkIsInCache(videoId: string): boolean {
  const pathWithVideoId = join(CACHE_DIR, videoId);
  const manifestPath = join(pathWithVideoId, `${videoId}.m3u8`);

  if (existsSync(manifestPath)) {
    return true;
  }

  return false;
}
