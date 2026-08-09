# 🌾 KrishiSetu AI — Multilingual Agriculture Marketplace & Precision Agronomy Platform

[![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**KrishiSetu AI** is a state-of-the-art, production-grade digital agriculture platform designed to empower smallholder farmers by eliminating middleman commissions, providing collective crop pooling for bulk bargaining power, delivering real-time APMC Mandi rates with AI price forecasts, facilitating local farm machinery buying and renting, offering AI leaf disease diagnostics, and guiding farmers through government welfare schemes in regional native languages.

---

## 🚀 Key Platform Features

### 1. 📈 Live APMC Mandi Rate Tracker & AI Price Predictor
* **Real-Time Market Rates**: Live market price ticker across APMC mandis in Punjab, Haryana, Maharashtra, Gujarat, UP, and Rajasthan.
* **Direct Buyer Rate Comparison**: Shows direct buyer offers alongside local APMC mandi benchmarks to highlight middleman-free profit premiums.
* **7-Day SVG Price Sparklines**: Interactive trend charts for each crop variety (Wheat, Basmati Rice, Tomatoes, Onions, Cotton, Potatoes, Mustard).
* **AI Signal Forecasts**: Actionable recommendations (`HOLD HARVEST ⏳`, `SELL DIRECT NOW 🚀`, `JOIN KISAN POOL 🌾`) with AI model confidence scores and market reasoning popups.

### 2. 🤝 Collective Crop Pooling Engine (Kisan Bulk Sanchay)
* **Bargaining Power Multiplication**: Small farmers can combine yields (e.g. Farmer A has 100 kg + Farmer B has 200 kg = 300 kg pool) to fulfill bulk wholesale contracts.
* **Unlocks Premium Wholesale Rates**: Unlocks **+18% to +25% price surcharges** from verified corporate buyers (e.g. Adani Wilmar, BigBasket Wholesale, Vardhman Textiles).
* **Interactive Profit Calculator**: Drag a quantity slider to see instant payout comparison (*Single Mandi Sale vs. Pooled Bulk Sale*).
* **Pool Creation Workflow**: Farmers can create new district pools or join existing active pools in 1-click.

### 3. 🛍️ Direct Farm-to-Consumer Produce Marketplace
* **Direct Harvest Listings**: Browse and purchase organic Sharbati Wheat, Alphonso Mangoes, Basmati Paddy, and Fresh Tomatoes directly from verified farmers.
* **Farmer Verification & Distance Metrics**: View farmer name, verification badges, organic certifications, and exact distance radius in kilometers.
* **List Produce Tool with AI Price Engine**: Farmers can list their crops with photos, harvest notes, and instant **AI-suggested asking prices**.

### 4. 🚜 Local Agri-Equipment Marketplace (Buy & Rent)
* **Buy & Rent Catalog**: Tractors (Mahindra 45 HP), Drone Sprayers (16L GPS AI Drones), Rotavators, Solar Water Pumps, and Drip Irrigation Kits.
* **Interactive Area Radius Filter (5 km to 50 km)**: Find nearest machinery suppliers to minimize transportation costs.
* **Driver / Operator Included Badges**: Shows rental rates per day/hour along with operator availability.

### 5. 🔬 AI Crop Disease Doctor & Agronomy Scanner
* **Leaf Disease Diagnostic Tool**: Upload leaf photos or select sample symptoms (*Tomato Early Blight, Paddy Blast, Wheat Yellow Rust*).
* **Severity Gauge Meter**: Measures disease risk score (0-100%) and accuracy confidence (up to 96%).
* **Biological Remediation & Direct Spray Links**: Recommends organic treatments and provides direct purchase links for bio-fungicides and sprays.

### 6. 🌤️ Micro-Climate 7-Day Weather Radar & Agronomy Alerts
* **Micro-Climate Tracking**: Real-time temperature, humidity, rain probability, wind speed, UV index, and Air Quality Index (AQI).
* **AI Agronomist Action Alerts**: Proactive advice such as *"Postpone pesticide spraying due to 65% rain probability tomorrow afternoon"*.

### 7. 📜 Government Welfare Schemes & Subsidy Hub
* **Scheme Directory**: PM-KISAN Samman Nidhi, PM Fasal Bima Yojana (PMFBY), Kisan Credit Card (KCC), and Sub-Mission on Agricultural Mechanization (SMAM).
* **Interactive Subsidy Eligibility Calculator**: Enter farm size in acres and crop type to calculate exact annual financial benefits.

### 8. 🌐 Multilingual Voice & Text AI Assistant
* **Native Regional Languages**: Full UI translation across **English**, **Hindi (हिंदी)**, **Punjabi (ਪੰਜਾਬੀ)**, **Marathi (मराठी)**, and **Tamil (தமிழ்)**.
* **Floating Voice AI Widget**: Mic-enabled assistant that answers voice queries regarding Mandi rates, weather advice, or crop diseases.

---

## 🛠️ Architecture & Tech Stack

```
agriculture_marketplace/
├── src/
│   ├── components/           # Core UI Components & Screens
│   │   ├── Navbar.jsx        # Responsive header, live ticker, language & cart controls
│   │   ├── Hero.jsx          # Hero section with quick action shortcuts
│   │   ├── MandiTracker.jsx  # APMC rates table, 7-day SVG charts & AI forecast modal
│   │   ├── CollectivePooling.jsx # Kisan bulk pooling engine & profit calculator
│   │   ├── DirectMarketplace.jsx # Produce catalog, organic badges & list produce modal
│   │   ├── EquipmentStore.jsx    # Buy/Rent farm machinery with radius slider
│   │   ├── AiCropDoctor.jsx      # Leaf disease scanner & bio-spray store
│   │   ├── GovSchemes.jsx        # Schemes directory & subsidy calculator
│   │   ├── WeatherAdvisory.jsx   # 7-day weather cards & AI agronomy alerts
│   │   ├── AiVoiceAssistant.jsx  # Floating multilingual voice assistant
│   │   ├── CartModal.jsx         # Direct seller inquiry & order checkout
│   │   └── Footer.jsx            # Platform links, Kisan helpline & copyright
│   ├── context/
│   │   ├── LanguageContext.jsx   # i18n language provider
│   │   └── MarketContext.jsx     # Global marketplace state & cart manager
│   ├── data/                 # Datasets & APMC benchmark models
│   ├── translations/         # 8-Language translation dictionary (i18n.js)
│   ├── App.jsx               # Tab router & toast notification manager
│   ├── index.css             # Tailwind CSS & global glassmorphic styles
│   └── main.jsx              # Entry point
```

- **Frontend**: React 18, Vite 5
- **Styling**: Tailwind CSS v3, Glassmorphism, CSS Marquee & Keyframes
- **Icons**: Lucide React
- **State Management**: React Context API

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ekjot9105-commits/Krishisetu.git
   cd Krishisetu
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔗 Repository Information

- **GitHub Repository**: [https://github.com/ekjot9105-commits/Krishisetu.git](https://github.com/ekjot9105-commits/Krishisetu.git)
- **License**: MIT License
