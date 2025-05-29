import { create } from 'zustand';

interface SelectedOption {
  questionId: number;
  optionIds: string[];
}

interface PhilosophyStore {
  selectedOptions: SelectedOption[];
  selectedTags: string[];
  addSelection: (questionId: number, optionId: string, tags: string[]) => void;
  resetSelections: () => void;
}

export const usePhilosophyStore = create<PhilosophyStore>((set, get) => ({
  selectedOptions: [],
  selectedTags: [],
  addSelection: (questionId, optionId, tags) => {
    const state = get();
    const updatedOptions = [...state.selectedOptions];
    const existing = updatedOptions.find((s) => s.questionId === questionId);
    if (existing) {
      if (!existing.optionIds.includes(optionId)) {
        existing.optionIds.push(optionId);
      }
    } else {
      updatedOptions.push({ questionId, optionIds: [optionId] });
    }

    const mergedTags = Array.from(new Set([...state.selectedTags, ...tags]));

    // ⬇ API送信（非同期で思想ログを保存）
    fetch('/api/philosophy/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'anonymous', // 将来ログインIDに変更予定
        tags: mergedTags
      })
    }).catch((err) => console.error('思想タグ保存に失敗:', err));

    set({
      selectedOptions: updatedOptions,
      selectedTags: mergedTags
    });
  },
  resetSelections: () => set({ selectedOptions: [], selectedTags: [] })
}));
