/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.



------------------------------------------------------------------------------------------------------------------------------------------------------*/


const {
    System,
    IronMan,
    postJson,
    isPrivate,
    interactWithAi,
    GraphOrg,
    readMore
} = require("../lib/");


System({
    pattern: "thinkany", 
    fromMe: isPrivate,
    desc: "thinkany ia", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît!!*_\n_*exemple: .thinkany qui est le coach de Manchester City*_");
    const { result } = await interactWithAi("thinkany", match);
    await m.send(result, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ᴛʜɪɴᴋᴀɴʏ ᴀɪ' }}});
});

System({
    pattern: "aoyo", 
    fromMe: isPrivate,
    desc: "aoyo ia", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .aoyo qui est Elon Musk*_");
    const { result } = await interactWithAi("aoyo", match);
    await m.send(result, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ᴀᴏʏᴏ ᴀɪ' }}});
});

System({
    pattern: "prodia", 
    fromMe: isPrivate,
    desc: "prodia image gen ai", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête !!*_\n_*exemple: .prodia un chien sur une moto*_");
    await m.reply("*S il vous plaît patientez on s'occupe de ça pour vous 😄✨*");
    const img = await interactWithAi("prodia", match);
    await m.sendFromUrl(img, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ᴩʀᴏᴅɪᴀ ᴀɪ' }}});
});


System({
    pattern: "dalle", 
    fromMe: isPrivate,
    desc: "dalle image gen ai", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .dalle un chien sur une moto*_");
    await m.reply("*S il vous plaît patientez on s'occupe de ça pour vous 😄✨*");
    const img = await interactWithAi("dalle", match);
    await m.sendFromUrl(img, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ᴅᴀʟʟᴇ ᴀɪ' }}});
});


System({
    pattern: "lepton", 
    fromMe: isPrivate,
    desc: "ai lepton", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .lepton qui est le président du Cameroun*_");
    const { result } = await interactWithAi("lepton", match);
    await m.send(result.replace(/\[[^\]]*\]|\([^)]*\)|<[^>]*>/g, ''), { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ʟᴇᴩᴛᴏɴ ᴀɪ' }}});
});

System({
    pattern: "gpt", 
    fromMe: isPrivate,
    desc: "ai chatgpt", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .chatgpt qui est Paul Biya*_");
    const { response } = await interactWithAi("gpt", match);
    await m.send(response, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: 120363321386877609@newsletter', newsletterName: 'ᴄʜᴀᴛɢᴩᴛ 4' }}});
});

System({
    pattern: "bb", 
    fromMe: isPrivate,
    desc: "blackbox ai", 
    type: "ai",
}, async (message, match, m) => {
       match = match || m.reply_message.text;
       if(match && m.quoted) match = match + m.reply_message.text;
       if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .bb qui est Nelson Mandela*_");
       const { result } = await interactWithAi("blackbox", match);
       await m.send(result, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ʙʟᴀᴄᴋ ʙᴏx' }}});
});

System({
    pattern: 'gemini ?(.*)',
    fromMe: isPrivate,
    desc: 'Chat with gemini ai',
    type: 'ai',
}, async (message, match, m) => {
    match = match || message.reply_message.text;
    if (match && m.quoted) match = message.reply_message.text + '\n' + match;   
    if (!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .gemini pourquoi la femme est compliquée?*_");  
    const { content } = await postJson(`https://ronak-api.onrender.com/ronak/gemini`, { prompt: match });
    await m.send(content, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ɢᴇᴍɪɴɪ ᴀɪ' }}});
});

System({
    pattern: "chatgpt", 
    fromMe: isPrivate,
    desc: "ai chatgpt", 
    type: "ai",
}, async (message, match, m) => {
    match = match || m.reply_message.text;
    if(match && m.quoted) match = match + m.reply_message.text;
    if(!match) return m.reply("_*J ai besoin d une requête s'il vous plaît !!*_\n_*exemple: .chatgpt Qui est Samuel Etoo*_");
    const response = await interactWithAi("chatgpt", match);
    await m.send(response, { contextInfo: { forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363321386877609@newsletter', newsletterName: 'ᴄʜᴀᴛɢᴩᴛ' }}});
});

System({
    pattern: 'upscale ?(.*)',
    fromMe: isPrivate,
    desc: 'Enhance images with AI',
    type: 'ai',
}, async (message, match) => {
    if (!message.quoted || !message.reply_message.image) return await message.send("Réponds à une image idiot 🤦🏽!");
    const img = await message.reply_message.downloadAndSave();
    const upscale = await interactWithAi("upscale", img);
    await message.send(upscale, { caption: "_*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴇʀᴍ-ᴍᴅ*_" }, "img");
});

System({
	pattern: 'ocr ?(.*)',
	fromMe: isPrivate,
	desc: 'Text Recognition from image',
	type: 'ai',
}, async (message, match) => {
    if(!message.reply_message.image) return await message.reply("_Réponds à une image werrr 🤦🏽_");
    const data = await GraphOrg(await message.reply_message.downloadAndSaveMedia());
    const res = await fetch(IronMan(`ironman/ai/ocr?url=${data}`));
    if (res.status !== 200) return await message.reply('*Oups! Quelque chose n a pas marché 🚫*');
    const ress = await res.json();
    if (!ress.text) return await message.reply('*J ai pas trouvé*');
    await message.reply(`\`\`\`${ress.text}\`\`\``);
});

System({
  pattern: 'detectai ?(.*)',
  fromMe: isPrivate,
  desc: 'Detects AI-generated text',
  type: 'ai',
}, async (message, match, m) => {
  const text = message.reply_message.text || match;
  const res = await fetch(IronMan(`ironman/ai/detectai?text=${encodeURIComponent(text)}`));
  const data = await res.json();
  let output = "*𝙰𝙸 𝙳𝙴𝚃𝙴𝙲𝚃𝙸𝙾𝙽*\n\n";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    output += `*тєχт:* ${item.text}\n`;
    output += `*ѕ¢σяє:* ${(item.score * 100).toFixed(2)}%\n`;
    output += `*туρє:* ${item.type}\n\n`;
    if (i === 2 && data.length > 3) {
      output += await readMore();
    }
  }
  await message.reply(output.trim());
});
