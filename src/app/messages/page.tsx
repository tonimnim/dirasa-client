"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Search,
  Plus,
  Send,
  ShieldCheck,
  Paperclip,
  CheckCheck,
  User,
  Clock,
} from "lucide-react";

interface MessageThread {
  id: string;
  sender: string;
  role: string;
  student: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export default function MyMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState("m1");
  const [newMessage, setNewMessage] = useState("");

  const threads: MessageThread[] = [
    {
      id: "m1",
      sender: "Mrs. Zubaida Mansoor",
      role: "Parent (Tariq's Mother)",
      student: "Tariq Mansoor (Grade 7-A)",
      lastMessage: "Thank you for the update on Tariq's science project.",
      time: "10:45 AM",
      unread: true,
    },
    {
      id: "m2",
      sender: "H.E. Sultan Al-Falasi",
      role: "Parent (Amina's Father)",
      student: "Amina Al-Falasi (Grade 7-A)",
      lastMessage: "We have confirmed attendance for the award ceremony.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "m3",
      sender: "Dr. Faith Mwangi",
      role: "Parent (Zayn's Mother)",
      student: "Zayn Mwangi (Grade 8-B)",
      lastMessage: "Could you please send the math homework sheet again?",
      time: "Sep 28",
      unread: false,
    },
  ];

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafafa]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a34]">My Messages</h1>
            <p className="text-xs text-slate-500">
              Direct, safeguarded communication between families and faculty
            </p>
          </div>

          <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5">
            <Plus className="h-4 w-4" /> New Message
          </Button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left: Threads List */}
          <div className="w-80 border-e border-slate-200 bg-white flex flex-col h-full shrink-0">
            <div className="p-3 border-b border-slate-200">
              <div className="relative">
                <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full h-8 ps-8 pe-3 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`w-full text-start p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                    activeThreadId === t.id ? "bg-teal-50/60 border-s-2 border-teal-600" : ""
                  }`}
                >
                  <div className="h-9 w-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {t.sender.split(" ")[1]?.[0] || "P"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {t.sender}
                      </span>
                      <span className="text-[10px] text-slate-400">{t.time}</span>
                    </div>
                    <p className="text-[10px] text-teal-700 font-medium truncate">
                      {t.student}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {t.lastMessage}
                    </p>
                  </div>
                  {t.unread && (
                    <span className="h-2 w-2 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Conversation */}
          <div className="flex-1 flex flex-col bg-slate-50/50">
            {/* Conversation Header */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  {activeThread.sender.split(" ")[1]?.[0] || "P"}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">{activeThread.sender}</h2>
                  <p className="text-xs text-slate-500">
                    {activeThread.role} &bull; Regarding <strong>{activeThread.student}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Link
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Message from School */}
              <div className="flex flex-col items-end">
                <div className="max-w-md bg-teal-600 text-white rounded-2xl rounded-tr-xs p-3.5 text-xs shadow-xs space-y-1">
                  <p>
                    Good afternoon Mrs. Mansoor, Tariq performed exceptionally well in the science lab today. His solar system project scored full marks.
                  </p>
                  <div className="text-[10px] text-teal-100 text-end flex items-center justify-end gap-1">
                    <span>10:30 AM</span>
                    <CheckCheck className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Message from Parent */}
              <div className="flex flex-col items-start">
                <div className="max-w-md bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-xs p-3.5 text-xs shadow-xs space-y-1">
                  <p>
                    Thank you so much! He was really excited to build the model over the weekend. We appreciate your encouragement.
                  </p>
                  <div className="text-[10px] text-slate-400">10:45 AM</div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
              <button className="text-slate-400 hover:text-slate-600 p-2">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <Button
                variant="primary"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold h-10 px-4 gap-1.5"
              >
                <Send className="h-3.5 w-3.5" /> Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
