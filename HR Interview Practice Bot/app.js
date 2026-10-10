// HR Interview Practice Bot - Main Application Controller

class InterviewApp {
  constructor() {
    this.session = {
      role: "general_hr",
      customRoleTitle: "",
      experienceLevel: "mid",
      sessionLength: 5,
      resumeText: "",
      jobDescription: "",
      questions: [],
      currentIndex: 0,
      responses: [],
      startTime: null,
      questionStartTime: null,
      timerInterval: null,
      cameraStream: null
    };

    this.speech = speechManager;
    this.engine = hrEngine;

    this.initElements();
    this.attachEventListeners();
    this.initInterviewerPulse();
  }

  initElements() {
    // Screens
    this.setupScreen = document.getElementById("setupScreen");
    this.interviewScreen = document.getElementById("interviewScreen");
    this.scorecardScreen = document.getElementById("scorecardScreen");

    // Setup Inputs
    this.roleSelect = document.getElementById("roleSelect");
    this.customRoleContainer = document.getElementById("customRoleContainer");
    this.customRoleInput = document.getElementById("customRoleInput");
    this.experienceSelect = document.getElementById("experienceSelect");
    this.lengthSelect = document.getElementById("lengthSelect");
    this.resumeInput = document.getElementById("resumeInput");
    this.jdInput = document.getElementById("jdInput");
    this.detectedKeywordsBadge = document.getElementById("detectedKeywordsBadge");
    this.btnStartInterview = document.getElementById("btnStartInterview");

    // Interview Room
    this.interviewerAvatar = document.getElementById("interviewerAvatar");
    this.interviewerSoundWave = document.getElementById("interviewerSoundWave");
    this.interviewerStatus = document.getElementById("interviewerStatus");
    this.questionCategory = document.getElementById("questionCategory");
    this.questionProgress = document.getElementById("questionProgress");
    this.questionText = document.getElementById("questionText");
    this.btnReplayQuestion = document.getElementById("btnReplayQuestion");
    this.btnMuteVoice = document.getElementById("btnMuteVoice");

    // Answer Controls
    this.answerInput = document.getElementById("answerInput");
    this.btnVoiceRecord = document.getElementById("btnVoiceRecord");
    this.micIcon = document.getElementById("micIcon");
    this.micLabel = document.getElementById("micLabel");
    this.wordCountBadge = document.getElementById("wordCountBadge");
    this.timerBadge = document.getElementById("timerBadge");
    this.btnSubmitAnswer = document.getElementById("btnSubmitAnswer");
    this.btnGetHint = document.getElementById("btnGetHint");
    this.hintBox = document.getElementById("hintBox");
    this.hintText = document.getElementById("hintText");

    // Live STAR indicators
    this.pillS = document.getElementById("pillS");
    this.pillT = document.getElementById("pillT");
    this.pillA = document.getElementById("pillA");
    this.pillR = document.getElementById("pillR");

    // Webcam
    this.btnToggleCamera = document.getElementById("btnToggleCamera");
    this.webcamWrapper = document.getElementById("webcamWrapper");
    this.webcamVideo = document.getElementById("webcamVideo");

    // Feedback Modal
    this.feedbackModal = document.getElementById("feedbackModal");
    this.modalScoreBadge = document.getElementById("modalScoreBadge");
    this.modalTierBadge = document.getElementById("modalTierBadge");
    this.modalStarStatus = document.getElementById("modalStarStatus");
    this.modalFillerStatus = document.getElementById("modalFillerStatus");
    this.modalStrengthsList = document.getElementById("modalStrengthsList");
    this.modalImprovementsList = document.getElementById("modalImprovementsList");
    this.modalModelAnswer = document.getElementById("modalModelAnswer");
    this.followUpContainer = document.getElementById("followUpContainer");
    this.followUpText = document.getElementById("followUpText");
    this.btnNextQuestion = document.getElementById("btnNextQuestion");
    this.btnRetryQuestion = document.getElementById("btnRetryQuestion");

    // Scorecard Elements
    this.scorecardRoleTitle = document.getElementById("scorecardRoleTitle");
    this.overallScoreVal = document.getElementById("overallScoreVal");
    this.hiringDecisionBadge = document.getElementById("hiringDecisionBadge");
    this.metricStarRate = document.getElementById("metricStarRate");
    this.metricFillerRate = document.getElementById("metricFillerRate");
    this.metricAvgWords = document.getElementById("metricAvgWords");
    this.metricTotalTime = document.getElementById("metricTotalTime");
    this.scorecardQuestionsList = document.getElementById("scorecardQuestionsList");
    this.btnRestart = document.getElementById("btnRestart");
    this.btnPrintScorecard = document.getElementById("btnPrintScorecard");
  }

