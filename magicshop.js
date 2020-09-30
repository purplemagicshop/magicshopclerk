const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
//var fs = require('fs'); 
//import { appendFile } from 'fs';
const editJsonFile = require("edit-json-file");
var encodeUrl = require('encodeurl');
const puppeteer = require('puppeteer');

const mathsteps = require('mathsteps');
const { sign } = require('mathjs');

client.on('ready', () => {
    console.log("Command Thread Injest Activated");
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  
  client.user.setActivity(`+help`, {type: 'LISTENING'})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
});

client.on('message', async msg => {

    //check msg starts with prefix, user not a bot
    if (!(!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot)) {
      if (true) {
        console.log("prefix true")
        //log triggerprefix tambourine
        //message legal, proceed kind user.
        //parse out args and command
        const args = msg.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        console.log("Command is " + command)
        commandLower =  command.toLowerCase;
  
        if(command === "ping") {
          // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
          // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
          const m = await msg.channel.send("Ping?");
          m.edit(`**펑!** Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        }

        if(command === "datainfo") {
            msg.channel.send("Magic Shop Data info idk whut to put here, data exports and data deletion, what we use the data for, where it is stored?")
          }


          if(msg.content === "moka is cute") {
            msg.channel.send("mhm! moka is cute uwu!")
          }

    }}
});

client.login(token);
