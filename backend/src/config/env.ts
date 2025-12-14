import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string(),
  APP_ORIGIN: z.string().startsWith("http"),
  PORT: z.string().length(4),
  NODE_ENV: z
    .union([
      z.literal("development"),
      z.literal("production"),
      z.literal("test"),
    ])
    .default("development"),
  TWITCH_CLIENT_ID: z.string(),
  TWITCH_OAUTH_TOKEN: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log(parsedEnv.error);
  process.exit(1);
}

export const env = parsedEnv.data;
