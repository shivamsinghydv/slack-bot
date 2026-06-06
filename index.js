require("dotenv").config();

const { App } = require("@slack/bolt");
const { default: axios } = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});


// Personality Helpers
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const errorLines = [
  "Shite! Something broke. Probably not my fault.",
  "The internet let me down again. Shocking!",
  "Error detected: Blame the server not me.",
  "I tried, but the server had other plans",
  "Something went wrong, I am just as disappointed as you are ;("
]


const greeting = [
  "Oh! You again, what do you need?",
  "Back so soon? I respect the commitment.",
  "Ah! *you*. lets get this over with."
]

// Commands

app.command("/slacky-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;

  const comment = 
    latency < 100 ? "Pretty snappy, right?" : latency < 300
    ? "not so bad afterall" : "yeah I know, im thinking..."

  await respond({ text: `Pong! 🏓\nLatency: *${latency}ms* — ${comment}` });
});

app.command("/slacky-catfact", async ({ ack, respond }) => {
  await ack();

  const intros = [
    "Did you know that \n",
    "Unsolicited cat knowledge incoming...",
    "Not like you asked, but here we go \n",
    "If you don't believe me, you can ask the cats \n",
    "For the cat enthusiasts in the room"
  ]

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `🐱:${pick(intros)}*\n${response.data.fact}` });

  } catch (err) {
    await respond({ text: pick(errorLines)});
  }
});

app.command("/slacky-dadjoke", async ({ ack, respond }) => {
  await ack();

  const setups = [
    "Brace yourself.",
    "Drum rolls please 🥁",
    "This one's really something",
    "Stop me if you've heard this before. Actually, don't Im going to say it anyway",
    "Alright, everybody quiet down. I've got a good one."
  ]

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${pick(setups)}\n\n*${response.data.setup}*\n

 ${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: pick(errorLines) });
  }
});

app.command("/slacky-qotd", async ({ack, respond}) => {
  await ack();

  const intros = [
    "Someone wise one said: ",
    "Chew on this: ",
    "Today's dost of wisdom: ",
    "Words to live by (optional): ",
    "Here's something to put on a wall: "
  ]

  try {
    const response = await axios.get("https://zenquotes.io/api/today");
    const { q: quote, a: author } = response.data[0];

    await respond({
      text: '📜 *${pick(intros)}*\n\n_"${quote}"_\n\n ${author}',
    })
  } catch (err) {
    await respond({ text: pick(errorLines) })
  }
})

app.command("/slacky-trivia", async ({ ack, respond}) => {
  await ack();

  const decode = (str) =>
    str
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&eacute;/g, "e")
      .replace(/&ldquo; /g, "\u201C")
      .replace(/&rdquo;/g, "\u201D");
  const intros = [
    "Think you know stuff? Prove it.",
    "Time to embarrass yourself.",
    "Here's one for the big brains",
    "Quiz time. No googling.",
    "Let's see what you've got: "
  ]
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=multiple"
    )
    const q = response.data.results[0]

    const question = decode(q.question)
    const correct = decode(q.correct_answer);
    const allAnswers = [...q.incorrect_answers.map(decode), correct].sort(
      () => Math.random() - 0.5
    )

    const labels = ["A", "B", "C", "D"]
    const answerText = allAnswers.map((a, i) => '${labels[i]}) ${a}')
        .join("\n")
    const correctLabel = labels[allAnswers.indexOf(correct)]

    await respond({
      text: `🧠 *${pick(intros)}*\n*Category:* ${q.category}  |  *Difficulty:* ${q.difficulty}\n\n${question}\n\n${answerText}\n\n|| Answer: ${correctLabel}) ${correct}||`,
    });

  } catch (err) {
    await respond({ text: pick(errorLines)

      });
    }
})

app.command("/slacky-8ball", async ({ command, ack, respond }) => {
  await ack();

  const question = command.text.trim();

  if (!question) {
    await respond({
      text: "You forgot to ask a question. Try '/slack-8ball will it rain today?'"
    })
    return;
  }
  const answers = [
    "Absolutely, don't second guess it.",
    "No, Hard no.",
    "My sources say yes. My gut says maybe.",
    "Ask again after coffee.",
    "The signs point to yes, but I wouldn't bet on it.",
    "Outlook not great. Sorry 😔",
    "Obviously",
    "I have no clue and frankly, neither do you.",
    "Very doubtful. But what do I know.",
    "Go for it! You only live once.",
    "Even if i say no, you'll do it anyway"
  ]

  await respond({
    text: '🎱 *"${question}"*\n${pick(answers)}' });
});

app.command("/slacky-roast", async ({ ack, respond, command }) => {
  await ack();

  const roasts = [
    `If ${target} were any more inbred, they would be a sandwich.`,
    `If I wanted to kill myself, I would climb up to ${target}'s ego and jump down to their IQ level.`,
    `If ${target} were any more of a tool, they would be a Swiss Army knife. `,
    `If ${target} were any more dense, they would be a black hole.`,
    `${target} is the human embodiment of a terms and conditions agreement. No one really reads it, but we all just kind of accept that it's there.`,
    `${target} has something on their chin... no, the third one down, not the one on their face.`,
    `${target} is the reason the gene pool needs a lifeguard.`,
    `${target} is as useless as the "ueue" in "queue".`,
    `${target} is the reason why there are instructions on shampoo bottles.`,
    `${target} has the personality of a wet sponge.`,
    `${target} has the charm of a dial tone and the charisma of a before picture.`,
    `${target} brings a lot to the table unfortunately, it's mostly just the legs.`,
    `${target} has the energy of a dial-up modem in a world of fiber optics.`,
    `${target} has the energy of a laptop at 5% battery. Still trying to be useful, but we all know how this is going to end.`
  
  ]


  await respond({
    text: '🔥 *${pick(roasts)}* \n\n_(all jokes, obviously)_}'
  })
})


app.command("/slacky-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`*Slacky - your reluctant assistant* 

Here's what I can do _(don't push your luck)_:
\'/slacky-ping\' - Check bot latency
\'/slacky-catfact\' - Get a cat fact
\'/slacky-dadjoke\' - Say a dad joke
\'/slacky-qotd\' - Two bits or rather bytes* of wisdom
\'/slacky-trivia\' - get a trivia
\'/slacky-8ball\' - Ask the universe something
\'/slacky-roast\' - Light someone up (affectionately, offcourse)
\'/slacky-help\' - This, right here.`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();