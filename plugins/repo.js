const {cmd , commands} = require('../command')

cmd({
    pattern: "repo",
    desc: "repo the bot",
    category: "main",
    react: "📡",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👾 GHOST MD Repastitory Information*

*| ɴᴀᴍᴇ*: ɢʜᴏꜱᴛ-ᴍᴅ
*| ᴏᴡɴᴇʀ*: ᴄʏʙᴇʀ ɢʜᴏꜱᴛ ( ɢʜᴏꜱᴛ-ᴍᴅ )
*| ɴᴜᴍʙᴇʀ*: 94741140620
*| ᴠᴇʀꜱɪᴏɴ*: 1.0.0


*📡 REPO LINK*
🔗◦https://github.com/GHOST-V1-MD/GHOST-MD.git

*📌 SUBSCRIBE MY YOUTUBE CHANNEL*
🔗◦ https://youtube.com/@cyberghost630?si=JVTDEQ8vO9Ksgv9M

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢʜᴏꜱᴛ-ᴍᴅ
`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/397000a07a1deb7fad9c2.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
