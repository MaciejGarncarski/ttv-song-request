import { CommandHandler, ExecuteParams } from "@/commands/command";
import { logger } from "@/helpers/logger";

export class GithubCommandHandler extends CommandHandler {
  private readonly regex = /^!github\b/i;

  canHandle(messageText: string): boolean {
    return this.regex.test(messageText);
  }

  async execute({ deps: { sendChatMessage }, messageId }: ExecuteParams) {
    logger.info(`[COMMAND] [GITHUB] Sending GitHub repository link.`);
    await sendChatMessage(
      "Link do repozytorium: https://github.com/maciejgarncarski/twitch-chat-bot",
      messageId
    );
  }
}
