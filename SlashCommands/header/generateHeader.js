const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const Canvas = require('@napi-rs/canvas');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('generate-header')
    .setDescription('Generates a Twitter header for you')
    .addStringOption(option => 
        option
        .setName("custom-bg-image")
        .setDescription('Link for your custom background image (if none, the bot chooses one for you)')
        .setRequired(false))
    .addStringOption(option => 
        option
        .setName('name')
        .setDescription('Name that should be shown on the header')
        .setRequired(false)),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction) => {
    // Canvas part
    const canvas = Canvas.createCanvas(1920, 1080);
    const context = canvas.getContext('2d');

    const directoryPath = '../../backgrounds';

    fs.readdir(directoryPath, async function(err, files) {
        if (err) {
            console.error('There was an error reading the image', err);
            return;
          }

          for (let file of files) {
          const backgroundImage = interaction.options.getString('custom-bg-image') || file;
          const canvasBackground = await Canvas.loadImage(backgroundImage);
          context.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);

          const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'header.png'});

          interaction.followUp({ files: [attachment] })
          }
    })

    },
};
