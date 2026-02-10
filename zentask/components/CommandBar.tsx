'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, Plus, Command, X } from 'lucide-react'
import { useZenStore } from '../lib/store'

export default function CommandBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const { addTask } = useZenStore()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        await addTask(query)
        setQuery('')
        setIsOpen(false)
    }

    if (!isOpen) {
        return (
            <div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 glass cursor-pointer flex items-center gap-2 opacity-60 hover:opacity-100 transition-all"
                onClick={() => setIsOpen(true)}
            >
                <span className="text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded">Ctrl + K</span>
                <span className="text-sm">Capture something...</span>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-xl glass shadow-2xl overflow-hidden border-white/10">
                <form onSubmit={handleSubmit} className="flex items-center p-4 gap-3">
                    <Command className="w-5 h-5 text-indigo-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a task and hit Enter..."
                        className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-slate-500"
                    />
                    <X
                        className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white"
                        onClick={() => setIsOpen(false)}
                    />
                </form>

                <div className="border-t border-white/5 p-2 bg-white/[0.02]">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        Actions
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer group">
                        <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                            <Plus className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium">Create Task</div>
                            <div className="text-xs text-slate-500">Add "{query || '...'}" to your list</div>
                        </div>
                        <div className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded opacity-50">Enter</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
