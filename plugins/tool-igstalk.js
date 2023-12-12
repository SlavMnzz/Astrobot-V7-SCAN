import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example\n${usedPrefix + command} ryhar.store`
  let result = await fetch(API('lol', '/api/stalkig/' + text, null, 'apikey'))
  let res = await result.json()
  if (!res) throw res.text
  let caption = `👤 *Name:* ${res.result.fullname}
📝 *Username:* ${res.result.username}
💌 *Followers:* ${res.result.followers}
❤️ *Following:* ${res.result.following}
📷 *Posts:* ${res.result.posts} 
${res.result.bio ? `
📑 *Bio:*
${res.result.bio}` : ''}
`.trim()
await conn.sendFile(m.chat, res.result.photo_profile, 'instagram.jpeg', caption , m)
}
handler.help = ['stalkig']
handler.tags = ['tools']
handler.command = /^(stalkig)$/i
export default handler
