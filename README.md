# Portfolio — React + Flask

A modern, full-stack developer portfolio built with **React** and **Flask**. The portfolio features a unique **code editor-inspired interface**, where visitors navigate through sections as if browsing source files. It combines a responsive React frontend with a RESTful Flask backend to showcase projects, skills, and contact information.

---

## ✨ Features

* 💻 Code editor-inspired UI with file tabs
* ⌨️ Animated terminal-style hero section
* 📌 Fixed line-number gutter that updates while scrolling
* 🎨 Smooth animations powered by Framer Motion
* 📱 Fully responsive design
* 📂 Dynamic project and skills data served from a Flask REST API
* 📧 Contact form with backend validation and message storage

---

## 🛠 Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* JavaScript (ES6+)

### Backend

* Flask
* Flask REST API
* Flask-CORS
* Python

### Data Storage

* JSON (development)
* Easily upgradeable to SQLite or PostgreSQL

---

## 📁 Project Structure

```text
portfolio/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── data/
│       └── contact_messages.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Nav.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LineGutter.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

---

## ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment:

Linux/macOS

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend will run at:

```text
http://localhost:5000
```

---

#Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:5173


---

## 🔗 API Endpoints

| Method | Endpoint        | Description                           |
| ------ | --------------- | ------------------------------------- |
| GET    | `/api/profile`  | Returns profile information           |
| GET    | `/api/projects` | Returns portfolio projects            |
| GET    | `/api/skills`   | Returns categorized skills            |
| POST   | `/api/contact`  | Validates and stores contact messages |

---

##Contact Form

The contact form sends data to the Flask backend where it is:

* Validated
* Processed
* Stored in:

```text
backend/data/contact_messages.json
```

During development, Vite automatically proxies all `/api/*` requests to the Flask server, eliminating the need for CORS configuration.

---

## 🎨 Customization

Personalize the portfolio by editing the following:

### Update Profile Information

```text
backend/app.py
```

Modify:

* PROFILE
* PROJECTS
* SKILLS

---

### Change Theme Colors

Edit:

```text
frontend/tailwind.config.js
```

Customize:

* Accent color
* Fonts
* Theme extensions

---

### Add New Sections

Create a new Flask API endpoint and corresponding React component.

Examples:

* Resume
* Blog
* Experience
* Certifications
* Testimonials

---

## 🌐 Production Deployment

### Frontend

Build the React application:

```bash
cd frontend
npm run build
```

Deploy the generated `dist` folder to:

* Vercel
* Netlify

---

### Backend

Deploy the Flask API to:

* Render
* Railway

For production, update your frontend API calls to use the deployed backend URL instead of the Vite development proxy.

---

## 🔮 Future Improvements

* Authentication
* Admin Dashboard
* Blog Management
* Project CMS
* PostgreSQL Integration
* Docker Support
* GitHub API Integration
* Dark / Light Theme Toggle
* Resume Download
* Visitor Analytics

---

## 📄 License

This project is available for learning, personal use, and portfolio inspiration.
