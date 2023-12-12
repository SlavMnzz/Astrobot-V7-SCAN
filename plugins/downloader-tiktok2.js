import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya Mana?`
m.reply(wait)
try {
  let res = await fetch(`https://api.xyroinee.xyz/api/downloader/tiktok?url=${text}&apikey=vOlPqGyT9E`)
  let json = await res.json()
  let cap = `*Username:* ${json.data.username}\n*Description:* ${json.data.description}
`
  conn.sendMessage(m.chat, { video: { url: json.data.video_HD }, caption: cap }, { quoted: m })
  conn.sendMessage(m.chat, { audio: { url: json.data.audio }, mimetype: 'audio/mp4' }, { quoted : m })
  } catch (e) {
  m.reply(`Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan`)
  }
  }
handler.help = ['tiktok2']
handler.tags = ['downloader']
handler.command = /^(tiktok2|tt2|ttdl2|tiktokd2l)$/i
handler.limit = true

export default handler