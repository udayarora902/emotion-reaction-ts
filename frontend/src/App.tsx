import React, { useState, useCallback } from 'react';
import EmotionForm from './components/EmotionForm';
import EmotionResult from './components/EmotionResult';

export interface EmotionData {
  emotion: string;
  emoji: string;
  confidence: number;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmotionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ text: text.trim() }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Basic validation
      if (!data.emotion || !data.emoji || typeof data.confidence !== 'number') {
        throw new Error('Invalid response format');
      }

      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else if (err.message === 'Failed to fetch') {
          setError('Unable to connect to server. Please check your connection.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="container">
      <h1>Emotion Analyzer</h1>
      <EmotionForm onSubmit={handleSubmit} loading={loading} />
      {loading && <p>Analyzing...</p>}
      {error && (
        <div className="error">
          {error}
          <button onClick={clearError} style={{ marginLeft: '10px', fontSize: '12px' }}>
            ×
          </button>
        </div>
      )}
      {result && <EmotionResult {...result} />}
    </div>
  );
}

export default App;