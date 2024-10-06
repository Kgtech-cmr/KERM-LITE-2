const { Sequelize } = require('sequelize');
const fs = require('fs');

if (fs.existsSync('config.env')) {
  require('dotenv').config({
      path: './config.env'
  });
};

const toBool = (x) => x === 'true';

const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./database.db" : process.env.DATABASE_URL

module.exports = {
  VERSION: require('./package.json').version,
  BAN_CHATS: process.env.BAN_CHATS || "",
  PORT: toBool(process.env.PORT) || 8000,
  PM_BLOCKER: toBool(process.env.PM_BLOCKER) || false,
  PM_BLOCKER_MSG: process.env.PM_BLOCKER_MSG || "_*Bloqueur de pm actif sur ce chat*_",
  AUDIO_DATA: process.env.AUDIO_DATA || 'қ૯ЯறԼіҬ૯2;kermLite;https://graph.org/file/58ea74675af7836579a3a.jpg',
  WARN_COUNT: process.env.WARN_COUNT || '3',
  ANTILINK_MSG: process.env.ANTILINK_MSG || "_*Lien non autorisé dans ce groupe imbécil*_",
  ANTIBOT_MSG: process.env.ANTIBOT_MSG || "_*Bot non autorisé dans ce groupe idiot*_",
  ANTIWORD_MSG: process.env.ANTIWORD_MSG || "_*Anti mots supprimé avec succès*_",
  ALIVE_DATA : process.env.ALIVE_DATA || "_*Hey &sender Je suis en vie maintenant*_\n\n_PLATEFORME: &platform_\n_RUNTIME : &runtime_\n\n_Tapez .alive pour mettre à jour votre message alive_",
  SESSION_ID: process.env.SESSION_ID || 'INSERE TA SESSION ICI BRO',
  LANG: process.env.LANG || 'EN',
  SETVV: process.env.SETVV || 'DM',
  ELEVENLABS: process.env.ELEVENLABS,
  HANDLERS: process.env.HANDLERS || process.env.HANDLER || process.env.PREFIX || '.',
  ALLWAYS_ONLINE: toBool(process.env.ALLWAYS_ONLINE || "true"),
  READ_MSG: toBool(process.env.READ_MSG || "false"),
  BRANCH: "main",
  LINKPREVIEW: toBool(process.env.LINKPREVIEW || "false"),
  CONTEXTINFO: process.env.CONTEXTINFO || `{"title": "қ૯ЯறԼіҬ૯2", "body": "ᴀᴡᴇꜱᴏᴍᴇ 🍉", "thumbnailUrl": "https://i.imgur.com/8X1vjbQ.jpeg", "renderLargerThumbnail": true, "mediaType": 1, "mediaUrl": "", "sourceUrl": "https://github.com/Kgtech-cmr/KERM-LITE-2", "showAdAttribution": true}`,
  KOYEB_API: process.env.KOYEB_API,
  BRAINSHOP: process.env.BRAINSHOP || '172372,nbjE0YAlyw3cpoMl',
  TGTOKEN: "bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4",
  API: 'https://api-loki-ser-1o2h.onrender.com/',
  STICKER_PACKNAME: process.env.STICKER_PACKNAME || 'қ૯ЯறԼіҬ૯2;𝖶𝖠𝖡𝖮𝖳',
  CALL_BLOCK: toBool(process.env.CALL_BLOCK) || false,
  SAVE_STATUS: toBool(process.env.SAVE_STATUS) || false,
  STATUS_VIEW: process.env.STATUS_VIEW || "true",
  REJECT_CALL: toBool(process.env.REJECT_CALL || "false"),
  ERROR_MSG: toBool(process.env.ERROR_MSG) || true,
  WELCOME_MSG: process.env.WELCOME_MSG || "Hey &mention Bienvenue dans &gname",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hey $mention c'était sympa de te voir",
  MEDIA_DATA: process.env.MEDIA_DATA|| 'ʟɪꜱᴛ ᴍᴇɴᴜ;қ૯ЯறԼіҬ૯2;https://i.imgur.com/IQeeX6g.mp4',
  MENU_FONT: process.env.MENU_FONT || "0;0",
  SUDO: process.env.SUDO || '',
  STARTING_MSG: toBool(process.env.STARTING_MSG) || true,
  LOG_MSG: toBool(process.env.LOG_MSG) || true,
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || '',
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || '',
  BOT_INFO: process.env.BOT_INFO || 'қ૯ЯறԼіҬ૯2;𝙺𝙶 𝚃𝙴𝙲𝙷✖‿✖•;https://i.imgur.com/IQeeX6g.mp4',
  WORK_TYPE: process.env.WORK_TYPE || 'public',
  DATABASE: DATABASE_URL === "./database.db" ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: false }) : new Sequelize(DATABASE_URL, {dialect: "postgres", ssl: true, protocol: "postgres", dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false }),
};
