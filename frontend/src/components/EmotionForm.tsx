import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
  loading: boolean;
}

function EmotionForm({ onSubmit, loading }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={4}
        placeholder="Write your reflection..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default EmotionForm;
