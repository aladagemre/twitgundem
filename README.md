# TwitGündem

TwitGündem, gündeme dair günlük belirlenecek bir konuda Twitter kullanıcılarının yorum bırakabileceği bir sistemdir. Ekşisözlük'ün günlük versiyonu diyebiliriz.
Teknoloji olarak Node.JS, Express Framework, Easy Node Authentication (Passport) kullanılmıştır.

TwitGundem is a platform where users can express their opinions on a topic defined daily, based on the current events. Users can login via Twitter.
Node.JS, Express Framework, Easy Node Authentication (Passport) is used for this project.

## Ekran Görüntüleri (Screenshots)

### Anasayfa
![Anasayfa](img/anasayfa.png?raw=true "Anasayfa")

### Konu Detay

![Konu](img/konu.png?raw=true "Konu")

### Admin

![Admin](img/admin.png?raw=true "Admin")

## Kurulum

1. Repoyu çekin.
2. `npm install` diyerek bağımlılıkları kurun.
3. `config/database.js` dosyasında gerekli veritabanı bilgilerini girin.
4. `config/auth.js` dosyasında gerekli API anahtarlarını girin ya da ortam değişkeni (env) olarak bu bilgileri tanımlayın.
5. `node server.js` diyerek sistemi çalıştırın.
6. `http://localhost:3000` adresine gidin, sonucu görün.


## Docker

    docker build -t aladagemre/twitgundem .
    docker run -p 3000:3000 --env APP_URL=http://mysite.com:3000 --env TWITTER_API_KEY=xxx --env TWITTER_API_SECRET=xxx aladagemre/twitgundem

## Admin Panel

server.js dosyasında, 'aladagemre' yi kendi twitter adınızla değiştirin.
    
    app.set('admin_user', 'aladagemre');

Sonra şu göreceli adrese gidin: "/admin/topic_list"

## Instructions

If you would like to download the code and try it for yourself:

1. Clone the repo
2. Install packages: `npm install`
3. Change out the database configuration in config/database.js
4. Change out auth keys in config/auth.js or define them as environment variables.
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:3000`


    
    
