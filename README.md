# Twitch Chat Bot

This project is a Twitch-integrated bot or dashboard that connects a custom frontend with a Bun-powered backend.

## 1. Prerequisites

Ensure you have [bun](https://bun.com/docs/installation) installed on your machine.

Before starting, ensure you have a registered application on Twitch.

- Twitch Developer Account: Register an app at the [Twitch Dev Console](https://dev.twitch.tv/console).

- Confidential Client: Ensure your "Client Type" is set to Confidential in the console.

- Redirect URI: Add https://twitchtokengenerator.com (for setup) and http://localhost:3302 (3302 is default port).

## Configuration & Tokens

### Generate OAuth Tokens

1. Go to [Twitch Token Generator.](https://twitchtokengenerator.com/)

2. Select "Use My Client Secret and Client ID".

3. Input your Client ID and Client Secret from the Twitch Console.

4. In "Use My Client Secret and Client ID" section

   - Input your client id and client secret
   - Select those scopes: chat:read
     - chat:read
     - chat:edit
     - user:bot
     - user:read:chat
     - user:write:chat
   - Copy generated tokens to your .env

5. Click Generate and keep the tab open.

### Environment Setup

Frontend

```
VITE_WS_URL=ws://localhost:3302/api/ws
VITE_API_URL=http://localhost:3302/
```

Backend

```
APP_ORIGINS=http://localhost:3301,http://192.168.0.1:3301
API_URL=http://localhost:3302
PORT=3302

# Twitch Auth
TWITCH_CLIENT_ID=twitch_dev_client_id
TWITCH_CLIENT_SECRET=twitch_dev_client_secret
TWITCH_ACCESS_TOKEN=generated_access_token
TWITCH_REFRESH_TOKEN=generated_refresh_token
TWITCH_BROADCASTER_ID=user_id_where_bot_works

# Optional: YouTube Authentication
YT_COOKIE="OPTIONAL BUT RECOMMENDED https://ytjs.dev/guide/authentication.html#cookies"
```

## 3. Installation & Running

### Install dependencies

Run `bun install` in project root

### Start frontend

```bash
cd frontend
bun dev
```

### Start frontend

```bash
cd backend
bun dev
```
