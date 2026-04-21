import {Bot, Star, MapPin, Wallet, Clock, Navigation, Heart} from 'lucide-react';
import {motion} from 'motion/react';
import {useNavigate} from 'react-router-dom';

export default function Explore() {
  const navigate = useNavigate();
  const hotpots = [
    {
      name: '海底捞火锅 (王府井店)',
      rating: 4.8,
      dist: '2.5km',
      price: '¥150',
      tags: ['捞派滑牛肉', '虾滑', '捞面'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-inRixeg6SA0T8txfrMmSeFB5uyAneabRP7mVwVD1uc5sa-lgDxkJ8hEn0u3GGHP76MfgHtsru44nmZBy-7OKMHV9ySxRqkq_qbkGZD5bqKwkGL7i9GrJaT1cVBUUQx_OtOLDjoKo5nAvmzZMuQaLlSuZfzXZky84nY95emYSMroEV41pi3Z0trZ99j5HOAfgKwG4FCRkltlQf-hrjBpTD9VZ1U37jbZtXsx2-8-lPb2KvMSijvhIZ3dyDiqf3f9mjA7ovxYv-B_N'
    },
    {
      name: '小龙坎老火锅 (春熙路店)',
      rating: 4.6,
      dist: '3.8km',
      price: '¥110',
      tags: ['霸王牛肉', '极品鲜毛肚', '玫瑰圆子'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDckjEgBeEyP3N6XQ5NPG5sWfCm4qj1x6zQkGGrI2TS4QJY9KeMeW62JJ3HWshFyNAtupRxXRN5IPMsgHy0WMCVIjNro6zlXi7iknpljFSZdF2zTFtRbcP2xubKGaKi6DAGa9pYLpTgo37z4K-kbosT_7HWLz6ECQXR436A3KFknC8nRJq4ROVZfCoyeYRouMSTKZ9AyhpCfaAC7ULZMy9dw6otGFDG_L5t3GAA9ME4aKJrBR5kggeBmr0Ppuj5oHXq5gBITI2v05Qr'
    }
  ];

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="pb-32 font-body"
    >
      <header className="pt-12 pb-4 px-6 sticky top-0 bg-background/90 backdrop-blur-xl z-40 border-b border-surface-container">
        <h1 className="text-[3.5rem] font-headline font-bold text-on-surface leading-tight">探索火锅</h1>
        <p className="text-lg text-secondary mt-2 leading-relaxed">AI 为您精选附近好味道</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* AI Top Recommendation */}
        <section>
          <h2 className="text-[1.75rem] font-headline font-semibold text-on-surface mb-8 flex items-center gap-3">
            <Bot className="text-primary w-7 h-7 fill-current" fillOpacity={0.2} />
            AI 倾情推荐
          </h2>
          <div className="relative rounded-3xl overflow-hidden bg-surface-container-low p-2 md:p-4 border border-surface-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-12 h-[300px] rounded-2xl overflow-hidden relative group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDawf7yuX2q_iq1J_nqAWorufj_jctR0KRdYydmJvl6G9FQCxI_RqD3L03dUetpPukgZcPA5qNu_Wc7zFvbZ9IHFQBHQpNGsvLfQbK2BsfGZtU9XIVKKKGaMmLfea33qJbKWzLckimZECt8aKVGwA2BPntyvg8JhRoeZbiyHkauIlzINInYDfxj1sLIzLM2jMAe_RANmY9aR5YH9ClX1_8bDBKYwrbe3ILaGrRCwhpnuKOnXsra0ic5Q2ncAvrrr3Sm94ZvDCwecC83" 
                  alt="蜀大侠" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-bold tracking-wider">匹配度 98%</span>
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-12 flex flex-col justify-between p-6 bg-surface-container-lowest rounded-2xl shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-headline font-bold text-on-surface">蜀大侠老火锅 (市中心店)</h3>
                    <div className="flex items-center gap-1 text-tertiary-container">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold text-on-surface">4.9</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <MetaChip icon={MapPin} label="距离 1.2km" />
                    <MetaChip icon={Wallet} label="人均 ¥128" />
                    <MetaChip icon={Clock} label="无需等位" />
                  </div>
                  <div className="mt-6">
                    <p className="text-xs text-secondary mb-3 uppercase tracking-widest font-bold">推荐菜</p>
                    <div className="flex gap-2 flex-wrap">
                      {['大侠水牛毛肚', '冰川鹅肠', '雪花肥牛'].map(tag => (
                        <span key={tag} className="text-sm text-on-surface bg-surface-container px-3 py-1.5 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/route')}
                  className="mt-8 w-full bg-gradient-to-r from-primary to-[#00D2FF] text-on-primary font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Navigation className="w-5 h-5" /> 一键导航
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Selection */}
        <section>
          <h2 className="text-[1.75rem] font-headline font-semibold text-on-surface mb-8">附近甄选</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotpots.map((h, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm border border-surface-container flex flex-col flex-1 group hover:-translate-y-1 transition-transform duration-300">
                <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                    <Star className="w-4 h-4 text-tertiary-container fill-current" /> {h.rating}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-on-surface mb-3">{h.name}</h3>
                    <div className="flex gap-4 text-secondary text-sm mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {h.dist}</span>
                      <span className="flex items-center gap-1"><Wallet className="w-4 h-4" /> {h.price}</span>
                    </div>
                    <p className="text-xs text-secondary mb-2 uppercase tracking-tight">推荐菜</p>
                    <p className="text-sm text-on-surface-variant truncate font-medium">{h.tags.join(', ')}</p>
                  </div>
                  <button 
                    onClick={() => navigate('/route')}
                    className="mt-6 w-full bg-surface-container text-on-surface font-bold py-3 rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" /> 一键导航
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}

function MetaChip({icon: Icon, label}: {icon: any; label: string}) {
  return (
    <div className="flex items-center gap-1.5 text-secondary text-sm bg-surface-container px-3 py-2 rounded-lg font-medium">
      <Icon className="w-4 h-4" />
      {label}
    </div>
  );
}
