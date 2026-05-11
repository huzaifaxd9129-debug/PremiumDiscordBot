require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection, ActivityType, Events } = require("discord.js");
const fs = require("fs");
const config = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Essential for AI
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: Object.values(Partials)
});

client.commands = new Collection();

// LOAD COMMANDS
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  if (cmd.name) client.commands.set(cmd.name, cmd);
}

// LOAD EVENTS
const eventFiles = fs.readdirSync("./events").filter(f => f.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

// READY SYSTEM
client.once(Events.ClientReady, (c) => {
  console.log(`✅ ${c.user.tag} is online and modular!`);

  const statuses = [
    "Made By Huztro",
    "Moderating Premium Servers",
    "Ensuring Uptime Stability",
    "Exculting System Diagnostics",
    "Optimizing Performance Modules"
  ];

  let i = 0;
  let toggle = true;

  // 🔥 ONLY ONE interval for EVERYTHING (clean control)
  setInterval(() => {

    // rotate text every 5 sec
    const activity = statuses[i++ % statuses.length];

    // toggle online / dnd every 1 min
    if (i % 12 === 0) { 
      // 12 × 5sec = 60 sec
      toggle = !toggle;
    }

    client.user.setPresence({
      activities: [{
        name: activity,
        type: ActivityType.Playing
      }],
      status: toggle ? "online" : "dnd"
    });

  }, 5000); // 5 seconds tick
});
