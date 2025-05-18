
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SingleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SingleChoice: React.FC<SingleChoiceProps> = ({ options, value, onChange }) => {
  // Function to extract emoji from the start of an option if present
  const extractEmoji = (option: string) => {
    const emojiRegex = /^([\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{1F1E0}-\u{1F1FF}✅❓❗🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜💹💲💰💸]+ )/u;
    const match = option.match(emojiRegex);
    
    if (match) {
      return {
        emoji: match[0].trim(),
        text: option.replace(emojiRegex, '').trim()
      };
    }
    
    return {
      emoji: null,
      text: option
    };
  };

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-3"
    >
      {options.map((option, index) => {
        const { emoji, text } = extractEmoji(option);
        return (
          <div 
            key={index} 
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              value === option ? 
              'bg-[#e3f0ff] border-[#1a73e8]' : 
              'bg-white border-[#c7dcf7] hover:bg-[#f2f8ff]'
            }`}
          >
            <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
            <Label htmlFor={`option-${index}`} className="flex items-center text-base text-[#1a4b8a] cursor-pointer w-full">
              {emoji && <span className="text-xl mr-2">{emoji}</span>}
              {text}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
