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
        const { message } = body;

        // Automatic Language Detection
        const hasArabic = /[\u0600-\u06FF]/.test(message);
        const language = hasArabic ? 'ar' : 'fr';

        const greetings = ['hello', 'hi', 'bonjour', 'salut', 'coucou', 'مرحبا', 'أهلا', 'السلام عليكم', 'سلام'];
        const lowerMessage = message.toLowerCase().trim();

        if (greetings.some(g => lowerMessage === g || lowerMessage === g + ' !' || lowerMessage === g + '?')) {
            const funnyResponsesFr = [
                "Salut ! 👋 Prêt à devenir le prochain génie du numérique en Mauritanie ? Je suis là pour t'aider !",
                "Bonjour ! Si j'avais des mains, je te ferais un high-five ✋. En attendant, que puis-je faire pour toi ?",
                "Salut ! Je suis en pleine forme numérique aujourd'hui. Et toi, prêt à coder le futur ? 🤖"
            ];
            const funnyResponsesAr = [
                "أهلاً بك! 👋 هل أنت مستعد لتكون العبقري الرقمي القادم في موريتانيا؟ أنا هنا لمساعدتك!",
                "مرحباً! لو كان لدي يدان لصافحتك ✋. كيف يمكنني مساعدتك اليوم؟",
                "أهلاً! أنا في قمة نشاطي الرقمي اليوم. هل أنت مستعد لبرمجة المستقبل؟ 🤖"
            ];

            const responses = language === 'ar' ? funnyResponsesAr : funnyResponsesFr;
            const responseText = responses[Math.floor(Math.random() * responses.length)];

            // Log the funny greeting too
            await prisma.conversation.create({
                data: {
                    userMessage: message,
                    botResponse: responseText,
                    language: language,
                    isNoInfo: false,
                },
            });

            return NextResponse.json({ response: responseText, language });
        }

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

        const noInfoMsgAr = "ليس لدي هذه المعلومات. يرجى الاتصال بإدارة SupNum.";
        const noInfoMsgFr = "Je n'ai pas cette information. Veuillez contacter l'administration de SupNum.";
        const noInfoMsg = language === 'ar' ? noInfoMsgAr : noInfoMsgFr;

        const generalKnowledge = `
IDENTITÉ : Institut Supérieur du Numérique (SupNum).
MISSION : Former des experts en numérique (Développement, Réseaux, Sécurité, Multimédia).
LOCALISATION : Tevragh-Zeina, Nouakchott, Mauritanie.
CONTACTS : Tél: +222 45 24 45 44 | Email: contact@supnum.mr | Site: supnum.mr
ADMISSION : Bacheliers séries C ou D, sélection via plateforme nationale.
FRAIS : Établissement public, les formations sont GRATUITES.
FILIÈRES : DSI (Développement), RSS (Réseaux & Sécurité), DWM (Développement Web & Multimédia).
`;

        // 2. Prepare System Prompt based on strict rules
        const systemPrompt = `
Tu es l'assistant IA officiel de SupNum. 
Utilise les informations suivantes pour répondre :

CONNAISSANCES GÉNÉRALES :
${generalKnowledge}

CONTEXTE DÉTAILLÉ (FAQ) :
${context || 'Pas de questions spécifiques trouvées.'}

Règles de réponse :
1. Utilise d'abord le CONTEXTE DÉTAILLÉ pour répondre précisément.
2. Si la réponse n'est pas dans le contexte détaillé, utilise les CONNAISSANCES GÉNÉRALES.
3. Si l'information est totalement absente des deux, réponds UNIQUEMENT : "${noInfoMsg}"
4. Réponds toujours en ${language === 'ar' ? 'Arabe' : 'Français'}.
5. Ne mentionne pas de dates de concours sauf si spécifiées dans le contexte.
6. Sois professionnel, accueillant et institutionnel.
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
            // Robust keyword matching
            const userWords = message.toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, " ")
                .split(' ')
                .filter((w: string) => w.length > 1);

            let bestMatch = null;
            let maxScore = 0;

            for (const faq of faqs) {
                let score = 0;
                const questionWords = faq.question.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, " ");
                for (const word of userWords) {
                    if (questionWords.includes(word)) score++;
                }
                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = faq;
                }
            }

            if (bestMatch && maxScore >= (userWords.length * 0.4)) {
                responseText = bestMatch.answer;
            } else {
                responseText = noInfoMsg;
            }
        }

        // 3. Log conversation
        const isNoInfo = responseText === noInfoMsgAr || responseText === noInfoMsgFr;

        await prisma.conversation.create({
            data: {
                userMessage: message,
                botResponse: responseText,
                language: language,
                isNoInfo: isNoInfo,
            },
        });

        return NextResponse.json({
            response: responseText,
            language: language
        });

    } catch (error: any) {
        console.error('Chat API Error Details:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
