import { search, latest, detail } from 'komikcast-scraper'
import axios from "axios"
import PDFDocument from "pdfkit"
import { extractImageThumb } from "@adiwajshing/baileys"
const ch = /chapter(s)?/i
let handler = async(m, { conn, usedPrefix, command, text }) => {
    if (!text && !(/komikcast(latest|ongoing)|komikcast-latest/i.test(command))) return m.reply(`Masukan Text!\n\nContoh:\n${usedPrefix + command} Kage No Jitsuryokusha\n${usedPrefix + command} https://komikcast.site/komik/kage-no-jitsuryokusha-ni-naritakute/`)
    let isCh = ch.exec(text)
    if (/komikcastlatest|komikcast-latest|komikcastongoing/i.test(command)) {
        let res = await latest()
        let cap = res.data.map((v) => {
            return `
❏ *Title:* ${v.title}
▧ *Chapter:* ${v.ch}
▧ *Rating:* ${v.rating}
▧ *Link:* ${v.link}
`.trim()
        }).join('\n\n\n')
        m.reply(cap)
    } else if (/https:\/\/komikcast.site\/komik/i.test(text) && !isCh) {
        let res = await detail(text)
        let capp = res.list_chapter.map((v) => {
            return `
▧ *Chapter:* ${v.ch}
▧ *Release:* ${v.time_release}
▧ *Link:* ${v.link}
`.trim()
        }).join('\n\n')
        let cap = `
❏ *Title:* ${res.title}
▧ *Author:* ${res.author}
▧ *Rating:* ${res.rating}
▧ *Genre:* ${res.genres}
▧ *Status:* ${res.status}
▧ *Release:* ${res.released}
▧ *Type:* ${res.type}

▧ *Synopsis:* ${res.sinopsis}
`.trim()
        conn.sendFile(m.chat, res.image, res.title + '.jpeg', cap, m, false)
        await delay(1000)
        m.reply(capp)
    } else if (/https:\/\/komikcast.site\/komik/i.test(text) && isCh) {
        let res = await detail(text)
        let buffer = (await conn.getFile(res.images[0])).data
        let jpegThumbnail = await extractImageThumb(buffer)
        let imagepdf = await toPDF(res.images)
        await conn.sendMessage(m.chat, { document: imagepdf, jpegThumbnail, fileName: res.title + '.pdf', mimetype: 'application/pdf' }, { quoted: m })
    } else {
        let res = await search(text)
        let cap = res.data.map((v) => {
            return `
❏ *Title:* ${v.title}
▧ *Chapter:* ${v.chapter}
▧ *Rating:* ${v.rating}
▧ *Link:* ${v.link}
`.trim()
        }).join('\n\n\n')
        m.reply(cap)
    }
}
handler.help = ['komikcast <query/urls>', 'komikcast-latest']
handler.tags = ['anime']
handler.command = /^komikcast(latest|ongoing)?|komikcast-latest$/i
handler.limit = true
export default handler

async function toPDF(images, opt = {}) {
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(images)) images = [images]
            let buffs = [],
            doc = new PDFDocument({
                margin: 0, size: 'A4'
            })
            for (let x = 0; x < images.length; x++) {
                if (/.webp|.gif/.test(images[x])) continue
                let data = (await axios.get(images[x], {
                    responseType: 'arraybuffer', ...opt
                })).data
                doc.image(data, 0, 0, {
                    fit: [595.28, 841.89], align: 'center', valign: 'center'
                })
                if (images.length != x + 1) doc.addPage()
            }
            doc.on('data', (chunk) => buffs.push(chunk))
            doc.on('end', () => resolve(Buffer.concat(buffs)))
            doc.on('error', (err) => reject(err))
            doc.end()
        })
    }
    
const delay = time => new Promise(res => setTimeout(res, time))