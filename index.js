const Discord = require('discord.js');
const bdd = require("./bdd.json");
const fs = require("fs");
const { executionAsyncResource } = require('async_hooks');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');
const { token } = require
const search = require('youtube-search');
const prefix = "!";

const bot = new Discord.Client();







bot.on("ready", async () => {
    console.log("le bot est ready")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("Top Serveur");
    },100)


});


bot.on("message", message => {
    if(message.author.bot) return;


});




bot.on("message", message => {
    
    if(message.content.startsWith("!clear")){
    message.delete();
        if(message.member.hasPermission('MANAGE_MESSAGES')){

let args = message.content.toLowerCase().split(/ +/g);

if(args[1]){
    if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

message.channel.bulkDelete(args[1])
message.channel.send(`Vous avez supprimé ${args[1]} message(s)!`)


    }
    else{
        message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 ! `)
    }
}
else{
    message.channel.send(`Vous devez indiquer un nombre de message a supprimer`)
}

        }
        else{
            message.channel.send(`Vous devez avoir la permission de gerer les message pour executer cette commande!`)
        }
    }

    if(message.content.startsWith("!mb")){
        message.delete()
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if(message.content.length > 5){
                message_bienvenue = message.content.slice(4)
                bdd["message-bienvenue"] = message_bienvenue
                Savebdd()
                
            }
        }
    
    }

    if (message.content.startsWith("!warn")) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            if (!message.mentions.users.first()) return;
            utilisateur = message.mentions.users.first().id
            if (bdd["warn"][utilisateur] == 2) {

                delete bdd["warn"][utilisateur]
                message.guild.members.ban(utilisateur)
            }
            else {
                if (!bdd["warn"][utilisateur]) {
                    bdd["warn"][utilisateur] = 1
                    Savebdd();
                    message.channel.send("Tu as a présent " + bdd["warn"][utilisateur] + " avertissement(s)");
                }
                else {
                    bdd["warn"][utilisateur]++
                    Savebdd();
                    message.channel.send("Tu as a présent " + bdd["warn"][utilisateur] + " avertissement");
                }
            }
        }
    }

    if (message.content.startsWith("!ban")) {
        if (message.member.hasPermission('BAN_MEMBERS')) {

            let arg = message.content.trim().split(/ +/g)

            utilisateur = message.mentions.members.first();
            temps = arg[2];
            raison = arg[3];

            if(!utilisateur){
                return message.channel.send('Vous devez mentionner un utilisateur');
            }
            else{
                if(!temps || isNaN(temps)){
                    return message.channel.send('Vous devez indiquer un temps en secondes !');
                }else{
                    if(!raison){
                        return message.channel.send('vous devez indiquer une raison du ban !');
                    }else{
                        //on effectue le tempban
                        message.guild.members.ban(utilisateur.id);
                        setTimeout(function(){
                            message.guild.members.unban(utilisateur.id)
                        }, temps*1000);
                    }
                }
            }
        }else{
            return message.channel.send('Tu n\'as pas les permissions nécessaires !')
        }
    }

    if(message.content == prefix + "id"){
        message.channel.send("**" + message.author.tag + "**" + "  **ton id est :**  " + "__" + message.author.id + "__");
    }

    if (message.content == prefix + 'avatar') {
        
        message.reply(message.author.displayAvatarURL());
      }
    
    
  
    
            
});

bot.on("guildCreate", guild => {
    bdd[guild.id] = {}
    Savebdd()
});


        function Savebdd() {

            fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
                if (err) message.channel.send("une erreur est survenue."); 
            });
        }
        
        
        
        
        bot.login("NzU2NTI1NDY0MTM4Mjg1MDc4.X2THPg.Zf14h0-br84_lwtBNyQo8n8j5wQ");