"""
Flask backend for the developer portfolio.

Endpoints:
  GET  /api/health            -> simple health check
  GET  /api/profile           -> name, title, tagline, socials
  GET  /api/projects          -> list of project "repos"
  GET  /api/skills            -> grouped skill list
  POST /api/contact           -> accepts {name, email, message}, stores to contact.json

Run:
  cd backend
  python -m venv venv && source venv/bin/activate   (Windows: venv\\Scripts\\activate)
  pip install -r requirements.txt
  python app.py
  -> serves on http://localhost:5000
"""
import json
import os
import re
from datetime import datetime, timezone

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow the Vite dev server (localhost:5173) to call this API

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
CONTACT_FILE = os.path.join(DATA_DIR, "contact_messages.json")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(CONTACT_FILE):
    with open(CONTACT_FILE, "w") as f:
        json.dump([], f)


# ---------------------------------------------------------------------------
# Static-ish content. In a real app this would live in a database — kept as
# plain Python here so it's trivial to edit without touching the frontend.
# ---------------------------------------------------------------------------

PROFILE = {
    "name": "Tejas Vinod Sontakke",
    "title": "Full-Stack Software Developer",
    "tagline": "I build fast, accessible web apps — from the database to the pixel.",
    "location": "Nagpur, India",
    "email": "sontakketejas5@gmail.com",
    "socials": {
        "github": "https://github.com/TejasS-5",
        "linkedin": "https://www.linkedin.com/in/tejas-sontakke-775306423?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        "twitter": "https://x.com/TejasS1100",
    },
    "availability": "Open to new opportunities",
}

PROJECTS = [
    {
        "id": "proj-1",
        "name": "Todo App",
        "description": "It is a todo app where we can add todo thing",
        "stack": ["Javascript","Html","CSS","React"],
        "stars": 128,
        "status": "active",
        "url": "https://github.com/TejasS-5/TODO-APP",
    },
    {
        "id": "proj-2",
        "name": "Social Media",
        "description": "This is an social media project using an advance REACT",
        "stack": ["Javascript","Html","CSS","React"],
        "stars": 64,
        "status": "active",
        "url": "https://github.com/TejasS-5/Social-Media",
    }
    # {
    #     "id": "proj-3",
    #     "name": "component-kit",
    #     "description": "An accessible, themeable React component library used across three internal products.",
    #     "stack": ["React", "TypeScript", "Vite", "Storybook"],
    #     "stars": 212,
    #     "status": "active",
    #     "url": "https://github.com/yourname/component-kit",
    # },
    # {
    #     "id": "proj-4",
    #     "name": "cli-task-runner",
    #     "description": "A tiny, dependency-free task runner for Node scripts with a watch mode and colored diffing.",
    #     "stack": ["Node.js", "TypeScript"],
    #     "stars": 37,
    #     "status": "archived",
    #     "url": "https://github.com/yourname/cli-task-runner",
    # },
]

SKILLS = [
    {"group": "Languages", "items": ["Python", "JavaScript", "TypeScript", "SQL"]},
    {"group": "Frontend", "items": ["React", "Vite", "Tailwind CSS", "Framer Motion"]},
    {"group": "Backend", "items": ["Flask","SQLLITE"]},
    {"group": "Tooling", "items": ["Git", "GitHub", "Linux"]},
]


@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "time": datetime.now(timezone.utc).isoformat()})


@app.route("/api/profile")
def profile():
    return jsonify(PROFILE)


@app.route("/api/projects")
def projects():
    return jsonify(PROJECTS)


@app.route("/api/skills")
def skills():
    return jsonify(SKILLS)


@app.route("/api/contact", methods=["POST"])
def contact():
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    message = (payload.get("message") or "").strip()

    errors = {}
    if not name:
        errors["name"] = "Name is required."
    if not email or not EMAIL_RE.match(email):
        errors["email"] = "A valid email is required."
    if not message or len(message) < 10:
        errors["message"] = "Message should be at least 10 characters."

    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    with open(CONTACT_FILE, "r+") as f:
        entries = json.load(f)
        entries.append(
            {
                "name": name,
                "email": email,
                "message": message,
                "received_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        f.seek(0)
        json.dump(entries, f, indent=2)
        f.truncate()

    return jsonify({"ok": True, "message": "Thanks — I'll get back to you soon."})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
