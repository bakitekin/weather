// HTML'den gerekli input ve button elemanlarını seçme
const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

// Button'a tıklandığında çalışacak olan olay dinleyicisi ekleniyor
btn.addEventListener("click", () => {
  // Input alanındaki şehir adını al
  const cityName = cityInput.value;
  // Alınan şehir adıyla hava durumu verilerini getir
  getData(cityName)
});

// Hava durumu verilerini getiren fonksiyon
function getData(name) {
  // OpenWeatherMap API anahtarı
  const API = "5257f217a944773dfa95ce2305d28fb8";
  // API için temel URL
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`;

  // API'ye istek gönderme
  fetch(baseURL)
    .then(responsive => responsive.json()) // JSON formatına dönüştürme
    .then(data => {
      // Gerekli bilgileri çıkarma
      const {
        name,
        sys: {
          country
        },
        main: {
          temp,
          feels_like,
          humidity
        },
        weather: [{
          description
        }],
        wind: {
          speed
        }
      } = data;

      // HTML içinde ilgili elemanları seçme
      const city = document.querySelector(".city");
      const temperature = document.querySelector(".temp");
      const hum = document.querySelector(".humidity");
      const wind = document.querySelector(".wind");
      const weatherDesc = document.querySelector(".weather");
      const feeling = document.querySelector(".feeling");

      // Hava durumu bilgilerini ilgili HTML elemanlarına yerleştirme
      city.textContent = `${name}, ${country}`;
      temperature.innerHTML = `${temp.toFixed(0)}°`;
      hum.textContent = `Nem: %${humidity}`;
      wind.innerHTML = `Rüzgar: ${speed} km/s`;
      weatherDesc.innerHTML = `<i>${description.toUpperCase()}</i>`;
      feeling.textContent = `Hissedilen: ${feels_like}`;
    })

    .catch(err => console.error("Lütfen Bir il veya Ülke Adı Giriniz")); // Hata durumunda konsola hata mesajı yazdırma

  // Input alanını temizleme ve tekrar odaklanma
  cityInput.value = "";
  cityInput.focus();
}