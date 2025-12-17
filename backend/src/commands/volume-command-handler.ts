import { CommandHandler, Deps } from "@/commands/command";
import { checkIsMod } from "@/helpers/check-is-mod";
import { logger } from "@/helpers/logger";
import { sanitizeMessage } from "@/helpers/sanitize-message";
import { TwitchWSMessage } from "@/types/twitch-ws-message";
import z from "zod";

export class VolumeCommandHandler extends CommandHandler {
  private readonly regex = /^!volume\s+(0(\.\d+)?|1(\.[0]+)?)\s*$/;

  canHandle(messageText: string): boolean {
    return this.regex.test(messageText);
  }

  async execute(
    parsedMessage: TwitchWSMessage,
    { playbackManager, sendChatMessage }: Deps
  ) {
    try {
      const payload = parsedMessage.payload;

      if (!payload.event) {
        throw new Error("No event found in payload.");
      }

      const isMod = checkIsMod(
        payload.event.badges,
        payload.event.chatter_user_id,
        payload.event.broadcaster_user_id
      );

      if (!isMod) {
        throw new Error("NOT_A_MOD");
      }

      const messageText = sanitizeMessage(
        parsedMessage.payload.event?.message?.text || ""
      );

      const match = messageText.match(this.regex);
      const messageId = parsedMessage.payload.event?.message_id;

      if (!match || !messageId) {
        throw new Error("Not matching VOLUME command or missing messageId.");
      }

      const volume = parseFloat(match[1]);

      if (volume > 1) {
        return;
      }

      playbackManager.setVolume(volume);

      await sendChatMessage(
        `Ustawiono głośność na ${volume * 100}%.`,
        messageId
      );
    } catch (error) {
      if (error instanceof Error) {
        await sendChatMessage(
          "Tylko moderatorzy mogą używać tej komendy.",
          parsedMessage.payload.event?.message_id
        );
      }

      logger.error(
        `[COMMAND] [VOLUME] Error executing volume command: ${error}`
      );
    }
  }
}
