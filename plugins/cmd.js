/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.



------------------------------------------------------------------------------------------------------------------------------------------------------*/


const {
    System,
    setData,
    database,
    isPrivate,
    removeData
} = require("../lib/");

System({
    pattern: "setcmd",
    fromMe: true,
    desc: "set a sticker as a cmd",
    type: "tool",
}, async (message, match) => { 
    if (!message.reply_message || !message.reply_message.i || !message.reply_message.msg || !message.reply_message.msg.fileSha256) 
    return await message.reply('_Reponds à une image/video/audio/sticker_'); 
    if (!match) return await message.reply('_Example: setcmd ping_'); 
    const hash = message.reply_message.msg.fileSha256.join("");
    const setcmd = await setData(hash, match, "true", "setCmd");
    if (!setcmd) return await message.reply('_Echec_');
    await message.reply('_Succès_');
});

System({
    pattern: 'delcmd ?(.*)',
    fromMe: true,
    desc: 'to delete audio/image/video cmd',
    type: 'tool'
}, async (message, match) => {
    if (!message.reply_message || !message.reply_message.i) 
    return await message.reply('_Reponds à une image/video/audio/sticker_');
    let hash = message.reply_message.msg.fileSha256.join("")
    if (!hash) return await message.reply('_Echec_');
    const delcmd = await removeData(hash, "setCmd");
    if (!delcmd) return await message.reply('_Echec_');
    await message.reply('_Succes_');
});

System({
    pattern: 'listcmd ?(.*)',
    fromMe: true,
    desc: 'to list all commands',
    type: 'tool'
}, async (message, match) => {
    const result = await database.findAll({ where: { name: "setCmd" } });
    if (!result || result.length === 0) return await message.reply("_*Aucunes commandes ajoutées.*_");
    const messages = result.map((entry, index) => `_${index + 1}. ${entry.dataValues.message}_`);
    const formattedList = messages.join('\n');
    return await message.reply("*Liste des Cmd*\n\n" + formattedList);
});
