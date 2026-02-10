'use client'

import React, { useEffect } from 'react'
import { CheckCircle2, Circle, Trash2, Clock, Zap } from 'lucide-react'
import { useZenStore } from '../lib/store'
import type { Task } from '../lib/store'
import CommandBar from '../components/CommandBar'

export default function ZenPage() {
    const { tasks, isLoading, fetchTasks, toggleTask, deleteTask } = useZenStore()

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-indigo-500/30">
            <div className="max-w-2xl mx-auto pt-24 pb-32 px-6">
                {/* Header */}
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                            <Zap className="text-indigo-500 fill-indigo-500" size={28} />
                            ZenTask
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm font-medium">Focus on what matters. Ignore the rest.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono text-white/20 select-none">
                            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                </header>

                {/* Task List */}
                <section className="space-y-3">
                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-white/5 rounded-xl" />
                            ))}
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                            <p className="text-slate-500 font-medium">Your headspace is clear.</p>
                            <p className="text-xs text-slate-600 mt-2">Press Ctrl + K to start building.</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={() => toggleTask(task.id!)}
                                onDelete={() => deleteTask(task.id!)}
                            />
                        ))
                    )}
                </section>
            </div>

            <CommandBar />
        </div>
    )
}

function TaskItem({ task, onToggle, onDelete }: { task: Task, onToggle: () => void, onDelete: () => void }) {
    return (
        <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${task.completed ? 'opacity-40 grayscale' : 'bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.03] shadow-sm hover:shadow-indigo-500/5'}`}>
            <button
                onClick={onToggle}
                className="shrink-0 text-slate-600 hover:text-indigo-400 transition-colors"
            >
                {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                ) : (
                    <Circle className="w-6 h-6" />
                )}
            </button>

            <div className="flex-1 min-w-0">
                <p className={`text-[15px] font-medium transition-all ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.content}
                </p>
                <div className="flex items-center gap-3 mt-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <Clock size={10} />
                        {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {task.priority !== 'low' && (
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${task.priority === 'high' ? 'text-rose-500' : 'text-amber-500'}`}>
                            • {task.priority}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
