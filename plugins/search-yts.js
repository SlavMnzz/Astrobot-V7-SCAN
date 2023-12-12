import { youtube } from "@xct007/frieren-scraper"
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command, isPrems, isOwner }) => {
    conn.ytsearch = conn.ytsearch ? conn.ytsearch: {}
    if (/audio/i.test(args[0]) && !isNaN(args[1])) {
        let { download, data } = conn.ytsearch[m.sender]
        if (download) return m.reply("Kamu masih mendownload, silahkan tunggu...")
        conn.ytsearch[m.sender].download = true
        try {
            let caption = `*${decor.htki} Y T - P L A Y ${decor.htka}*

🎧 *Title:* ${data[args[1] - 1].title}
📤 *Published:* ${data[args[1] - 1].uploaded}
⏰ *Duration:* ${data[args[1] - 1].duration}
👁️ *Views:* ${data[args[1] - 1].views}

🔗 *Url:* ${data[args[1] - 1].url}

*L O A D I N G. . .*`
            conn.sendFile(m.chat, data[args[1] - 1].thumbnail, null, caption, m, null)
            let { audio: _audio, title } = await youtubedl(data[args[1] - 1].url).catch(async _ => await youtubedlv2(data[args[1] - 1].url))
            let limitedSize = (isPrems || isOwner ? 99: limit) * 1024
            let audio, source, res, link, lastError, isLimit
            for (let i in _audio) {
                try {
                    audio = _audio[i]
                    isLimit = limitedSize < audio.fileSize
                    if (isLimit) continue
                    link = await audio.download()
                    if (link) res = await fetch(link)
                    isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
                    if (isLimit) continue
                    if (res) source = await res.arrayBuffer()
                    if (source instanceof ArrayBuffer) break
                } catch (e) {
                    audio = link = source = null
                    lastError = e
                }
            }
            if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download video')
            conn.sendFile(m.chat, source, title + '.mp3', '', m, null, { mimetype: 'audio/mpeg' })
        } catch (e) {
            m.reply('Failed :(')
        } finally {
        conn.ytsearch[m.sender].download = false
        }
    } else if (/video/i.test(args[0])) {
        let { download, data } = conn.ytsearch[m.sender]
        if (download) return m.reply("Kamu masih mendownload, silahkan tunggu...")
        conn.ytsearch[m.sender].download = true
        try {
            let caption = `*${decor.htki} Y T - P L A Y ${decor.htka}*

🎧 *Title:* ${data[args[1] - 1].title}
📤 *Published:* ${data[args[1] - 1].uploaded}
⏰ *Duration:* ${data[args[1] - 1].duration}
👁️ *Views:* ${data[args[1] - 1].views}

🔗 *Url:* ${data[args[1] - 1].url}

*L O A D I N G. . .*`
            conn.sendFile(m.chat, data[args[1] - 1].thumbnail, null, caption, m, null)
            let { video: _video, title } = await youtubedl(data[args[1] - 1].url).catch(async _ => await youtubedlv2(data[args[1] - 1].url))
            let limitedSize = (isPrems || isOwner ? 99: limit) * 1024
            let video, source, res, link, lastError, isLimit
            for (let i in _video) {
                try {
                    video = _video[i]
                    isLimit = limitedSize < video.fileSize
                    if (isLimit) continue
                    link = await video.download()
                    if (link) res = await fetch(link)
                    isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
                    if (isLimit) continue
                    if (res) source = await res.arrayBuffer()
                    if (source instanceof ArrayBuffer) break
                } catch (e) {
                    video = source = link = null
                    lastError = e
                }
            }
            if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download video')
            conn.sendMessage(m.chat, { video: { url: link }, fileName: title + '.mp4', mimetype: 'video/mp4', caption: title }, { quoted: m })
        } catch (e) {
            m.reply('Failed :(')
        } finally {
        conn.ytsearch[m.sender].download = false
        }
    } else {
        let result = await youtube.search(args.join(' '))
        conn.ytsearch[m.sender] = {
            download: false,
            data: result
        }
        let caption = result.map((v, i) => {
            return `
*${i + 1}.* ${v.title}
⏱️ Duration: ${v.duration}
📤 Upload: ${v.uploaded}
👁 Views: ${v.views}
`.trim()
        }).filter(v => v).join('\n\n')
        m.reply(`_Cara Mendownload Video Ketik *${usedPrefix + command} video <number>* Dan Audio *${usedPrefix + command} audio <number>*_\n\n` + caption)
    }
}
handler.help = ['yts'].map(v => v + ' <search>')
handler.tags = ['search']
handler.command = /^yt(s|search)|youtubesearch$/i
handler.limit = true
export default handler