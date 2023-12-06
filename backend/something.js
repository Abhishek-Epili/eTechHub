const { spawn } = require('child_process');
const pythonProcess = spawn('python', ['sentiment_analysis.py']);

// Input text to be analyzed
const inputText = "Awful experience, everything stuck, cooked evenly. The only problem is that it's not really a good product";

// Send the input text to the Python script
pythonProcess.stdin.write(inputText);
pythonProcess.stdin.end();

// Handle Python script output
pythonProcess.stdout.on('data', (data) => {
    const sentimentScores = JSON.parse(data);
    console.log('Sentiment Scores:', sentimentScores);
});

// Handle errors
pythonProcess.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
});

// Handle script termination
pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
});
