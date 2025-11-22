'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';

interface Message {
    role: 'user' | 'model';
    parts: string;
}

export default function InterviewPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', parts: userMessage }]);
        setLoading(true);

        try {
            // Format history for Gemini API (excluding the new message)
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.parts }]
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages((prev) => [...prev, { role: 'model', parts: data.response }]);
        } catch (error: any) {
            console.error('Chat error:', error);
            setMessages((prev) => [...prev, { role: 'model', parts: `Error: ${error.message || 'Something went wrong. Please check your API keys.'}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col pt-24 px-4 md:px-12 pb-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-text-main mb-2">AI Interview Coach</h1>
                <p className="text-text-muted">Practice technical questions with our AI assistant.</p>
            </div>

            <div className="flex-1 bg-surface rounded-xl border border-border flex flex-col overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-text-muted mt-10">
                            <p>Start the conversation by introducing yourself or asking for a mock interview question!</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-surface-hover text-text-main rounded-bl-none'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.parts}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-surface-hover p-4 rounded-2xl rounded-bl-none flex gap-2">
                                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce delay-75" />
                                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-surface">
                    <form onSubmit={handleSend} className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your answer..."
                            className="flex-1 p-4 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 rounded-xl transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
