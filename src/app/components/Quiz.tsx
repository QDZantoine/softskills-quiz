'use client';
import React, { useState, useEffect } from 'react';
import { Question } from '../types/type';
import Image from 'next/image';
import { Meteors } from './ui/Meteors';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data: Question[]) => setQuestions(data))
      .catch((err) => console.error('Error loading questions:', err));
  }, []);

  const startQuiz = () => {
    loadRandomQuestion();
    setFeedbackMessage(null);
    setHasSubmitted(false);
  };

  const loadRandomQuestion = () => {
    setSelectedAnswer(null);
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);
    }
  };

  const submitAnswer = () => {
    if (!currentQuestion || selectedAnswer === null) {
      setFeedbackMessage('Please select an answer!');
      return;
    }
    setHasSubmitted(true);
    if (currentQuestion.correctAnswer === selectedAnswer) {
      setFeedbackMessage(
        `Correct! This demonstrates your ${currentQuestion.softSkill} skills.`
      );
    } else {
      setFeedbackMessage('Incorrect. Try again!');
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      {!currentQuestion ? (
        <div className="relative bg-black/70 text-white rounded-lg p-8 shadow-2xl max-w-2xl mx-auto backdrop-blur-md overflow-hidden">
          <div className="relative h-32 -mt-8">
            <Meteors color="rgba(255, 255, 255, 0.1)" count={10} />
            <div className="absolute inset-0 flex justify-center items-center">
              <Image
                src="/img/logo-white.svg"
                alt="Logo"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 mt-4">
            Soft Skills Quiz
          </h1>
          <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="relative bg-black/70 text-white rounded-lg p-8 shadow-2xl max-w-2xl mx-auto backdrop-blur-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Soft Skills Quiz
          </h1>
          <p className="text-lg font-semibold mb-6">
            {currentQuestion.question}
          </p>
          <div>
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className="block bg-slate-800 text-white rounded-lg py-3 px-6 mb-3 hover:bg-slate-700 transition-colors duration-300"
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  onChange={() => setSelectedAnswer(index)}
                  disabled={hasSubmitted}
                  className="mr-3 accent-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
          <button
            onClick={submitAnswer}
            disabled={hasSubmitted}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300"
          >
            Submit
          </button>
          {feedbackMessage && (
            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-300">
                {feedbackMessage}
              </p>
              {currentQuestion?.softSkill &&
                selectedAnswer === currentQuestion.correctAnswer && (
                  <button
                    onClick={() => setShowDefinition(true)}
                    className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                  >
                    {currentQuestion.softSkill}
                  </button>
                )}
              {showDefinition && (
                <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                  <p className="text-white text-sm">
                    {currentQuestion.definition}
                  </p>
                  <button
                    onClick={() => setShowDefinition(false)}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
