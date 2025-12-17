import { getYtVideo } from "@/data/get-yt-video";
import { downloadAndSegmentAudio } from "@/data/segment-audio";
import { logger } from "@/helpers/logger";

export const downloadYtAudioForStreaming = async (
  videoUrl: string,
  outputFilenameBase: string
): Promise<string | undefined> => {
  try {
    logger.info(`[DOWNLOAD] Fetching audio stream URL ${videoUrl}`);
    const streamUrl = await getYtVideo(videoUrl);

    const manifestPath = await downloadAndSegmentAudio(
      streamUrl,
      outputFilenameBase
    );

    return manifestPath;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `[DOWNLOAD] Failed to process YouTube audio: ${error.message}`
      );
    }
  }
  return undefined;
};
