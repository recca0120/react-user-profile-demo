import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import fetchMock from 'fetch-mock'

// 在每個測試後重置
afterEach(() => {
  fetchMock.restore()
})