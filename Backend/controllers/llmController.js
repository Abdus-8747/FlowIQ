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
You are a senior software architect with real-world software delivery experience.

ROLE & OBJECTIVE:
- Your role is to act as a **solution architect** advising a client on how to execute their project.
- Your objective is to recommend the BEST 2 or 3 SDLC models for the project and describe how the work would be executed under each model in a way that is easy to visualize for both non-technical stakeholders and developers.

PROJECT CONTEXT:

Project Description (business goals, key features, target users, platforms, integrations):
${session.projectDescription}

Team Size:
- Frontend engineers: ${session.teamSize.frontend}
- Backend engineers: ${session.teamSize.backend}
- Test / QA engineers: ${session.teamSize.tester}
- DevOps / Infra engineers: ${session.teamSize.devops}
- AI / ML engineers: ${session.teamSize.aiengineer}

Constraints:
- Budget: ${session.budget}
- Timeline: ${session.timeline}
- Requirements Clarity: ${session.requirementsClarity}
- Risk Level: ${session.riskLevel}
- Client Involvement: ${session.clientInvolvement}
- Compliance Required (e.g., GDPR, HIPAA, fintech rules): ${session.complianceRequired}

WHAT YOU MUST DO:

1. Recommend ONLY 2 or 3 SDLC models that truly fit THIS project.
2. Make ALL phases and ALL steps SPECIFIC to THIS project.
   - Do NOT use generic steps like "Develop frontend" or "Write backend code".
   - Each step MUST mention concrete features, user journeys, flows, integrations, data, or risks that are clearly derived from the project description.
   - When unclear, make reasonable assumptions and state them briefly in the steps.
3. While describing phases and steps:
   - Write as if explaining to a client who is deciding WHICH SDLC model to choose.
   - A non-technical reader should be able to imagine:
     "Yes, this is exactly how my project will be executed."
   - A developer should see enough technical detail to understand the sequence of work.
4. In each phase:
   - Mention at least 2–3 real-life usage scenarios or user journeys (e.g., "student marks attendance via mobile app", "admin exports monthly compliance report").
   - Mention example features, screens, APIs, data flows, external services, or AI models relevant to this project.
   - Mention what tangible output is produced (e.g., UX wireframes, API contracts, CI/CD pipeline, test cases, database schema, AI model artifacts).
5. Clearly differentiate models:
   - Each model must feel meaningfully different in execution style (e.g., waterfall-like vs. iterative vs. prototyping-heavy).
   - Do NOT repeat the same phase descriptions with minor wording changes across models.
6. Be honest about trade-offs:
   - If a model is risky or weak for this project (e.g., due to high risk, unclear requirements, strong compliance), clearly state why in "cons" and "whenNotToUse".
7. Confidence:
   - llmConfidenceScore must be realistic, not inflated (e.g., values like 0.62, 0.74 are acceptable).
8. Audience:
   - The answer must be understandable and useful for BOTH:
     - Non-technical stakeholders (product owner, business sponsor)
     - Technical team (developers, testers, DevOps, AI engineers)
   - Avoid vague generalities; include concrete technical details where relevant.
9. Real-world analogy:
   - For each model, mention at least one real-world example (company, product, or type of project) where that SDLC style is commonly used or works well.
10. Time estimates:Provide Time as per real-world industry standards for a project of this size and complexity.

ESTIMATED TIME LOGIC (STRICT):

Use this mapping to set "estimatedTime" for EACH model (choose exactly one string from below):

- If Budget < ₹2,50,000: use "4-8 months"
- If Budget is between ₹2,50,000 and ₹7,50,000 (inclusive): use "2-4 months"
- If Budget is between ₹7,50,000 and ₹15,00,000 (inclusive): use "1-2 months"
- If Budget > ₹15,00,000: use "2-6 weeks"

Do NOT invent any other time ranges. Use exactly one of the above four strings.

OUTPUT RULES (VERY IMPORTANT):

- Respond ONLY with a single valid JSON object.
- The JSON MUST start with "{" and end with "}".
- Do NOT include markdown, code fences, comments, explanations, or any text outside the JSON.
- Do NOT include trailing commas anywhere.
- All strings MUST be double-quoted.
- llmConfidenceScore MUST be a JSON number, NOT a string.

RESPONSE FORMAT (STRICT SCHEMA SHAPE):

Return JSON that matches this shape (field names and nesting must be exactly the same):

{
  "models": [
    {
      "name": "string",                // SDLC model name, e.g., "Agile Scrum", "Iterative", "Spiral", "V-Model"
      "whySelected": "string",         // Why this model fits THIS project
      "bestFor": [                     // A description of scenarios where this model is ideal for THIS project
        "string"
      ],
      "estimatedTime": "string",       // One of: "4-8 months" | "2-4 months" | "1-2 months" | "2-6 weeks"
      "phases": [
        {
          "name": "string",            // Phase name, // e.g., "Requirements Gathering", "Design", "Development", "Testing", "Deployment", "Iteration Planning", etc fancy terms. minimum 4–9 phases per model
          "description": "string",     // 3–5 sentences, specific to THIS project
          "steps": [                   // 4–8 concrete steps, each specific and scenario-based
            "string"
          ]
        }
      ],
      "pros": [                        // 3–6 items
        "string"
      ],
      "cons": [                        // 3–6 items
        "string"
      ],
      "whenNotToUse": [                // 2–5 items focused on THIS project's kind of context
        "string"
      ],
      "diagramType": "string",         // e.g., "flowchart", "timeline", "swimlane", "gantt", or similar
      "llmConfidenceScore": 0.0,       // e.g., 0.68
      "notes": "string"                // Extra clarifications, assumptions, or caveats
    }
  ]
}

Remember:
- The content of "phases", "steps", "pros", "cons", and "whenNotToUse" MUST be grounded in the given project description, team size, and constraints.
- Avoid generic textbook SDLC descriptions; always tie back to how THIS specific project would be built in reality.
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
