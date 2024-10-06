/*------------------------------------------------------------------------------------------------------------------------------------------------------

Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.

------------------------------------------------------------------------------------------------------------------------------------------------------*/

const { System } = require("../lib");
const { parsedJid } = require("./client/");

System({
    pattern: "setpp",
    fromMe: true,
    desc: "Set profile picture",
    type: "whatsapp",
}, async (message) => {
    if (!message.reply_message || !message.reply_message.image)
        return await message.reply("_Répondre à une photo_");
    let buff = await message.reply_message.download();
    await message.setPP(message.user.jid, buff);
    return await message.reply("_Photo de profil mise à jour_");
});

System({
    pattern: "jid",
    fromMe: true,
    desc: "Give JID of chat/user",
    type: "whatsapp",
}, async (message) => {
    let jid = message.quoted && message.reply_message.i ? message.reply_message.sender : message.jid;
    return await message.send(jid);
});

System({
    pattern: "pp$",
    fromMe: true,
    desc: "Set full screen profile picture",
    type: "whatsapp",
}, async (message, match) => {
    if (match === "remove") {
        await message.client.removeProfilePicture(message.user.jid);
        return await message.reply("_Photo de profil supprimée_");
    }
    if (!message.reply_message || !message.reply_message.image) return await message.reply("_Reply to a photo_");
    let media = await message.reply_message.download();
    await message.client.updateProfile(media, message.user.jid);
    return await message.reply("_Photo de profil mise à jour!_");
});

System({
    pattern: "supp",
    fromMe: true,
    desc: "Deletes a message",
    type: "whatsapp",
}, async (message) => {
    if (!message.quoted) return await message.reply("_Répondre à un message pour le supprimer!_");
    await message.client.sendMessage(message.chat, { delete: message.reply_message.data.key });
});

System({
	pattern: 'nettoie ?(.*)',
	fromMe: true,
	desc: 'delete whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
	await message.client.chatModify({
		delete: true,
		lastMessages: [{
			key: message.data.key,
			messageTimestamp: message.messageTimestamp
		}]
	}, message.jid)
	await message.reply('_Effacé.._')
});

System({
	pattern: 'archive ?(.*)',
	fromMe: true,
	desc: 'archive whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
	const lstMsg = {
		message: message.message,
		key: message.key,
		messageTimestamp: message.messageTimestamp
	};
	await message.client.chatModify({
		archive: true,
		lastMessages: [lstMsg]
	}, message.jid);
	await message.reply('_Archivé.._')
});

System({
	pattern: 'desarchive ?(.*)',
	fromMe: true,
	desc: 'unarchive whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
	const lstMsg = {
		message: message.message,
		key: message.key,
		messageTimestamp: message.messageTimestamp
	};
	await message.client.chatModify({
		archive: false,
		lastMessages: [lstMsg]
	}, message.jid);
	await message.reply('_Non archivé.._')
});

System({
	pattern: 'epingler ?(.*)',
	fromMe: true,
	desc: 'pin a chat',
	type: 'whatsapp'
}, async (message, match) => {
	await message.client.chatModify({
		pin: true
	}, message.jid);
	await message.reply('_Épinglé.._')
});

System({
	pattern: 'desepingler ?(.*)',
	fromMe: true,
	desc: 'unpin a msg',
	type: 'whatsapp'
}, async (message, match) => {
	await message.client.chatModify({
		pin: false
	}, message.jid);
	await message.reply('_Non épinglé.._')
});

System({
    pattern: "blocker",
    fromMe: true,
    desc: "Block a user",
    type: "whatsapp",
}, async (message) => {
    let jid = message.quoted ? message.reply_message.sender : message.jid;
    await message.client.updateBlockStatus(jid, "block");
    await message.reply("_*Bloqué!*_");
});

System({
    pattern: "debloquer",
    fromMe: true,
    desc: "Unblock a user",
    type: "whatsapp",
}, async (message) => {
    let jid = message.quoted ? message.reply_message.sender : message.jid;
    await message.client.updateBlockStatus(jid, "unblock");
    await message.reply("_*Debloqué!*_");
});

System({
    pattern: "setbio",
    fromMe: true,
    desc: "To change your profile status",
    type: "whatsapp",
}, async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.send(`'*Besoin d'un statut ! *\n*Exemple : setbio Salut ! J'utilise WhatsApp*.'`);
    await message.client.updateProfileStatus(match);
    await message.reply('_Biographie du profil mise à jour_');
});

