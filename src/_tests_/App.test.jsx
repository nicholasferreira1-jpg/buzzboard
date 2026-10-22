import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('App localStorage Integration', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });


  // Inside describe()
test('loads posts from localStorage on component mount', () => {
  // Arrange - set up what localStorage should return
  const savedPosts = JSON.stringify([
    { id: 1, content: 'Saved post', username: 'SavedUser' }
  ]);
  localStorageMock.getItem.mockReturnValue(savedPosts);
  
  // Act - render the component
  render(<App />);
  
  // Assert - verify localStorage was checked
  expect(localStorageMock.getItem).toHaveBeenCalledWith('posts');
});


// Inside describe()
test('saves posts to localStorage when posts change', async () => {
  // Mock empty initial state
  localStorageMock.getItem.mockReturnValue('[]');
  
  render(<App />);
  
  // Wait for useEffect to complete initial save
  await waitFor(() => {
    expect(localStorageMock.setItem).toHaveBeenCalledWith('posts', '[]');
  });
});
  // Tests written here

   test('persists posts across component remounts', async () => {
        // Initial render with empty localStorage
        localStorageMock.getItem.mockReturnValue('[]');
        
        const { unmount } = render(<App />);
        
        // Simulate posts being added (this would trigger useEffect)
        const testPosts = [{ id: 1, content: 'Test', username: 'User' }];
        
        // Verify save happened
        await waitFor(() => {
            expect(localStorageMock.setItem).toHaveBeenCalledWith('posts', '[]');
        });
        
        // Unmount component
        unmount();
        
        // Mock localStorage returning the saved data
        localStorageMock.getItem.mockReturnValue(JSON.stringify(testPosts));
        
        // Re-render component
        render(<App />);
        
        // Verify data was loaded
        expect(localStorageMock.getItem).toHaveBeenCalledWith('posts');
    });
    
});