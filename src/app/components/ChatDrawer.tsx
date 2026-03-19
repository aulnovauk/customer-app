import { motion, AnimatePresence } from "motion/react";
import { X, Send, Paperclip, Image as ImageIcon, Smile, Minus, Maximize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "salon";
  timestamp: string;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  salonName: string;
  salonImage: string;
  isOnline: boolean;
}

export function ChatDrawer({ isOpen, onClose, salonName, salonImage, isOnline }: ChatDrawerProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! How can we help you today? 💅",
      sender: "salon",
      timestamp: "10:30 AM",
    },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState(85);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const dragStartHeight = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit" 
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate salon response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Let me check that for you.",
        "We'd be happy to help with that! When would you like to book?",
        "Great question! Our team will get back to you shortly.",
        "I can help you with that! What time works best for you?",
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "salon",
        timestamp: new Date().toLocaleTimeString("en-US", { 
          hour: "numeric", 
          minute: "2-digit" 
        }),
      };
      
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartY.current = clientY;
    dragStartHeight.current = drawerHeight;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartY.current - clientY;
    const windowHeight = window.innerHeight;
    const newHeight = Math.min(95, Math.max(30, dragStartHeight.current + (deltaY / windowHeight) * 100));
    
    setDrawerHeight(newHeight);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={onClose}
          />

          {/* Minimized Chat Bubble */}
          {isMinimized && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed bottom-6 right-6 z-50"
              onClick={() => setIsMinimized(false)}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative w-16 h-16 rounded-full shadow-2xl border-4"
                style={{
                  background: 'var(--gradient-primary)',
                  borderColor: 'var(--background-primary)',
                }}
              >
                <img
                  src={salonImage}
                  alt={salonName}
                  className="w-full h-full rounded-full object-cover"
                />
                {isOnline && (
                  <span
                    className="absolute top-0 right-0 w-4 h-4 rounded-full border-2"
                    style={{
                      backgroundColor: '#10b981',
                      borderColor: 'var(--background-primary)',
                    }}
                  />
                )}
                {messages.length > 1 && (
                  <span
                    className="absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: '#EF4444',
                    }}
                  >
                    {messages.filter(m => m.sender === 'salon').length}
                  </span>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Chat Drawer */}
          {!isMinimized && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col shadow-2xl"
              style={{
                height: `${drawerHeight}vh`,
                maxHeight: `${drawerHeight}vh`,
                backgroundColor: 'var(--background-primary)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
              }}
            >
              {/* Resizable Drag Handle */}
              <div 
                className="flex justify-center pt-3 pb-2 cursor-ns-resize active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                <div className="flex flex-col items-center gap-1">
                  <div 
                    className="w-12 h-1 rounded-full" 
                    style={{ backgroundColor: 'var(--border-light)' }}
                  />
                  <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    Drag to resize
                  </div>
                </div>
              </div>

              {/* Header */}
              <div 
                className="flex items-center justify-between px-5 py-4 border-b relative overflow-hidden"
                style={{ 
                  borderColor: 'var(--border-light)',
                  background: 'var(--gradient-primary)',
                }}
              >
                {/* Glassmorphic overlay for depth */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }} 
                />

                <div className="flex items-center gap-3 relative z-10">
                  {/* Salon Avatar */}
                  <div className="relative">
                    <img
                      src={salonImage}
                      alt={salonName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                    />
                    {isOnline && (
                      <span
                        className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
                        style={{
                          backgroundColor: '#10b981',
                          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.6)',
                        }}
                      />
                    )}
                  </div>

                  {/* Salon Info */}
                  <div>
                    <h3 className="font-bold text-base text-white drop-shadow-md">
                      {salonName}
                    </h3>
                    <p className="text-xs text-white/90">
                      {isOnline ? (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                          Online now
                        </span>
                      ) : (
                        "Usually replies in 5 mins"
                      )}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 relative z-10">
                  {/* Minimize Button */}
                  <motion.button
                    onClick={() => setIsMinimized(true)}
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-5 h-5 text-white drop-shadow-md" />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-white drop-shadow-md" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div 
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
                style={{ backgroundColor: 'var(--background)' }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
                        msg.sender === "user" ? "rounded-br-md" : "rounded-bl-md"
                      }`}
                      style={{
                        backgroundColor: msg.sender === "user" 
                          ? 'var(--brand-primary)' 
                          : 'var(--card)',
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: msg.sender === "user" ? '#ffffff' : 'var(--text-primary)',
                        }}
                      >
                        {msg.text}
                      </p>
                      <p
                        className="text-[10px] mt-1"
                        style={{
                          color: msg.sender === "user" 
                            ? 'rgba(255, 255, 255, 0.7)' 
                            : 'var(--text-tertiary)',
                        }}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div 
                className="px-5 py-4 border-t"
                style={{ 
                  borderColor: 'var(--border-light)',
                  backgroundColor: 'var(--background-primary)',
                }}
              >
                <div className="flex items-center gap-2">
                  {/* Attachment Buttons */}
                  <motion.button
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--background-elevated)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ImageIcon className="w-4.5 h-4.5" style={{ color: 'var(--text-secondary)' }} />
                  </motion.button>

                  {/* Message Input */}
                  <div 
                    className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full border"
                    style={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent outline-none text-sm"
                      style={{ color: 'var(--text-primary)' }}
                    />
                    <Smile className="w-4.5 h-4.5 cursor-pointer" style={{ color: 'var(--text-tertiary)' }} />
                  </div>

                  {/* Send Button */}
                  <motion.button
                    onClick={handleSend}
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: message.trim() ? 'var(--gradient-primary)' : 'var(--background-elevated)',
                      boxShadow: message.trim() ? 'var(--shadow-brand-sm)' : 'none',
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: message.trim() ? 1.05 : 1 }}
                    disabled={!message.trim()}
                  >
                    <Send 
                      className="w-5 h-5" 
                      style={{ 
                        color: message.trim() ? '#ffffff' : 'var(--text-tertiary)',
                      }} 
                      fill={message.trim() ? '#ffffff' : 'none'}
                    />
                  </motion.button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                  {["Book appointment", "Check availability", "View pricing", "Location"].map((action, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setMessage(action)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--background-elevated)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}