import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'Gemini API Key not configured' }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
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
        console.error('Chat Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
