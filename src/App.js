import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState('');

  const problemStatement = `
  A knight and a pawn are on a chess board. Can you figure out the minimum number of moves required for the knight to travel to the same position of the pawn? 
  On a single move, the knight can move in an "L" shape; two spaces in any direction, then one space in a perpendicular direction. This means that on a single move, a knight has eight possible positions it can move to.
  Write a function, knight_attack, that takes in 5 arguments:
  n, kr, kc, pr, pc
  n = the length of the chess board
  kr = the starting row of the knight
  kc = the starting column of the knight
  pr = the row of the pawn
  pc = the column of the pawn
  The function should return a number representing the minimum number of moves required for the knight to land on top of the pawn. The knight cannot move out of bounds of the board. 
  You can assume that rows and columns are 0-indexed. This means that if n = 8, there are 8 rows and 8 columns numbered 0 to 7. If it is not possible for the knight to attack the pawn, then return None.
  
  Example:
  - knight_attack(8, 1, 1, 2, 2) should return 2
  - knight_attack(8, 1, 1, 2, 3) should return 1
  `;

  const handleSubmit = async () => {
    await submitCode(code);
  };

  const submitCode = async (submittedCode) => {
    const response = await fetch('https://na8xlb76ob.execute-api.ap-south-1.amazonaws.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: submittedCode, student_id: 'example-student-id' }),
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
