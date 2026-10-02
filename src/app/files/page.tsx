"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/legacy-ui/Button";
import { Badge } from "@/components/legacy-ui/Badge";
import {
  FolderOpen,
  Search,
  Upload,
  FileText,
  FileCode,
  Image as ImageIcon,
  Download,
  Folder,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  folder: string;
  size: string;
  uploadedBy: string;
  date: string;
  type: "pdf" | "doc" | "image";
}

export default function FileCenterPage() {
  const [activeFolder, setActiveFolder] = useState<string>("All");
  const [search, setSearch] = useState("");

  const files: FileItem[] = [
    {
      id: "f-1",
      name: "REDCO_Parent_Student_Handbook_2026_2027.pdf",
      folder: "School Policies",
      size: "3.4 MB",
      uploadedBy: "Moses Wetangula",
      date: "2026-09-15",
      type: "pdf",
    },
    {
      id: "f-2",
      name: "Grade_7_Mathematics_Curriculum_Syllabus.pdf",
      folder: "Curriculum Syllabi",
      size: "1.8 MB",
      uploadedBy: "Sarah Wanjiru",
      date: "2026-09-10",
      type: "pdf",
    },
    {
      id: "f-3",
      name: "Statutory_ADEK_School_Inspection_Report.pdf",
      folder: "Compliance & Inspections",
      size: "5.2 MB",
      uploadedBy: "Moses Wetangula",
      date: "2026-08-28",
      type: "pdf",
    },
    {
      id: "f-4",
      name: "Emergency_Safeguarding_Protocol_Guidelines.pdf",
      folder: "School Policies",
      size: "2.1 MB",
      uploadedBy: "Amina Mansoor",
      date: "2026-09-01",
      type: "pdf",
    },
    {
      id: "f-5",
      name: "Official_School_Crest_HighRes_Vector.png",
      folder: "Branding & Media",
      size: "4.8 MB",
      uploadedBy: "Alex Mwangi",
      date: "2026-08-15",
      type: "image",
    },
  ];

  const folders = ["All", "School Policies", "Curriculum Syllabi", "Compliance & Inspections", "Branding & Media"];

  const filtered = files.filter((f) => {
    const matchesFolder = activeFolder === "All" || f.folder === activeFolder;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a34]">School File Center</h1>
            <p className="text-xs text-slate-500">
              Centralized institutional document store & policy repositories
            </p>
          </div>

          <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5">
            <Upload className="h-4 w-4" /> Upload Document
          </Button>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Folders grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {folders.slice(1).map((folderName) => (
              <button
                key={folderName}
                onClick={() => setActiveFolder(folderName)}
                className={`p-4 rounded-xl border text-start transition-all ${
                  activeFolder === folderName
                    ? "bg-teal-50/80 border-teal-500 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <Folder className="h-6 w-6 text-teal-600 mb-2" />
                <div className="text-xs font-bold text-slate-900 truncate">{folderName}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {files.filter((f) => f.folder === folderName).length} Documents
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search file name or keyword..."
                className="w-full h-9 ps-9 pe-4 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            {activeFolder !== "All" && (
              <button
                onClick={() => setActiveFolder("All")}
                className="text-xs text-teal-700 font-semibold hover:underline"
              >
                Clear Folder Filter (Show All)
              </button>
            )}
          </div>

          {/* Files Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-start">Document Name</th>
                  <th className="py-3 px-4 text-start">Folder Category</th>
                  <th className="py-3 px-4 text-start">File Size</th>
                  <th className="py-3 px-4 text-start">Uploaded By</th>
                  <th className="py-3 px-4 text-start">Uploaded Date</th>
                  <th className="py-3 px-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-rose-600 shrink-0" />
                      <span className="truncate max-w-xs">{f.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium">
                        {f.folder}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{f.size}</td>
                    <td className="py-3.5 px-4 text-slate-600">{f.uploadedBy}</td>
                    <td className="py-3.5 px-4 text-slate-500">{f.date}</td>
                    <td className="py-3.5 px-4 text-end">
                      <Button variant="ghost" size="sm" className="h-8 text-teal-700 hover:text-teal-800 text-xs gap-1">
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
