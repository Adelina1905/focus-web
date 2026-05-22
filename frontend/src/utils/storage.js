const STORAGE_KEY = "focus-app:data:v1";

const defaultData = {
  workingSession: 0
};

export function loadFocusData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  } catch {
    return defaultData;
  }
}

export function saveFocusData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}