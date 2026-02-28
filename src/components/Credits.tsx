import React from 'react';
import { useApp } from '../contexts/AppContext';

export default function Credits() {
  const { theme } = useApp();

  const team = [
    { 
      name: 'Nguyễn Mậu Hiếu Nhân', 
      role: 'Developer',
      image: '/images/nhan.jpg' 
    },
    { 
      name: 'Nguyễn Danh Thành Lâm', 
      role: 'Developer',
      image: '/images/lam.jpg' 
    },
    { 
      name: 'Nguyễn Trung Hiếu', 
      role: 'Developer',
      image: '/images/hieu.jpg' 
    },
  ];

  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
          <img 
            src="/images/logo.png" 
            alt="BroA3 Tellab Logo" 
            className="h-24 w-auto object-contain drop-shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/200x80?text=BroA3+Tellab";
            }}
          />
        </div>

        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-10">
          Đội ngũ phát triển
        </h3>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=128`;
                  }}
                />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-center">
                {member.name}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 w-full text-center">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} BroA3 Tellab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}