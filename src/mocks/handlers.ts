import { http, HttpResponse } from 'msw'
import { User } from '../types/user'

export const handlers = [
  http.get('/api/user/:id', ({ params }) => {
    const { id } = params as { id: string }
    
    const users: Record<string, User> = {
      '1': {
        id: '1',
        name: "張小明",
        email: "john.doe@example.com",
        avatar: "https://i.pravatar.cc/150?img=1",
        bio: "熱愛編程的全端工程師，專注於 React 和 Node.js 開發。",
        location: "台北, 台灣",
        joinDate: "2023年1月",
        followers: 1234,
        following: 567
      },
      '2': {
        id: '2',
        name: "陳美玲",
        email: "meiling.chen@example.com",
        avatar: "https://i.pravatar.cc/150?img=5",
        bio: "前端工程師，熱愛使用 React 建立美觀且實用的網頁應用程式。喜歡學習新技術，並與團隊分享知識。",
        location: "台中, 台灣",
        joinDate: "2022年6月",
        followers: 2456,
        following: 892
      }
    }
    
    const user = users[id] || users['1']
    
    return HttpResponse.json(user)
  }),
  
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: '1',
      name: "張小明",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "熱愛編程的全端工程師，專注於 React 和 Node.js 開發。",
      location: "台北, 台灣",
      joinDate: "2023年1月",
      followers: 1234,
      following: 567
    })
  })
]