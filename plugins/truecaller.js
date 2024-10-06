/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.

------------------------------------------------------------------------------------------------------------------------------------------------------*/


const {
	System,
	truecaller,
} = require('../lib/');

System({
	pattern: 'true ?(.*)',
	desc: 'search number on truecaller',
	type: "search",
	fromMe: true
}, async (message, match) => {
	if (match.match(/login/gi)) {
		match = match.replace(/login/gi, '');
		if (!match) return await message.send('_Donne-moi un numéro pour envoyer un otp_');
		const msg = await truecaller.set(match);
		if (msg === true) return await message.send(`_Envoyer avec succès otp à ce ${match} numéro_\n_utilise *true otp* <key> pour se connecter_`);
		return await message.send(`*Message :* _utiliser *true logout* comme premier_\n*resone*: ${msg}`);
	} else if (match.match(/logout/gi)) {
		await truecaller.logout(match);
		return await message.send(`_Réussi_`); 
	} else if (match.match(/otp/gi)) {
		match = match.replace(/otp/gi, '');
		if (!match) return await message.send('_Veuillez fournir un otp_');
		const msg = await truecaller.otp(match);
		if (msg === true) return await message.send(`_Connecté avec succès à Truecaller!!_`);
		return await message.send(`*Message :* _utiliser *true logout* comme premier_\n*resone*: ${msg}`);
	}
	let user = (message.mention.jid?.[0] || message.reply_message.mention.jid?.[0] || message.reply_message.sender || match).replace(/[^0-9]/g, '');
	if (!user) return await message.send(`_Répondre à un utilisateur_`)
	const res = await truecaller.search(user);
	if (!res.status) return await message.send(res.message);
	let msg = `╭─❮ truecaller ❯ ❏\n`
	delete res.status;
	for (const key in res) {
		msg += `│ ${key.toLowerCase()}: ${res[key]}\n`;
	}
	msg += `╰─❏`;
	return await message.send(msg, {quoted: message.data})
});
