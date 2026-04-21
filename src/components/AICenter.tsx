import {Car, Bus, Utensils, Receipt, Bot, Send, Loader2, Mic, Keyboard} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';
import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {chatWithAI} from '../services/geminiService';
import {cn} from '../lib/utils';

export default function AICenter() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {role: 'user', content: '请帮我查一下上周五晚上的打车费用，为什么比平时高？'},
    {role: 'ai', content: '我帮您查询了上周五（10月27日）晚上22:30的行程。由于当时突发大雨，且处于夜间高峰期，系统自动触发了动态调价机制，价格上浮了1.5倍。总费用为 68.50 元。需要我为您申请优惠券补偿吗？'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const actions = [
    {icon: Car, label: '寻找干净车辆', color: 'text-primary', path: '/taxi'},
    {icon: Bus, label: '通勤回家', color: 'text-primary', path: '/route'},
    {icon: Utensils, label: '附近美食', color: 'text-primary', path: '/explore'},
    {icon: Receipt, label: '查看账单', color: 'text-primary', path: '/insights'},
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, {role: 'user', content: userMessage}]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{text: m.content}]
    }));

    const response = await chatWithAI(userMessage, history);
    setMessages(prev => [...prev, {role: 'ai', content: response}]);
    setLoading(false);
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
    // Simulate voice recording start
  };

  const handleVoiceEnd = () => {
    setIsRecording(false);
    // Simulate voice to text result
    const simulatedResult = "去最近的加油站";
    setInput(simulatedResult);
    // We could auto-send here if desired, but let's just populate the input for now
  };

  return (
    <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8 pb-32"
    >
      {/* Welcome Hero */}
      <section className="text-center space-y-4 pt-4">
        <h1 className="text-[3.5rem] leading-[1.2] tracking-[-0.02em] font-headline font-bold text-on-surface">
          下午好，Sarah
        </h1>
        <p className="text-[1.375rem] text-secondary tracking-[0.01em]">
          您想去哪里，或者需要什么帮助？
        </p>
      </section>

      {/* Quick Actions Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={() => navigate(action.path)}
            className="bg-surface-container-lowest p-5 rounded-xl flex flex-col items-start gap-4 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 group text-left border border-surface-container shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors">
              <action.icon className={`${action.color} w-6 h-6`} />
            </div>
            <span className="text-base font-medium text-on-surface leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* AI Chat Area */}
      <section className="bg-surface-container-low rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden min-h-[500px]">
        {/* Decorative gradient blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex items-center gap-3">
          <Bot className="text-primary w-6 h-6" fill="currentColor" fillOpacity={0.2} />
          <h2 className="text-[1.75rem] font-headline font-semibold">AI 助手</h2>
        </div>

        {/* Chat History */}
        <div ref={scrollRef} className="flex flex-col gap-6 mb-4 flex-1 overflow-y-auto scrollbar-hide pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container shrink-0 flex items-center justify-center text-on-primary shadow-sm">
                    <Bot className="w-4 h-4" fill="currentColor" />
                  </div>
                )}
                <div className={cn(
                  "rounded-2xl p-4 max-w-[80%] shadow-sm",
                  msg.role === 'user' 
                    ? "bg-surface-container-lowest rounded-tr-sm" 
                    : "bg-primary/10 rounded-tl-sm text-on-surface"
                )}>
                  <p className="text-base leading-[1.6] whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-surface-container shrink-0 overflow-hidden shadow-sm">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDueqLal27nXdWj57BeXPvlpLgNfyU6lLoqOxKueq7PAdlhmPeRbqOgTj4aK3lemP3op6hmm0JwphMiUbJOHdZsI9KekHRnpSKIBL87VW8I0RfHQLMKI8Pu9AgbeSG_qeclbhV7gdepMfX4kSgFnrYOYgmqnwV-bfbWptHhZKUm_mvMPxR63-C9uzjHQe8-acca5uZEaN4F_jIZLAtuUoFPTe2lryS1ZL88F57zoGxmoXD-utSCcobPEUS-mvr8RvZZg7nkrGyhJ-An" 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 shrink-0 flex items-center justify-center text-primary animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-primary/5 rounded-2xl p-4">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Toggle between Voice and Keyboard */}
          <button 
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors shrink-0"
          >
            {isVoiceMode ? <Keyboard className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="relative flex-1">
            {isVoiceMode ? (
              <button 
                onMouseDown={handleVoiceStart}
                onMouseUp={handleVoiceEnd}
                onTouchStart={handleVoiceStart}
                onTouchEnd={handleVoiceEnd}
                className={cn(
                  "w-full h-12 rounded-xl font-bold transition-all duration-200 border-2",
                  isRecording 
                    ? "bg-primary-container text-on-primary-container border-primary scale-[0.98]" 
                    : "bg-surface-container-highest text-on-surface-variant border-transparent"
                )}
              >
                {isRecording ? "松开 结束" : "按住 说话"}
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setMessages(prev => [...prev, {role: 'ai', content: `输入语言偏好已更新。现已为您优化对该语言的理解。`}])}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors z-10"
                  title="切换语言"
                >
                  <span className="text-[10px] font-bold border border-current rounded px-0.5 leading-none py-0.5">中/EN</span>
                </button>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-surface-container-highest border-none rounded-xl h-12 pl-12 pr-12 text-base focus:ring-1 focus:ring-primary/20 focus:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all outline-none placeholder:text-neutral" 
                  placeholder="输入您的问题或指令..." 
                />
              </>
            )}
          </div>

          <button 
            onClick={handleSend}
            disabled={loading || (isVoiceMode && !input.trim())}
            className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary-container flex items-center justify-center text-on-primary transition-all duration-300 shadow-[0_4px_12px_rgba(0,84,214,0.2)] shrink-0",
              (loading || (!input.trim())) ? "opacity-50 scale-95" : "hover:opacity-90 active:scale-90"
            )}
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Global Recording Overlay */}
        <AnimatePresence>
          {isRecording && (
            <motion.div 
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.8}}
              className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            >
              <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center gap-4 text-white shadow-2xl">
                <div className="relative">
                  <motion.div 
                    animate={{scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5]}}
                    transition={{duration: 1.5, repeat: Infinity}}
                    className="absolute inset-0 bg-primary rounded-full"
                  ></motion.div>
                  <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Mic className="w-10 h-10" />
                  </div>
                </div>
                <p className="text-xl font-headline font-bold">正在倾听...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}

