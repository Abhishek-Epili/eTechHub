const { spawn } = require('child_process');
const pythonProcess = spawn('python', ['sentiment_analysis.py']);

// Input text to be analyzed
const inputText = "We were provided a router that has the same IP address as our computer, and the router has an IP address that is 128.168.x.x. This router is very reliable and reliable. The only problem I have with it is that it is a bit short for the length it is mounted on the wall. I have had to mount it by a little bit more than I was comfortable with before I installed the router. The shortness of the wire makes it difficult to find a spot where it is going to be too long, which is why I put it in a corner of the room where it is not going to be comfortable. I would recommend this router to anyone looking for a wireless router to get them into the range where they can easily reach it and get a better experience.This cable works fine for the price.  I would buy it again.My only complaint is that the cable does not come with a cover.  I have not tried that yet.I love this case.  I have been using it for several months and I would recommend it to anyone looking for a very strong case.  The case fits snugly and is comfortable to wear.  The case is made of high quality materials and it has a sturdy feel.  The case is made of durable, well-made material that does not rub against the sides or protect against the material.  The case is also very light and fits well in the hand.  The case is padded and the material is very easy to use.  It is really comfortable and comfortable to wear.  The case is made of a very durable material and it is very soft.  The handle is made of solid black material which is very";

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
