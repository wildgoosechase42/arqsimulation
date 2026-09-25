import React, { useState } from 'react';
import { Speedometer } from './Speedometer';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  questions: Question[];
}

export function TestModal({ isOpen, onClose, title, subtitle, questions }: TestModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/30">
          <div>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold block mb-1">
              {subtitle}
            </span>
            <h3 className="text-xl font-bold text-foreground">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center border border-border transition-colors font-mono text-sm"
          >
            &times;
          </button>
        </div>

        {!isSubmitted ? (
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{answeredCount} of {questions.length} Answered</span>
            </div>

            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-base md:text-lg font-medium text-foreground leading-relaxed">
                {currentQ.question}
              </h4>

              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelect(optIdx)}
                      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(227,175,53,0.15)] text-foreground'
                          : 'bg-secondary/40 border-border hover:bg-secondary/70 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                        </div>
                      </div>
                      <span className="text-xs md:text-sm font-sans flex-1 leading-relaxed">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
            <Speedometer
              score={calculateScore()}
              total={questions.length}
              onRetake={handleReset}
            />

            <div className="border-t border-border pt-6 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                Detailed Review & Explanations
              </h4>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-red-950/20 border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-foreground font-sans">
                          {idx + 1}. {q.question}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {isCorrect ? 'CORRECT' : 'INCORRECT'}
                        </span>
                      </div>
                      <div className="text-muted-foreground font-sans text-xs">
                        <div>
                          Your answer: <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                            {userAns !== undefined ? q.options[userAns] : 'None'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-400 font-semibold mt-1">
                            Correct answer: {q.options[q.correctIndex]}
                          </div>
                        )}
                      </div>
                      <div className="pt-2 text-[11px] text-muted-foreground border-t border-border/40 font-sans">
                        <strong className="text-foreground">Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 md:p-6 border-t border-border bg-secondary/30 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {!isLastQuestion ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 active:scale-95 transition-all shadow"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 active:scale-95 transition-all shadow"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-secondary border border-border text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary/80 transition-all"
              >
                Close Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
