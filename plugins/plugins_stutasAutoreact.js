const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on("creds.update", saveCreds);
    
    // Message Receive Event
    sock.ev.on("messages.upsert", async (m) => {
        const message = m.messages[0];
        if (!message.message || message.key.fromMe) return;

        const sender = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;
        
        // Status Reaction Command
        if (text && text.startsWith("!react")) {
            const emoji = text.split(" ")[1] || "💥"; // Default reaction 💥
            const statusJid = sender.replace("@s.whatsapp.net", "@broadcast");

            try {
                await sock.sendMessage(statusJid, {
                    react: {
                        text: emoji,
                        key: message.key
                    }
                });
                console.log(`Reaction '${emoji}' sent to status`);
            } catch (error) {
                console.error("Error sending reaction:", error);
            }
        }
    });
}

startBot();
