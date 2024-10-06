/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2024 Kgtech-cmr.
Sous licence GPL-3.0 ; vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence sous peine de poursuites judiciaires.
Kgtech-cmr.

------------------------------------------------------------------------------------------------------------------------------------------------------*/


const { System, isPrivate, extractUrlFromMessage, sleep, getJson, config, isUrl, IronMan, getBuffer, toAudio, terabox, instaDl, aptoideDl, tiktokDl } = require("../lib/");


const fetchData = async (mediafireUrl) => {
    const data = await getJson(config.API + "download/mediafire?link=" + mediafireUrl)
    if (!data || data.length === 0) throw new Error("Invalid MediaFire URL or no data found");
    const { nama: name, mime, size, link } = data[0];
    return { name, mime, size: size.trim(), link };
};

function isInstaUrl(url) {
    const instaPattern = /^https?:\/\/(www\.)?instagram\.com\//;
    return instaPattern.test(url);
}

System({
    pattern: "mediafire",
    fromMe: isPrivate,
    desc: "mediafire downloader",
    type: "download"
}, async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("_Donnez un *Lien* mediafire_");
    const mediafireUrl = extractUrlFromMessage(match);
    const documentData = await fetchData(mediafireUrl).catch(error => {
        console.error("Error:", error);
        return Promise.reject(error);
    });
    if (documentData) {
        const downloadMessage = await message.send(`_*Downloading --> ${documentData.name}*_`);
        await message.reply({ url: documentData.link }, { mimetype: documentData.mime, fileName: documentData.name, fileSize: documentData.size }, "document");
        await downloadMessage.edit("_*Téléchargement complet!*_");
    } else {
        await message.send("_Ce n'est pas un lien MediaFire valide_");
    }
});

System({
    pattern: "tgs ?(.*)",
    fromMe: true,
    desc: "Download Sticker From Telegram",
    type: "download",
},
async (message, match, client) => {
    if (!match) return await message.reply("_Entrez le lien de lot de sticker \nEx : Tgs https://t.me/addstickers/Vc_me_dance_pack_by_fStikBot\nGardez à l'esprit qu'il y a un risque d'interdiction s'il est utilisé fréquemment");
    let packid = match.split("/addstickers/")[1];
    let { result } = await getJson(`https://api.telegram.org/${config.TGTOKEN}/getStickerSet?name=${encodeURIComponent(packid)}`);
    if (result.is_animated) return message.reply("_Les stickers animés ne sont pas pris en charge_");
    message.reply(`*Total stickers :* ${result.stickers.length}\n*Estimé terminé en:* ${result.stickers.length * 1.5} seconds\nGardez à l'esprit qu'il y a un risque d'interdiction s'il est utilisé fréquemment`.trim());
    for (let sticker of result.stickers) {
        let file_path = await getJson(`https://api.telegram.org/${config.TGTOKEN}/getFile?file_id=${sticker.file_id}`);
        const buff = `https://api.telegram.org/file/${config.TGTOKEN}/${file_path.result.file_path}`;
        const stickerPackNameParts = config.STICKER_PACKNAME.split(";");
        const packname = stickerPackNameParts[0];
        const author = stickerPackNameParts[1];
        await message.send(buff, { packname, author }, "sticker");
        await sleep(5500);
    }
    return await message.reply('Succès');
});

System({
  pattern: 'apk ?(.*)',
  fromMe: isPrivate,
  desc: 'Downloads and sends an app ',
  type: 'download',
}, async (message, match, m) => {
  const appId = match;
  if (!appId) return await message.reply('*𝖡𝖾𝗌𝗈𝗂𝗇 𝖽，𝗎𝗇 𝗇𝗈𝗆 𝖽，𝖺𝗉𝗉𝗅𝗂𝖼𝖺𝗍𝗂𝗈𝗇*\n*Exemple: ꜰʀᴇᴇ ꜰɪʀᴇ*');

  const appInfo = await aptoideDl(appId);
  await message.client.sendMessage(message.chat, {
    document: {
      url: appInfo.link,
    },
    mimetype: 'application/vnd.android.package-archive',
    fileName: appInfo.appname, 
    caption: `*Nom de l'app:* ${appInfo.appname}\n*Développeur:* ${appInfo.developer}`,
  }, {
    quoted: message.data,
  });
 
});

