import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import OpenAI from 'openai';

const getOpenAIClient = () => {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey || apiKey === '' || apiKey.includes('your_xai_api_key')) return null;
    return new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.x.ai/v1',
    });
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, language = 'fr' } = body;
        console.log('Chat API Request:', { message, language });

        if (!message) {
            return NextResponse.json({ error: 'Message required' }, { status: 400 });
        }

        // 1. Fetch relevant FAQs from Database for Context
        console.log('Fetching FAQs for language:', language);
        const faqs = await prisma.fAQ.findMany({
            where: {
                language: language,
            },
        });
        console.log('FAQs fetched. Count:', faqs.length);

        const context = faqs.map((f: { question: string; answer: string }) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

        const noInfoMsg = language === 'ar'
            ? "ليس لدي هذه المعلومات. يرجى الاتصال بإدارة SupNum."
            : "Je n’ai pas cette information. Veuillez contacter l’administration de SupNum.";

        // 2. Prepare System Prompt based on strict rules
        const systemPrompt = `
Tu es un chatbot officiel de l’Institut Supérieur du Numérique (SupNum).

Règles strictes :
- Tu dois répondre UNIQUEMENT à partir des informations fournies dans le CONTEXTE ci-dessous.
- Si l’information n’existe pas dans le contexte, réponds EXACTEMENT : "${noInfoMsg}"
- Ne donne jamais d’informations inventées.
- Réponds dans la langue utilisée par l’utilisateur (${language === 'ar' ? 'arabe' : 'français'}).
- Sois clair, professionnel et concis.
- Si la question est complexe, propose une redirection vers un agent humain.

Rôle :
Fournir des informations sur : Formations, Inscriptions, Conditions d’admission, Débouchés, Contacts et horaires.

CONTEXTE :
${context || 'Aucune information disponible pour le moment.'}
`;

        let responseText = "";
        const openai = getOpenAIClient();

        if (openai) {
            try {
                const completion = await openai.chat.completions.create({
                    model: 'grok-beta',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message }
                    ],
                    temperature: 0,
                });
                responseText = completion.choices[0].message?.content || "";
            } catch (aiError: any) {
                console.error('AI Error, falling back to keywords:', aiError.message);
            }
        }

        // Fallback logic if AI failed or client not available
        if (!responseText) {
            const keywords = message.toLowerCase().split(' ').filter((w: string) => w.length > 2);
            let bestMatch = null;
            let maxScore = 0;

            for (const faq of faqs) {
                let score = 0;
                const questionWords = faq.question.toLowerCase();
                for (const word of keywords) {
                    if (questionWords.includes(word)) score++;
                }
                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = faq;
                }
            }

            if (bestMatch && maxScore > 0) {
                responseText = bestMatch.answer;
            } else {
                responseText = noInfoMsg;
            }
        }

        // 3. Log conversation
        await prisma.conversation.create({
            data: {
                userMessage: message,
                botResponse: responseText,
            },
        });

        return NextResponse.json({ response: responseText });

    } catch (error: any) {
        console.error('Chat API Error Details:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
