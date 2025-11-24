import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'Gemini API Key not configured' }, { status: 500 });
        }

        const modelsToTry = ["gemini-2.0-flash", "gemini-2.0-flash-lite"];
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: "You are an expert technical interviewer for top tech companies. Your goal is to assess the candidate's skills and provide constructive, direct feedback. Skip the small talk and pleasantries. Dive straight into technical or behavioral questions. Be professional, challenging, yet encouraging. If the candidate struggles, provide a hint but don't give the answer immediately. At the end of a response, briefly explain the 'why' behind a concept if they got it wrong."
                });

                const chat = model.startChat({
                    history: (history as Content[]) || [],
                    generationConfig: {
                        maxOutputTokens: 500,
                    },
                });

                const result = await chat.sendMessage(message);
                const response = await result.response;
                const text = response.text();

                return NextResponse.json({ response: text });
            } catch (error: any) {
                console.error(`Attempt with ${modelName} failed:`, error.message);
                lastError = error;
                // If it's not a 404 (Not Found), it might be a real error (like quota), so maybe don't retry?
                // But for now, we retry on any error to be safe.
                continue;
            }
        }

        // If we get here, all models failed
        throw lastError;

    } catch (error: any) {
        console.error('Chat Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
