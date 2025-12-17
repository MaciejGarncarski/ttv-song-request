import { join } from "node:path";
import { mkdir } from "fs/promises";
import { CACHE_DIR } from "@/helpers/cache";
import { logger } from "@/helpers/logger";

export const downloadAndSegmentAudio = async (
  videoUrl: string,
  videoId: string
): Promise<string> => {
  const pathWithVideoId = join(CACHE_DIR, videoId);

  try {
    await mkdir(pathWithVideoId, { recursive: true });
  } catch (e) {
    console.error(`Could not create cache directory: ${CACHE_DIR}`, e);
    throw new Error("Failed to prepare cache directory.");
  }

  const manifestPath = join(pathWithVideoId, `${videoId}.m3u8`);

  const command = [
    "ffmpeg",
    "-i",
    videoUrl,
    "-vn",
    "-c:a",
    "aac",
    "-b:a",
    "256k",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "0",
    "-y",
    manifestPath,
  ];

  try {
    logger.info(
      `[STREAM] Starting HLS segmentation for stream URL ${videoUrl}`
    );
    const process = Bun.spawn(command, {
      stdout: "inherit",
      stderr: "inherit",
    });

    const exitCode = await process.exited;

    if (exitCode !== 0) {
      throw new Error(`ffmpeg failed HLS segmentation. Exit code: ${exitCode}`);
    }

    logger.info(
      `[STREAM] ✅ HLS segmentation complete. Manifest file: ${manifestPath}`
    );
    return manifestPath;
  } catch (error) {
    if (error instanceof Error)
      logger.error(`[STREAM] ❌ Segmentation process failed: ${error.message}`);
    throw error;
  }
};
