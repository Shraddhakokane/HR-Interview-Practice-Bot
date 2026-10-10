// HR Interview Practice Bot - Offline AI Simulation & Evaluation Engine

class HREvaluationEngine {
  constructor() {
    this.fillerWords = FILLER_WORDS;
    this.actionVerbs = STRONG_ACTION_VERBS;
    this.starKeywords = STAR_KEYWORDS;
  }

  // Extract top keywords from Resume & Job Description
  extractKeywords(text) {
    if (!text || text.trim().length === 0) return [];
    
    // Common English stop words
    const stopWords = new Set([
      "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", 
      "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", 
      "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", 
      "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", 
      "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", 
      "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", 
      "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", 
      "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", 
      "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", 
      "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", 
      "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", 
      "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", 
      "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", 
      "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", 
      "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", 
      "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", 
      "yourself", "yourselves", "will", "also", "with", "experience", "work", "years"
    ]);

    const words = text.toLowerCase()
      .replace(/[^\w\s+#.-]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w) && !/^\d+$/.test(w));

    const freqMap = {};
    for (const word of words) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }

    return Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(entry => entry[0]);
  }

  // Create tailored questions based on Resume and Job Description
  generateCustomQuestions(resumeText, jobDescription, roleName = "General") {
    const questions = [];
    const resumeKeywords = this.extractKeywords(resumeText);
    const jdKeywords = this.extractKeywords(jobDescription);
    const commonKeywords = resumeKeywords.filter(k => jdKeywords.includes(k));

    if (resumeKeywords.length > 0) {
      const topSkill = resumeKeywords[0].toUpperCase();
      const secondSkill = resumeKeywords[1] ? resumeKeywords[1].toUpperCase() : "collaboration";
      questions.push({
        id: "custom_resume_1",
        question: `I see from your background that you have hands-on experience with ${topSkill}. Can you describe a specific project where you applied this to overcome a major obstacle?`,
        category: "Resume Deep Dive",
        difficulty: "Tailored to Candidate",
        duration: 120,
        starHint: `Highlight context around ${topSkill}, your specific implementation, roadblocks faced, and quantifiable results delivered.`,
        keyElements: [topSkill.toLowerCase(), "project challenge", "implementation details", "measurable impact"],
        modelAnswer: `In my experience with ${topSkill}, we faced an urgent challenge where our existing process was causing bottlenecks. I took the lead in restructuring our approach using ${topSkill}, documented standard operating guidelines, and achieved a 30% boost in efficiency.`
      });
    }

    if (jdKeywords.length > 0) {
      const topJdSkill = jdKeywords[0].toUpperCase();
      questions.push({
        id: "custom_jd_1",
        question: `A critical requirement for this role is proficiency in ${topJdSkill}. How have you demonstrated agility or delivered value with this in your previous work?`,
        category: "Job Description Alignment",
        difficulty: "Tailored to Job",
        duration: 120,
        starHint: `Show direct relevance to the job requirements. Cite real metrics and how quickly you mastered ${topJdSkill}.`,
        keyElements: [topJdSkill.toLowerCase(), "prior experience", "learning curve", "value delivered"],
        modelAnswer: `I have extensively worked with ${topJdSkill} in fast-paced settings. I spearheaded an initiative to streamline workflows, reducing cycle time and ensuring high alignment with business deliverables.`
      });
    }

    if (commonKeywords.length > 0) {
      const targetMatch = commonKeywords[0].toUpperCase();
      questions.push({
        id: "custom_match_1",
        question: `Both your profile and our team emphasize ${targetMatch}. Walk me through a time when unexpected complications arose while executing on this, and how you ensured delivery.`,
        category: "Target Role Execution",
        difficulty: "Tailored Role Match",
        duration: 130,
        starHint: "Describe the unexpected complication, how you triaged trade-offs, and how you communicated with stakeholders.",
        keyElements: [targetMatch.toLowerCase(), "risk triage", "stakeholder communication", "resolution"],
        modelAnswer: `While delivering a key initiative involving ${targetMatch}, unexpected timeline constraints emerged. I immediately communicated with stakeholders, prioritized the high-impact core features, and led the team to complete the milestone within deadline.`
      });
    }

    return questions;
  }

  // Analyze answer in-depth
  evaluateAnswer(candidateAnswer, questionData, timeTakenSeconds = 60) {
    const text = (candidateAnswer || "").trim();
    const lowerText = text.toLowerCase();
    
    // Word count & tokenization
    const words = text ? text.split(/\s+/).filter(w => w.length > 0) : [];
    const wordCount = words.length;

    // Detect Filler Words
    const detectedFillers = [];
    let fillerCount = 0;
    this.fillerWords.forEach(filler => {
      // Regex match whole word or phrase
      const regex = new RegExp(`\\b${filler}\\b`, "gi");
      const matches = text.match(regex);
      if (matches) {
        fillerCount += matches.length;
        detectedFillers.push({ word: filler, count: matches.length });
      }
    });

    const fillerPercentage = wordCount > 0 ? ((fillerCount / wordCount) * 100).toFixed(1) : 0;

    // Detect Strong Action Verbs
    const detectedActionVerbs = [];
    this.actionVerbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, "gi");
      const matches = text.match(regex);
      if (matches) {
        detectedActionVerbs.push(verb);
      }
    });

    // Detect First-person Ownership ("I" vs "We")
    const iMatches = text.match(/\b(i|my|mine|myself|i'm|i've|i'd)\b/gi) || [];
    const weMatches = text.match(/\b(we|our|ours|us|team)\b/gi) || [];
    const iCount = iMatches.length;
    const weCount = weMatches.length;

    // STAR Method Component Analysis
    const starAnalysis = this.analyzeSTAR(lowerText);

    // Question Key Elements Match
    const keyElementsPresent = [];
    const keyElementsMissing = [];
    if (questionData && questionData.keyElements) {
      questionData.keyElements.forEach(element => {
        const elemWords = element.toLowerCase().split(/\s+/);
        const hasMatch = elemWords.some(w => lowerText.includes(w));
        if (hasMatch) {
          keyElementsPresent.push(element);
        } else {
          keyElementsMissing.push(element);
        }
      });
    }

    // Scoring Breakdown (0 to 100)
    let lengthScore = 0;
    if (wordCount >= 90 && wordCount <= 260) {
      lengthScore = 25; // Perfect length
    } else if ((wordCount >= 50 && wordCount < 90) || (wordCount > 260 && wordCount <= 350)) {
      lengthScore = 18; // Adequate
    } else if (wordCount > 25 && wordCount < 50) {
      lengthScore = 10; // Too brief
    } else if (wordCount > 350) {
      lengthScore = 14; // Slightly rambling
    } else {
      lengthScore = 4; // Extremely short / minimal answer
    }

    // STAR Score (up to 35 pts)
    const starCompletenessScore = Math.round(
      (starAnalysis.situation ? 8 : 0) +
      (starAnalysis.task ? 7 : 0) +
      (starAnalysis.action ? 10 : 0) +
      (starAnalysis.result ? 10 : 0)
    );

    // Communication & Clarity Score (up to 20 pts)
    let commScore = 20;
    if (fillerPercentage > 6) commScore -= 10;
    else if (fillerPercentage > 3) commScore -= 5;
    else if (fillerPercentage > 1.5) commScore -= 2;

    // Verb & Ownership Score (up to 20 pts)
    let ownershipScore = 10;
    if (detectedActionVerbs.length >= 3) ownershipScore += 5;
    else if (detectedActionVerbs.length >= 1) ownershipScore += 3;

    if (iCount >= 3 && weCount >= 1) {
      ownershipScore += 5; // Balanced personal ownership with team awareness
    } else if (iCount >= 3) {
      ownershipScore += 4;
    } else if (weCount > 4 && iCount < 2) {
      ownershipScore += 1; // Overly passive / deflected to "we"
    }

    // Total Answer Score (0 to 100)
    let totalScore = Math.min(100, Math.max(15, lengthScore + starCompletenessScore + commScore + ownershipScore));
    if (wordCount < 15) totalScore = Math.min(totalScore, 25);

    // Generate constructive feedback & actionable advice
    const strengths = [];
    const improvements = [];

    if (starAnalysis.situation && starAnalysis.action) {
      strengths.push("Good problem framing and clear demonstration of actions taken.");
    }
    if (detectedActionVerbs.length >= 2) {
      strengths.push(`Strong active vocabulary used (${detectedActionVerbs.slice(0, 3).join(", ")}).`);
    }
    if (starAnalysis.result) {
      strengths.push("Excellent inclusion of measurable results and impact.");
    }
    if (wordCount >= 80 && wordCount <= 250) {
      strengths.push("Well-calibrated length for an HR behavioral question (90-180 seconds pacing).");
    }
    if (fillerCount === 0 && wordCount > 40) {
      strengths.push("Extremely clean delivery with zero detected filler words.");
    }

    // Areas for improvement
    if (!starAnalysis.result) {
      improvements.push("Missing the 'Result' in STAR: Always quantify outcomes (e.g., 'reduced turnaround time by 20%', 'delivered under budget').");
    }
    if (!starAnalysis.action) {
      improvements.push("Specify your exact individual actions ('I organized...', 'I engineered...') rather than generic statements.");
    }
    if (wordCount < 50) {
      improvements.push("Answer is quite brief. Expand with concrete context, trade-offs made, and learnings.");
    } else if (wordCount > 350) {
      improvements.push("Watch out for rambling. Aim for a crisp 1.5 to 2 minute summary to hold interviewer engagement.");
    }
    if (fillerPercentage > 3) {
      improvements.push(`High filler word frequency (${fillerCount} words detected like '${detectedFillers[0]?.word}'). Practice deliberate pausing instead of filler sounds.`);
    }
    if (weCount >= 3 && iCount <= 1) {
      improvements.push("You used 'we' significantly more than 'I'. Clarify what *you personally* owned and executed on the project.");
    }

    // Recommend follow-up question if critical parts missing
    let suggestedFollowUp = null;
    if (!starAnalysis.result && wordCount > 30) {
      suggestedFollowUp = "Could you walk me through the specific quantifiable outcome or business impact of that decision?";
    } else if (!starAnalysis.situation && wordCount > 30) {
      suggestedFollowUp = "What was the initial organizational or technical context that made this situation challenging?";
    } else if (iCount < 2 && weCount >= 2) {
      suggestedFollowUp = "That sounds like great teamwork. What was your personal responsibility and direct contribution within that?";
    }

    // Determine performance tier
    let ratingTier = "Needs Practice";
    let badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
    if (totalScore >= 88) {
      ratingTier = "Outstanding / Top Candidate";
      badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
    } else if (totalScore >= 75) {
      ratingTier = "Strong Hire";
      badgeColor = "bg-blue-100 text-blue-800 border-blue-300";
    } else if (totalScore >= 60) {
      ratingTier = "Solid Contender";
      badgeColor = "bg-cyan-100 text-cyan-800 border-cyan-300";
    }

    return {
      totalScore,
      ratingTier,
      badgeColor,
      wordCount,
      timeTakenSeconds,
      fillerCount,
      fillerPercentage,
      detectedFillers,
      detectedActionVerbs,
      ownership: {
        iCount,
        weCount,
        ratio: weCount > 0 ? (iCount / weCount).toFixed(1) : iCount
      },
      starAnalysis,
      strengths,
      improvements,
      suggestedFollowUp,
      keyElementsPresent,
      keyElementsMissing,
      modelAnswer: questionData?.modelAnswer || "Structure with clear Situation, Task, Action, and measurable Result."
    };
  }

  // Helper to detect STAR framework presence
  analyzeSTAR(lowerText) {
    const hasSituation = this.starKeywords.situation.some(k => lowerText.includes(k));
    const hasTask = this.starKeywords.task.some(k => lowerText.includes(k));
    const hasAction = this.starKeywords.action.some(k => lowerText.includes(k)) || 
                      this.actionVerbs.some(v => lowerText.includes(v));
    const hasResult = this.starKeywords.result.some(k => lowerText.includes(k)) || 
                      /\b\d+%\b|\bpercent\b|\bmetrics\b|\bsaved\b|\bimproved\b|\breduced\b/.test(lowerText);

    return {
      situation: hasSituation,
      task: hasTask,
      action: hasAction,
      result: hasResult,
      score: [hasSituation, hasTask, hasAction, hasResult].filter(Boolean).length * 25
    };
  }
}

// Global instance
const hrEngine = new HREvaluationEngine();
