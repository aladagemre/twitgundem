# TwitGündem

TwitGündem, gündeme dair günlük belirlenecek bir konuda Twitter kullanıcılarının yorum bırakabileceği bir sistemdir. Ekşisözlük'ün günlük versiyonu diyebiliriz.
Teknoloji olarak Node.JS, Express Framework, Easy Node Authentication (Passport) kullanılmıştır.

TwitGundem is a platform where users can express their opinions on a topic defined daily, based on the current events. Users can login via Twitter.
Node.JS, Express Framework, Easy Node Authentication (Passport) is used for this project.

## Demo

![Anasayfa](img/anasayfa.png?raw=true "Anasayfa")
![Konu](img/konu.png?raw=true "Konu")
![Admin](img/admin.png?raw=true "Admin")

## Kurulum

1. Repoyu çekin.
2. `npm install` diyerek bağımlılıkları kurun.
3. `config/database.js` dosyasında gerekli veritabanı bilgilerini girin.
4. `config/auth.js` dosyasında gerekli API anahtarlarını girin ya da ortam değişkeni (env) olarak bu bilgileri tanımlayın.
5. `node server.js` diyerek sistemi çalıştırın.
6. `http://localhost:8080` adresine gidin, sonucu görün.

Opsiyonel: base-10-2.html'de Google Ads ayarlanabilir. newrelic.js'de new relic ayarları yapılabilir.

## Instructions

If you would like to download the code and try it for yourself:

1. Clone the repo
2. Install packages: `npm install`
3. Change out the database configuration in config/database.js
4. Change out auth keys in config/auth.js or define them as environment variables.
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:8080`

Optional: base-10-2.html contains Google ads code that can be adjusted. newrelic.js can be configured as well.

