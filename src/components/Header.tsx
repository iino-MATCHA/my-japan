/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tab } from '../types';

interface HeaderProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border-gray py-4 px-6 flex justify-between items-center shadow-xs">
      {/* Left side: MATCHA logo (links to MATCHA eSIM) */}
      <a
        href="https://esim.matcha-jp.com/"
        className="flex items-center cursor-pointer select-none active:opacity-80 transition-opacity"
        id="matcha-header-logo"
      >
        <img src="/matcha-logo.png" alt="MATCHA" className="h-6 w-auto select-none" />
      </a>
    </header>
  );
}
