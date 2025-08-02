# 單一職責原則分析

本文件分析 `UserProfile.tsx` 和 `UserProfile.test.tsx` 是否遵循單一職責原則 (Single Responsibility Principle, SRP)。

## UserProfile.tsx

### 評定結果：**部分符合**

#### 符合的部分：
1. **單一目的**：元件有明確的單一職責 - 顯示使用者個人資料
2. **專注於 UI 渲染**：所有 JSX 元素都直接與顯示使用者資料相關
3. **清晰的介面**：只接受一個 prop (`userId`)，目的單純

#### 違反 SRP 的部分：
1. **資料擷取邏輯**：元件同時處理資料擷取和呈現
   - 包含 `useEffect` 中的 fetch 邏輯
   - 管理載入狀態
   - 處理錯誤狀態
   - 執行資料轉換

2. **多重狀態管理關注點**：
   - 管理使用者資料狀態
   - 管理載入狀態
   - 管理錯誤狀態

#### 改善建議以更符合 SRP：
```typescript
// 將資料擷取分離到自訂 hook
const useUserData = (userId: string) => {
  // 所有資料擷取邏輯放在這裡
  return { user, loading, error };
};

// 元件只處理呈現
const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { user, loading, error } = useUserData(userId);
  // 只有渲染邏輯
};
```

## 總結

**UserProfile.tsx**：違反 SRP，混合了資料擷取關注點與呈現邏輯。可透過將資料擷取提取到自訂 hook 或服務來改善。

在 React 應用程式中，元件經常為了簡單性而同時處理資料和呈現關注點，但這確實違反了單一職責原則。