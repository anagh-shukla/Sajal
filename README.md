# 💻 Sajal — HackSetu 1.0 Project

This project was built during the **HackSetu 1.0 National Level Hackathon** enhanced with custom coding and UI components for a seamless experience.

---

## 🚀 Overview

Sajal (Smart Community Health Monitoring and Early Warning System) is a MedTech innovation that leverages IoT sensors, data analytics, and AI/ML to monitor water quality in rural areas and predict potential water-borne disease outbreaks before they occur.

The platform enables real-time data collection, visual insights, and early warnings to empower local health officials, ASHA workers, and communities. By integrating technology with rural healthcare, Sajal aims to reduce disease spread, enhance awareness, and improve public health resilience in underdeveloped regions.

---
## 🧠 Problem Statement
Rural communities in Northeast India face frequent outbreaks of water-borne diseases like cholera, typhoid, and dysentery due to unsafe drinking water, poor sanitation, and the absence of real-time monitoring systems.
Traditional health surveillance methods are reactive, causing delays in disease detection and response.

Sajal addresses this gap by building a proactive, data-driven early warning system that:

- Continuously monitors water quality using IoT sensors.

- Analyzes collected data with AI/ML algorithms to predict risks.

- Provides real-time alerts to health workers and authorities for quick action.

This ensures timely intervention, reduced healthcare costs, and healthier, more informed communities.

---
## 💡 Features


💧 Real-time Water Quality Monitoring — Tracks key water parameters (pH, turbidity, TDS, etc.) through IoT sensors.

📡 Smart Data Dashboard — Displays live sensor readings and trends for easy analysis by health officials and communities.

⚠️ AI-Driven Early Warning System — Uses predictive analytics to detect patterns and issue alerts for potential disease outbreaks.

🗺️ Geospatial Visualization — Maps water quality and health data across regions to identify high-risk zones.

📱 Responsive Web Interface — Built with Next.js and Tailwind CSS for seamless access across all devices.

🔔 Instant Notifications & Alerts — Notifies users and authorities when unsafe water conditions or anomalies are detected.

🧾 Community Health Insights — Provides summarized reports and visual analytics for local authorities and health workers.

🧠 Scalable & Modular Architecture — Designed to easily integrate new data sources, health metrics, and regional deployments.

---

## 🛠️ Tech Stack
| **Category**                    | **Technology / Library**                                     | **Purpose / Usage**                                                           |
| ------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| ⚛️ **Frontend Framework**       | **Next.js 14 (React)**                                       | Main framework for building dynamic, server-rendered UI and health dashboards |
| 🎨 **Styling**                  | **Tailwind CSS 4**, **Tailwind Merge**, **Tailwind Animate** | Modern, responsive UI with smooth animations and utility-first styling        |
| 🧩 **UI Components**            | **Radix UI** (`@radix-ui/react-*`)                           | Accessible and modular UI components for interactive interfaces               |
| 🖼️ **Icons**                   | **Lucide React**                                             | Clean, open-source icons for visuals and status indicators                    |
| 🧠 **Forms & Validation**       | **React Hook Form**, **Zod**, **@hookform/resolvers**        | Collecting and validating user or sensor input data                           |
| 📊 **Data Visualization**       | **Recharts**, **react-resizable-panels**                     | Interactive charts to visualize IoT-based water quality and health metrics    |
| 📅 **Time & Date Tools**        | **date-fns**, **react-day-picker**                           | Managing timestamps and logging sensor data chronologically                   |
| ⚡ **Backend / API Integration** | **Node.js**, **Firebase (Planned)**                          | Real-time database and backend API handling for IoT sensor communication      |
| 🤖 **AI / ML (Planned)**        | **Python APIs / Cloud ML Models**                            | Predictive analysis and early warning for water-borne diseases                |
| 🧭 **Themes**                   | **next-themes**                                              | Light/Dark mode support for better accessibility                              |
| 🔔 **Notifications & Alerts**   | **sonner**, **cmdk**, **vaul**                               | Real-time alerts, modals, and command palette for user actions                |
| 🧱 **Type Safety**              | **TypeScript**                                               | Strong typing and maintainable codebase for scalability                       |
| ⚙️ **Build Tools**              | **PostCSS**, **Autoprefixer**, **@tailwindcss/postcss**      | CSS optimization, browser compatibility, and build automation                 |
| ☁️ **Deployment**               | **Vercel**                                                   | Hosting and continuous deployment for the live web app                        |
| 🛰️ **IoT Integration**         | **Arduino**                                         | Real-time data from sensors (pH, turbidity, TDS) displayed on dashboards      |



---

## 🌍 Vision & Impact

**Vision**:
To build a future where every rural household has access to safe drinking water and timely health insights, empowering communities to take preventive actions before diseases spread.

**Impacts**:

🌱 Public Health Improvement: Reduce the occurrence of water-borne diseases through early detection and community awareness.

💧 Clean Water Access: Promote safe water practices by providing real-time quality data and visual alerts.

⚕️ Empowered Health Workers: Equip ASHA and rural health officers with actionable insights for faster medical responses.

🧠 Data-Driven Decision Making: Enable authorities and NGOs to identify risk zones and deploy resources efficiently.

♻️ Sustainability: Encourage low-cost, scalable IoT-based systems for long-term health and environmental resilience.

---

## ⚙️ Run Locally

To run this project on your system:

```bash
# Clone the repository
git clone https://github.com/anagh-shukla/Sajal.git

# Move into the project directory
cd Sajal

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser 🎯

---

## 🌐 Live Deployment

Our app is live and running!  
👉 **Visit now:** [https://sajal11.vercel.app/](https://sajal11.vercel.app/)
