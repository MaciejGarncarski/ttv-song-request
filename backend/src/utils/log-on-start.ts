import { sendChatMessage } from "@/api/send-chat-message";
import { env } from "@/config/env";
import { logger } from "@/lib/logger";

export const logOnStart = async () => {
  logger.info(`Sever started, listening on ${env.API_URL}`);

  if (env.NODE_ENV !== "production") {
    return;
  }
  await sendChatMessage("CoolCat Bot działa GoatEmotey");
};
