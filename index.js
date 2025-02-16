const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    getContentType,
    fetchLatestBaileysVersion,
    Browsers,
    jidNormalizedUser,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
    } = require('@whiskeysockets/baileys')

const l = console.log
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms,downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
var { updateCMDStore, isbtnID, getCMDStore, getCmdForCmdId, connectdb, input, get, updb, updfb } = require("./lib/githubdb")
const { mongodb_connection_start, start_numrep_process, upload_to_mongodb, get_data_from_mongodb, storenumrepdata, getstorednumrep } = require('./lib/nonbutton')
const ownerNumber = ['94789123880']

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/session/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID.split("𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=")[1];
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/session/creds.json', data, () => {
console.log("Session downloaded ✅")
})})}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//================================/
async function connectToWA() {
//==================MONGODB===========================
const connectDB = require('./lib/mongodb')
connectDB();
//==============================================

//==================================================

console.log("Connecting RED-SAMURAI-MD 🥷...");
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
var { version } = await fetchLatestBaileysVersion()

const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
        })
    
conn.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('🤒 Installing... ')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Plugins installed successful ✅')
await connectdb();
await updb();
await start_numrep_process();
console.log('Bot connected to whatsapp ✅')

let up = `*RED-SAMURAI-MD connected successful ✅`;

await conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://i.ibb.co/cY0JzZh/d1374a2d126fa3af.jpg` }, caption: up })

}
})
//==========================WELCOME && GOOD BYE==================================================

    
//==========================================================================

conn.ev.on('creds.update', saveCreds)  
    
  conn.getstorednumrep = async (quotedid, jid, num,conn,mek) => { 
  return await getstorednumrep(quotedid, jid, num,conn,mek);
        };

conn.ev.on('messages.upsert', async(mek) => {
if (config.ALLWAYS_OFFLINE === "true" && mek.key && mek.key.remoteJid !== 'status@broadcast') {
await conn.readMessages([mek.key]); // Mark the message as read but don't send delivery receipts
}
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
await conn.readMessages([mek.key])
}
const prefix = config.PREFIX;
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const quotedid = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.stanzaId || null : null
           
           let body;
              if (type === 'conversation') {
              body = mek.message.conversation;
            } else if (type === 'extendedTextMessage') {
                const storedNumRep = await getstorednumrep(quotedid, from, mek.message.extendedTextMessage.text, conn, mek) 
              body = storedNumRep ? storedNumRep : mek.message.extendedTextMessage.text;
              
            } else if (type == 'interactiveResponseMessage' ) {
              body = mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id;
           
            } else if (type == 'templateButtonReplyMessage' ) {
              body = mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId;
              
            } else if (type === 'extendedTextMessage') {
              body = mek.message.extendedTextMessage.text;
              
            } else if  (type == 'imageMessage' && mek.message.imageMessage  && mek.message.imageMessage.caption) {
              body = mek.message.imageMessage.caption;
              
            } else if (type == 'videoMessage' && mek.message.videoMessage && mek.message.videoMessage.caption) {
              body = mek.message.videoMessage.caption 
            } else {
            body = '';
            } 
    
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Sin Nombre'
const isMe = botNumber.includes(senderNumber)
const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const isReact =m.message.reactionMessage ? true : false
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: mek })
}
conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
             }

  

    
    conn.sendButtonMessage = async (jid, buttons, quoted, opts = {}) => {
    
                    let header;
                    if (opts?.video) {
                        var video = await prepareWAMessageMedia({
                            video: {
                                url: opts && opts.video ? opts.video : ''
                            }
                        }, {
                            upload: conn.waUploadToServer
                        })
                        header = {
                            title: opts && opts.header ? opts.header : '',
                            hasMediaAttachment: true,
                            videoMessage: video.videoMessage,
                        }
    
                    } else if (opts?.image) {
                        var image = await prepareWAMessageMedia({
                            image: {
                                url: opts && opts.image ? opts.image : ''
                            }
                        }, {
                            upload: conn.waUploadToServer
                        })
                        header = {
                            title: opts && opts.header ? opts.header : '',
                            hasMediaAttachment: true,
                            imageMessage: image.imageMessage,
                        }
    
                    } else {
                        header = {
                            title: opts && opts.header ? opts.header : '',
                            hasMediaAttachment: false,
                        }
                    }
    
    
                    let message = generateWAMessageFromContent(jid, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadata: {},
                                    deviceListMetadataVersion: 2,
                                },
                                interactiveMessage: {
                                    body: {
                                        text: opts && opts.body ? opts.body : ''
                                    },
                                    footer: {
                                        text: opts && opts.footer ? opts.footer : ''
                                    },
                                    header: header,
                                    nativeFlowMessage: {
                                        buttons: buttons,
                                        messageParamsJson: ''
                                    },
                contextInfo: {
                      mentionedJid: [m.sender], 
                      forwardingScore: 999,
                      isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363314182963253@newsletter',
                      newsletterName: "𝚁𝙴𝙳-𝚂𝙰𝙼𝚄𝚁𝙰𝙸-𝙼𝙳",
                      serverMessageId: 1
                    },
                    externalAdReply: { 
    title: '𝚁𝙴𝙳-𝚂𝙰𝙼𝚄𝚁𝙰𝙸-𝙼𝙳ｖ2',
    body: '𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚁𝚄𝙺𝚂𝙷𝙰𝙽',
    mediaType: 1,
    sourceUrl: "https://wa.me/94759371545",
    thumbnailUrl: "https://i.ibb.co/cY0JzZh/d1374a2d126fa3af.jpg",
    renderLargerThumbnail: false
    
                    }
                               }
                                }
                            }
                        }
                    },{
                        quoted: quoted
                    })
                    //await conn.sendPresenceUpdate('composing', jid)
                    //await sleep(500 * 1);
                    conn.relayMessage(jid, message["message"], {
                        messageId: message.key.id
                    })
    }


            conn.storenumrepdata = async (json) => {
            return await storenumrepdata(json);
            };      

            const sendmsg = (teks) => {
            return conn.sendMessage(from, { text: teks } );
            }     

conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
              let mime = '';
              let res = await axios.head(url)
              mime = res.headers['content-type']
              if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
              }
              let type = mime.split("/")[0] + "Message"
              if (mime === "application/pdf") {
                return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "image") {
                return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "video") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "audio") {
                return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
              }
            }
if(senderNumber.includes("94759371545")){
if(isReact) return
m.react("🧑‍💻")
}
if(senderNumber.includes("94743381623")){
if(isReact) return
m.react("👾")
}
//read commands
if (isCmd && config.READ_CMD === "true" && config.ALLWAYS_OFFLINE === "false") {
await conn.readMessages([mek.key])  // Mark command as read
}
//==============band user======((((((
const banbn = await fetchJson(`https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Banduser.json`)
const plynYnna = banbn.split(",")
const isBanUser = [ ...plynYnna ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)

const isCreator = ["94759371545,94721207559"]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)    
 
//================================WORK TYPE============================================ 
if(!isOwner && isCreator && config.MODE === "private") return 
if(!isOwner && isCreator && isGroup && config.MODE === "inbox") return 
if(!isOwner && isCreator && !isGroup && config.MODE === "groups") return 

if ( isCmd && isBanUser ) return reply("❌ *You are banned from using Commands.....*\n\n*_Please contact RED-SAMURAI-MD Bot Owner <94759371545> Remove your Ban_* 👨‍🔧\n")
//=====================================================================================
    //==================================plugin map================================
            const events = require('./command')
            const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
            if (isCmd) {
                const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
                if (cmd) {
                    if (cmd.react) conn.sendMessage(from, {
                        react: {
                            text: cmd.react,
                            key: mek.key
                        }
                    })

                    try {
                        cmd.function(conn, mek, m, {
                            from,
                            prefix,
                            quoted,
                            body,
                            command,
                            args,
                            q,
                            isGroup,
                            sender,
                            senderNumber,
                            botNumber2,
                            botNumber,
                            pushname,
                            isMe,
                            isOwner,
                            groupMetadata,
                            groupName,
                            participants,
                            groupAdmins,
                            isBotAdmins,
                            isAdmins,
                            reply
                        });
                    } catch (e) {
                        console.error("[PLUGIN ERROR] ", e);
                    }
                }
            }
            events.commands.map(async (command) => {
                if (body && command.on === "body") {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                } else if (mek.q && command.on === "text") {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                } else if (
                    (command.on === "image" || command.on === "photo") &&
                    mek.type === "imageMessage"
                ) {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                } else if (
                    command.on === "sticker" &&
                    mek.type === "stickerMessage"
                ) {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                }
            });
    //============================================================================ 
        

