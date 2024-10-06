/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.

------------------------------------------------------------------------------------------------------------------------------------------------------*/


const { System, setData, getData } = require('../lib/');

System({
    pattern: 'bienvenu ?(.*)',
    desc: 'set welcome message',
    type: 'greetings',
    fromMe: true,
}, async (message, match) => {
    if (!message.isGroup) return;
    const { welcome } = await getData(message.from);
    if (match.toLowerCase() === 'get') {
        if (!welcome || !welcome.message) return await message.send('*_Pas encore prêt_*');
        return await message.send(welcome.message);
    } else if (match.toLowerCase() === 'off') {
        const status = welcome && welcome.status ? welcome.status : 'non';
        if (status === 'false') return await message.send(`_Déjà désactivé_`);
        await setData(message.jid, welcome.message, 'false', 'welcome');
        return await message.send('*Désactivé avec succès*');
    } else if (match.toLowerCase() === 'on') {
        const status = welcome && welcome.status ? welcome.status : 'non';
        if (status === 'true') return await message.send(`_Déjà activé_`);
        await setData(message.jid, welcome.message, 'true', 'welcome');
        return await message.send('*Activé avec succès*');
    } else if (match) {
        const status = welcome && welcome.status ? welcome.status : 'oui';
        await setData(message.jid, match, status, 'welcome');
        return await message.send('*Réglé avec succès*');
    }
    return await message.reply('_*bienvenu get*_\n_*bienvenu* merci de vous joindre &mention_\n*_bienvenu non_*');
});

System({
    pattern: 'aurevoir ?(.*)',
    desc: 'set goodbye message',
    type: 'greetings',
    fromMe: true,
}, async (message, match) => {
    if (!message.isGroup) return;
    const { exit } = await getData(message.jid);
    if (match.toLowerCase() === 'get') {
        if (!exit || !exit.message) return await message.send('*_Pas encore prêt_*');
        return await message.send(exit.message);
    } else if (match.toLowerCase() === 'off') {
        const status = exit && exit.status ? exit.status : 'non';
        if (status === 'false') return await message.send(`_Déjà désactivé_`);
        await setData(message.jid, exit.message, 'false', 'exit');
        return await message.send('*Désactivé avec succès*');
    } else if (match.toLowerCase() === 'on') {
        const status = exit && exit.status ? exit.status : 'oui';
        if (status === 'true') return await message.send(`_Déjà activé_`);
        await setData(message.jid, exit.message, 'true', 'exit');
        return await message.send('*Activé avec succès*');
    } else if (match) {
        const status = exit && exit.status ? exit.status : 'oui';
        await setData(message.jid, match, status, 'exit');
        return await message.send('*Réglé avec succès*');
    }
    return await message.reply('_*aurevoir get*_\n_*aurevoir* merci de vous être joint &mention_\n*_aurevoir non_*');
});
