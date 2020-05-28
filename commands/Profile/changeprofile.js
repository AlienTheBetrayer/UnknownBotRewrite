const Discord = require("discord.js");
const mySQL = require("mysql");

const config = require("../../config.json");

module.exports.run = async(client, message, args, connection) => {
    const key = args[0];
    const value = args.slice(1).join(" ");

    const availableKeys = ["name", "age", "status", "mood", "love", "color", "avatar", "birthday"];

    if(!key || !value) {
        message.react(config.wrongEmoji);
        return;
    }

    let foundKey = false;

    for(i = 0; i < availableKeys.length; ++i) {
        if(key.toLowerCase() == availableKeys[i].toLowerCase()) {
            foundKey = true;
        }
    }

    if(!foundKey) {
        message.react(config.wrongEmoji);
        return;
    }

    connection.query(`SELECT * FROM userProfile WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`, (err, rows) => {
        if(err) {
            console.log(err);
            message.react(config.wrongEmoji);
            return;
        }

            connection.query(`SELECT * FROM userProfile WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}' AND data = '${key}'`, (err_, rows_) => {
                if(err_) {
                    console.log(err_);
                    message.react(config.wrongEmoji);
                    return;
                }

                let sql_;

                if(rows_.length < 1) {
                    sql_ = `INSERT INTO userProfile(guildId, userId, data, value) VALUES('${message.guild.id}', '${message.author.id}', '${key}', '${value}')`;
                } else {
                    sql_ = `UPDATE userProfile SET value = '${value}' WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}' AND data = '${key}'`;
                }

                connection.query(sql_);

                message.react(config.correctEmoji);
            });
    });
}  

module.exports.config = {
    name: "changeprofile",
    aliases: ["profilechange", "setprofile", "profileset"]
}