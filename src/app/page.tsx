"use client";
import Chat from "@/components/Chat";
import Intro from "@/components/Intro";
import { useState } from "react";

const page = () => {
  const [childData, setChildData] = useState(null);

  const handleDataFromChild = (data: any) => {
    setChildData(data);
  };

  return (
    <main>
      <div className="transition-container">
        {typeof childData === "boolean" ? (
          childData ? (
            <div key="chat" className="page-transition">
              <Chat />
            </div>
          ) : (
            <div key="intro" className="page-transition">
              <Intro onDataTransfer={handleDataFromChild} />
            </div>
          )
        ) : (
          <div key="intro-default" className="page-transition">
            <Intro onDataTransfer={handleDataFromChild} />
          </div>
        )}
      </div>
      <style jsx>{`
        .transition-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .page-transition {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};
export default page;
