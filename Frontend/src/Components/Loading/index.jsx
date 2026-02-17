import React from "react";
import { Grid } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
    <div className="relative">  {/* Outer Glowing Ring */}
      <div className="w-20 h-20 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin"></div>

      {/* Inner Static Pulse */}
      <div className="absolute inset-0 m-auto w-12 h-12 bg-violet-500/20 rounded-full animate-pulse"></div>


      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"></div></div>
    </>


  );
}

// {* different loading style *}
//  <div className="relative">
//         {/* Outer Glowing Ring */}
//         <div className="w-20 h-20 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin"></div>

//         {/* Inner Static Pulse */}
//         <div className="absolute inset-0 m-auto w-12 h-12 bg-violet-500/20 rounded-full animate-pulse"></div>
//       </div>

// <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950">


// {* another one *}
//   <div className="flex flex-col items-center gap-4">
//     <div className="relative w-12 h-12">
//       <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-25"></div>
//       <div className="relative rounded-full h-12 w-12 bg-violet-600 shadow-[0_0_40px_rgba(139,92,246,0.5)]"></div>
//     </div>
//     <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
//       Loading Experience
//     </p>
//   </div>
// </div>