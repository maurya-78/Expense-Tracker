import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';

const CustomTooltip = ({ content, children }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-help inline-flex items-center">
            {children || <Info size={14} className="text-slate-400 ml-1" />}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs bg-slate-900 text-white p-2 rounded-lg text-xs shadow-xl animate-in fade-in zoom-in duration-200"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;