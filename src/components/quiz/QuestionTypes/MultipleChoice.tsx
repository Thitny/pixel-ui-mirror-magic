
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  LightbulbIcon, 
  Youtube, 
  CheckCircle,
  XCircle,
  Droplet,
  Wallet,
  Users,
  ThumbsUp,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Calendar,
  Pencil,
  Repeat,
  MessagesSquare,
  HelpCircle,
  Hammer,
  Building,
  Wrench
} from 'lucide-react';
import { TiktokIcon } from '@/components/icons/TiktokIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface MultipleChoiceProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  questionId?: string;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ options, value, onChange, questionId }) => {
  const handleChange = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  // Function to extract emoji from the start of an option if present
  const extractEmoji = (option: string) => {
    const emojiRegex = /^([\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{1F1E0}-\u{1F1FF}✅❓❗🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜💹💲💰💸🏊💧🔧🛠️🌊📝🍽️☕💇🐕]+ )/u;
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

  // Function to get social media icon for specific platforms
  const getSocialIcon = (option: string) => {
    const platform = option.toLowerCase();
    if (platform === 'facebook') {
      return <Facebook className="mr-3 text-[#1877F2]" size={24} />;
    } else if (platform === 'instagram') {
      return <Instagram className="mr-3 text-[#E1306C]" size={24} />;
    } else if (platform === 'linkedin') {
      return <Linkedin className="mr-3 text-[#0077B5]" size={24} />;
    } else if (platform === 'tiktok') {
      return <TiktokIcon className="mr-3 text-black" size={24} />;
    } else if (platform === 'pinterest') {
      // Using a custom SVG for Pinterest since it's not in lucide-react
      return (
        <svg 
          className="mr-3"
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2C6.477 2 2 6.477 2 12C2 16.237 4.636 19.855 8.356 21.312C8.268 20.504 8.189 19.27 8.391 18.338C8.573 17.5 9.563 13.521 9.563 13.521C9.563 13.521 9.238 12.877 9.238 11.934C9.238 10.445 10.067 9.339 11.111 9.339C12.001 9.339 12.429 10.012 12.429 10.812C12.429 11.712 11.854 13.033 11.559 14.258C11.312 15.278 12.08 16.105 13.085 16.105C14.921 16.105 16.358 14.135 16.358 11.362C16.358 8.876 14.58 7.106 11.944 7.106C8.899 7.106 7.163 9.229 7.163 11.797C7.163 12.701 7.461 13.346 7.929 13.903C8.131 14.146 8.156 14.241 8.089 14.522C8.04 14.736 7.926 15.223 7.88 15.425C7.815 15.705 7.593 15.792 7.336 15.69C5.96 15.116 5.246 13.422 5.246 11.539C5.246 8.372 7.553 5.391 12.216 5.391C15.959 5.391 18.704 7.914 18.704 11.264C18.704 14.965 16.421 17.787 13.285 17.787C12.245 17.787 11.271 17.252 10.947 16.629C10.947 16.629 10.427 18.535 10.315 18.948C10.111 19.717 9.647 20.487 9.222 21.06C10.111 21.34 11.041 21.5 12 21.5C17.523 21.5 22 17.023 22 12C22 6.477 17.523 2 12 2Z" 
            fill="#E60023"
          />
        </svg>
      );
    } else if (platform === 'youtube') {
      return <Youtube className="mr-3 text-[#FF0000]" size={24} />;
    } else if (platform.includes('twitter') || platform.includes('x')) {
      // Using the renderIcon prop for Twitter/X icon
      return (
        <svg 
          className="mr-3"
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M17.1761 4H20.3037L14.0516 11.0948L21.5 21H15.3166L10.9847 15.2663L5.95132 21H2.82132L9.47663 13.4452L2.33337 4H8.64468L12.5732 9.19474L17.1761 4ZM16.145 19.4224H17.6761L7.79047 5.52066H6.14626L16.145 19.4224Z" 
            fill="#000000"
          />
        </svg>
      );
    }
    return null;
  };

  // Function to get an appropriate icon for non-social media options
  const getIconForOption = (text: string) => {
    const lowerText = text.toLowerCase();

    // Special handling for question about business types (q2)
    if (questionId === 'q2') {
      if (lowerText.includes('restaurant')) return <Building className="mr-3 text-[#1a73e8]" size={24} />;
      if (lowerText.includes('café') || lowerText.includes('cafe')) return <Building className="mr-3 text-[#8B4513]" size={24} />;
      if (lowerText.includes('hair cut')) return <Building className="mr-3 text-[#ff6b9d]" size={24} />;
      if (lowerText.includes('pet grooming')) return <Building className="mr-3 text-[#ff9500]" size={24} />;
      if (lowerText.includes('pool service')) return <Droplet className="mr-3 text-[#22c55e]" size={24} />;
      if (lowerText.includes('vehicle maintenance')) return <Wrench className="mr-3 text-[#ef4444]" size={24} />;
    }

    // Special handling for question q8 about social media obstacles
    if (questionId === 'q8') {
      if (lowerText.includes('creating engaging content') || lowerText.includes('creating')) {
        return <Pencil className="mr-3 text-[#1a73e8]" size={24} />;
      } else if (lowerText.includes('staying consistent') || lowerText.includes('consistent')) {
        return <Repeat className="mr-3 text-[#22c55e]" size={24} />;
      } else if (lowerText.includes('interacting with followers') || lowerText.includes('comments')) {
        return <MessagesSquare className="mr-3 text-[#9333ea]" size={24} />;
      } else if (lowerText.includes('not sure') || lowerText.includes('where to start')) {
        return <HelpCircle className="mr-3 text-[#8E9196]" size={24} />;
      }
    }

    // General business types
    if (lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('budget')) return <Wallet className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('client') || lowerText.includes('customer')) return <Users className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('review') || lowerText.includes('rating')) return <ThumbsUp className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('message') || lowerText.includes('chat')) return <MessageCircle className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('call') || lowerText.includes('phone')) return <Phone className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('email') || lowerText.includes('mail')) return <Mail className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('time') || lowerText.includes('hour')) return <Clock className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText.includes('date') || lowerText.includes('schedule')) return <Calendar className="mr-3 text-[#1a73e8]" size={24} />;
    if (lowerText === 'none') return <XCircle className="mr-3 text-[#ef4444]" size={24} />;
    
    // Default icon
    return <CheckCircle className="mr-3 text-[#22c55e]" size={24} />;
  };

  // Check if this is the social media question (q6)
  const isSocialMediaQuestion = options.some(opt => 
    ['facebook', 'instagram', 'linkedin', 'tiktok', 'twitter', 'pinterest', 'youtube', 'none'].map(s => s.toLowerCase())
      .includes(opt.toLowerCase())
  );

  // Check if this is the obstacle question (q8)
  const isObstacleQuestion = questionId === 'q8';

  // Check if this is the data collection question (q25)
  const isDataCollectionQuestion = questionId === 'q25';

  // Check if this is the business type question (q2)
  const isBusinessTypeQuestion = questionId === 'q2';

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const { emoji, text } = extractEmoji(option);
        const socialIcon = isSocialMediaQuestion ? getSocialIcon(option) : null;
        const generalIcon = !emoji && !socialIcon ? getIconForOption(text) : null;
        
        return (
          <div 
            key={index} 
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              value.includes(option) ? 
              'bg-[#e3f0ff] border-[#1a73e8]' : 
              'bg-white border-[#c7dcf7] hover:bg-[#f2f8ff]'
            }`}
          >
            <Checkbox
              id={`option-${index}`}
              checked={value.includes(option)}
              onCheckedChange={() => handleChange(option)}
              className="mr-3"
            />
            <Label htmlFor={`option-${index}`} className="flex items-center text-base text-[#1a4b8a] cursor-pointer w-full">
              {socialIcon || (emoji && <span className="text-xl mr-2">{emoji}</span>) || generalIcon}
              {text}
            </Label>
          </div>
        );
      })}

      {isObstacleQuestion && (
        <div className="mt-4 bg-[#e3f0ff] border border-[#a8d1ff] p-3 rounded-md text-sm text-[#1a4b8a]">
          <p className="font-medium">Interesting fact: 90% of small businesses in Florida face similar challenges</p>
        </div>
      )}

      {isBusinessTypeQuestion && (
        <div className="mt-4 bg-[#e3f0ff] border border-[#a8d1ff] p-3 rounded-md text-sm text-[#1a4b8a]">
          <p className="font-medium">Florida businesses that diversify their services typically see 35% higher annual revenue</p>
        </div>
      )}

      {isDataCollectionQuestion && (
        <div className="mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center bg-[#e3f0ff] border border-[#a8d1ff] px-3 py-1.5 rounded-md text-[#1a4b8a] cursor-help">
                  <LightbulbIcon size={16} className="mr-2 text-[#1a73e8]" />
                  <span className="text-sm">Business tip</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-[#c7dcf7] p-3 max-w-xs shadow-lg">
                <p className="text-sm text-[#1a4b8a]">Proper data collection helps provide better service and build stronger customer relationships</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      <p className="text-sm text-[#5b7da0] italic mt-2">*multiple answers possible</p>
    </div>
  );
};
