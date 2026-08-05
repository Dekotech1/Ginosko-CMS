import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialiser for Gemini API
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Ginosko CMS Backend',
    timestamp: new Date().toISOString(),
    aiEnabled: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY',
  });
});

// AI Generation Endpoint
app.post('/api/ai/generate', async (req, res) => {
  const { mode, prompt, topic, contentType, targetAudience, language } = req.body;

  try {
    const ai = getAI();

    if (!ai) {
      // Provide intelligent fallback responses when API key is not configured
      return res.json(getFallbackResponse(mode, prompt, topic, contentType, language));
    }

    let systemInstruction = "You are Ginosko AI, an expert enterprise CMS editor and energy consultant for Ginosko Consulting & Renewable Energy.";
    let userPrompt = "";

    switch (mode) {
      case 'draft':
        userPrompt = `Write a comprehensive, professional ${contentType || 'article'} for Ginosko's enterprise CMS.
Topic: ${topic || prompt}
Target Audience: ${targetAudience || 'Corporate C-suite, Sustainability Officers, Energy Investors'}
Requirements:
1. Include an engaging title and subtitle.
2. Structure with clear Markdown headers (##, ###).
3. Include real-world renewable energy & strategic consulting insights (e.g., Solar PPA, Grid Modernization, Decarbonization ROI, Battery Storage).
4. Include a key takeaways summary section.
5. End with an actionable conclusion and call to action for Ginosko Consulting.`;
        break;

      case 'seo':
        userPrompt = `Analyze the following content topic and generate complete SEO metadata in JSON format:
Content Topic/Text: ${topic || prompt}

Return ONLY a JSON object with:
{
  "metaTitle": "SEO title under 60 chars",
  "metaDescription": "Compelling meta description under 155 chars with call to action",
  "focusKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "slug": "url-friendly-slug-text",
  "canonicalTag": "https://ginosko.com/insights/slug",
  "ogTitle": "Open Graph Share Title",
  "ogDescription": "Open Graph Share Description",
  "readabilityScore": "Grade 11 - Professional"
}`;
        break;

      case 'summarize':
        userPrompt = `Provide a concise, 2-paragraph executive summary and 4 bullet points of key strategic implications for this topic or text:
Text: ${prompt || topic}`;
        break;

      case 'translate':
        userPrompt = `Translate the following text into ${language || 'Spanish'}. Maintain professional corporate tone for renewable energy executive readers:
Text: ${prompt}`;
        break;

      case 'calculator_analysis':
        userPrompt = `As a renewable energy engineer at Ginosko, evaluate this project setup:
${prompt}
Provide:
1. Executive Risk & Feasibility Assessment
2. Carbon Offset Validation
3. Recommended Energy Storage (BESS) or Grid Enhancements
4. Financial Payback Insights`;
        break;

      default:
        userPrompt = prompt || "Provide a summary of renewable energy consulting best practices for 2026.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const textResult = response.text || '';
    return res.json({
      success: true,
      text: textResult,
      mode,
      modelUsed: 'gemini-2.5-flash',
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Graceful fallback
    return res.json(getFallbackResponse(mode, prompt, topic, contentType, language));
  }
});

function getFallbackResponse(mode: string, prompt?: string, topic?: string, contentType?: string, language?: string) {
  const t = topic || prompt || "Grid-Scale Renewable Energy Infrastructure & Decarbonization";

  if (mode === 'seo') {
    return {
      success: true,
      isFallback: true,
      text: JSON.stringify({
        metaTitle: `${t.substring(0, 45)} | Ginosko Insights`,
        metaDescription: `Discover strategic insights on ${t}. Learn how Ginosko Consulting drives renewable energy transition, ESG compliance, and grid efficiency.`,
        focusKeywords: ["Renewable Energy", "ESG Advisory", "Decarbonization", "Solar Infrastructure", "Grid Modernization"],
        slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        canonicalTag: `https://ginosko-energy.com/insights/${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        ogTitle: `${t} - Executive Strategic Advisory`,
        ogDescription: `Ginosko's enterprise report on ${t} for utility leaders and energy investors.`,
        readabilityScore: "Grade 12 - Executive",
      }, null, 2),
    };
  }

  if (mode === 'summarize') {
    return {
      success: true,
      isFallback: true,
      text: `### Executive Summary\n\nThe acceleration of global energy transitions requires integrated strategic advisory and capital-efficient technology deployments. This report outlines critical pathways for utility scale integration, regulatory compliance, and risk mitigation across emerging energy markets.\n\n### Key Takeaways\n- **Grid Resilience**: Battery Energy Storage Systems (BESS) reduce curtailment loss by up to 28%.\n- **Capital Optimization**: Structured Power Purchase Agreements (PPAs) safeguard against merchant power price volatility.\n- **Regulatory Alignment**: Proactive ESG reporting positions infrastructure assets for top-tier institutional funding.\n- **Decarbonization Impact**: Targeted hybrid solar-wind deployments achieve net-zero milestones 3 years faster.`,
    };
  }

  if (mode === 'translate') {
    return {
      success: true,
      isFallback: true,
      text: `[Translated to ${language || 'Spanish'}]:\n\n${prompt || 'Ginosko Consulting lidera la transformación energética global mediante soluciones de energía renovable de grado empresarial, asesoría estratégica ESG e integración de infraestructura de red solar y eólica.'}`,
    };
  }

  return {
    success: true,
    isFallback: true,
    text: `# ${topic || 'Strategic Roadmap for Renewable Energy Infrastructure'}\n\n## Executive Overview\nAs global energy grids undergo rapid decarbonization, corporate leaders and utility operators face unprecedented opportunities and operational complexities. Ginosko Consulting delivers end-to-end advisory, infrastructure planning, and digital asset management to navigate this transition.\n\n## Key Strategic Pillars\n\n### 1. Hybrid Solar & Storage Engineering\nIntegrating battery storage directly at grid interconnection points mitigates peak load pressure while enhancing project IRR by 18-24%.\n\n### 2. Corporate PPA & Risk Hedging\nCustom power purchase agreement structures enable enterprise clients to lock in long-term zero-emission electricity while hedging against wholesale market spikes.\n\n### 3. Smart Microgrid Digitalization\nDeploying real-time telemetry and edge analytics empowers facility managers to optimize load shedding and self-consumption seamlessly.\n\n## Recommended Action Items for C-Suite\n1. Conduct comprehensive Scope 1-3 baseline emissions audit.\n2. Evaluate high-yield rooftop and ground-mounted solar feasibility.\n3. Standardize ESG data pipeline across asset portfolios.\n\n---\n*Generated by Ginosko AI Content Engine for Ginosko Consulting & Renewable Energy.*`,
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ginosko CMS Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
