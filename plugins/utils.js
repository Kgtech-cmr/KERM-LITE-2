/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.

------------------------------------------------------------------------------------------------------------------------------------------------------*/


const { System, getData, setData } = require("../lib/");

System({
    pattern: 'mention ?(.*)',
    fromMe: true,
    desc: 'mention',
    type: 'user'
}, async (message, match) => {
   let msg;
   const { mention } = await getData(message.user.id);    
    if (match === 'get' && message.sudo.includes(message.sender)) {
        return await message.send(mention.message);
    } else if (match && message.sudo.includes(message.sender)) {
        if (match === "off") {
            msg = await setData(message.user.id, mention.message, "false", "mention");
        } else if (match === "on") {
            msg = await setData(message.user.id, mention.message, "true", "mention");
        } else {
            msg = await setData(message.user.id, match, "true", "mention");
        }
        
        if (msg) {
            return await message.reply('_Mention Mise À Jour_');
        } else {
            return await message.reply('_Erreur lors de la mise à jour__');
        }
    }
    return await message.reply("_Vous pouvez vérifier le format de la mention https://github.com/Kgtech-cmr/KERM-LITE-2/wiki_");
});

System({
    pattern: 'autoreaction ?(.*)',
    fromMe: true,
    desc: 'auto reaction',
    type: 'user'
}, async (message, match) => {
    if (match === "off") {
    await setData(message.user.id, "disactie", "false", "autoreaction");
    await message.reply("_*Réaction automatique désactivée*_");
    } else if (match === "on") {
    await setData(message.user.id, "actie", "true", "autoreaction");
    await message.reply("_*Réaction automatique activée*_");
    } else if (!match) {
    if (message.isGroup) {
      await message.send("\nChoose one to update autoreaction\n",
                { values: [
                    { displayText: "oui", id: "autoreaction oui" },
                    { displayText: "non", id: "autoreaction non" }
                ],
                withPrefix: true,
                participates: [message.sender]
            }, "poll");
    } else {
        await message.reply("_*Réaction automatique oui/non*_");
    }}
});
