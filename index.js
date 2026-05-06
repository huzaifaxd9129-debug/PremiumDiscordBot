const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType
} = require("discord.js");

const fs = require("fs");
const config = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: Object.values(Partials)
});

client.commands = new Collection();

// =========================================================
// 📂 LOAD COMMANDS
// =========================================================
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  if (cmd.name) {
    client.commands.set(cmd.name, cmd);
  }
}

// =========================================================
// 📂 LOAD EVENTS
// =========================================================
const eventFiles = fs.readdirSync("./events").filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

// =========================================================
// 🤖 BOT READY + STATUS SYSTEM
// =========================================================
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const statuses = [
    "👑 Made By Huztro",
    "⚡ Moderating Premuim Servers"
  ];

  let i = 0;

  // set initial status
  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: statuses[0],
        type: ActivityType.Playing
      }
    ]
  });

  // rotate status
  setInterval(() => {
    i = (i + 1) % statuses.length;

    client.user.setPresence({
      status: "online",
      activities: [
        {
          name: statuses[i],
          type: ActivityType.Playing
        }
      ]
    });

  }, 10000);
});

// =========================================================
// 🔐 LOGIN
// =========================================================
client.login(config.token);
