import { getYtVideo } from "@/data/get-yt-video";
import { downloadAndSegmentAudio } from "@/data/segment-audio";

export const downloadYtAudioForStreaming = async (
  videoUrl: string,
  outputFilenameBase: string
): Promise<string | undefined> => {
  try {
    console.log(`\n⏳ Fetching audio stream URL for: ${videoUrl}`);
    const streamUrl = await getYtVideo(videoUrl);

    const manifestPath = await downloadAndSegmentAudio(
      streamUrl,
      outputFilenameBase
    );

    return manifestPath;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n❌ Failed to process YouTube audio:`, error.message);
    }
  }
  return undefined;
};
