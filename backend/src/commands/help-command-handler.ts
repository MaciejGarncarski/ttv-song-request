import { CommandHandler, ExecuteParams } from "@/commands/command";

export class HelpCommandHandler extends CommandHandler {
  private readonly regex = /^![^!]/i;

  canHandle(messageText: string): boolean {
    return this.regex.test(messageText);
  }

  async execute({
    deps: { logger, sendChatMessage },
    messageId,
  }: ExecuteParams) {
    logger.info(`[COMMAND] [HELP] Sending help message.`);

    const helpMessage = `Dostępne komendy: !sr <link | fraza>, !song, !queue, !help - pokaż tę wiadomość, !wrongsong - usuń swoją piosenkę z kolejki, !github - link do repozytorium,
    !voteskip, !next - informacje o następnej piosence, !pause - (tylko mod), !play - (tylko mod), !skip (tylko mod), !volume <0-100> (tylko mod)`;

    await sendChatMessage(helpMessage, messageId);
  }
}
