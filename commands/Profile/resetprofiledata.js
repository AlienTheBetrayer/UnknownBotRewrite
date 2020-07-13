const Discord = require("discord.js");
const mySQL = require("mysql")

const config = require("../../config.json");

module.exports.run = async(client, message, args, connection) => {
    const key = args[0].toLowerCase();
    const key_ = args[0];
    const availableKeys = ["name", "age", "status", "mood", "love", "color", "avatar", "birthday"];

    if(key_ == "ALL") {
        let sql;

        sql = `DELETE FROM userprofile WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`;

        connection.query(sql);  
        message.react(config.correctEmoji);
        return;
    } 

    let found = false;

    for(i = 0; i < availableKeys.length; ++i) {
        if(availableKeys[i] == key) {
            found = true;
        }
    }

    if(!found) {
        message.react(config.wrongEmoji);
        return;
    }

    let sql;

    sql = `DELETE FROM userprofile WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}' AND data = ${connection.escape(key.toLowerCase())}`;

    connection.query(sql);
    message.react(config.correctEmoji);
 }

module.exports.config = {
    name: "resetprofiledata",
    aliases: ["resetprofile", "profileresetdata"]
}