  attachEventListeners() {
    // Role selection changes
    this.roleSelect.addEventListener("change", (e) => {
      if (e.target.value === "custom") {
        this.customRoleContainer.classList.remove("hidden");
      } else {
        this.customRoleContainer.classList.add("hidden");
      }
    });

    // Resume / JD keyword scanning on typing
    const scanInputs = () => this.updateDetectedKeywordsPreview();
    this.resumeInput.addEventListener("input", scanInputs);
    this.jdInput.addEventListener("input", scanInputs);

    // Start Interview
    this.btnStartInterview.addEventListener("click", () => this.startInterviewSession());

    // Replay & Mute
    this.btnReplayQuestion.addEventListener("click", () => this.speakCurrentQuestion());
    this.btnMuteVoice.addEventListener("click", () => {
      const isMuted = this.speech.toggleMute();
      this.btnMuteVoice.innerHTML = isMuted 
        ? '<i class="fa-solid fa-volume-xmark mr-1"></i> Unmute Voice' 
        : '<i class="fa-solid fa-volume-high mr-1"></i> Voice Enabled';
      this.btnMuteVoice.classList.toggle("text-red-500", isMuted);
    });

    // Voice Recording
    this.btnVoiceRecord.addEventListener("click", () => this.toggleSpeechInput());

    // Real-time text input checking for STAR and word count
    this.answerInput.addEventListener("input", () => {
      this.updateLiveAnswerMetrics();
    });

    // Hint Toggle
    this.btnGetHint.addEventListener("click", () => {
      this.hintBox.classList.toggle("hidden");
    });

    // Camera Toggle
    this.btnToggleCamera.addEventListener("click", () => this.toggleWebcam());

    // Submit Answer
    this.btnSubmitAnswer.addEventListener("click", () => this.handleSubmitAnswer());

    // Modal navigation
    this.btnNextQuestion.addEventListener("click", () => {
      this.feedbackModal.classList.add("hidden");
      this.advanceToNextQuestion();
    });

    this.btnRetryQuestion.addEventListener("click", () => {
      this.feedbackModal.classList.add("hidden");
      this.retryCurrentQuestion();
    });

    // Restart & Print
    this.btnRestart.addEventListener("click", () => this.resetToSetup());
    this.btnPrintScorecard.addEventListener("click", () => window.print());
  }

  initInterviewerPulse() {
    this.speech.speakingStateCallback = (isSpeaking) => {
      if (isSpeaking) {
        this.interviewerAvatar.classList.add("speaking");
        this.interviewerSoundWave.classList.add("active");
        this.interviewerStatus.innerText = "Interviewer is speaking...";
        this.interviewerStatus.className = "text-xs font-medium text-indigo-600 animate-pulse";
      } else {
        this.interviewerAvatar.classList.remove("speaking");
        this.interviewerSoundWave.classList.remove("active");
        this.interviewerStatus.innerText = "Listening to you";
        this.interviewerStatus.className = "text-xs font-medium text-slate-500";
      }
    };
  }

  // --- Resume & JD Live Keyword Preview ---
  updateDetectedKeywordsPreview() {
    const text = (this.resumeInput.value + " " + this.jdInput.value).trim();
    if (!text) {
      this.detectedKeywordsBadge.innerHTML = '<span class="text-xs text-slate-400">Paste your resume or job description above to auto-detect target keywords.</span>';
      return;
    }

    const keywords = this.engine.extractKeywords(text);
    if (keywords.length === 0) {
      this.detectedKeywordsBadge.innerHTML = '<span class="text-xs text-slate-400">Scanning keywords...</span>';
      return;
    }

    this.detectedKeywordsBadge.innerHTML = keywords.slice(0, 8).map(kw => 
      `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">${kw}</span>`
    ).join(" ");
  }

