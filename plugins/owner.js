const {cmd , commands} = require('../command')

cmd({
    pattern: "owner",
    alias: ["kgtech"],
    desc: "owner the bot",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👾 KERM-LITE-2 Whatsapp Bot*

*| ᴏᴡɴᴇʀ ɴᴀᴍᴇ*: Kɢ Tᴇᴄʜ ( Kᴇʀᴍ-ʟɪᴛᴇ-2 )
*| ɴᴜᴍʙᴇʀ*: 94704227534
*| ʏᴏᴜᴛᴜʙᴇ*: https://youtube.com/@kermhacktools-s9s
*| ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ*: https://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Kᴇʀᴍ-Lɪᴛᴇ-2
`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/397000a07a1deb7fad9c2.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