System({
    pattern: 'fb ?(.*)',
    fromMe: isPrivate,
    desc: 'Download Facebook video',
    type: 'download',
}, async (message, text) => {
    let match = await extractUrlFromMessage(text || message.reply_message.text);
    if (!match) return await message.send("*Besoin d'un lien média public Facebook*");       
    const res = await fetch(IronMan(`ironman/dl/fbdl?link=${match}`));
    const data = await res.json();
    await message.reply({url: data.data.HD }, { caption: "_*Téléchargé🤍*_" }, "video")
});

System({
    pattern: 'pinterest ?(.*)',
    fromMe: isPrivate,
    desc: "pinterest downloader",
    type: "download",
}, async (message, text, m) => {
    let match = await extractUrlFromMessage(text || message.reply_message.text);
    if (!match) return await message.reply('_Veuillez fournir un *lien* pinterest_');
    if (!isUrl(match)) return await message.reply("_Veuillez fournir un *lien* pinterest valid_");
    if (!match.includes("pin.it")) return await message.reply("_Veuillez fournir un *lien* pinterest valide_");
    const { result } = await getJson(config.API + "download/pinterest?link=" + await extractUrlFromMessage(match))
    await message.sendFromUrl(result.LokiXer.url, { caption: "_*Téléchargé🤍*_" });
});

System({
    pattern: 'insta ?(.*)',
    fromMe: true,
    desc: 'instagram downloader',
    type: 'download',
}, async (message, match) => {
    const url = await extractUrlFromMessage(match || message.reply_message.text);
    if (!url) return await message.reply('_Veuillez fournir un *lien* Instagram_'); 
    if (!isUrl(url)) return await message.reply("_Veuillez fournir un *lien* Instagram valide_");
    if (!url.includes("instagram.com")) return await message.reply("_Veuillez fournir un *lien* Instagram valide_");
    const data = await instaDl(url);
    if (!data || data.length === 0) return await message.reply("_Aucun contenu trouvé dans le lien fournie.");
    for (const imageUrl of data) {
        if (imageUrl) {
            await message.sendFromUrl(imageUrl);
        }
    }
});

System({
  pattern: "story",
  fromMe: isPrivate,
  desc: "To download insta story",
  type: "download"
}, async (message, match) => {
  if (match.startsWith("dl-url")) return await message.sendFromUrl(await extractUrlFromMessage(match), { caption: "_Succès_" });
  match = match || message.reply_message.text;
  if (!isUrl(match)) {
    const { media: result } = await getJson(IronMan("ironman/ig/story?user=" + match));
    if (!result) return await message.send("Not Found");
    if (result.length === 1) return await message.sendFromUrl(result[0]);
    const options = result.map((u, index) => ({ name: "quick_reply", display_text: `${index + 1}/${result.length}`, id: `story dl-url ${u}` }));
    return await message.send(options, { body: "", footer: "*KERM-LITE-2*", title: "*Téléchargeur de médias Insta_*\n" }, "button");
  }
  const url = await extractUrlFromMessage(match);
  if (!isInstaUrl(url)) return message.reply("_*Fournir un lien de story Instagram valide*_");
  const result = await instaDl(url);
  if (!result) return await message.send("Oups non trouvé");
  if (result.length === 1) return await message.sendFromUrl(result[0].download_link);
  const options = result.map((u, index) => ({ name: "quick_reply", display_text: `${index + 1}/${result.length}`, id: `story dl-url ${u.download_link}` }));
  await message.send(options, { body: "", footer: "*KERM-LITE-2*", title: "*Téléchargeur de médias Insta_*\n" }, "button");
});

