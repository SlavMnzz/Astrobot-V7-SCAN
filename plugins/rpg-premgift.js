let handler = async(m, { conn, args, usedPrefix }) => {

    if (args.length == 0) return conn.reply(m.chat, `Harap masukan Kode Redeem Kamu!`, m)
    if (args[0] == 'OshdnpGaka' || args[0] == 'PagpqvUac' || args[0] == '91hakHcwo' || args[0] == 'A820bdoqP') {

    if (new Date - global.db.data.users[m.sender].lastgift > 86400000) {
       conn.reply(m.chat, '*🎉 SELAMAT!*\nKamu telah mendapatkan\n100000 XP ✨\n 100 Limit! 🎫\n1000000 Money 💹\n1000000 Tabungan 💳\n100 Gold 🪙\n2 PetFood 🍖\n50 Legendary 🧰\n1 Pet Robo 🤖', m)
    global.db.data.users[m.sender].exp += 100000
    global.db.data.users[m.sender].limit += 100
    global.db.data.users[m.sender].money +=1000000
    global.db.data.users[m.sender].gold += 100
    global.db.data.users[m.sender].legendary += 50
    global.db.data.users[m.sender].atm += 1000000
    global.db.data.users[m.sender].robo += 1
    global.db.data.users[m.sender].petFood += 2
    global.db.data.users[m.sender].lastclaim = new Date * 1
} else conn.reply(m.chat, '[❗] Kode Redeem hanya dapat digunakan sekali setelah redeem !\n\nSilahkan tunggu Kode Redeem Selanjutnya dari *Owner*', m)
   } else {
        conn.reply(m.chat, `*「 KODE REDEEM TIDAK VALID 」*\n\nSilahkan cek kembali kode yang kamu masukkan/kode sudah expired !\n\nInformasi Kode Redeem hanya dari Owner`, m)
    }
}
handler.premium = true

handler.help = ['redeem <kode>']
handler.tags = ['rpg']
handler.command = /^(redeem|redem|redemkode)$/i

export default handler 