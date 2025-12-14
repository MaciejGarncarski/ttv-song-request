import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { logOnStart } from "@/utils/log-on-start";
import { wrap } from "@bogeychan/elysia-logger";
import { logger } from "@/lib/logger";
import { env } from "@/config/env";
import { ChatWebSocket } from "@/lib/chat-ws";
import { sendChatMessage } from "@/api/send-chat-message";

new ChatWebSocket();

export const app = new Elysia()
  .use(wrap(logger))
  .use(
    cors({
      origin: env.APP_ORIGIN,
    })
  )
  .onError(({ code, status }) => {
    if (code === "NOT_FOUND")
      return status(404, {
        status: "Endpoint not found",
      });
  })
  .get("/", async () => {
    await sendChatMessage("OhMyDog Bot się odpala OhMyDog");
    return "hi";
  })
  .listen(env.PORT);

logOnStart();
