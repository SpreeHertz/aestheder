const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const Canvas = require('@napi-rs/canvas')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('generate-header')
    .setDescription('Generates an aesthetic header for you')
    .addStringOption(option => 
        option
        .setName('custombg')
        .setDescription('Set a custom background image')
        .setRequired(false))
    .addStringOption(option => 
        option
        .setName('name')
        .setDescription('Name to be shown on the center of the header')
        .setRequired(false)),
    async execute (interaction, client) {
     let backgroundImage = interaction.options.getString('custombg');
     const username = interaction.options.getString('name') || interaction.user.username;
     const canvas = Canvas.createCanvas(1920, 1080);
     const context = canvas.getContext('2d');
     const canvasBackground = await Canvas.loadImage(backgroundImage);
     context.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
     const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'header.png'});
 
           interaction.reply({ files: [attachment] })
           
    
    }
}