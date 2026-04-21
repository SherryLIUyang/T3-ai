import {TrendingUp, Star, PersonStanding} from 'lucide-react';
import {motion} from 'motion/react';

export default function Insights() {
  return (
    <motion.div 
      initial={{opacity: 0, scale: 0.95}}
      animate={{opacity: 1, scale: 1}}
      className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 pb-32"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface">
          洞察分析
        </h1>
        <p className="text-base tracking-[0.02em] text-on-surface-variant">
          2023年10月账单与出行数据总结
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Spend Hero Card */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px] border border-surface-container shadow-sm">
          <div className="z-10 relative">
            <h2 className="font-headline text-[1.75rem] font-semibold text-on-surface mb-2">本月总支出</h2>
            <div className="text-[4rem] font-headline font-bold text-primary tracking-tight leading-none mb-4">
              ¥1,245<span className="text-[1.5rem] text-on-surface-variant font-medium">.50</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <TrendingUp className="text-red-500 w-5 h-5" />
              <span className="text-sm font-medium">较上月增加 12%</span>
            </div>
          </div>
          {/* Abstract Chart Graphic */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent z-0"></div>
          <svg className="absolute bottom-4 left-0 w-full h-32 z-0 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path className="text-primary" d="M0,80 Q20,90 40,60 T80,40 T100,20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
            <circle className="fill-primary" cx="20" cy="85" r="2"></circle>
            <circle className="fill-primary" cx="40" cy="60" r="2"></circle>
            <circle className="fill-primary" cx="80" cy="40" r="2"></circle>
            <circle className="fill-primary" cx="100" cy="20" r="2"></circle>
          </svg>
        </div>

        {/* Ride Type Pie Chart Card */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-between border border-surface-container shadow-sm">
          <h3 className="font-headline text-[1.375rem] font-semibold text-on-surface mb-4">打车类型统计</h3>
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* CSS Pie Chart simulation */}
            <div 
              className="w-48 h-48 rounded-full relative shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden" 
              style={{
                background: 'conic-gradient(#0054d6 0% 60%, #abbfff 60% 85%, #ffb229 85% 100%)'
              }}
            >
              {/* Inner circle for donut hole */}
              <div className="absolute inset-x-8 inset-y-8 bg-surface-container-low rounded-full flex items-center justify-center flex-col z-10 shadow-inner">
                <span className="font-headline font-bold text-2xl text-on-surface">32</span>
                <span className="text-xs text-on-surface-variant">总单数</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <LegendItem color="bg-primary" label="AI 舒适型" value="60%" />
            <LegendItem color="bg-primary-container" label="经济型" value="25%" />
            <LegendItem color="bg-tertiary-container" label="豪华型" value="15%" />
          </div>
        </div>

        {/* Most Expensive Ride Detail */}
        <div className="md:col-span-12 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden border border-surface-container shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-headline text-[1.375rem] font-semibold text-on-surface">最贵订单</h3>
            </div>
            <div className="font-headline text-[1.75rem] font-bold text-on-surface">
              ¥286.00
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6 relative pl-6">
              {/* Timeline line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-outline-variant/30"></div>
              
              <div className="relative">
                <div className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                <span className="text-xs tracking-[0.05em] text-on-surface-variant block mb-1">起点</span>
                <p className="text-[1rem] font-medium text-on-surface leading-tight">上海虹桥国际机场 (SHA)</p>
                <p className="text-xs text-on-surface-variant mt-1">10月12日 14:30</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full border-2 border-primary bg-surface-container-lowest ring-4 ring-surface-container-lowest"></div>
                <span className="text-xs tracking-[0.05em] text-on-surface-variant block mb-1">终点</span>
                <p className="text-[1rem] font-medium text-on-surface leading-tight">浦东香格里拉大酒店</p>
                <p className="text-xs text-on-surface-variant mt-1">10月12日 15:45</p>
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl flex flex-col gap-4">
              <DetailRow label="车型" value="AI 豪华型" />
              <DetailRow label="距离" value="48.2 km" />
              <DetailRow label="用时" value="1小时 15分钟" border={false} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LegendItem({color, label, value}: {color: string; label: string; value: string}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function DetailRow({label, value, border = true}: {label: string; value: string; border?: boolean}) {
  return (
    <div className={`flex justify-between items-center ${border ? 'border-b border-outline-variant/20 pb-3' : ''}`}>
      <span className="text-sm text-on-surface-variant">{label}</span>
      <span className="text-sm font-medium text-on-surface">{value}</span>
    </div>
  );
}
