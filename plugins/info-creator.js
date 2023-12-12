function handler(m) {
  
  const kontak = {
	"displayName": 'nomer private',
	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:nomer private\nitem1.TEL;waid=-:-\nitem1.X-ABLabel:\nneed no own?cht pribadi bot + kasih tau alasan !\nURL;Email Owner:-\nORG:no spam\nEND:VCARD`
}

conn.sendMessage(m.chat, { contacts: { contacts: [kontak] }}, { quoted: m })
  
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler