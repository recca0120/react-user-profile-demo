import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import UserProfile from './UserProfile'
import TestSWRProvider from '../test-utils/TestSWRProvider'

describe('UserProfile', () => {
  // Helper function to render with TestSWRProvider
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <TestSWRProvider>
        {ui}
      </TestSWRProvider>
    )
  }

  beforeEach(() => {
    // 重置並初始化 fetchMock
    fetchMock.restore()
    fetchMock.config.overwriteRoutes = true
  })

  it('顯示載入中狀態', () => {
    // 使用 delay 來保持載入狀態
    fetchMock.get('/api/user/1', { delay: 1000 })

    renderWithProvider(<UserProfile userId="1" />)
    
    expect(screen.getByText('載入中...')).toBeInTheDocument()
  })

  it('成功載入並顯示使用者資料', async () => {
    const mockUser = {
      id: '1',
      name: '測試使用者',
      email: 'test@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: '這是測試使用者的簡介',
      location: '測試城市',
      joinDate: '2023年1月',
      followers: 100,
      following: 50
    }

    fetchMock.get('/api/user/1', mockUser)

    renderWithProvider(<UserProfile userId="1" />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    // 驗證 API 被正確呼叫
    expect(fetchMock.calls()).toHaveLength(1)
    expect(fetchMock.lastUrl()).toBe('/api/user/1')

    // 驗證使用者資料顯示
    expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
    expect(screen.getByText(mockUser.bio)).toBeInTheDocument()
    expect(screen.getByText(`📍 ${mockUser.location}`)).toBeInTheDocument()
    expect(screen.getByText(`📅 加入於 ${mockUser.joinDate}`)).toBeInTheDocument()
    expect(screen.getByText(mockUser.followers.toString())).toBeInTheDocument()
    expect(screen.getByText(mockUser.following.toString())).toBeInTheDocument()
  })

  it('處理錯誤狀態', async () => {
    fetchMock.get('/api/user/1', 500)

    renderWithProvider(<UserProfile userId="1" />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    expect(screen.getByText(/錯誤:/)).toBeInTheDocument()
  })


  it('當 API 回傳 404 時顯示找不到資料', async () => {
    fetchMock.get('/api/user/1', 404)

    renderWithProvider(<UserProfile userId="1" />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    expect(screen.getByText(/錯誤:/)).toBeInTheDocument()
  })


  it('處理網路錯誤', async () => {
    fetchMock.get('/api/user/1', { throws: new Error('Network error') })

    renderWithProvider(<UserProfile userId="1" />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    expect(screen.getByText(/錯誤: Network error/)).toBeInTheDocument()
  })

  it('當 API 回傳 null 資料時顯示找不到使用者資料', async () => {
    fetchMock.get('/api/user/1', { 
      body: 'null', 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    })

    renderWithProvider(<UserProfile userId="1" />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    expect(screen.getByText('找不到使用者資料')).toBeInTheDocument()
  })

})