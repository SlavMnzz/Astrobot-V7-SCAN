let handler = async (m, { conn }) => {
conn.reply(m.chat, `nyari sc bnh?
Script Ori : https://youtube.com/@JosuaftVynaa

Script yang gw pake 
(hasil recode dikit sama fix all fitur error)
`, m)
}
handler.help = ['sc']
handler.tags = ['info']
handler.command = /^(sc|script)$/i

export default handler 
