let handler = async (m, { conn, usedPrefix }) => {
	let donasi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *IM3* ${pay.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* Hub Owner
│ • *ɢᴏᴘᴀʏ* Hub Owner
│ • *ᴏᴠᴏ* Hub Owner
╰─────

_◛˖ ᴛᴇʀɪᴍᴀᴋᴀꜱɪʜ ᴜɴᴛᴜᴋ ʏᴀɴɢ ꜱᴜᴅᴀʜ ʙᴇʀᴅᴏɴᴀꜱɪ_`
await conn.sendFile(m.chat, pay.qris, 'qris.jpg', donasi, m)
}
handler.command = /^(donasi|dns)$/i
handler.tags = ['info']
handler.help = ['donasi']
export default handler