import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostCard from '../PostCard';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PostCard State Management', () => {
  const defaultProps = {
    username: 'TestUser',
    avatar: 'avatar.jpg',
    content: 'This is a test post',
    timestamp: '2 hours ago',
    likes: 5,
    comments: 3,
    shares: 1,
    postId: 1,
    onDeletePost: vi.fn()
  };


// Inside describe()
test('displays initial like count from props', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  expect(screen.getByText('👍 5')).toBeInTheDocument();
  expect(screen.getByText('🔄 1')).toBeInTheDocument();
});

// Inside describe()
test('increments like count when like button is clicked', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  // Find the like button
  const likeButton = screen.getByText('👍 5');
  
  // Click the button
  fireEvent.click(likeButton);
  
  // Verify the count increased
  expect(screen.getByText('👍 6')).toBeInTheDocument();
  expect(screen.queryByText('👍 5')).not.toBeInTheDocument();
});

// Inside describe()
test('handles multiple like button clicks', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  const likeButton = screen.getByText('👍 5');
  
  // Click multiple times
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  
  // Verify final state
  expect(screen.getByText('👍 8')).toBeInTheDocument();
});
  

// Inside describe()
test('like and share counts update independently', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  // Click like button
  const likeButton = screen.getByText('👍 5');
  fireEvent.click(likeButton);
  
  // Click share button  
  const shareButton = screen.getByText('🔄 1');
  fireEvent.click(shareButton);
  
  // Verify both updated correctly
  expect(screen.getByText('👍 6')).toBeInTheDocument();
  expect(screen.getByText('🔄 2')).toBeInTheDocument();
});


test('calls onDeletePost when delete button is clicked', () => {
  const mockDelete = vi.fn();
  
  renderWithRouter(<PostCard {...defaultProps} onDeletePost={mockDelete} />);
  
  const deleteButton = screen.getByRole('button', { name: /delete post/i });
  fireEvent.click(deleteButton);
  
  expect(mockDelete).toHaveBeenCalledWith(1); // postId
  expect(mockDelete).toHaveBeenCalledTimes(1);
});

});
