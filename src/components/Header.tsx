/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User } from 'lucide-react';
import { Tab } from '../types';

interface HeaderProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border-gray py-4 px-6 flex justify-between items-center shadow-xs">
      {/* Left side: Accent solid circle + MATCHA bold label */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer select-none active:opacity-80 transition-opacity"
        onClick={() => setCurrentTab(Tab.MY_JAPAN)}
        id="matcha-header-logo"
      >
        <div className="w-5.5 h-5.5 rounded-full bg-matcha shadow-xs flex items-center justify-center animate-pulse" />
        <span className="font-sans font-bold tracking-widest text-[#112A2E] text-lg">
          MATCHA
        </span>
      </div>

      {/* Right side: User profile outline trigger */}
      <div className="flex items-center gap-3">

        <button 
          id="header-user-btn"
          aria-label="User Profile"
          className="p-1 bg-white border border-border-gray hover:border-[#112A2E] hover:text-matcha transition-colors text-[#112A2E] flex items-center justify-center rounded-full relative shadow-3xs cursor-pointer focus:outline-hidden"
          onClick={() => setCurrentTab(Tab.MY_PAGE)}
        >
          <div className="w-8 h-8 rounded-full border border-border-gray flex items-center justify-center bg-[#FDFEFC]">
            <User className="w-4.5 h-4.5 text-[#112A2E] stroke-[1.8]" />
          </div>
          {/* Active status indicator green dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-matcha border-2 border-white rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
