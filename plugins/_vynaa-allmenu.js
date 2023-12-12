import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
let tags = {
  'main': '𝗠𝗮𝗶𝗻 𝗠𝗲𝗻𝘂',
  'game': '𝗚𝗮𝗺𝗲 𝗠𝗲𝗻𝘂',
  'rpg': '𝗥𝗣𝗚 𝗠𝗲𝗻𝘂',
  'xp': '𝗘𝘅𝗽 & 𝗟𝗶𝗺𝗶𝘁',
  'sticker': '𝗦𝘁𝗶𝗰𝗸𝗲𝗿 𝗠𝗲𝗻𝘂',
  'kerang': '𝗞𝗲𝗿𝗮𝗻𝗴 𝗔𝗷𝗮𝗶𝗯',
  'quotes': '𝗤𝗼𝘂𝘁𝗲𝘀 𝗠𝗲𝗻𝘂',
  'fun': '𝗙𝘂𝗻 𝗠𝗲𝗻𝘂',
  'anime': '𝗔𝗻𝗶𝗺𝗲 𝗠𝗲𝗻𝘂',
  'adminry': '𝗔𝗱𝗺𝗶𝗻 𝗠𝗲𝗻𝘂',
  'group': '𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂',
  'store': '𝗦𝘁𝗼𝗿𝗲',
  'vote': '𝗩𝗼𝘁𝗶𝗻𝗴',
  'absen': '𝗔𝗯𝘀𝗲𝗻',
  'premium': '𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗠𝗲𝗻𝘂',
  'nsfw': '𝗡𝗦𝗙𝗪',
  'anonymous': '𝗔𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗖𝗵𝗮𝘁',
  'internet': '𝗜𝗻𝘁𝗲𝗿𝗻𝗲𝘁 𝗠𝗲𝗻𝘂',
  'genshin': '𝗚𝗲𝗻𝘀𝗵𝗶𝗻 𝗠𝗲𝗻𝘂',
  'news': '𝗡𝗲𝘄𝘀 𝗠𝗲𝗻𝘂',
  'downloader': '𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 ',
  'search': '𝗦𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗠𝗲𝗻𝘂',
  'tools': '𝗧𝗼𝗼𝗹𝘀 𝗠𝗲𝗻𝘂',
  'primbon': '𝗣𝗿𝗶𝗺𝗯𝗼𝗻',
  'nulis': '𝗠𝗮𝗴𝗲𝗿 𝗡𝘂𝗹𝗶𝘀',
  'audio': '𝗔𝘂𝗱𝗶𝗼 𝗘𝗳𝗳𝗲𝗰𝘁',
  'maker': '𝗠𝗮𝗸𝗲𝗿 𝗠𝗲𝗻𝘂',
  'database': '𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲',
  'quran': '𝗔𝗹-𝗤𝘂𝗿𝗮𝗻 𝗠𝗲𝗻𝘂',
  'owner': '𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂', 
  'info': '𝗜𝗻𝗳𝗼 𝗠𝗲𝗻𝘂',
  'random': '𝗥𝗮𝗻𝗱𝗼𝗺',
  'sound': '𝗦𝗼𝘂𝗻𝗱 𝗠𝗲𝗻𝘂',
}
const defaultMenu = {
  before: `
┌ ◦ ɪɴғᴏ ᴜsᴇʀ
│ ◦ ɴᴀᴍᴀ: %name
│ ◦ ɴᴏᴍᴏʀ: %tag
│ ◦ sᴛᴀᴛᴜs: %prem
│ ◦ ʟɪᴍɪᴛ: %limit
│ ◦ ʀᴏʟᴇ: %role
└ ◦ ʟᴇᴠᴇʟ: %level
  
┌ ◦ ɪɴғᴏ ʙᴏᴛ
│ ◦ ʙᴏᴛɴᴀᴍᴇ: %name
│ ◦ *ᴘʟᴀᴛғᴏʀᴍ: ᴡɪɴᴅᴏᴡs
│ ◦ ᴏs ᴛʏᴘᴇ: ᴡɪɴᴅᴏᴡs
│ ◦ ʙᴀɪʟᴇʏs: ᴀᴅɪᴡᴀᴊsʜɪɴɢ
└ ◦ ʀᴜɴɴɪɴɢ: ᴠᴘs - ᴘᴀɴᴇʟ
  
*ɪ ɴ ғ ᴏ ʀ ᴍ ᴀ ᴛ ɪ ᴏ ɴ*
🅟 *ғɪᴛᴜʀ ᴋʜᴜsᴜs ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ*
🅛 *ғɪᴛᴜʀ ɢʀᴀᴛɪs ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ʟɪᴍɪᴛ*

–––––– *ᴀ ʟ ʟ ᴍ ᴇ ɴ ᴜ* ––––––
%readmore
`.trimStart(),
  header: '┌ ◦ %category ',
  body: '│ ◦ %cmd',
  footer: '└ ◦ ᴀ s ᴛ ʀ ᴏ - ᴍᴅ\n\n',
}
let handler = async (m, { conn, usedPrefix, __dirname }) => {
  try {
    //conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let tag = `@${m.sender.split('@')[0]}`
    let image = elainajpg.getRandom()
    let user = global.db.data.users[m.sender]
    let limit = user.premiumTime >= 1 ? 'Unlimited' : user.limit
    let name = `${user.registered ? user.name : conn.getName(m.sender)}`
    let status = `${m.sender.split`@`[0] == info.nomorown ? 'Developer' : user.premiumTime >= 1 ? 'Premium User' : user.level >= 1000 ? 'Elite User' : 'Free User'}`
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🅛' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: usedPrefix, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, tag, status, wib, 
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.sendMessage(m.chat, {
document: fs.readFileSync("./package.json"),
fileName: wish(),
mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
fileLength: 999,
pageCount: 100,
caption: text,
contextInfo: {
externalAdReply: {
title: "𝑨𝒔𝒕𝒓𝒐𝑩𝒐𝒕𝒛-𝑴𝒅",
body: '© 𝑿𝒎𝒂𝒏𝒏𝒙𝒚𝒛.𝑫𝒆𝒗',
thumbnail: fs.readFileSync('./media/thumbnail.jpg'),
sourceUrl: "https://taplink.cc/xmannxyz.dev",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
    /*await conn.adReply(m.chat, text.trim(), wish() + ' ' + name, '', fs.readFileSync('./media/thumbnail.jpg'), link.web, m)*/
          let vn = "./vn/yowaimo.mp3"
      
	conn.sendFile(m.chat, vn, "ehee.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
  } catch (e) {
    throw e
  }
}
handler.help = ['allmenu']
handler.tags = ['main']
handler.command = /^(allmenu|all)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function wish() {
    let wishloc = ''
  const time = moment.tz('Asia/Jakarta').format('HH')
  wishloc = ('Hi')
  if (time >= 0) {
    wishloc = ('Selamat Malam')
  }
  if (time >= 4) {
    wishloc = ('Selamat Pagi')
  }
  if (time >= 11) {
    wishloc = ('Selamat Siang')
  }
  if (time >= 15) {
    wishloc = ('️Selamat Sore')
  }
  if (time >= 18) {
  	wishloc = ('Selamat Malam')
  }
  if (time >= 23) {
    wishloc = ('Selamat Malam')
  }
  return wishloc
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}