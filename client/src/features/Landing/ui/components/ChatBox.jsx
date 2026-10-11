import React from "react";
import { X, MessageSquare, Send } from "lucide-react";
import useLandingHook from "../../hooks/useLandingHook";

const ChatBox = ({ isOpen, onClose }) => {
  const { handleSend, sendBtnRef } = useLandingHook();

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-7 z-50 w-80 md:w-96">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080604]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
              <MessageSquare size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Chat with us</h3>
              <p className="text-xs text-white/40">We typically reply within minutes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={18} className="text-white/60" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {/* Welcome Message */}
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]">
              <MessageSquare size={14} className="text-white" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-white/10 px-4 py-3 text-sm text-white/80">
              <p>Hello! 👋 Welcome to Aaple Guruji. How can we help you today?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]">
              <MessageSquare size={14} className="text-white" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-white/10 px-4 py-3 text-sm text-white/80">
              <p>Hello! 👋 Welcome to Aaple Guruji. How can we help you today?</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-white/[0.03] p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-300/50 transition-all"
            />
            <button ref={sendBtnRef} onClick={handleSend} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white transition-all hover:scale-105">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
