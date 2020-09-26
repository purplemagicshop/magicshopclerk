const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
//var fs = require('fs'); 
//import { appendFile } from 'fs';
const editJsonFile = require("edit-json-file");
var encodeUrl = require('encodeurl');
const puppeteer = require('puppeteer');


client.on('ready', () => {
    console.log("Command Thread Injest Activated");
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  
  client.user.setActivity(`oppa help`, {type: 'LISTENING'})
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

        if(command === "cy") {
            var mathsCommand = msg.content.replace("oppa ", "").replace("cy","");
            msg.channel.send(mathsCommand);

            //puppeteer
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://www.cymath.com/');
                // other actions...
                await page.type("#q", mathsCommand);
              
                
                const [response] = await Promise.all([
                  page.waitForNavigation(), // The promise resolves after navigation has finished
                  await page.click('#control > tbody > tr > td > table > tbody > tr > td:nth-child(2) > div > img'), // Clicking the link will indirectly cause a navigation
                ]);

                await page.waitForSelector('#term_preview > span > span');
                const katex = await page.$('#term_preview > span > span');              // declare a variable with an ElementHandle
                const katexbox = await katex.boundingBox();              // this method returns an array of geometric parameters of the element in pixels.
                await page.screenshot({'path': 'tempscreenshot/katex.png', 'clip': {'x': katexbox['x'] - 6, 'y': katexbox['y'] -6, 'width': katexbox['width'] + 12, 'height': katexbox['height'] + 12 }});     // take screenshot of the required area in puppeteer

                // Create the attachment using MessageAttachment
                const katexattachment = new Discord.MessageAttachment('./tempscreenshot/katex.png');
                // Send the attachment in the message channel with a content
                msg.channel.send(`${msg.author},`, katexattachment);
              
                //await page.screenshot({path: 'tempscreenshot/results.png', fullPage: true});
              
                await page.waitForSelector('#steps_div');             // wait for the selector to load
                
                await page.waitForSelector('.done')
                await page.waitForSelector('#steps > img')

                const logo = await page.$('#steps_div');              // declare a variable with an ElementHandle
                const box = await logo.boundingBox();              // this method returns an array of geometric parameters of the element in pixels.
                const x = box['x'];                                // coordinate x
                const y = box['y'];                                // coordinate y
                const w = box['width'];                            // area width
                const h = box['height'];                           // area height
                await page.screenshot({'path': 'tempscreenshot/steps.png', 'clip': {'x': x, 'y': y, 'width': w, 'height': h}});     // take screenshot of the required area in puppeteer

                console.log("op completed")

                // Create the attachment using MessageAttachment
                const attachment = new Discord.MessageAttachment('./tempscreenshot/steps.png');
                // Send the attachment in the message channel with a content
                msg.channel.send(`${msg.author},`, attachment);

                await browser.close();
              })();              

          }

    }}
});

client.login(token);
