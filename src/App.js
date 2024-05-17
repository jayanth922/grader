import React, { useState } from 'react';
import './App.css'; // Make sure to create and import this CSS file


const App = () => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState('');

  const problemStatement = `
  Write a function called 'matrix_multiply' that takes two matrices 'A' and 'B' (represented as lists of lists) 
  and returns their product. If the matrices cannot be multiplied due to incompatible dimensions, the function should return 'None'.

  Example:
  - matrix_multiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]) should return [[19, 22], [43, 50]]
  - matrix_multiply([[1, 2]], [[3], [4]]) should return [[11]]
  `;

  const handleSubmit = async () => {
    await submitCode(code);
  };

  const submitCode = async (submittedCode) => {
    const response = await fetch('https://na8xlb76ob.execute-api.ap-south-1.amazonaws.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: submittedCode, student_id: 'example-student-id' }), // replace with actual student ID
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="app-container">
      <h1>Auto Grader</h1>
      <div>
        <h2>Problem Statement</h2>
        <pre>{problemStatement}</pre>
      </div>
      <div className="code-submit-container">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type your code here"
          className="code-input"
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
      {results && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
