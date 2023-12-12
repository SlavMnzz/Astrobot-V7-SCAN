import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
	let payi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *ᴛʜʀᴇᴇ* ${pay.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ
│ • *ɢᴏᴘᴀʏ* ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ
│ • *ᴏᴠᴏ* ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ
╰─────

◛˖ _*ᴊɪᴋᴀ ꜱᴜᴅᴀʜ ᴍᴇᴍʙᴀʏᴀʀ*_\n_*ꜱɪʟᴀʜᴋᴀɴ ᴋɪʀɪᴍ ʙᴜᴋᴛɪ ᴘᴇᴍʙᴀʏᴀʀᴀɴ ᴋᴇ ᴏᴡɴᴇʀ ʙᴏᴛ...*_`
await conn.sendFile(m.chat, fs.readFileSync('./media/qris.jpg'), 'qris.jpg', payi, m)
}
handler.command = /^(pay|payment|bayar)$/i
handler.tags = ['info']
handler.help = ['payment']
export default handler