  // --- Start Interview Session ---
  startInterviewSession() {
    const roleKey = this.roleSelect.value;
    const expLevel = this.experienceSelect.value;
    const sessionLength = parseInt(this.lengthSelect.value, 10);
    const resume = this.resumeInput.value.trim();
    const jd = this.jdInput.value.trim();

    this.session.role = roleKey;
    this.session.customRoleTitle = this.customRoleInput.value.trim();
    this.session.experienceLevel = expLevel;
    this.session.sessionLength = sessionLength;
    this.session.resumeText = resume;
    this.session.jobDescription = jd;
    this.session.currentIndex = 0;
    this.session.responses = [];
    this.session.startTime = Date.now();

    // Prepare questions pool
    let basePool = [];
    if (roleKey === "custom" || !QUESTION_BANK[roleKey]) {
      basePool = [...QUESTION_BANK.general_hr];
    } else {
      basePool = [...QUESTION_BANK[roleKey]];
      // Add general HR questions for variety
      if (basePool.length < sessionLength) {
        basePool = basePool.concat(QUESTION_BANK.general_hr);
      }
    }

    // Generate custom questions from resume & JD
    const customTailored = this.engine.generateCustomQuestions(resume, jd);
    let sessionQuestions = [];

    // Interleave tailored questions if present
    if (customTailored.length > 0) {
      sessionQuestions.push(QUESTION_BANK.general_hr[0]); // Always start with "Tell me about yourself"
      sessionQuestions.push(customTailored[0]);
      if (customTailored[1] && sessionLength >= 5) {
        sessionQuestions.push(customTailored[1]);
      }
    }

    // Fill remaining from base pool
    for (const q of basePool) {
      if (sessionQuestions.length >= sessionLength) break;
      if (!sessionQuestions.some(existing => existing.id === q.id)) {
        sessionQuestions.push(q);
      }
    }

    // Fallback if needed
    if (sessionQuestions.length < sessionLength) {
      for (const q of QUESTION_BANK.general_hr) {
        if (sessionQuestions.length >= sessionLength) break;
        if (!sessionQuestions.some(existing => existing.id === q.id)) {
          sessionQuestions.push(q);
        }
      }
    }

    this.session.questions = sessionQuestions;

    // Switch views
    this.setupScreen.classList.add("hidden");
    this.scorecardScreen.classList.add("hidden");
    this.interviewScreen.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Load first question
    this.loadQuestion(0);
  }

  // --- Load and Display Question ---
  loadQuestion(index) {
    this.session.currentIndex = index;
    const q = this.session.questions[index];

    this.questionProgress.innerText = `Question ${index + 1} of ${this.session.questions.length}`;
    this.questionCategory.innerText = q.category || "Behavioral HR";
    this.questionText.innerText = q.question;

    // Hint text
    this.hintText.innerText = q.starHint || "Structure your answer with Situation, Task, Action, and measurable Result.";
    this.hintBox.classList.add("hidden");

    // Reset answer input & metrics
    this.answerInput.value = "";
    this.updateLiveAnswerMetrics();

    // Start timer for this question
    this.startQuestionTimer();

    // Automatically speak question
    setTimeout(() => {
      this.speakCurrentQuestion();
    }, 400);
  }

  speakCurrentQuestion() {
    const q = this.session.questions[this.session.currentIndex];
    if (q) {
      this.speech.speak(q.question);
    }
  }

