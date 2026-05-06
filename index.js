const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config");

const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials)
});

client.commands = new Collection();

// LOAD COMMANDS
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
}

// LOAD EVENTS
const eventFiles = fs.readdirSync("./events").filter(f => f.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(config.token);
