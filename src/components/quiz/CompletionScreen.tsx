
import React, { useEffect } from 'react';
import { CompletionScreenProps } from '@/types/quiz';
import { BusinessProgress } from '../business-form/BusinessProgress';
import { useQuiz } from '@/context/QuizContext';
import quizData from '@/data/quiz-data.json';

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ onContinue }) => {
  const { answers, quizStartTime } = useQuiz();

  useEffect(() => {
    // Format data for Make.com webhook
    const formatDataForMake = () => {
      // Find business name from answers (q1)
      const businessName = answers['q1'] ? 
        (answers['q1'] as string).split('|')[0].trim() : 
        'Unknown Business';
      
      // Create quiz data with question-answer pairs
      const quizDataFormatted: Record<string, string> = {};
      
      Object.keys(answers).forEach(questionId => {
        // Find the question text from the quiz data
        const questionObj = quizData.questions.find(q => q.id === questionId);
        const questionText = questionObj ? questionObj.question_text : `Question ${questionId}`;
        
        // Format the answer (could be string or array)
        const answerValue = answers[questionId];
        const formattedAnswer = Array.isArray(answerValue) ? 
          answerValue.join('|') : 
          answerValue as string;
        
        // Add to formatted data
        quizDataFormatted[`${questionId}-question`] = questionText;
        quizDataFormatted[`${questionId}-answer`] = formattedAnswer;
      });
      
      // Create the final payload
      return {
        id: quizStartTime || new Date().getTime().toString(),
        name: businessName,
        "quiz-data": quizDataFormatted,
        submitted_at: new Date().toISOString(),
        source: window.location.href
      };
    };

    // Send data to Make.com webhook
    const sendDataToMake = async () => {
      try {
        const formattedData = formatDataForMake();
        
        const response = await fetch('https://hook.eu2.make.com/xfki0ndrt9r43yi7x5v8kpw3ath7glhh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        });
        
        console.log('Data sent to Make.com webhook with status:', response.status);
        console.log('Formatted data sent:', formattedData);
      } catch (error) {
        console.error('Error sending data to Make.com webhook:', error);
      }
    };

    sendDataToMake();

    // Set redirect timer
    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://app.thitny.com';
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [answers, quizStartTime]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-8 px-6">
      <BusinessProgress progress={100} />
      
      <div className="mt-12 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[#1e2b86] mb-4">
          Congratulations!
        </h2>
        <p className="text-lg text-[#1e2b86] mb-6">
          You've completed the business assessment quiz!
        </p>
        <div className="bg-[#E5DEFF] rounded-lg p-6 mb-8 shadow-sm">
          <p className="text-base text-[#1e2b86]">
            As a gift for completing this quiz, you'll receive a <span className="font-semibold">personalized business audit</span> to help you grow your business online.
          </p>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="self-stretch border w-full max-w-[400px] gap-2.5 text-base text-white whitespace-nowrap px-8 py-4 rounded-lg border-solid bg-[#465aea] border-[#465aea] cursor-pointer mt-8"
      >
        Continue to Thitny
      </button>
    </div>
  );
};
