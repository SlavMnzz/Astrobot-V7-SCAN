import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Masukan Username!*\n\n*Contoh:*\n*${usedPrefix + command} unknown_401212*`
  let url = await axios.get(API('lol', '/api/stalktiktok/' + text, null, 'apikey'))
  let caption = `👤 *Name:* ${url.data.result.nickname}
📝 *Username:* ${url.data.result.username}
💌 *Followers:* ${url.data.result.followers}
👥 *Following:* ${url.data.result.followings}
❤ *Like:* ${url.data.result.likes}
🎥 *Video:* ${url.data.result.video}

📑 *Bio:*
${url.data.result.description ? url.data.result.description : 'Tidak Ada Bio'}
`.trim()
await conn.sendFile(m.chat, url.data.result.user_picture, 'tiktokjpg.jpg', caption, m)
}
handler.help = ['tiktokstalk']
handler.tags = ['tools']
handler.command = /^(stalktiktok|stalktt|tiktokstalk|ttstalk)$/i

export default handler