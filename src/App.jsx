import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { gitaQuotes } from './data/gitaQuotes';
import { findRelevantQuote } from './utils/matchQuote';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Namaste! I am your Bhagavad Gita guide. Share your situation or feeling, and I will provide wisdom from the sacred text.'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const quote = findRelevantQuote(input);
    const botMessage = {
      type: 'bot',
      text: quote.text,
      verse: quote.verse,
      citation: `Chapter ${quote.chapter}, Verse ${quote.verseNumber}`
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-orange-600 p-4 flex items-center gap-2">
            <MessageCircle className="text-white" size={24} />
            <h1 className="text-xl font-bold text-white">Bhagavad Gita Guide</h1>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.verse && (
                    <div className="mt-2 pt-2 border-t border-orange-200">
                      <p className="text-xs font-semibold text-gray-600">
                        {message.verse}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.citation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your situation..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;