  startQuestionTimer() {
    clearInterval(this.session.timerInterval);
    this.session.questionStartTime = Date.now();
    this.timerBadge.innerText = "00:00";
    this.timerBadge.className = "text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700";

    this.session.timerInterval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - this.session.questionStartTime) / 1000);
      const mins = String(Math.floor(elapsedSec / 60)).padStart(2, "0");
      const secs = String(elapsedSec % 60).padStart(2, "0");
      this.timerBadge.innerText = `${mins}:${secs}`;

      // Color coding based on interview sweet-spot (60s to 150s)
      if (elapsedSec > 180) {
        this.timerBadge.className = "text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 animate-pulse";
      } else if (elapsedSec >= 60 && elapsedSec <= 150) {
        this.timerBadge.className = "text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700";
      } else if (elapsedSec > 150) {
        this.timerBadge.className = "text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700";
      }
    }, 1000);
  }

  // --- Voice Input (STT) ---
  toggleSpeechInput() {
    const isNowListening = this.speech.toggleListening(
      (finalText, interimText) => {
        // Append final transcript to textarea
        if (finalText) {
          const current = this.answerInput.value.trim();
          this.answerInput.value = current ? `${current} ${finalText}` : finalText;
          this.updateLiveAnswerMetrics();
        }
      },
      (isListening) => {
        if (isListening) {
          this.btnVoiceRecord.classList.remove("bg-rose-50", "text-rose-600", "border-rose-200");
          this.btnVoiceRecord.classList.add("bg-rose-600", "text-white", "border-rose-600", "mic-recording");
          this.micLabel.innerText = "Listening (Click to Stop)";
        } else {
          this.btnVoiceRecord.classList.remove("bg-rose-600", "text-white", "border-rose-600", "mic-recording");
          this.btnVoiceRecord.classList.add("bg-rose-50", "text-rose-600", "border-rose-200");
          this.micLabel.innerText = "Voice Answer (Mic)";
        }
      }
    );
  }

  // --- Live Metrics & STAR Pills ---
  updateLiveAnswerMetrics() {
    const text = this.answerInput.value.trim();
    const words = text ? text.split(/\s+/).filter(w => w.length > 0) : [];
    const count = words.length;

    this.wordCountBadge.innerText = `${count} words`;

    // Live STAR Detection
    const star = this.engine.analyzeSTAR(text.toLowerCase());
    this.updatePill(this.pillS, star.situation);
    this.updatePill(this.pillT, star.task);
    this.updatePill(this.pillA, star.action);
    this.updatePill(this.pillR, star.result);
  }

  updatePill(element, isPresent) {
    if (isPresent) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }

  // --- Webcam Practice Toggle ---
  async toggleWebcam() {
    if (this.session.cameraStream) {
      // Turn off
      this.session.cameraStream.getTracks().forEach(track => track.stop());
      this.session.cameraStream = null;
      this.webcamWrapper.classList.add("hidden");
      this.btnToggleCamera.innerHTML = '<i class="fa-solid fa-video mr-1"></i> Practice Eye Contact';
      this.btnToggleCamera.classList.remove("bg-emerald-50", "text-emerald-700", "border-emerald-300");
    } else {
      // Turn on
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        this.session.cameraStream = stream;
        this.webcamVideo.srcObject = stream;
        this.webcamWrapper.classList.remove("hidden");
        this.btnToggleCamera.innerHTML = '<i class="fa-solid fa-video-slash mr-1"></i> Hide Camera';
        this.btnToggleCamera.classList.add("bg-emerald-50", "text-emerald-700", "border-emerald-300");
      } catch (err) {
        console.warn("Camera access error:", err);
        alert("Camera access denied or unavailable. You can still practice without video!");
      }
    }
  }

  // --- Answer Submission & Analysis ---
  handleSubmitAnswer() {
    const text = this.answerInput.value.trim();
    if (text.length < 10) {
      alert("Please provide a more detailed response before submitting (or speak into the mic).");
      return;
    }

    // Stop recording if active
    this.speech.stopListening();
    clearInterval(this.session.timerInterval);

    const timeTaken = Math.max(15, Math.floor((Date.now() - this.session.questionStartTime) / 1000));
    const currentQ = this.session.questions[this.session.currentIndex];

    // Evaluate answer through AI Engine
    const evaluation = this.engine.evaluateAnswer(text, currentQ, timeTaken);

    // Save response to history
    this.session.responses[this.session.currentIndex] = {
      question: currentQ,
      answer: text,
      evaluation: evaluation
    };

    // Show feedback modal
    this.displayFeedbackModal(evaluation, currentQ);
  }

  displayFeedbackModal(evalData, questionData) {
    this.modalScoreBadge.innerText = `${evalData.totalScore}/100`;
    this.modalTierBadge.innerText = evalData.ratingTier;
    this.modalTierBadge.className = `px-3 py-1 rounded-full text-xs font-semibold border ${evalData.badgeColor}`;

    // STAR Checklist
    const star = evalData.starAnalysis;
    this.modalStarStatus.innerHTML = `
      <div class="grid grid-cols-4 gap-2 text-center text-xs">
        <div class="p-2 rounded-lg ${star.situation ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}">
          ${star.situation ? '✓ Situation' : '✗ Situation'}
        </div>
        <div class="p-2 rounded-lg ${star.task ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}">
          ${star.task ? '✓ Task' : '✗ Task'}
        </div>
        <div class="p-2 rounded-lg ${star.action ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}">
          ${star.action ? '✓ Action' : '✗ Action'}
        </div>
        <div class="p-2 rounded-lg ${star.result ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200' : 'bg-rose-50 text-rose-700 font-semibold border border-rose-200'}">
          ${star.result ? '✓ Result' : '✗ Result'}
        </div>
      </div>
    `;

    // Filler word summary
    if (evalData.fillerCount > 0) {
      const fillersList = evalData.detectedFillers.map(f => `"${f.word}" (${f.count}x)`).join(", ");
      this.modalFillerStatus.innerHTML = `<span class="text-amber-700 font-medium">${evalData.fillerCount} filler words detected (${evalData.fillerPercentage}% density):</span> ${fillersList}.`;
    } else {
      this.modalFillerStatus.innerHTML = `<span class="text-emerald-700 font-medium">Spotless delivery: Zero filler words detected!</span>`;
    }

    // Strengths
    this.modalStrengthsList.innerHTML = evalData.strengths.map(s => 
      `<li class="flex items-start text-xs text-slate-700"><i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 mr-2"></i><span>${s}</span></li>`
    ).join("");

    // Improvements
    this.modalImprovementsList.innerHTML = evalData.improvements.length > 0
      ? evalData.improvements.map(imp => 
          `<li class="flex items-start text-xs text-slate-700"><i class="fa-solid fa-lightbulb text-amber-500 mt-0.5 mr-2"></i><span>${imp}</span></li>`
        ).join("")
      : `<li class="text-xs text-emerald-600 font-medium">No major flaws identified. Excellent response!</li>`;

    // Model Answer
    this.modalModelAnswer.innerText = questionData.modelAnswer || "Focus on measurable results and distinct personal actions.";

    // Follow-up question if any
    if (evalData.suggestedFollowUp) {
      this.followUpContainer.classList.remove("hidden");
      this.followUpText.innerText = `"${evalData.suggestedFollowUp}"`;
    } else {
      this.followUpContainer.classList.add("hidden");
    }

    // Button label
    const isLast = this.session.currentIndex === this.session.questions.length - 1;
    this.btnNextQuestion.innerHTML = isLast 
      ? 'View Final Scorecard <i class="fa-solid fa-arrow-right ml-1"></i>' 
      : 'Next Question <i class="fa-solid fa-arrow-right ml-1"></i>';

    this.feedbackModal.classList.remove("hidden");
  }

  advanceToNextQuestion() {
    if (this.session.currentIndex < this.session.questions.length - 1) {
      this.loadQuestion(this.session.currentIndex + 1);
    } else {
      this.finishInterviewSession();
    }
  }

  retryCurrentQuestion() {
    this.answerInput.value = "";
    this.updateLiveAnswerMetrics();
    this.startQuestionTimer();
  }

  // --- Final Scorecard Generation ---
  finishInterviewSession() {
    this.speech.stopSpeaking();
    this.speech.stopListening();
    if (this.session.cameraStream) {
      this.session.cameraStream.getTracks().forEach(track => track.stop());
      this.session.cameraStream = null;
    }

    this.interviewScreen.classList.add("hidden");
    this.scorecardScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Aggregate statistics
    const responses = this.session.responses.filter(Boolean);
    const totalQuestions = responses.length;
    if (totalQuestions === 0) return;

    const avgScore = Math.round(responses.reduce((acc, r) => acc + r.evaluation.totalScore, 0) / totalQuestions);
    const totalWords = responses.reduce((acc, r) => acc + r.evaluation.wordCount, 0);
    const avgWords = Math.round(totalWords / totalQuestions);
    const totalDurationSec = Math.round((Date.now() - this.session.startTime) / 1000);
    const mins = Math.floor(totalDurationSec / 60);
    const secs = totalDurationSec % 60;

    const starCompleteCount = responses.filter(r => r.evaluation.starAnalysis.score === 100).length;
    const starRate = Math.round((starCompleteCount / totalQuestions) * 100);

    const totalFillers = responses.reduce((acc, r) => acc + r.evaluation.fillerCount, 0);
    const overallFillerDensity = totalWords > 0 ? ((totalFillers / totalWords) * 100).toFixed(1) : 0;

    // Display title & decision
    const roleLabel = this.session.role === "custom" && this.session.customRoleTitle 
      ? this.session.customRoleTitle 
      : this.roleSelect.options[this.roleSelect.selectedIndex].text;
    this.scorecardRoleTitle.innerText = `${roleLabel} (${this.session.experienceLevel.toUpperCase()})`;
    this.overallScoreVal.innerText = `${avgScore}/100`;

    if (avgScore >= 85) {
      this.hiringDecisionBadge.innerText = "Strong Hire (Top Tier)";
      this.hiringDecisionBadge.className = "px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-300";
      // Fire confetti if available
      if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else if (avgScore >= 70) {
      this.hiringDecisionBadge.innerText = "Hire (Solid Candidate)";
      this.hiringDecisionBadge.className = "px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-300";
    } else {
      this.hiringDecisionBadge.innerText = "Needs Further Preparation";
      this.hiringDecisionBadge.className = "px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-800 border border-amber-300";
    }

    this.metricStarRate.innerText = `${starRate}%`;
    this.metricFillerRate.innerText = `${overallFillerDensity}%`;
    this.metricAvgWords.innerText = `${avgWords} words`;
    this.metricTotalTime.innerText = `${mins}m ${secs}s`;

    // Render Question Breakdown List
    this.scorecardQuestionsList.innerHTML = responses.map((r, i) => {
      const ev = r.evaluation;
      return `
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm hover:border-indigo-200 transition-colors">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
            <div>
              <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Q${i+1} - ${r.question.category}</span>
              <h4 class="text-base font-semibold text-slate-900 mt-1">${r.question.question}</h4>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${ev.badgeColor}">${ev.ratingTier}</span>
              <span class="text-xl font-bold font-heading text-indigo-600">${ev.totalScore}<span class="text-xs text-slate-400 font-normal">/100</span></span>
            </div>
          </div>

          <div class="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 mb-3 border border-slate-100">
            <span class="font-semibold text-slate-900">Your Answer:</span> "${r.answer}"
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3">
              <span class="font-semibold text-emerald-900 block mb-1.5"><i class="fa-solid fa-check mr-1 text-emerald-600"></i>Strengths:</span>
              <ul class="space-y-1 text-emerald-800">
                ${ev.strengths.map(s => `<li>• ${s}</li>`).join("")}
              </ul>
            </div>
            <div class="bg-amber-50/60 border border-amber-100 rounded-lg p-3">
              <span class="font-semibold text-amber-900 block mb-1.5"><i class="fa-solid fa-bullseye mr-1 text-amber-600"></i>Target Areas:</span>
              <ul class="space-y-1 text-amber-800">
                ${ev.improvements.map(imp => `<li>• ${imp}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  resetToSetup() {
    this.scorecardScreen.classList.add("hidden");
    this.interviewScreen.classList.add("hidden");
    this.setupScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Instantiate on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new InterviewApp();
});
