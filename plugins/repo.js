const {cmd , commands} = require('../command')

cmd({
    pattern: "repo",
    alias: ["kerm"],
    desc: "repo the bot",
    category: "main",
    react: "📡",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👾 KERM LITE 2 Repastitory Information*

*| ɴᴀᴍᴇ*: Kᴇʀᴍ-Lɪᴛᴇ-2
*| ᴏᴡɴᴇʀ*: Kɢ Tᴇᴄʜ ( Kᴇʀᴍ-Lɪᴛᴇ-2 )
*| ɴᴜᴍʙᴇʀ*: +237659535227 | +237650564445
*| ᴠᴇʀꜱɪᴏɴ*: 1.0.0


*📡 REPO LINK*
🔗◦https://github.com/Kgtech-cmr/KERM-LITE-2

*📌 SUBSCRIBE MY YOUTUBE CHANNEL*
🔗◦ https://youtube.com/@kermhacktools-s9s

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Kᴇʀᴍ-Lɪᴛᴇ-2
`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/397000a07a1deb7fad9c2.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
