import {Bot, Car, LineChart, Map, Compass, Settings} from 'lucide-react';
import {useLocation, useNavigate} from 'react-router-dom';
import {cn} from '@/src/lib/utils';

export function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {id: '/', label: 'AI中心', icon: Bot},
    {id: '/taxi', label: '打车', icon: Car},
    {id: '/insights', label: '洞察', icon: LineChart},
    {id: '/route', label: '路线', icon: Map},
    {id: '/explore', label: '探索', icon: Compass},
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full rounded-t-[24px] z-50 bg-white/90 dark:bg-[#191c1d]/90 backdrop-blur-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.06)] flex justify-around items-center px-4 pb-safe pt-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200",
              isActive 
                ? "text-primary bg-primary-container/20 rounded-2xl" 
                : "text-secondary"
            )}
          >
            <item.icon className={cn("w-6 h-6 mb-1", isActive && "fill-current")} />
            <span className="font-headline text-[10px] font-medium tracking-wider">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function TopBar({avatarUrl, title}: {avatarUrl?: string; title?: string}) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f8f9fa]/80 dark:bg-[#191c1d]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/settings')}
          className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden shadow-sm hover:scale-105 transition-transform"
        >
          <img 
            src={avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDueqLal27nXdWj57BeXPvlpLgNfyU6lLoqOxKueq7PAdlhmPeRbqOgTj4aK3lemP3op6hmm0JwphMiUbJOHdZsI9KekHRnpSKIBL87VW8I0RfHQLMKI8Pu9AgbeSG_qeclbhV7gdepMfX4kSgFnrYOYgmqnwV-bfbWptHhZKUm_mvMPxR63-C9uzjHQe8-acca5uZEaN4F_jIZLAtuUoFPTe2lryS1ZL88F57zoGxmoXD-utSCcobPEUS-mvr8RvZZg7nkrGyhJ-An"} 
            alt="Avatar" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
        </button>
      </div>
      <div className="font-headline font-bold text-xl bg-gradient-to-r from-primary to-[#00D2FF] bg-clip-text text-transparent antialiased tracking-tight">
        {title || "领航员"}
      </div>
      <button 
        onClick={() => navigate('/settings')}
        className="text-[#00D2FF] hover:bg-[#edeeef] dark:hover:bg-[#2c2f30] transition-colors p-2 rounded-full active:scale-95 duration-300"
      >
        <Settings className="w-6 h-6" />
      </button>
    </header>
  );
}
