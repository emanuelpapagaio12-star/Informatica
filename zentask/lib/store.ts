import { create } from 'zustand'
import Dexie, { type Table } from 'dexie'

// --- Database Schema ---
export interface Task {
    id?: number
    content: string
    completed: boolean
    createdAt: number
    priority: 'low' | 'medium' | 'high'
    category?: string
}

export class ZenDatabase extends Dexie {
    tasks!: Table<Task>

    constructor() {
        super('ZenDatabase')
        this.version(1).stores({
            tasks: '++id, content, completed, createdAt, priority'
        })
    }
}

export const db = new ZenDatabase()

// --- Zustand Store ---
interface ZenState {
    tasks: Task[]
    isLoading: boolean
    fetchTasks: () => Promise<void>
    addTask: (content: string, priority?: Task['priority']) => Promise<void>
    toggleTask: (id: number) => Promise<void>
    deleteTask: (id: number) => Promise<void>
}

export const useZenStore = create<ZenState>((set, get) => ({
    tasks: [],
    isLoading: true,

    fetchTasks: async () => {
        set({ isLoading: true })
        const allTasks = await db.tasks.orderBy('createdAt').reverse().toArray()
        set({ tasks: allTasks, isLoading: false })
    },

    addTask: async (content, priority = 'low') => {
        const newTask: Task = {
            content,
            completed: false,
            createdAt: Date.now(),
            priority
        }
        const id = await db.tasks.add(newTask)
        set({ tasks: [{ ...newTask, id }, ...get().tasks] })
    },

    toggleTask: async (id) => {
        const task = get().tasks.find((t) => t.id === id)
        if (task) {
            await db.tasks.update(id, { completed: !task.completed })
            set({
                tasks: get().tasks.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            })
        }
    },

    deleteTask: async (id) => {
        await db.tasks.delete(id)
        set({ tasks: get().tasks.filter((t) => t.id !== id) })
    }
}))
