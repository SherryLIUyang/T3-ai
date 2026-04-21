import {ArrowLeft, User, Bell, Shield, Moon, Clock, LogOut, ChevronRight} from 'lucide-react';
import {motion} from 'motion/react';
import {useNavigate} from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: '个人设置',
      items: [
        {icon: User, label: 'Sarah 的个人资料', detail: '已验证'},
        {icon: Bell, label: '通知设置', detail: '已开启'},
      ]
    },
    {
      title: '安全与偏好',
      items: [
        {icon: Shield, label: '隐私保护', detail: ''},
        {icon: Moon, label: '深色模式', detail: '跟随系统'},
        {icon: Clock, label: '行程历史', detail: ''},
      ]
    }
  ];

  return (
    <motion.div 
      initial={{opacity: 0, scale: 1.05}}
      animate={{opacity: 1, scale: 1}}
      className="min-h-screen bg-surface pb-32"
    >
      <header className="px-6 py-6 flex items-center gap-4 sticky top-0 bg-surface/80 backdrop-blur-xl z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-headline font-bold">设置</h1>
      </header>

      <main className="px-6 space-y-8">
        <div className="flex flex-col items-center py-6 gap-4">
          <div className="w-24 h-24 rounded-full bg-primary-container overflow-hidden border-4 border-white shadow-lg">
             <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuDueqLal27nXdWj57BeXPvlpLgNfyU6lLoqOxKueq7PAdlhmPeRbqOgTj4aK3lemP3op6hmm0JwphMiUbJOHdZsI9KekHRnpSKIBL87VW8I0RfHQLMKI8Pu9AgbeSG_qeclbhV7gdepMfX4kSgFnrYOYgmqnwV-bfbWptHhZKUm_mvMPxR63-C9uzjHQe8-acca5uZEaN4F_jIZLAtuUoFPTe2lryS1ZL88F57zoGxmoXD-utSCcobPEUS-mvr8RvZZg7nkrGyhJ-An" 
               alt="Sarah" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-headline font-bold">Sarah Williams</h2>
            <p className="text-sm text-secondary">sarah.w@example.com</p>
          </div>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xs font-bold text-neutral uppercase tracking-widest px-1">{section.title}</h3>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container">
              {section.items.map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors border-b last:border-b-0 border-surface-container"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant/60">
                    <span className="text-sm">{item.detail}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold bg-red-50 rounded-2xl mt-8">
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </main>
    </motion.div>
  );
}
