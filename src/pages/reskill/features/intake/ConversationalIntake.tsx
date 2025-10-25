import { useState, useEffect, useRef } from 'react';
import type { IntakeData } from '@/types';
import type { Message } from './RileyChat';
import RileyChat from './RileyChat';
import {
  RILEY_WELCOME,
  RILEY_INTRO,
  INTAKE_STEPS,
  getRandomVariation,
  type QuestionConfig,
  type RileyMessage,
} from './rileyPersona';
import './conversational.css';

interface ConversationalIntakeProps {
  onComplete: (data: IntakeData) => void;
}

const ConversationalIntake: React.FC<ConversationalIntakeProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentRileyMessage, setCurrentRileyMessage] = useState<RileyMessage | null>(null);
  const [formData, setFormData] = useState<Partial<IntakeData>>({});
  const [currentQuestion, setCurrentQuestion] = useState<QuestionConfig | null>(null);
  const hasInitialized = useRef(false);

  // Get context for message interpolation (e.g., {firstName})
  const getContext = (): Record<string, string> => {
    return {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
    };
  };

  // Show Riley's message with typing indicator
  const showRileyMessage = (rileyMsg: RileyMessage, callback?: () => void) => {
    setIsTyping(true);
    setCurrentRileyMessage(rileyMsg);

    setTimeout(() => {
      const messageText = getRandomVariation(rileyMsg.variations, getContext());
      const newMessage: Message = {
        id: `riley-${Date.now()}`,
        sender: 'riley',
        content: messageText,
        personaType: rileyMsg.personaType,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);

      if (callback) {
        setTimeout(callback, 500);
      }
    }, rileyMsg.delayMs);
  };

  // Initialize conversation (only once, even in StrictMode)
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      // Show welcome message
      showRileyMessage(RILEY_WELCOME, () => {
        // Then show intro message
        showRileyMessage(RILEY_INTRO, () => {
          // Then start first question
          askNextQuestion();
        });
      });
    }
  }, []);

  // Ask the next question
  const askNextQuestion = (stepIndex?: number, questionIndex?: number) => {
    const stepIdx = stepIndex !== undefined ? stepIndex : currentStepIndex;
    const questionIdx = questionIndex !== undefined ? questionIndex : currentQuestionIndex;

    const step = INTAKE_STEPS[stepIdx];
    if (!step) return;

    const question = step.questions[questionIdx];
    if (!question) return;

    setCurrentQuestion(question);
    showRileyMessage(question.question);
  };

  // Handle user's answer
  const handleAnswerSubmit = () => {
    const step = INTAKE_STEPS[currentStepIndex];
    if (!step) return;

    const question = step.questions[currentQuestionIndex];
    if (!question) return;

    const answer = formData[question.field as keyof IntakeData];

    // Validate answer
    if (question.validation?.required) {
      if (!answer || (Array.isArray(answer) && answer.length === 0)) {
        return; // Don't proceed if required field is empty
      }
    }

    // Add user's answer to messages
    let displayValue = answer;
    if (Array.isArray(answer)) {
      displayValue = answer.join(', ');
    } else if (question.inputType === 'select' || question.inputType === 'radio') {
      const option = question.options?.find((opt) => opt.value === answer);
      displayValue = option?.label || answer;
    } else if (question.field === 'hasTransportation' || question.field === 'hasInternetAccess') {
      displayValue = answer === 'true' || answer === true ? 'Yes' : 'No';
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: String(displayValue),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentQuestion(null);

    // Show acknowledgment
    showRileyMessage(question.acknowledgment, () => {
      // Move to next question
      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex < step.questions.length) {
        // More questions in this step
        setCurrentQuestionIndex(nextQuestionIndex);
        askNextQuestion(currentStepIndex, nextQuestionIndex);
      } else {
        // Move to next step
        const nextStepIndex = currentStepIndex + 1;

        if (nextStepIndex < INTAKE_STEPS.length) {
          setCurrentStepIndex(nextStepIndex);
          setCurrentQuestionIndex(0);
          setTimeout(() => askNextQuestion(nextStepIndex, 0), 500);
        } else {
          // All done! Submit the form
          if (isIntakeDataComplete(formData)) {
            onComplete(formData as IntakeData);
          }
        }
      }
    });
  };

  // Handle field value change
  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: Partial<IntakeData>) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Type guard to check if intake data is complete
  const isIntakeDataComplete = (data: Partial<IntakeData>): data is IntakeData => {
    return !!(
      data.firstName &&
      data.lastName &&
      data.email &&
      data.zipCode &&
      data.currentOccupation &&
      data.currentIndustry &&
      data.yearsOfExperience !== undefined &&
      data.educationLevel &&
      data.desiredField &&
      data.desiredOccupation &&
      data.careerChangeReason &&
      data.timelineExpectation &&
      data.geographicConstraints &&
      data.timeAvailability &&
      data.financialConstraints &&
      data.hasTransportation !== undefined &&
      data.hasInternetAccess !== undefined &&
      data.currentSkills &&
      data.interests &&
      data.strengthAreas &&
      data.learningPreferences
    );
  };

  // Get current field value
  const getCurrentValue = () => {
    if (!currentQuestion) return undefined;
    let value = formData[currentQuestion.field as keyof IntakeData];

    // Convert boolean to string for radio inputs
    if (currentQuestion.inputType === 'radio' && typeof value === 'boolean') {
      value = String(value);
    }

    return value;
  };

  // Calculate progress
  const totalQuestions = INTAKE_STEPS.reduce((sum, step) => sum + step.questions.length, 0);
  const answeredQuestions = currentStepIndex * INTAKE_STEPS[0].questions.length + currentQuestionIndex;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <div className="conversational-intake">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">{progress}% Complete</div>
      </div>

      {/* Chat Interface */}
      <RileyChat
        currentQuestion={currentQuestion}
        rileyMessage={currentRileyMessage}
        isTyping={isTyping}
        value={getCurrentValue()}
        onChange={handleFieldChange}
        onSubmit={handleAnswerSubmit}
        messages={messages}
        context={getContext()}
      />
    </div>
  );
};

export default ConversationalIntake;
