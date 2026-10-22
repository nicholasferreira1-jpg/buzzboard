import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostCard from '../PostCard';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PostCard', () => {
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

  test('renders without crashing', () => {
    renderWithRouter(<PostCard {...defaultProps} />);
  });
// Placed inside describe method
   test('displays post information correctly', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  expect(screen.getByText('TestUser')).toBeInTheDocument();
  expect(screen.getByText('This is a test post')).toBeInTheDocument();
  expect(screen.getByText('2 hours ago')).toBeInTheDocument();
});

test('displays action buttons with correct counts', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  // Test like button shows initial count
  expect(screen.getByText('👍 5')).toBeInTheDocument();
  
  // Test comments display (not interactive in this component)
  expect(screen.getByText('💬 3')).toBeInTheDocument();
  
  // Test shares button shows initial count
  expect(screen.getByText('🔄 1')).toBeInTheDocument();
  
  // Test delete button exists
  expect(screen.getByRole('button', { name: /delete post/i })).toBeInTheDocument();
});

test('displays avatar image correctly', () => {
  renderWithRouter(<PostCard {...defaultProps} />);
  
  const avatar = screen.getByRole('img', { name: /user avatar/i });
  expect(avatar).toBeInTheDocument();
  expect(avatar).toHaveAttribute('src', 'avatar.jpg');
});
  
});
