import React, { useState } from 'react';
import axios from 'axios';

const CodeGenerator = () => {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateCode = async () => {
    if (!description) {
      alert('Please enter a programming problem!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B',
        {
          inputs: `${description}`,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCode(response.data[0].generated_text.trim());
    } catch (error) {
      setError('Error generating code. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>AI-Powered Code Snippet Generator</h1>
      <textarea
        placeholder="Describe your programming problem"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <button onClick={handleGenerateCode} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>
      {error && <div>{error}</div>}
      {code && (
        <div>
          <h2>Generated Code:</h2>
          <pre>{code}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
