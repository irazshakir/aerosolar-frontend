import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeMode } from '@/theme/antdTheme'

interface UiState {
  sidebarCollapsed: boolean
  themeMode: ThemeMode
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setThemeMode: (mode: ThemeMode) => void
}

/** UI preferences only — never server or auth state. */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      themeMode: 'light',
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    { name: 'sial-ui' },
  ),
)
