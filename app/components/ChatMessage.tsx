"use client";

import Image from "next/image";
import { MessageDto } from "../../lib/api";

interface ChatMessageProps {
  message: MessageDto;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-1.5`}>
      {!isUser && (
        <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border border-slate-600">
          <Image src="/profil_sebastian.jpeg" alt="Sebastian" fill className="object-cover" />
        </div>
      )}
      <div className={`max-w-[82%] rounded-xl px-3 py-2 text-[12px] leading-snug ${
        isUser
          ? "bg-cyan-600 text-white rounded-br-sm"
          : "bg-slate-700 text-slate-200 rounded-bl-sm"
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
