import {MapPin, Phone, MessageSquare, ShieldCheck, Map as MapIcon, ChevronRight} from 'lucide-react';
import {motion} from 'motion/react';
import {useNavigate} from 'react-router-dom';

export default function TripStatus() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="min-h-screen bg-surface pb-32"
    >
      {/* Map Background */}
      <div className="h-[45vh] relative overflow-hidden bg-surface-container">
         <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl-StXFtjhuwPyunFZiqvR5U4w0K3D0_WwRexw6ur5YUMe5NKLXaIR5jB3o-PD7Gf5Vzvhvl_DzWXlSjfov6xv8fGeGKzdo9Y5A7j94L7P8Iw6GD56My7SjKAubwPN9SrJd7kEXEn41D99dhq0a6cIs5ycNi9JoC7YcK-xH_MK3R0OS66kZfw_USgJ2UMQfL9mG8zrA1bjO5SkhHMHDGpstKBblOyTw_UWmnOkjKPfzUDIUNWSZfb4Y2Ooxk55O21ih4IGHivpg7mM"
          className="w-full h-full object-cover opacity-80"
          alt="Map"
          referrerPolicy="no-referrer"
        />
        <header className="absolute top-0 w-full p-6 flex justify-between items-start pointer-events-none">
           <button 
             onClick={() => navigate('/taxi')}
             className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center pointer-events-auto"
           >
              <ChevronRight className="w-5 h-5 rotate-180" />
           </button>
           <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg text-center pointer-events-auto">
              <p className="text-xs font-bold text-primary uppercase">为您寻找车辆中</p>
              <h2 className="text-lg font-bold">预计 3 分钟后上车</h2>
           </div>
           <div className="w-10"></div>
        </header>

        {/* Animated Pulsing Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <motion.div 
             animate={{scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3]}}
             transition={{duration: 2, repeat: Infinity}}
             className="absolute inset-0 bg-primary rounded-full"
           ></motion.div>
           <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl border-4 border-white text-white">
              <MapPin className="w-6 h-6 fill-current" />
           </div>
        </div>
      </div>

      <main className="px-6 -mt-8 relative z-10 space-y-6">
        {/* Driver Info Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-surface-container flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-surface-container overflow-hidden border border-surface-container">
                    <img 
                      src="https://picsum.photos/seed/driver/200/200" 
                      alt="Driver" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold">王师傅</h3>
                    <p className="text-sm text-secondary">沪 A·88888 · 黑色特斯拉</p>
                    <div className="flex items-center gap-1 mt-1">
                       <ShieldCheck className="w-3.5 h-3.5 text-green-500 fill-current" />
                       <span className="text-xs font-bold text-green-600">已实人认证 · 4.9 分</span>
                    </div>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5 fill-current" />
                 </button>
                 <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5 fill-current" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-2xl">
                 <p className="text-[10px] uppercase font-bold text-secondary mb-1">车型</p>
                 <p className="font-bold">AI 舒适型</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl">
                 <p className="text-[10px] uppercase font-bold text-secondary mb-1">价格</p>
                 <p className="font-bold">约 ¥45.20</p>
              </div>
           </div>
        </div>

        {/* Action List */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-surface-container shadow-sm">
           <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low border-b border-surface-container">
              <div className="flex items-center gap-3">
                 <MapIcon className="w-5 h-5 text-secondary" />
                 <div className="text-left">
                    <p className="font-bold">分享行程</p>
                    <p className="text-xs text-secondary">向实时亲友同步位置</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline-variant" />
           </button>
           <button 
             onClick={() => navigate('/')}
             className="w-full p-4 text-center text-on-surface-variant font-medium hover:bg-red-50 hover:text-red-500 transition-colors"
           >
              取消订单
           </button>
        </div>
      </main>
    </motion.div>
  );
}
