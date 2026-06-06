# 🤖 Slacky

> Your team's reluctant but reliable Slack assistant.

Slacky is a Slack bot built with [Bolt for JavaScript](https://slack.dev/bolt-js/). It's hosted and always running — no setup needed to use it.


## Usage

Slacky is already live in the workspace. Just type any command in any channel or DM:

| Command | Description |
|---|---|
| `/slacky-ping` | Check bot latency |
| `/slacky-qotd` | Quote of the day |
| `/slacky-trivia` | Random trivia question with spoiler answer |
| `/slacky-dadjoke` | A certified dad joke |
| `/slacky-catfact` | Unsolicited cat knowledge |
| `/slacky-8ball [question]` | Ask the universe something |
| `/slacky-roast [@someone]` | Light someone up (affectionately) |
| `/slacky-help` | List all commands |

> Commands are ephemeral by default — only you see the response.

________________________________________________________________

## Tech Stack

- **Runtime** — Node.js
- **Framework** — [@slack/bolt](https://github.com/slackapi/bolt-js)
- **HTTP** — [axios](https://github.com/axios/axios)
- **Hosted on** — [Hack Club](https://hackclub.app)

**APIs used (all free, no key required):**
- [catfact.ninja](https://catfact.ninja) — cat facts
- [official-joke-api](https://official-joke-api.appspot.com) — dad jokes
- [zenquotes.io](https://zenquotes.io) — quotes
- [Open Trivia DB](https://opentdb.com) — trivia



## Project Structure

```
slack-bot/
├── index.js        # All commands and bot logic
├── .env            # Secrets (not committed)
├── .env.example    # Template for contributors
├── package.json
└── README.md
```

_____________________________________________________________________

## Contributing

Want to add a command or fix something? Here's how to run it locally:

### 1. Clone the repo

```bash
git clone https://github.com/your-username/slack-bot.git
cd slack-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your tokens:

```bash
cp .env.example .env
```

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

You'll need your own Slack app for local dev — create one at [api.slack.com/apps](https://api.slack.com/apps) with Socket Mode enabled and the `commands` + `chat:write` scopes.

### 4. Run locally

```bash
node index.js
# ⚡ Slacky is running. Please don't spam commands.
```

### 5. Open a pull request

- Branch off `main`: `git checkout -b feature/your-command`
- Add your command to `index.js` and update `/slacky-help`
- Open a PR with a short description of what it does



## License

MIT