System({
  pattern: 'soundcloud (.*)',
  fromMe: isPrivate,
  desc: 'SoundCloud downloader',
  type: 'download',
}, async (message, match) => {
  const link = await extractUrlFromMessage(match || message.reply_message.text);
  if (!link || !link.includes('soundcloud')) return await message.send("*Besoin d'un lien SoundCloud pour télécharger*\n_Exemple : .soundcloud https://m.soundcloud.com/corpse_husband/life-waster_");
    const response = await getJson(IronMan(`ironman/soundcloud/download?link=${link}`));
    const q = await message.send(`*Téléchargement ${response.title}*`);
    const url = IronMan(`ironman/scdl?url=${link}`);
    const aud = await getBuffer(url);
    const img = await getBuffer(response.thumb);
    const result = await toAudio(aud, 'mp3');
    await message.reply(result, {
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: response.title,
          body: 'Kᴇʀᴍ-Mᴅ',
          thumbnail: img,
          mediaType: 1,
          mediaUrl: url,
          sourceUrl: link,
          showAdAttribution: false,
          renderLargerThumbnail: true
        }
      }
    }, "audio");
});


System({
    pattern: 'livewp ?(.*)',
    fromMe: isPrivate,
    desc: 'Download live wallpapers',
    type: 'download',
}, async (message, match) => {
    if (!match) return await message.send("*Besoin d'une requête pour rechercher des fonds d'écran animés*\n_Exemple : .livewp Naruto_");           
    const data = await getJson(IronMan(`Ironman/live/wallpaper?query=${match}`));
    const { Title, Preview_url, Mobile, Desktop } = data;
    await message.reply({ url: Preview_url }, { caption: `*${Title}*` }, "video");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await message.reply({ url: Mobile.Download_url }, { caption: `「 *VERSION MOBILE* 」\n\n *➥Titre:* ${Mobile.Caption}\n *➥Format:* ${Mobile.Size}` }, "video");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await message.reply({ url: Desktop.Download_url }, { caption: `「 *VERSION PC* 」\n\n *➥Titre:* ${Desktop.Caption}\n *➥Qualité:* ${Desktop.Quality}\n *➥Format:* ${Desktop.Size}` }, "video"); 
});

System ({
    pattern: 'gitdl ?(.*)',
    fromMe: isPrivate,
    desc: 'Repository Downloader',
    type: 'download',
}, async (message, match) => {
   if (!isUrl(match)) return await message.reply("*_Besoin d'un lien github_*")
   let user = match.split("/")[3];
   let repo = match.split("/")[4];
   const msg = await message.send("_*Téléchargement🪲*_", { quoted: message.data });
   await message.reply({ url: `https://api.github.com/repos/${user}/${repo}/zipball` }, { fileName: repo , mimetype: "application/zip" }, "document");
   await msg.edit("_*Téléchargé🍓*_");
});

System({
    pattern: 'twitter ?(.*)',
    fromMe: isPrivate,
    desc: 'Download Twitter video',
    type: 'download',
}, async (message, match, m) => {
    if (!match || !match.includes('x.com')) return await message.send("_Besoin d'un lien x(twitter)_");
    const url = match.trim();
    const { media } = await getJson(IronMan(`ironman/dl/x?url=${encodeURIComponent(url)}`));
    await message.sendFromUrl(media[0].url);
});

