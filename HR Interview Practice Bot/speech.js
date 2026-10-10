// HR Interview Practice Bot - Speech Recognition (STT) & Speech Synthesis (TTS) Controller

class SpeechManager {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.synth = window.speechSynthesis;
    this.availableVoices = [];
    this.selectedVoice = null;
    this.isMuted = false;
    this.speakingStateCallback = null;
    this.transcriptCallback = null;

    this.initSpeechSynthesis();
    this.initSpeechRecognition();
  }

  // --- TEXT TO SPEECH (Interviewer Voice) ---
  initSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis is not supported in this browser.");
      return;
    }

    const loadVoices = () => {
      this.availableVoices = this.synth.getVoices();
      // Prefer friendly, natural English voices
      const preferred = this.availableVoices.find(v => 
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Jenny") || v.name.includes("Guy") || v.name.includes("Samantha")) &&
        v.lang.startsWith("en")
      );
      this.selectedVoice = preferred || this.availableVoices.find(v => v.lang.startsWith("en")) || this.availableVoices[0];
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  speak(text, onStart, onEnd) {
    if (this.isMuted || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 0.95; // Slightly measured, professional pacing
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (this.speakingStateCallback) this.speakingStateCallback(true);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (this.speakingStateCallback) this.speakingStateCallback(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      if (this.speakingStateCallback) this.speakingStateCallback(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      if (this.speakingStateCallback) this.speakingStateCallback(false);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeaking();
    }
    return this.isMuted;
  }

  // --- SPEECH TO TEXT (Candidate Voice Input) ---
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not available in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.onListeningChange) this.onListeningChange(true);
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (this.transcriptCallback) {
        this.transcriptCallback(finalTranscript, interimTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        alert("Microphone permission denied. Please allow microphone access or type your response.");
      }
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };
  }

  startListening(onTranscript, onListeningChange) {
    if (!this.recognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or type your response.");
      return false;
    }
    this.transcriptCallback = onTranscript;
    this.onListeningChange = onListeningChange;

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.warn("Recognition already started or error:", e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    }
  }

  toggleListening(onTranscript, onListeningChange) {
    if (this.isListening) {
      this.stopListening();
      return false;
    } else {
      return this.startListening(onTranscript, onListeningChange);
    }
  }
}

// Global instance
const speechManager = new SpeechManager();