System({
    pattern: 'setname ?(.*)',
    fromMe: true,
    desc: 'To change your profile name',
    type: 'whatsapp'
}, async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.send('*Besoin d'un nom ! *\n*Exemple : setname your name*.');
    await message.client.updateProfileName(match);
    await message.reply('_Profile name updated_');
});

System({
    pattern: "forward",
    fromMe: true,
    desc: "Forwards the replied message",
    type: "whatsapp",
}, async (message, match) => {
    if (!message.quoted) return await message.reply('Reply to message');
    if (!match) return await message.reply("*Provide a JID; use 'jid' command to get JID*");
    let jids = parsedJid(match);
    for (let jid of jids) {
        await message.client.forwardMessage(jid, message.reply_message.message);
    }
    await message.reply("_Message forwarded_");
});

System({
    pattern: 'caption ?(.*)',
    fromMe: true,
    desc: 'Change video or image caption',
    type: 'whatsapp',
}, async (message, match) => {
    if (!message.reply_message.video && !message.reply_message.image && !message.image && !message.video) return await message.reply('*_Reply to an image or video_*');
    if (!match) return await message.reply("*Need a query, e.g., .caption Hello*");
    await message.client.forwardMessage(message.jid, message.quoted ? message.reply_message.message : message.message, { caption: match });
});

System({
	pattern: 'getprivacy ?(.*)',
	fromMe: true,
	desc: 'get your privacy settings',
	type: 'privacy'
}, async (message, match) => {
	const { readreceipts, profile, status, online, last, groupadd, calladd } = await message.client.fetchPrivacySettings(true);
	const msg = `*♺ my privacy*\n\n*ᝄ name :* ${message.client.user.name}\n*ᝄ online:* ${online}\n*ᝄ profile :* ${profile}\n*ᝄ last seen :* ${last}\n*ᝄ read receipt :* ${readreceipts}\n*ᝄ about seted time :*\n*ᝄ group add settings :* ${groupadd}\n*ᝄ call add settings :* ${calladd}`;
	let img = await message.client.profilePictureUrl(message.user.jid, 'image').catch(() => "https://i.ibb.co/sFjZh7S/6883ac4d6a92.jpg");
	await message.send(img, { caption: msg }, 'image');
});


System({
	pattern: 'lastseen ?(.*)',
	fromMe: true,
	desc: 'to change lastseen privacy',
	type: 'privacy'
}, async (message, match, m) => {
	if (!match) return await message.send(`_*Example:-* ${m.prefix} all_\n_to change last seen privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.client.updateLastSeenPrivacy(match)
	await message.send(`_Privacy settings *last seen* Updated to *${match}*_`);
});


System({
	pattern: 'online ?(.*)',
	fromMe: true,
	desc: 'to change online privacy',
	type: 'privacy'
}, async (message, match, m) => {
	if (!match) return await message.send(`_*Example:-* ${m.prefix} all_\n_to change *online*  privacy settings_`);
	const available_privacy = ['all', 'match_last_seen'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.client.updateOnlinePrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
});


System({
	pattern: 'mypp ?(.*)',
	fromMe: true,
	desc: 'privacy setting profile picture',
	type: 'privacy'
}, async (message, match) => {
	if (!match) return await message.send(`_*Example:-* ${cmd} all_\n_to change *profile picture*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.client.updateProfilePicturePrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
});


System({
	pattern: 'mystatus ?(.*)',
	fromMe: true,
	desc: 'privacy for my status',
	type: 'privacy'
}, async (message, match) => {
	if (!match) return await message.send(`_*Example:-* ${cmd} all_\n_to change *status*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.client.updateStatusPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
});


System({
	pattern: 'read ?(.*)',
	fromMe: true,
	desc: 'privacy for read message',
	type: 'privacy'
}, async (message, match, m) => {
	if (!match) return await message.send(`_*Example:-* ${m.prefix} all_\n_to change *read and receipts message*  privacy settings_`);
	const available_privacy = ['all', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.client.updateReadReceiptsPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
});


System({
	pattern: 'groupadd ?(.*)',
	fromMe: true,
	desc: 'privacy for group add',
	type: 'privacy'
}, async (message, match, m) => {
	if (!match) return await message.send(`_*Example:-* ${m.prefix} all_\n_to change *group add*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.client.updateGroupsAddPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
});