System({
    pattern: 'thread ?(.*)',
    fromMe: isPrivate,
    desc: 'Download threads media',
    type: 'download',
}, async (message, match) => {
    if (!match || !match.includes('threads')) return await message.send("_Besoin d'un lien threads_");
    const encodedUrl = encodeURIComponent(match.trim());
    const media = await getJson(IronMan(`ironman/dl/threads?url=${encodedUrl}`));
    if (media.video) {
        for (const videoUrl of media.video) {
            await message.reply({ url: videoUrl }, { caption: "*Télécharger🤍*" }, "video");
        }
    }
    if (media.image) {
        for (const imageUrl of media.image) {
            await message.reply({ url: imageUrl }, { caption: "*Télécharger🤍*" }, "image");
        }
    }
});

System({
        pattern: "tbox", 
        fromMe: isPrivate,
        desc: "download terabox file", 
        type: "download",
  }, async (msg, match) => {
       match = await extractUrlFromMessage(match || msg.reply_message.text);
       if (!isUrl(match)) return msg.reply("*Répondre à un lien Terabox ou fournir un lien Terabox*");
       if (!match || !match.includes("tera")) return msg.reply("*Répondre à un lien Terabox ou fournir un lien Terabox*");
       const { Name: teraBoxFileName, Download, FastDL } = await terabox(match);
       await msg.send(await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdlDLWf101d_p6TaRNvymnAiPPVFZPfTML9dVbj3LD6LLf_mTvHPH5pJq5&s=10"), { type: "image", value: [{ name: "cta_url", display_text: "Download", url: Download, merchant_url: Download, action: "url", icon: "", style: "link" }, { name: "cta_url", display_text: "Fast DL", url: FastDL, merchant_url: FastDL, action: "url", icon: "", style: "link" }], body: "", footer: "*JARVIS-MD*", title: `\nTo download the terabox file click the link below if download link not wroked use Fast DL\n\nFile Name: ` + await decodeURI(teraBoxFileName) +`\n` }, "button");
 });

System({
  pattern: 'tiktok ?(.*)',
  fromMe: isPrivate,
  desc: 'Sends TikTok video or image',
  type: 'download',
}, async (message, match, msg) => {
  match = await extractUrlFromMessage(match || message.reply_message.text);
  if (!isUrl(match)) return message.reply("*Répondre à un lien TikTok ou fournir un lien TikTok*");
  if (!match || !match.includes("tiktok")) return message.reply("*Répondre à un lien TikTok ou fournir un lien TikTok*");
  var data = await tiktokDl(match);
  var vidd = data.data.find(item => item.type === 'nowatermark_hd');
  var pic = data.data.filter(item => item.type === 'photo');
  if (vidd) {
    await message.client.sendMessage(message.chat, { video: { url: vidd.url }, caption: "*_Téléchargé!_*" }, { quoted: message.data });
  } else if (pic.length > 0) {
    for (var photo of pic) {
      await message.client.sendMessage(message.chat, { image: { url: photo.url }, caption: "*_Téléchargé!_*" }, { quoted: message.data });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } else {
    return message.reply("*Impossible de trouver un média valide à télécharger*");
  }
});

System({
  pattern: 'spotify ?(.*)',
  fromMe: isPrivate,
  desc: 'Downloads song from Spotify',
  type: 'download',
}, async (message, match, m) => {
  const link = await extractUrlFromMessage(match || message.reply_message.text);
  if (!link) return await message.reply("_Donnez un *lien* spotify_");
  if (!link.includes('https://open.spotify.com')) return await message.reply("_Besoin d'un Lien Spotify_");
    const data = await getJson(IronMan(`ironman/dl/spotify?link=${link}`));
    const lnk = data.link;
    const cover = data.metadata.cover;
    const artist = data.metadata.artists;
    const title = data.metadata.title;
    const q = await message.send(`_*Téléchargement ${title}...*_`);
    const img = await getBuffer(cover);
    const aud = await getBuffer(lnk);
    const audio = await toAudio(aud);
    await message.reply(audio, {
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: title,
          body: artist,
          thumbnail: img,
          mediaType: 1,
          mediaUrl: '',
          sourceUrl: 'https://github.com/Kgtech-cmr/KERM-LITE-2',
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, "audio");
});
