// Globális változók
let currentLang = 'hu';
let selectedLocations = [];
let selectedWeather = [];

// Elem referenciák
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const themeToggleBtn = document.getElementById("themeToggle");
const appTitle = document.getElementById("appTitle");
const themeIcon = document.getElementById("themeIcon");

// Példa városok különböző típusokkal
const cities = [
  { name: 'Paris', country: 'France', countryCode: 'FR', types: ['city'], lat: 48.8566, lon: 2.3522 },
  { name: 'Barcelona', country: 'Spain', countryCode: 'ES', types: ['city', 'coastal'], lat: 41.3851, lon: 2.1734 },
  { name: 'Nice', country: 'France', countryCode: 'FR', types: ['coastal'], lat: 43.7102, lon: 7.2620 },
  { name: 'Innsbruck', country: 'Austria', countryCode: 'AT', types: ['mountain'], lat: 47.2692, lon: 11.4041 },
  { name: 'Rome', country: 'Italy', countryCode: 'IT', types: ['city'], lat: 41.9028, lon: 12.4964 },
  { name: 'Athens', country: 'Greece', countryCode: 'GR', types: ['city', 'coastal'], lat: 37.9838, lon: 23.7275 },
  { name: 'Dubrovnik', country: 'Croatia', countryCode: 'HR', types: ['coastal'], lat: 42.6507, lon: 18.0944 },
  { name: 'Zurich', country: 'Switzerland', countryCode: 'CH', types: ['city', 'mountain'], lat: 47.3769, lon: 8.5417 },
  { name: 'Vienna', country: 'Austria', countryCode: 'AT', types: ['city'], lat: 48.2082, lon: 16.3738 },
  { name: 'Venice', country: 'Italy', countryCode: 'IT', types: ['city', 'coastal'], lat: 45.4408, lon: 12.3155 },
  { name: 'Berlin', country: 'Germany', countryCode: 'DE', types: ['city'], lat: 52.5200, lon: 13.4050 },
  { name: 'Lisbon', country: 'Portugal', countryCode: 'PT', types: ['city', 'coastal'], lat: 38.7223, lon: -9.1393 },
  { name: 'Porto', country: 'Portugal', countryCode: 'PT', types: ['city', 'coastal'], lat: 41.1579, lon: -8.6291 },
  { name: 'Marseille', country: 'France', countryCode: 'FR', types: ['city', 'coastal'], lat: 43.2965, lon: 5.3698 },
  { name: 'Split', country: 'Croatia', countryCode: 'HR', types: ['coastal'], lat: 43.5081, lon: 16.4402 },
  { name: 'Geneva', country: 'Switzerland', countryCode: 'CH', types: ['city', 'coastal'], lat: 46.2044, lon: 6.1432 },
  { name: 'Reykjavik', country: 'Iceland', countryCode: 'IS', types: ['city', 'coastal'], lat: 64.1466, lon: -21.9426 },
  { name: 'Oslo', country: 'Norway', countryCode: 'NO', types: ['city', 'coastal'], lat: 59.9139, lon: 10.7522 },
  { name: 'Stockholm', country: 'Sweden', countryCode: 'SE', types: ['city', 'coastal'], lat: 59.3293, lon: 18.0686 },
  { name: 'Helsinki', country: 'Finland', countryCode: 'FI', types: ['city', 'coastal'], lat: 60.1699, lon: 24.9384 },
  { name: 'Bergen', country: 'Norway', countryCode: 'NO', types: ['coastal', 'mountain'], lat: 60.39299, lon: 5.32415 },
  { name: 'Granada', country: 'Spain', countryCode: 'ES', types: ['city', 'mountain'], lat: 37.1773, lon: -3.5986 },
  { name: 'Sofia', country: 'Bulgaria', countryCode: 'BG', types: ['city', 'mountain'], lat: 42.6977, lon: 23.3219 },
  { name: 'Málaga', country: 'Spain', countryCode: 'ES', types: ['city', 'coastal'], lat: 36.7213, lon: -4.4214 },
  { name: 'Naples', country: 'Italy', countryCode: 'IT', types: ['city', 'coastal'], lat: 40.8518, lon: 14.2681 },
  { name: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', types: ['city', 'mountain'], lat: 55.9533, lon: -3.1883 }
];

// Nyelvek
const translations = {
  hu: {
    title: "Utazás Tervező",
    minTemp: "Min hőmérséklet (°C):",
    maxTemp: "Max hőmérséklet (°C):",
    startDate: "Indulás dátuma:",
    endDate: "Érkezés dátuma:",
    locationTitle: "📍 Helyszín típusa:",
    weatherTitle: "☀️ Időjárási preferenciák:",
    city: "🏛️ Város",
    coastal: "🏖️ Tengerpart",
    mountain: "🏔️ Hegyek",
    sunny: "☀️ Napos",
    cloudy: "☁️ Felhős",
    rainy: "🌧️ Esős",
    snowy: "❄️ Havas",
    searchBtn: "Keresés",
    statusInvalid: "Adj meg érvényes hőmérséklet értékeket!",
    statusSearching: "Keresés folyamatban...",
    statusDone: "Találatok:",
    noResults: "Nincs találat a megadott kritériumokkal",
    current: "Aktuális",
    forecast: "Előrejelzés",
    temp: "Hőmérséklet",
    feelsLike: "Érzékelhető",
    humidity: "Páratartalom",
    wind: "Szél",
    clouds: "Felhőzet",
    description: "Leírás",
    capital: "Főváros",
    currency: "Valuta",
    countryInfo: "Ország információk"
  },

  en: {
    title: "Travel Planner",
    minTemp: "Min temperature (°C):",
    maxTemp: "Max temperature (°C):",
    startDate: "Departure date:",
    endDate: "Arrival date:",
    locationTitle: "📍 Location type:",
    weatherTitle: "☀️ Weather preferences:",
    city: "🏛️ City",
    coastal: "🏖️ Beach",
    mountain: "🏔️ Mountains",
    sunny: "☀️ Sunny",
    cloudy: "☁️ Cloudy",
    rainy: "🌧️ Rainy",
    snowy: "❄️ Snowy",
    searchBtn: "Search",
    statusInvalid: "Please enter valid temperature values!",
    statusSearching: "Searching...",
    statusDone: "Results:",
    noResults: "No results found with the given criteria",
    current: "Current",
    forecast: "Forecast",
    temp: "Temperature",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    clouds: "Clouds",
    description: "Description",
    capital: "Capital",
    currency: "Currency",
    countryInfo: "Country Info"
  }
};

// Country API Class
class CountryAPI {
  constructor() {
    this.baseUrl = 'https://restcountries.com/v3.1';
    this.cache = {}; // Cache az országadatokhoz
  }

  async getCountryInfo(countryCode) {
    // Ha már van cache-elve, visszaadjuk
    if (this.cache[countryCode]) {
      return this.cache[countryCode];
    }

    try {
      const url = `${this.baseUrl}/alpha/${countryCode}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const country = data[0];
      
      const countryInfo = {
        flag: country.flags.svg,
        flagEmoji: country.flag,
        capital: country.capital ? country.capital[0] : 'N/A',
        currencies: this.formatCurrencies(country.currencies),
        name: currentLang === 'hu' ? 
          (country.translations?.hun?.common || country.name.common) : 
          country.name.common
      };
      
      // Cache-eljük az eredményt
      this.cache[countryCode] = countryInfo;
      return countryInfo;
      
    } catch (error) {
      console.error('Országadat lekérési hiba:', error);
      return {
        flag: '',
        flagEmoji: '',
        capital: 'N/A',
        currencies: 'N/A',
        name: ''
      };
    }
  }

  formatCurrencies(currencies) {
    if (!currencies) return 'N/A';
    
    return Object.values(currencies)
      .map(curr => `${curr.name} (${curr.symbol || ''})`)
      .join(', ');
  }
}

// Weather API Class
class WeatherAPI {
  constructor() {
    this.apiKey = 'bea834a7d1e25181a610242cfe7682f9';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(lat, lon, cityName) {
    try {
      const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=${currentLang}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        city: cityName,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        clouds: data.clouds.all,
        windSpeed: data.wind.speed,
        main: data.weather[0].main.toLowerCase()
      };
    } catch (error) {
      console.error('Időjárás lekérési hiba:', error);
      return null;
    }
  }

  async getForecast(lat, lon) {
    try {
      const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=${currentLang}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const dailyData = {};
      
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString(currentLang === 'hu' ? 'hu-HU' : 'en-US');
        
        if (!dailyData[date]) {
          dailyData[date] = {
            temps: [],
            descriptions: [],
            icons: []
          };
        }
        
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].descriptions.push(item.weather[0].description);
        dailyData[date].icons.push(item.weather[0].icon);
      });

      return Object.keys(dailyData).slice(0, 5).map(date => ({
        date: date,
        avgTemp: Math.round(dailyData[date].temps.reduce((a, b) => a + b, 0) / dailyData[date].temps.length),
        minTemp: Math.round(Math.min(...dailyData[date].temps)),
        maxTemp: Math.round(Math.max(...dailyData[date].temps)),
        description: dailyData[date].descriptions[0],
        icon: dailyData[date].icons[0]
      }));
    } catch (error) {
      console.error('Előrejelzés lekérési hiba:', error);
      return [];
    }
  }
}

const weatherAPI = new WeatherAPI();
const countryAPI = new CountryAPI();

// Téma váltás (nap/hold)
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }
});

// Nyelvváltás zászlókkal
document.getElementById("flagHU").addEventListener("click", () => setLanguage("hu"));
document.getElementById("flagEN").addEventListener("click", () => setLanguage("en"));

function setLanguage(lang) {
  currentLang = lang; 
  const t = translations[lang];
  appTitle.textContent = t.title;
  document.querySelector('label[for="minTemp"]').textContent = t.minTemp;
  document.querySelector('label[for="maxTemp"]').textContent = t.maxTemp;
  document.querySelector('label[for="startDate"]').textContent = t.startDate;
  document.querySelector('label[for="endDate"]').textContent = t.endDate;
  document.getElementById("searchBtn").textContent = t.searchBtn;

  document.getElementById("locationTitle").textContent = t.locationTitle;
  document.getElementById("weatherTitle").textContent = t.weatherTitle;

  // Helyszín gombok
  document.querySelector('.location-btn[data-type="city"]').textContent = t.city;
  document.querySelector('.location-btn[data-type="coastal"]').textContent = t.coastal;
  document.querySelector('.location-btn[data-type="mountain"]').textContent = t.mountain;

  // Időjárás gombok
  document.querySelector('.weather-btn[data-type="sunny"]').textContent = t.sunny;
  document.querySelector('.weather-btn[data-type="cloudy"]').textContent = t.cloudy;
  document.querySelector('.weather-btn[data-type="rainy"]').textContent = t.rainy;
  document.querySelector('.weather-btn[data-type="snowy"]').textContent = t.snowy;
  
}

// Helyszín típus gombok
const locationBtns = document.querySelectorAll('.location-btn');

locationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const type = btn.dataset.type;
    
    if (selectedLocations.includes(type)) {
      selectedLocations = selectedLocations.filter(t => t !== type);
    } else {
      selectedLocations.push(type);
    }
    
    console.log("Kiválasztott helyek:", selectedLocations);
  });
});

// Időjárás típus gombok
const weatherBtns = document.querySelectorAll('.weather-btn');

weatherBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const type = btn.dataset.type;
    
    if (selectedWeather.includes(type)) {
      selectedWeather = selectedWeather.filter(t => t !== type);
    } else {
      selectedWeather.push(type);
    }
    
    console.log("Kiválasztott időjárás:", selectedWeather);
  });
});

// Info menü toggle
const infoToggle = document.getElementById("infoMenuToggle");
const infoMenu = document.getElementById("infoMenu");

infoToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  infoMenu.style.display = infoMenu.style.display === "block" ? "none" : "block";
});

// Menü bezárás amikor máshova kattintasz
document.addEventListener("click", (e) => {
  if (!infoMenu.contains(e.target) && !infoToggle.contains(e.target)) {
    infoMenu.style.display = "none";
  }
});

// Modal (Hogyan használd)
const howToModal = document.getElementById("howToModal");
const howToUseBtn = document.getElementById("howToUse");
const closeModalBtn = document.getElementById("closeModal");

howToUseBtn.addEventListener("click", () => {
  howToModal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  howToModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === howToModal) {
    howToModal.style.display = "none";
  }
});

// Időjárási preferencia ellenőrzés
function matchesWeatherPreference(weather, selectedWeather) {
  if (selectedWeather.length === 0) return true;
  
  const weatherMap = {
    sunny: ['clear'],
    cloudy: ['clouds'],
    rainy: ['rain', 'drizzle'],
    snowy: ['snow']
  };
  
  return selectedWeather.some(pref => {
    const keywords = weatherMap[pref] || [];
    return keywords.some(keyword => weather.main.includes(keyword));
  });
}

// Keresés indítása
async function startSearch() {
  const minTemp = parseFloat(document.getElementById("minTemp").value);
  const maxTemp = parseFloat(document.getElementById("maxTemp").value);
  const t = translations[currentLang];

  if (isNaN(minTemp) || isNaN(maxTemp)) {
    statusEl.textContent = t.statusInvalid;
    statusEl.className = 'error';
    return;
  }

  statusEl.textContent = t.statusSearching;
  statusEl.className = 'loading';
  resultsEl.innerHTML = '';
  document.getElementById('searchBtn').disabled = true;

  let matchingCities = cities;
  
  // Szűrés helyszín típus alapján
  if (selectedLocations.length > 0) {
    matchingCities = matchingCities.filter(city => 
      city.types.some(type => selectedLocations.includes(type))
    );
  }

  const results = [];
  
  for (const city of matchingCities) {
    const weather = await weatherAPI.getCurrentWeather(city.lat, city.lon, city.name);
    
    if (weather && 
        weather.temp >= minTemp && 
        weather.temp <= maxTemp &&
        matchesWeatherPreference(weather, selectedWeather)) {
      
      const forecast = await weatherAPI.getForecast(city.lat, city.lon);
      const countryInfo = await countryAPI.getCountryInfo(city.countryCode);
      results.push({ ...city, weather, forecast, countryInfo });
    }
  }

  document.getElementById('searchBtn').disabled = false;

  if (results.length === 0) {
    statusEl.textContent = t.noResults;
    statusEl.className = 'error';
    return;
  }

  statusEl.textContent = `${t.statusDone} ${results.length}`;
  statusEl.className = '';

  results.forEach(result => {
    // Időjárás GIF kiválasztása
    let weatherGif = '';
    if (result.weather.temp < 0) {
      weatherGif = 'Weather-snow.gif'; // Havas / hideg idő
    } else if (result.weather.clouds < 50) {
      weatherGif = 'Weather-sunny.gif'; // Napos
    } else {
      weatherGif = 'Weather-partly-cloudy.gif'; // Részben felhős / borult
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${weatherGif}" alt="Weather" class="bg-gif">
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; position: relative; z-index: 2;">
        <img src="${result.countryInfo.flag}" alt="${result.country} flag" style="width: 60px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        <div>
          <h3 style="margin: 0;">${result.name}, ${result.countryInfo.name || result.country}</h3>
          <div style="color: #007bff; font-size: 14px; margin-top: 5px;">
            <strong>${t.capital}:</strong> ${result.countryInfo.capital} | 
            <strong>${t.currency}:</strong> ${result.countryInfo.currencies}
          </div>
        </div>
      </div>
      
      <div class="weather-info">
        <div class="weather-item">
          <strong>${t.temp}:</strong>
          ${result.weather.temp}°C
        </div>
        <div class="weather-item">
          <strong>${t.feelsLike}:</strong>
          ${result.weather.feelsLike}°C
        </div>
        <div class="weather-item">
          <strong>${t.humidity}:</strong>
          ${result.weather.humidity}%
        </div>
        <div class="weather-item">
          <strong>${t.wind}:</strong>
          ${result.weather.windSpeed} m/s
        </div>
        <div class="weather-item">
          <strong>${t.clouds}:</strong>
          ${result.weather.clouds}%
        </div>
      </div>

      <p><strong>${t.description}:</strong> ${result.weather.description}</p>
      
      ${result.forecast.length > 0 ? `
        <h4>${t.forecast} (5 ${currentLang === 'hu' ? 'nap' : 'days'}):</h4>
        <div class="forecast-grid">
          ${result.forecast.map(day => `
            <div class="forecast-day">
              <strong>${day.date}</strong>
              <div>${day.minTemp}°C - ${day.maxTemp}°C</div>
              <div style="margin-top: 5px; font-size: 12px;">${day.description}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
    resultsEl.appendChild(card);
  });
}

// Gomb esemény
document.getElementById("searchBtn").addEventListener("click", startSearch);

// Dátum inicializálás
const today = new Date().toISOString().split('T')[0];
document.getElementById('startDate').value = today;
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
document.getElementById('endDate').value = nextWeek.toISOString().split('T')[0];