# Portfolio — React + Flask

A full-stack developer portfolio. The design leans into the "code editor"
metaphor: navigation is a row of file tabs (`about.tsx`, `projects.json`,
`skills.yml`, `contact.sh`), the hero types out a boot sequence, and a
fixed line-number gutter runs down the left edge and ticks as you scroll.

- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion + lucide-react
- **Backend**: Flask REST API (profile, projects, skills, contact form)

## Project structure

```
portfolio/
  backend/
    app.py              # Flask API
    requirements.txt
  frontend/
    src/
      components/       # Nav, Hero, About, Projects, Skills, Contact, Footer, LineGutter
      App.jsx
      main.jsx
      index.css
    index.html
    package.json
    tailwind.config.js
    vite.config.js
```

## Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The API runs on `http://localhost:5000`. It exposes:

- `GET /api/profile` — name, title, tagline, socials
- `GET /api/projects` — your project/repo list
- `GET /api/skills` — grouped skills
- `POST /api/contact` — `{ name, email, message }`, validated and saved to
  `backend/data/contact_messages.json`

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite is configured to proxy `/api/*` to
`http://localhost:5000`, so the frontend and backend talk to each other
with no CORS setup needed in dev.

## Making it yours

1. Edit `PROFILE`, `PROJECTS`, and `SKILLS` in `backend/app.py` — that's
   the only place content lives.
2. Swap the accent color (`cobalt`) and fonts in `frontend/tailwind.config.js`
   if you want a different palette.
3. Add a resume download or blog section by adding a new Flask route and a
   matching tab in `Nav.jsx`.
4. For production, run `npm run build` in `frontend/` and serve the built
   `dist/` folder from Flask (or a static host), pointing API calls at your
   deployed backend URL instead of the Vite proxy.
