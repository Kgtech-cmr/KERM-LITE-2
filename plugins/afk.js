/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.


------------------------------------------------------------------------------------------------------------------------------------------------------*/


const { System } = require('../lib/');
const { secondsToHms } = require("./client/"); 

let AFK = {
	isAfk: false,
	reason: false,
	lastseen: 0
};

System({
	on: 'all',
	fromMe: false
}, async (message, match) => {
	if(message.isBot) return;
	if(message.fromMe) return;
	if (!AFK.isAfk)  return;
	if(!message.mention.isBotNumber && !message.reply_message.i && message.isGroup)  return;
	if (message.mention.isBotNumber && message.isGroup) {
   	    await message.send('```Ceci est un message du bot. Salut à vous! mon propriétaire n'est malheureusement pas là pour le moment.⏰```\n' +
		              (AFK.reason !== false ? '\n*Raison:* ```' + AFK.reason + '```' : '') +
		    	      (AFK.lastseen !== 0 ? '\n*Dernière présence:* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + '```' : ''), {
			      quoted: message.data
			    });
	} else if (message.isGroup && message.reply_message.sender == message.user.jid) {
	    await message.send('```Ceci est un message du bot. Salut à vous! mon propriétaire n'est malheureusement pas là pour le moment.⏰```\n' +
			      (AFK.reason !== false ? '\n*Raison:* ```' + AFK.reason + '```' : '') +
			      (AFK.lastseen !== 0 ? '\n*Dernière présence:* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + '```' : ''), {
			      quoted: message.data
			   });

	} else if(!message.isGroup) {
	    await message.send('```Ceci est un message du bot. Salut à vous! mon propriétaire n'est malheureusement pas là pour le moment.⏰```\n' +
				(AFK.reason !== false ? '\n*Raison:* ```' + AFK.reason + '```' : '') +
				(AFK.lastseen !== 0 ? '\n*Dernière présence:* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + '```' : ''), {
				quoted: message.data
			      });
	}
});


System({
	on: 'text',
	fromMe: true
}, async (message, match) => {
	if(message.isBot) return;
	if (!AFK.isAfk)  return;
	AFK.lastseen = 0;
	AFK.reason = false;
	AFK.isAfk = false;
	await message.send('```Euhhhh Je ne suis plus AFK!🙍🏾```');
});

System({
	pattern: 'afk ?(.*)',
	fromMe: true,
	desc: 'away from keyboard'
}, async (message, match) => {
	if (AFK.isAfk) return;
        if(message.isBot) return;
	AFK.lastseen = Math.round((new Date()).getTime() / 1000);
	if (match !== '') AFK.reason = match;
	AFK.isAfk = true;
	await message.send(AFK.reason ? '*Je suis AFK maintenant!_*\n*Raison:* ' + AFK.reason :  '*_Je suis AFK maintenant!_*');
});
