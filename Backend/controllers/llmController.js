import Session from "../models/Session.js";
import Model from "../models/Model.js";
import Groq from "groq-sdk";

// ------------------ GROQ SETUP ------------------
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ------------------ JSON EXTRACTION ------------------
const extractJSON = (text) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No valid JSON found in LLM response");
  }
  return text.slice(start, end + 1);
};

// ------------------ CONTROLLER ------------------
export const analyzeSessionWithLLM = async (req, res) => {
  try {
    const { sessionId } = req.params;
    //const { modelSelected } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // ownership check
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // prevent re-run
    if (session.analysisStatus === "completed") {
      return res.status(400).json({
        message: "Analysis already completed for this session",
      });
    }

    session.analysisStatus = "processing";
    await session.save();

    // ------------------ PROMPT ------------------
    const prompt = `
You are a senior software architect with real-world delivery experience.

Your task is to recommend the BEST 2 or 3 SDLC models for the given project.
Your response must help a non-technical stakeholder and a developer
CLEARLY VISUALIZE how the project would actually be built using each model.

Project Description:
${session.projectDescription}

Team Size:
Frontend: ${session.teamSize.frontend}
Backend: ${session.teamSize.backend}
Tester: ${session.teamSize.tester}
DevOps: ${session.teamSize.devops}
AI Engineer: ${session.teamSize.aiengineer}

Constraints:
Budget: ${session.budget}
Timeline: ${session.timeline}
Requirements Clarity: ${session.requirementsClarity}
Risk Level: ${session.riskLevel}
Client Involvement: ${session.clientInvolvement}
Compliance Required: ${session.complianceRequired}

IMPORTANT INSTRUCTIONS (READ CAREFULLY):

1. Recommend ONLY 2 or 3 SDLC models that truly fit the project.
2. ALL phases and steps MUST be SPECIFIC to THIS project.
   - Avoid generic steps like "Develop frontend" or "Write backend code".
   - Each step should mention concrete features, flows, integrations, or risks
     that come directly from the project description.
3. While describing phases and steps:
   - Write as if explaining to a person who is deciding WHICH model to choose.
   - The reader should be able to imagine:
     “Yes, this is exactly how my project will be executed.”
4. In phase descriptions and steps:
   - Mention real-life usage scenarios
   - Mention example features, user journeys, integrations, or risks
   - Mention what tangible output is produced (docs, APIs, screens, models, etc.)
5. Clearly differentiate models:
   - Each model must feel meaningfully different in execution style.
6. Be honest:
   - If a model is risky or weak for this project, clearly state why.
7. Confidence score must be realistic, not inflated.
8. The response must contain technical details, avoiding vague generalities.
9. It should be helpful for both technical and non-technical stakeholders.


STRICT RULES:
- Respond ONLY in valid JSON
- Recommend 2 or 3 SDLC models
- Include phases with detailed descriptions and project-specific steps
- Provide pros, cons, and whenNotToUse grounded in THIS project
- Descriptions must be clear, applied, and scenario-based
- Give llmConfidenceScore between 0 and 1 for each model
- Calculate estimatedTime based on budget: Higher budget = faster delivery
  - Budget < ₹2,50,000: 4-8 months
  - Budget ₹2,50,000-₹7,50,000: 2-4 months  
  - Budget ₹7,50,000-₹15,00,000: 1-2 months
  - Budget > ₹15,00,000: 2-6 weeks
- Do NOT include any extra text outside JSON

RESPONSE FORMAT (STRICT):

{
  "models": [
    {
      "name": "",
      "whySelected": "",
      "bestFor": [],
      "estimatedTime": "",
      "phases": [
        {
          "name": "",
          "description": "",
          "steps": []
        }
      ],
      "pros": [],
      "cons": [],
      "whenNotToUse": [],
      "diagramType": "",
      "llmConfidenceScore": 0.0,
      "notes": ""
    }
  ]
}

`;

    // ------------------ GROQ CALL ------------------
    const completion = await groq.chat.completions.create({
      model: session.groqModel,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const aiResponse = completion.choices[0].message.content;
    const parsed = JSON.parse(extractJSON(aiResponse));

    if (!parsed.models || !Array.isArray(parsed.models)) {
      throw new Error("Invalid LLM response structure");
    }

    // ------------------ SAVE MODELS ------------------
    const modelDocs = await Model.insertMany(
      parsed.models.map((m) => ({
        session: session._id,
        name: m.name,
        whySelected: m.whySelected,
        bestFor: m.bestFor,
        estimatedTime: m.estimatedTime,
        phases: m.phases,
        pros: m.pros,
        cons: m.cons,
        whenNotToUse: m.whenNotToUse,
        diagramType: m.diagramType,
        llmConfidenceScore: m.llmConfidenceScore,
        notes: m.notes,
      }))
    );

    session.modelsGenerated = modelDocs.map((m) => m._id);
    session.analysisStatus = "completed";
    session.aiMeta = {
      modelUsed: session.groqModel,
    };

    await session.save();

    return res.json({
      message: "SDLC models generated successfully",
      models: modelDocs,
    });
  } catch (error) {
    console.error("LLM ERROR:", error);
    return res.status(500).json({
      message: "Failed to analyze session with LLM",
    });
  }
};

export const isModelsGenerated = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // ownership check
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const generated = session.analysisStatus === "completed";

    return res.json({ modelsGenerated: generated });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      message: "Failed to check model generation status",
    });
  }
};
