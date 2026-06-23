/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import MyJapanView from './components/MyJapanView';
import { Tab } from './types';
import { Wifi, Tag, Gift, User, Star, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.MY_JAPAN);
  const [progressPercent, setProgressPercent] = useState<number>(() => {
    const saved = localStorage.getItem('japan_visited_records_v3');
    let visitedCount = 8; // MOCK_VISITED initial length
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        visitedCount = Object.keys(parsed).filter(id => parsed[id]).length;
      } catch (e) {
        // Fall back
      }
    }
    return Math.round((visitedCount / 47) * 100);
  });

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('japan_visited_records_v3');
      let visitedCount = 8;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          visitedCount = Object.keys(parsed).filter(id => parsed[id]).length;
        } catch (e) {
          // Fall back
        }
      }
      setProgressPercent(Math.round((visitedCount / 47) * 100));
    };

    window.addEventListener('japan_visited_updated', handleUpdate);
    return () => {
      window.removeEventListener('japan_visited_updated', handleUpdate);
    };
  }, []);

  // Styled placeholder views with appropriate theme colors to match MATCHA identity
  const renderActiveView = () => {
    switch (currentTab) {
      case Tab.MY_JAPAN:
        return <MyJapanView />;
      case Tab.ESIM:
        return (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in" id="esim-tab-content">
            <div className="w-16 h-16 rounded-2xl bg-[#74A732]/10 flex items-center justify-center text-matcha mb-5 shadow-2xs">
              <Wifi className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-dark-slate mb-2">High-Speed Japan eSIM</h2>
            <p className="text-xs text-gray-500 max-w-xs mb-6 leading-relaxed">
              Stay connected across Japan with instant activation in under 2 minutes. No physical SIM needed.
            </p>
            <button className="bg-matcha text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer">
              <span>View Data Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      case Tab.COUPONS:
        return (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in" id="coupons-tab-content">
            <div className="w-16 h-16 rounded-2xl bg-[#74A732]/10 flex items-center justify-center text-matcha mb-5 shadow-2xs">
              <Tag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-dark-slate mb-2">Exclusive Travel Deals</h2>
            <p className="text-xs text-gray-500 max-w-xs mb-6 leading-relaxed">
              Save up to 20% on bullet train tickets, matcha cafes, museum entries, and select tax-free shopping partners.
            </p>
            <div className="w-full max-w-xs bg-[#FAF9F5] border border-dashed border-slate-300 p-4 rounded-xl text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-matcha">MATCHA Welcome Deal</span>
                <span className="bg-matcha/10 text-matcha text-[9px] font-black px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-sm font-bold text-dark-slate">10% OFF Matcha & Parfait shops</p>
            </div>
          </div>
        );
      case Tab.REFERRAL:
        return (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in" id="referral-tab-content">
            <div className="w-16 h-16 rounded-2xl bg-[#74A732]/10 flex items-center justify-center text-matcha mb-5 shadow-2xs">
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-dark-slate mb-2">Invite Friends, Earn Rewards</h2>
            <p className="text-xs text-gray-500 max-w-xs mb-6 leading-relaxed">
              Share the magic of Japan. Gift your friends free high-speed mobile data, and receive 1,000¥ points on their first trip.
            </p>
            <button className="bg-matcha text-white font-bold text-xs px-5 py-3 rounded-full shadow-sm active:scale-95 cursor-pointer">
              Get Invite Link
            </button>
          </div>
        );
      case Tab.MY_PAGE:
        return (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in" id="mypage-tab-content">
            <div className="w-16 h-16 rounded-2xl bg-[#74A732]/10 flex items-center justify-center text-matcha mb-5 shadow-2xs">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-dark-slate mb-1">My Matcha Account</h2>
            <p className="text-[11px] text-matcha font-bold mb-4">iino@matcha-jp.com</p>
            
            <div className="w-full max-w-xs bg-white border border-slate-200 p-4 rounded-xl text-left shadow-2xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /></div>
                <div>
                  <p className="text-xs font-bold text-dark-slate">Matcha Level 1 Explorer</p>
                  <p className="text-[10px] text-gray-400">0 of 5 prefectures fully researched</p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Account Tier</span>
                <span className="font-bold text-dark-slate">Premium Explorer</span>
              </div>
            </div>
          </div>
        );
      default:
        return <MyJapanView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col">
      {/* Maximum viewport wrapper designed to mirror an elegant mobile app frame on large desktops */}
      <div className={`w-full max-w-lg mx-auto bg-white shadow-xl flex flex-col relative border-x border-[#EAEAEA] overflow-hidden ${
        currentTab === Tab.MY_JAPAN ? 'h-screen pb-[72px]' : 'min-h-screen pb-24'
      }`}>
        
        {/* Dynamic Overlapping Circles Illustration (Background underlayer, top-left position, 1.2x size, 50% opacity, placed directly on the main background) */}
        {currentTab === Tab.MY_JAPAN && (
          <div 
            className="absolute z-0 pointer-events-none select-none overflow-visible bg-transparent border-none outline-none shadow-none"
            style={{ width: '600px', height: '420px', left: '-44px', top: '12px' }}
            id="master-of-japan-bg-circles-app"
          >
            <svg width="600" height="420" viewBox="0 0 600 420" className="absolute inset-0 bg-transparent overflow-visible">
              {/* Light Matcha circle: Left-Down (#E8F5D8, 50% opacity, 1.2x size, originally cx=140 cy=165) */}
              <circle 
                cx={100} 
                cy={165} 
                r={86 + (1 - progressPercent / 100) * 26} 
                fill="#E8F5D8" 
                fillOpacity={0.5}
                stroke="#8CC63F"
                strokeWidth="2"
                strokeOpacity={0.25}
                className="transition-all duration-500 ease-out"
              />
              {/* Matcha circle: Right-Up (#8CC63F, 50% opacity, 1.2x size, originally cx=210 cy=105) */}
              <circle 
                cx={210} 
                cy={105} 
                r={86 + (progressPercent / 100) * 26} 
                fill="#8CC63F" 
                fillOpacity={0.5}
                stroke="#74A732"
                strokeWidth="2.5"
                strokeOpacity={0.25}
                className="transition-all duration-500 ease-out"
              />
            </svg>
          </div>
        )}

        {/* Persistent Top Header logo */}
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Dynamic content render area */}
        <main className={`flex-grow animate-fade-in ${
          currentTab === Tab.MY_JAPAN ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'
        }`}>
          {renderActiveView()}
        </main>
        
        {/* Fixed Floating Bottom Navigation bar items */}
        <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
        
      </div>
    </div>
  );
}
