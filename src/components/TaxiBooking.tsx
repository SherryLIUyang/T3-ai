import {ArrowLeft, Bot, ArrowRight, Car, Loader2} from 'lucide-react';
import {motion} from 'motion/react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function TaxiBooking() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching vehicles:', err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div 
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      className="bg-surface antialiased min-h-screen relative overflow-x-hidden"
    >
      {/* Map Background Area */}
      <div className="fixed top-0 left-0 w-full h-[486px] z-0 bg-surface-container">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuyERj3m1ys5Cw9B8b2jpVGpJqe7htMmD-a9EkG6xJvAvgw9QFseHai7T9S28lWWNiYMcB1ZyF4lEhfvW5NrWMqJuZlRBwcNBC6zAtcFsS9z2c9QIKg2Q21TOuSq9TFhTeSHlQ_JWn5X2VPAnM-G2p-_eJNlTuKA2-cmw-W5LGHrv3I9Ig-zSx9KXjNw8VDjEEgL2Y_RiyFInkBVmzLlC77uv5ODGcsU0GoGWfm8DI2Pcg5BQ-r8QNPMaCVXxzq2hd_sEbKndCu4lq"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          alt="Map Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-surface to-transparent"></div>
      </div>

      {/* Contextual Top Bar */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-surface-container-lowest/80 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] text-on-surface active:scale-95 transition-transform duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="bg-surface-container-lowest/80 backdrop-blur-2xl rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <span className="font-headline font-bold text-sm tracking-widest text-primary">选择车辆</span>
        </div>
        <div className="w-12"></div>
      </header>

      {/* Floating Route Card */}
      <div className="fixed top-24 left-6 right-6 z-40 bg-surface-container-lowest/85 backdrop-blur-3xl rounded-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center gap-5">
        <div className="flex flex-col items-center gap-1.5 pt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
          <div className="w-1 h-6 bg-surface-variant rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-tertiary-container shadow-sm"></div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="text-on-surface-variant text-sm font-medium tracking-wide">
            上海浦东国际机场 T2
          </div>
          <div className="font-headline text-on-surface text-lg font-bold tracking-tight">
            静安香格里拉大酒店
          </div>
        </div>
      </div>

      {/* Vehicle Selection List */}
      <main className="relative z-10 mt-[397px] bg-surface rounded-t-[32px] min-h-[486px] pb-32 shadow-[0_-8px_32px_rgba(0,0,0,0.04)]">
        <div className="w-full flex justify-center pt-5 pb-3">
          <div className="w-12 h-1.5 rounded-full bg-outline-variant/30"></div>
        </div>

        <div className="px-6 flex flex-col gap-6 mt-2">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* AI Recommended */}
              {vehicles.filter(v => v.is_ai_recommended).map(vehicle => (
                <section key={vehicle.id} className="bg-primary-container/20 rounded-xl p-5 flex flex-col gap-5 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-primary/10">
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-headline font-bold text-on-primary-container tracking-tight">{vehicle.title}</h2>
                        <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1 shadow-sm">
                          <Bot className="w-3 h-3 fill-current" /> AI 推荐
                        </span>
                      </div>
                      <span className="text-sm font-medium text-on-primary-container/80">预计 {vehicle.time}后到达</span>
                    </div>
                    <div className="text-right flex flex-col items-end gap-0.5">
                      <span className="text-2xl font-headline font-extrabold text-primary">¥{vehicle.price.toFixed(2)}</span>
                      {vehicle.original_price && (
                        <span className="text-xs text-on-surface-variant/60 line-through">¥{vehicle.original_price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 z-10">
                    <img 
                      src={vehicle.image_url}
                      alt={vehicle.title}
                      className="w-28 object-cover rounded-lg mix-blend-multiply opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1">
                      {vehicle.stats.map((stat: any, i: number) => (
                        <InfoItem key={i} label={stat.label} value={stat.value} />
                      ))}
                    </div>
                  </div>
                </section>
              ))}

              <h3 className="text-lg font-headline text-on-surface font-bold tracking-tight mt-2">其他车型</h3>

              {/* Standard Choices */}
              {vehicles.filter(v => !v.is_ai_recommended).map(vehicle => (
                <VehicleCard 
                  key={vehicle.id}
                  title={vehicle.title}
                  time={vehicle.time}
                  price={vehicle.price.toFixed(2)}
                  img={vehicle.image_url}
                  stats={vehicle.stats}
                  opacity={vehicle.type === 'economy' ? "opacity-90" : ""}
                />
              ))}
            </>
          )}
        </div>
      </main>

      {/* FAB: Confirm Ride */}
      <div className="fixed bottom-0 left-0 w-full pt-12 pb-8 px-6 bg-gradient-to-t from-surface via-surface/90 to-transparent z-50 pointer-events-none">
        <button 
          onClick={() => navigate('/trip-status')}
          className="w-full bg-primary text-on-primary rounded-xl py-4 font-headline font-bold text-lg shadow-[0_8px_32px_rgba(0,84,214,0.25)] active:scale-95 transition-transform duration-300 flex items-center justify-center gap-3 pointer-events-auto"
        >
          <span>呼叫 AI 舒适型</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

function InfoItem({label, value}: {label: string; value: string}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-medium text-on-surface-variant/70 tracking-widest uppercase">{label}</span>
      <span className="text-sm font-semibold text-on-surface">{value}</span>
    </div>
  );
}

function VehicleCard({title, time, price, img, stats, opacity}: {title: string; time: string; price: string; img: string; stats: any[]; opacity?: string}) {
  return (
    <div className={`bg-surface-container-lowest rounded-xl p-5 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-surface-container transition-transform active:scale-[0.98] ${opacity}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight">{title}</h3>
          <span className="text-sm font-medium text-on-surface-variant">预计 {time}后到达</span>
        </div>
        <div className="text-right">
          <span className="text-xl font-headline font-bold text-on-surface">¥{price}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <img src={img} alt={title} className="w-24 object-cover rounded-lg mix-blend-multiply opacity-80" referrerPolicy="no-referrer" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-[10px] text-on-surface-variant/80 tracking-widest uppercase">{s.label}</span>
              <span className="text-sm font-medium text-on-surface">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
