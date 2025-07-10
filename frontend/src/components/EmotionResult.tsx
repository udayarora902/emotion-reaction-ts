import React from 'react';
import { EmotionData } from '../App';

function EmotionResult({ emotion, confidence, emoji }: EmotionData) {
  return (
    <div className="result">
      <h2>{emoji} {emotion}</h2>
      <p>Confidence: {(confidence * 100).toFixed(0)}%</p>
    </div>
  );
}

export default EmotionResult;
