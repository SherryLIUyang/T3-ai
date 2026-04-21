import {ArrowRight, Circle, MapPin, Zap, TrainFront, Car, Footprints, Bus, Loader2} from 'lucide-react';
import {motion} from 'motion/react';
import {useState, useEffect} from 'react';

export default function RoutePlanner() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/routes')
      .then(res => res.json())
      .then(data => {
        setRoutes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching routes:', err);
        setLoading(false);
      });
  }, []);
  return (
    <motion.div 
      initial={{opacity: 0, x: 20}}
      animate={{opacity: 1, x: 0}}
      className="pb-32 bg-surface-container-lowest min-h-screen"
    >
      {/* Map Context Area */}
      <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl-StXFtjhuwPyunFZiqvR5U4w0K3D0_WwRexw6ur5YUMe5NKLXaIR5jB3o-PD7Gf5Vzvhvl_DzWXlSjfov6xv8fGeGKzdo9Y5A7j94L7P8Iw6GD56My7SjKAubwPN9SrJd7kEXEn41D99dhq0a6cIs5ycNi9JoC7YcK-xH_MK3R0OS66kZfw_USgJ2UMQfL9mG8zrA1bjO5SkhHMHDGpstKBblOyTw_UWmnOkjKPfzUDIUNWSZfb4Y2Ooxk55O21ih4IGHivpg7mM" 
          alt="Map View" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest"></div>
        {/* Route Summary Pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-lowest/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center gap-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,84,214,0.6)]"></div>
            <span className="text-sm font-medium text-on-surface">出发地</span>
          </div>
          <ArrowRight className="w-4 h-4 text-outline-variant" />
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-tertiary-container shadow-[0_0_8px_rgba(255,178,41,0.6)]"></div>
            <span className="text-sm font-medium text-on-surface">目的地</span>
          </div>
        </div>
      </div>

      <main className="px-6 relative z-10 -mt-2">
        {/* Destination Input */}
        <div className="bg-surface-container rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex items-center gap-4 relative">
            <div className="flex flex-col items-center justify-center w-6 z-10 bg-surface-container">
              <Circle className="text-primary w-5 h-5 fill-current" />
            </div>
            <input 
              readOnly 
              type="text" 
              value="当前位置"
              className="bg-transparent border-none text-on-surface font-body text-lg w-full focus:ring-0 p-0 placeholder:text-on-surface-variant cursor-default" 
            />
          </div>
          <div className="h-6 ml-[11px] border-l-2 border-dashed border-outline-variant/50 my-1"></div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center w-6">
              <MapPin className="text-tertiary-container w-5 h-5 fill-current" />
            </div>
            <input 
              placeholder="您要去哪里？" 
              type="text" 
              defaultValue="静安嘉里中心"
              className="bg-surface-container-highest border-none text-on-surface font-headline text-xl font-semibold w-full focus:ring-0 rounded-lg p-3 placeholder:text-on-surface-variant/70 shadow-inner transition-all" 
            />
          </div>
        </div>

        {/* Strategy Selectors */}
        <h2 className="font-headline text-2xl font-semibold text-on-surface mb-4 tracking-tight">推荐方案</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide">
          <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-medium tracking-wider flex items-center gap-2 shadow-[0_8px_32px_rgba(0,84,214,0.24)] shrink-0">
            <Zap className="w-4 h-4 fill-current" /> 最快
          </button>
          <button className="px-6 py-2.5 rounded-full bg-surface-container text-on-surface font-medium tracking-wider hover:bg-surface-container-high transition-colors shrink-0">
            最少换乘
          </button>
          <button className="px-6 py-2.5 rounded-full bg-surface-container text-on-surface font-medium tracking-wider hover:bg-surface-container-high transition-colors shrink-0">
            最省钱
          </button>
        </div>

        {/* Multi-modal Route Options */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            routes.map(route => {
              if (route.is_ai_recommended) {
                return (
                  <div key={route.id} className="bg-surface-container-lowest rounded-[1.5rem] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/10 text-primary text-[10px] px-2.5 py-1 rounded-full font-bold tracking-widest flex items-center gap-1 uppercase">
                            <Zap className="w-3 h-3" /> AI优选
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-headline text-[2.5rem] leading-none text-on-surface font-bold tracking-tight">{route.duration_minutes}<span className="text-xl font-medium text-on-surface-variant ml-1">分钟</span></h3>
                        </div>
                        <p className="text-base text-on-surface-variant">预计 {route.arrival_time} 到达</p>
                      </div>
                      <div className="text-right">
                        <span className="font-headline text-xl text-on-surface font-bold">¥{route.price.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    {/* Timeline Viz */}
                    <div className="flex items-center gap-3 text-sm text-on-surface mb-8 relative z-10 bg-surface-container-low p-4 rounded-xl">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                          <Footprints className="text-secondary w-4 h-4" />
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-medium">{route.segments[0].distance}</span>
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-surface-variant to-tertiary-container/30 relative">
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-tertiary-container"></div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center shadow-sm border border-tertiary-container/20 text-tertiary-container">
                          <TrainFront className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold">{route.segments[1].name}</span>
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-tertiary-container/30 to-primary/30 relative">
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20 text-primary">
                          <Car className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[10px] font-bold">{route.segments[2].name}</span>
                      </div>
                    </div>
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-semibold text-lg shadow-[0_8px_32px_rgba(0,84,214,0.2)] active:scale-95 transition-transform duration-300 relative z-10">
                      确认路线并叫车
                    </button>
                  </div>
                );
              } else {
                return (
                  <div key={route.id} className="bg-surface-container rounded-[1.5rem] p-6 transition-colors hover:bg-surface-container-high cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-headline text-[2rem] leading-none text-on-surface font-semibold tracking-tight">{route.duration_minutes}<span className="text-lg font-medium text-on-surface-variant ml-1">分钟</span></h3>
                        </div>
                        <p className="text-base text-on-surface-variant">预计 {route.arrival_time} 到达</p>
                      </div>
                      <div className="text-right">
                        <span className="font-headline text-xl text-on-surface font-semibold">¥{route.price.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm opacity-80">
                      <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center">
                        <Footprints className="text-on-surface-variant w-3 h-3" />
                      </div>
                      <div className="flex-1 border-t border-dashed border-outline-variant/60"></div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center">
                          <Bus className="text-on-surface-variant w-3 h-3" />
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-medium">{route.segments[1].name}</span>
                      </div>
                      <div className="flex-1 border-t border-dashed border-outline-variant/60"></div>
                      <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center">
                        <Footprints className="text-on-surface-variant w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      </main>
    </motion.div>
  );
}
