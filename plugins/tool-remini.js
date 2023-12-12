import uploadImage from '../lib/uploadImage.js'
import { remini } from '../lib/scrape.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana? Reply gambar yg gk ada button aja'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
  m.reply(wait)
  let img = await q.download?.()
  let url = await uploadImage(img)
  let out = await remini(url, apikey.getRandom())
  let caption = `Ini Dia Hasilnya Kak`
  await conn.sendFile(m.chat, out, 'error.jpg', caption, m)
}
handler.help = ['remini']
handler.tags = ['tools', 'premium']
handler.command = /^(remini)$/i
handler.premium = false
export default handler

const apikey = [
    'oaZp-zV0VMNTxYELToxe7aQspByRJpmVxJhxAiQw_OKUkgSo',
    'bmJB_fAJ9Uuzh8lqEtjgEHTwr6z85fWEJ-K0uqZNUI6IoJfd',
    'lUz8jWHLweeAj7XXniqweBsYDswKhjvPW_w_LickU5RroORI',
    'u6zIDxv7GXgjpM4obQ9lcW0aHxobu0EkqOtJsDEAsFBrgza7',
    'Ct6OQUdR6mARMYqRefeXRrqt_IofGDZKzKlabNfgu1bhGYA8'
]