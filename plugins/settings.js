const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/githubdb")

cmd({
    pattern: "settings",
    react: "🛡️",
    alias: ["setting",'botsetting'],
    desc: desc2,
    category: "owner",
    use: '.settings',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply("Owner only")
if(!q) return reply("Please give me text")
  
let numrep = []
let pakaya = `1.1 SET PREFIX`
numrep.push(`1.1 ${prefix}prefix ${q}` )  
	
const mass = await conn.sendMessage(from, { image: { url: `https://i.ibb.co/Yj9HmXK/c63d65d5b7f46028.jpg`  }, caption: `${pakaya}\n\n` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }
await storenumrepdata(jsonmsg)
	
} catch (e) {
console.log(e)
reply(e)
}
})


cmd({
    pattern: "prefix",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply("Owner only")
let gett = await get("PREFIX")
if(gett === q) return await reply("Allready Done")
await input("PREFIX", q)

await reply("*PREFIX updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
l(e)
}
})
