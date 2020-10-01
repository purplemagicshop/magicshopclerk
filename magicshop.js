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

bot.on('guildMemberAdd', async guildMember +> {
    const autoRoleArray = ["748660895647006731","761069908326219816","748660462974926969","748558617082331237","748660893012983848"]
    autoRoleArray.forEach(function(autoRole) {
    console.log(autoRole);
    guildMember.roles.add(guildMember.guild.roles.get(autoRole));
});
})

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
            msg.channel.send("Magic Shop Bots store and log messages, even after message deletion. We log all activity that passes through the Discord API. We do not and cannot store IPs, as that is literally impossible. We don't have access to emails, and other sensitive content. You may request data deletion from @kyler#9100 or a data export and your request will be taken care of within 30 days.")
          }

        if (command === "discordrules") {
        msg.channel.send("We follow discord guidelines strictly and report back to Trust & Safety.\n" + 
"Terms: https://discord.com/terms \n Privacy: https://discord.com/privacy \n Guidelines: https://discord.com/guidelines" )
}

    }}
});

client.login(token);
