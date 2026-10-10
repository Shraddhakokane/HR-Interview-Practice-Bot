# HR Interview Practice Bot 💼🎙️

A modern, offline-ready, voice-enabled AI Mock Interviewer designed to help job candidates master behavioral interviews, structure answers using the **STAR method** (Situation, Task, Action, Result), eliminate filler words, and build communication confidence.

---

## 🌟 Key Features

1. **🎙️ Realistic Voice Interaction (STT & TTS)**:
   - **Spoken Questions**: Built-in voice synthesis speaks interview questions aloud naturally.
   - **Voice Input**: One-click Speech-to-Text via microphone so you can practice speaking your answers out loud just like a real interview.
   - **Audio Pulse & Waveforms**: Visual animated sound waves and avatar pulses when the interviewer speaks.

2. **⭐ Real-Time STAR Method Coaching**:
   - Live checklist indicators for **Situation**, **Task**, **Action**, and **Result** that illuminate as you speak or type.
   - Per-question scoring (0–100) based on STAR completeness, ownership verbs ("I" vs "we"), and delivery.

3. **📊 Rigorous Offline Evaluation Rubric (No API Key Required)**:
   - **Filler Word Detection**: Analyzes and flags filler sounds (`um`, `uh`, `like`, `basically`, `you know`) and calculates density %.
   - **Action Verb Analysis**: Recognizes proactive verbs (`spearheaded`, `engineered`, `streamlined`, `negotiated`, etc.).
   - **Length & Pacing Tracking**: Monitors optimal 90–150 second response duration.
   - **Follow-Up Suggestions**: Generates dynamic interviewer follow-ups when crucial components (like measurable results) are missing.
   - **Model Answer Benchmarks**: Shows high-impact reference answers for each question.

4. **🎯 Diverse Role Tracks & Experience Tiers**:
   - **Tracks**: Software Engineering, Product Management, Campus / Fresher HR, Sales & Marketing, Leadership / Management, and General HR.
   - **Levels**: Fresher (0–1y), Mid-Level (2–5y), Senior (5–8y), Lead/Director (8+y).
   - **Custom Role**: Enter any specific title you are targeting.

5. **📄 Resume & Job Description Personalization**:
   - Paste your Resume and Target Job Description.
   - Auto-extracts core technologies and skills to generate tailored interview questions specific to your background.

6. **👁️ Eye-Contact Practice Mode (Webcam)**:
   - Toggle optional webcam view with a subtle eye-level guide to practice posture and maintaining camera eye contact.

7. **📑 Comprehensive Final Scorecard & PDF Export**:
   - Overall hiring recommendation: *Strong Hire (Top Tier)*, *Hire (Solid Candidate)*, or *Needs Further Preparation*.
   - Question-by-question performance logs, strengths, and target areas.
   - Print or save directly to PDF with one click.

---

## 🚀 How to Launch and Use

### Quick Start:
- Simply double-click **`start.bat`** in this folder!
  - It starts a lightweight local server and opens `http://localhost:8080/` in your browser.
  - Localhost ensures your browser grants full microphone permissions for speech recognition.

### Alternative (Direct Open):
- Double-click **`index.html`** to open it directly in Google Chrome or Microsoft Edge.

---

## 💡 Top Tips for Behavioral Interviews

1. **Follow the STAR Framework**:
   - **S**ituation: Briefly describe the context, challenge, or problem (20% of time).
   - **T**ask: Clarify your role and what needed to be achieved (10% of time).
   - **A**ction: Detail what **YOU** personally did using active verbs (50% of time).
   - **R**esult: Highlight the measurable outcome, metrics, or lessons learned (20% of time).
2. **Beware the "We" Trap**:
   - Teamwork is great, but interviewers evaluate **you**. Say *"I organized the backlog and refactored the database schema..."* rather than *"we did it"*.
3. **Quantify Results**:
   - Include percentages, hours saved, dollars earned, or system latency cuts whenever possible.
4. **Pause Instead of Using Filler Words**:
   - Silence feels longer to you than to the interviewer. Take a breath rather than saying *"um"* or *"like"*.

---

## 📁 Project Structure

```
├── index.html       # Clean, responsive user interface (Tailwind CSS + FontAwesome)
├── styles.css       # Custom animations, avatar waves, mic glowing, print styling
├── questions.js     # Comprehensive question bank, STAR hints & model answers
├── engine.js        # Offline AI simulation & evaluation engine
├── speech.js        # Web Speech API controller (STT voice recognition & TTS voice)
├── app.js           # Session manager, webcam controller & scorecard generator
├── server.ps1       # Lightweight PowerShell HTTP server for localhost mic access
├── start.bat        # One-click Windows launcher
└── README.md        # Documentation and interview guide
```
