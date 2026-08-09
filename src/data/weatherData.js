export const weatherData = {
  current: {
    location: 'Ludhiana, Punjab',
    temp: '31°C',
    condition: 'Partly Cloudy',
    humidity: '72%',
    windSpeed: '12 km/h',
    rainProbability: '65%',
    uvIndex: '6 High',
    airQuality: 'Satisfactory (AQI 58)'
  },
  aiAgronomyAdvice: [
    {
      id: 'a1',
      type: 'WARNING',
      cropTarget: 'Paddy / Rice',
      title: 'Rain Alert: Postpone Chemical Spray',
      message: 'Scattered rainfall (65% chance) expected tomorrow afternoon. Postpone pesticide/fertilizer spraying until Friday morning to prevent wash-off.'
    },
    {
      id: 'a2',
      type: 'TIP',
      cropTarget: 'Cotton',
      title: 'High Humidity Pest Advisory',
      message: '72% humidity creates favorable conditions for Pink Bollworm. Inspect undersides of leaves early morning.'
    }
  ],
  forecast7Days: [
    { day: 'Today (Sun)', tempMax: '32°C', tempMin: '24°C', rain: '20%', icon: 'cloud-sun' },
    { day: 'Mon', tempMax: '29°C', tempMin: '23°C', rain: '65%', icon: 'cloud-rain' },
    { day: 'Tue', tempMax: '30°C', tempMin: '22°C', rain: '40%', icon: 'cloud-drizzle' },
    { day: 'Wed', tempMax: '33°C', tempMin: '25°C', rain: '10%', icon: 'sun' },
    { day: 'Thu', tempMax: '34°C', tempMin: '26°C', rain: '0%', icon: 'sun' },
    { day: 'Fri', tempMax: '32°C', tempMin: '24°C', rain: '15%', icon: 'cloud-sun' },
    { day: 'Sat', tempMax: '31°C', tempMin: '23°C', rain: '30%', icon: 'cloud' }
  ]
};
