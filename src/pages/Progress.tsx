import React from "react";

export default function Progress() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Progress</h1>
      <div className="space-y-3">
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div className="bg-primary-600 h-4 rounded-full" style={{ width: "60%" }}></div>
        </div>
        <p className="text-slate-600">Overall progress: 60%</p>
      </div>
    </div>
  );
}