const mineflayer = require('mineflayer');
const http = require('http'); // Railway için eklendi

// Railway'in botu "çalışmıyor" sanıp kapatmasını engellemek için mini sunucu
http.createServer((req, res) => {
  res.write("Vatso 7/24 Aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const replikler = [
  "is yakıyorum sonra gel", "hayranım cok ya", "bos yapma isine bak", "yine mi cok yakısıklıyım",
  "vaktim yok baska kapıya", "okumadım bile cok bos", "kalite farkı kanka normal", "havalıyım ugrasamam",
  "klavyeyi bırak uzaklas", "kapasiten yetmez yorulma", "ismim agzına yakısmıyor", "karizma geldi yine",
  "görmezden geliyorum", "popülerim yapacak bir sey yok", "burdan sana ekmek cıkmaz", "tip var ama konusma bozuyor",
  "altımda kalırsın ugrasma", "bu sunucunun kralı benim", "ne anlatıyon be sarmadı", "islem tamam hadi uza",
  "efendim canım buralardayım", "su an mesgulüm sonra gel", "islerim var kanka", "ismin tanıdık ama cıkaramadım",
  "popülerlik gercekten zor", "sunucuda takılıyorum öyle", "birazdan dönerim yogunum", "vaktim kısıtlı kusura bakma",
  "isler gücler ugrasıyoruz", "biraz blok kazayım gelirim", "vaktim degerli buralardayım", "islem tamam iyi oyunlar",
  "seslenmene gerek yok burdayım", "chat cok hızlı yetisemiyorum", "yine mi ben hayırdır", "selam sonra konusalım",
  "su an baska isle ugrasıyorum", "geldim ne vardı", "islerim cok yogun", "sunucunun havasını soluyorum",
  "eyvallah kanka sagolasın", "herkes vatso diyor hayırdır", "vaktim olunca dönerim", "su an baska yerlerdeyim",
  "karizma buralarda merak etme", "bloklarla aram iyi su an", "sıranı bekle kanka gelicem", "yine ne oldu acaba",
  "selamlar keyifler nasıl","kumru benim manita","Bekle bi çok konuştun","hm","Onların doları varsa bizim ALLAHIMIZ var","ekmek dağıtmıyoruz hadi bekletme", "ben gelince chat canlanıyor", "isimiz gücümüz var kanka", "herkes beni merak ediyor"
];

function createBot() {
  const bot = mineflayer.createBot({
    host: 'oyna.exovia.fun',
    username: 'Vatso',
    version: '1.20.1',
  });

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  bot.once('spawn', async () => {
    console.log('🚀 Vatso bağlandı. Giriş prosedürü başladı...');
    await wait(3000);
    bot.chat('/login 313131');
    await wait(2000);
    bot.setQuickBarSlot(4);
    await wait(1500);
    bot.activateItem(); 
  });

  bot.on('windowOpen', async (window) => {
    await wait(2000);
    try {
      await bot.clickWindow(14, 0, 0);
      console.log('✅ Skyblock Giriş Yapıldı.');
    } catch (err) {}
  });

  bot.on('message', (jsonMsg) => {
    const plainMsg = jsonMsg.toString();
    if (plainMsg.startsWith(bot.username) || plainMsg.length < 3) return;

    const kucukMesaj = plainMsg.toLowerCase();

    if (/\bsa\b/i.test(kucukMesaj) || /\bsea\b/i.test(kucukMesaj)) {
      setTimeout(() => bot.chat('as'), 1000);
    }

    if (kucukMesaj.includes('vatso')) {
      let gonderen = "kanka";
      if (plainMsg.includes(':')) {
        gonderen = plainMsg.split(':')[0].trim().split(/\s+/).pop();
      } else if (plainMsg.includes('»')) {
        gonderen = plainMsg.split('»')[0].trim().split(/\s+/).pop();
      }
      gonderen = gonderen.replace(/[^a-zA-Z0-9_]/g, '');
      if (!gonderen || gonderen.length > 16) gonderen = "kanka";

      const replik = replikler[Math.floor(Math.random() * replikler.length)];
      setTimeout(() => {
        bot.chat(`${gonderen} ${replik}`);
      }, 1500);
    }
  });

  setInterval(() => {
    const entity = bot.nearestEntity((e) => e.type === 'player');
    if (entity && bot.entity.position.distanceTo(entity.position) <= 4) {
      bot.lookAt(entity.position.offset(0, entity.height, 0));
    }
  }, 200);

  bot.on('kicked', (reason) => {
    console.log(`⚠️ Atıldı: ${reason}. 5sn sonra tekrar bağlanıyor...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log(`❌ Hata: ${err.message}`);
    setTimeout(createBot, 5000);
  });
}

createBot();