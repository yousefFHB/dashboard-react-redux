import React from 'react'
import { CircleArrowUp, CircleArrowDown } from 'lucide-react';
import { div } from 'framer-motion/client';
export default function MetricCard({ title, value, change, icon: Icon, gradient, subtitle, trend }) {
    const isPositive = change > 0;
    return (
        <div className='group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-slate-200 rounded-xl p-8 hover:bg-white/20 transition-all'>
            <div className={`absolute inset-0 bg-linear-to-br opacity-5 group-hover:opacity-15 transition-opacity duration-500 ${gradient}`}></div>
            <div className='realtive z-10'>
                <div className='flex items-center justify-between mb-6'>
                    <div className={`p-4 rounded-2xl bg-linear-to-br group-hover:scale-110 transition-all ${gradient} duration-300 shadow-lg `}>
                        <Icon className="h-8 w-8 text-slate-100" />

                    </div>
                    <div className={`flex items-center space-x-1 py-1 px-3 rounded-full text-sm font-bold`}>
                        {isPositive ? <CircleArrowUp className="h-4 w-4 text-emerald-300" /> : <CircleArrowDown className="h-4 w-4 text-red-300" />}
                        <span>
                            {Math.abs(change)}%

                        </span>

                    </div>
                </div>
                <div className='space-y-2'>
                    <h3 className='text-white/70 text-sm font-medium uppercase tracking-wider'>
                        {title}
                    </h3>
                    <p className='text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300'>
                        {value}
                    </p>
                    <p className='text-white/60 text-sm'>
                        {subtitle}
                    </p>

                </div>

            </div>
            <div className='mt-4 h-12 flex items-end space-x-1'>
                {trend?.map((point, index) => {
                    return (
                        <div key={index} className={`bg-linear-to-t rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`} style={{ height: `${(point / Math.max(...trend)) * 100}%`, width: '8px' }}></div>


                    );
                })}

            </div>

        </div>
    )
}