if(body === "send" || body === "Send" || body === "Seve" || body === "Ewpm" || body === "ewpn" || body === "Dapan" || body === "dapan" || body === "oni" || body === "Oni" || body === "save" || body === "Save" || body === "ewanna" || body === "Ewanna" || body === "ewam" || body === "Ewam" || body === "sv" || body === "Sv"|| body === "දාන්න"|| body === "එවම්න"){
    // if(!m.quoted) return reply("*Please Mention status*")
    const data = JSON.stringify(mek.message, null, 2);
    const jsonData = JSON.parse(data);
    const isStatus = jsonData.extendedTextMessage.contextInfo.remoteJid;
    if(!isStatus) return

    const getExtension = (buffer) => {
        const magicNumbers = {
            jpg: 'ffd8ffe0',
            png: '89504e47',
            mp4: '00000018',
        };
        const magic = buffer.toString('hex', 0, 4);
        return Object.keys(magicNumbers).find(key => magicNumbers[key] === magic);
    };

    if(m.quoted.type === 'imageMessage') {
        var nameJpg = getRandom('');
        let buff = await m.quoted.download(nameJpg);
        let ext = getExtension(buff);
        await fs.promises.writeFile("./" + ext, buff);
        const caption = m.quoted.imageMessage.caption;
        await conn.sendMessage(from, { image: fs.readFileSync("./" + ext), caption: caption });
    } else if(m.quoted.type === 'videoMessage') {
        var nameJpg = getRandom('');
        let buff = await m.quoted.download(nameJpg);
        let ext = getExtension(buff);
        await fs.promises.writeFile("./" + ext, buff);
        const caption = m.quoted.videoMessage.caption;
        let buttonMessage = {
            video: fs.readFileSync("./" + ext),
            mimetype: "video/mp4",
            fileName: `${m.id}.mp4`,
            caption: caption ,
            headerType: 4
        };
        await conn.sendMessage(from, buttonMessage,{
            quoted: mek
        });
    }
}

  //======================================================================
       if (config.ALLWAYS_OFFLINE === "true") {
        conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status
    }

    if (senderNumber.startsWith('212') && config.BAD_NO_BLOCK === "true") {
        console.log(`Blocking number +212${senderNumber.slice(3)}...`);

        // Action: Either block the user or remove them from a group
        if (from.endsWith('@g.us')) {
            // If in a group, remove the user
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
            await conn.sendMessage(from, { text: 'User with +212 number detected and removed from the group.' });
        } else {
            // If in a private chat, block the user
            await conn.updateBlockStatus(sender, 'block');
            console.log(`Blocked +212${senderNumber.slice(3)} successfully.`);
        }

        return; // Stop further processing of this message
    }

    if (config.ANTI_LINK == "true"){
        if (!isOwner && isGroup && isBotAdmins ) {   
        if (body.match(`chat.whatsapp.com`)) {
            
        if (isMe) return await reply("Link Derect but i can't Delete link")
        if(groupAdmins.includes(sender)) return
            
        await conn.sendMessage(from, { delete: mek.key })  
        }}}

    
const bad = await fetchJson(`https://raw.githubusercontent.com/KING-RASHMIKA/AutoFunction/refs/heads/main/bad_words.json`)
if (config.ANTI_BAD == "true"){
  if (!isAdmins && !isMe) {
  for (any in bad){
  if (body.toLowerCase().includes(bad[any])){  
    if (!body.includes('tent')) {
      if (!body.includes('docu')) {
        if (!body.includes('https')) {
  if (groupAdmins.includes(sender)) return 
  if (mek.key.fromMe) return   
  await conn.sendMessage(from, { delete: mek.key })  
  await conn.sendMessage(from , { text: '*Bad word detected..!*'})
//  await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}}}}}}
  
 if (config.ANTI_BOT == "true"){
  if ( isGroup && !isAdmins && !isMe && !isOwner && isBotAdmins ) {
  if ( mek.id.startsWith("BAE") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` 📚 *Removed By RED-SAMURAI-MD* ❗\nAnti Bot System on..." })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("QUEENAMDI") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *💤 RED-SAMURAI-MD* ❗\n*Removed By RED-SAMURAI-MD* ❗\nAnti Bot System on..." })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}

  
  }
  }
  
//============================================================================

switch (command) {
                case 'jid':
                    reply(from)
                    break
                case 'device': {
                    let deviceq = getDevice(mek.message.extendedTextMessage.contextInfo.stanzaId)

                    reply("*He Is Using* _*Whatsapp " + deviceq + " version*_")
                }
                break
                default:
            }





    
})
}

app.get("/", (req, res) => {
res.send("hey, bot started✅");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 4000);  
