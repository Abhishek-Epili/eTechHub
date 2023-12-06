# Python script (sentiment_analysis.py)

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import json

nltk.download('vader_lexicon')

def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    sentiment_scores = analyzer.polarity_scores(text)
    return sentiment_scores

if __name__ == '__main__':
    text = input()
    sentiment_scores = analyze_sentiment(text)
    print(json.dumps(sentiment_scores))  # Serialize the dictionary to JSON format
