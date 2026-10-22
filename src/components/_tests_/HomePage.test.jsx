import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

// Mock AddPost - replace with simple test component
vi.mock('../../components/AddPost', () => {
  return {
    default: ({ onAddPost }) => <div data-testid="add-post">Add Post Component</div>
  };
});

// Mock PostCard - replace with simple component that shows key props
vi.mock('../../components/PostCard', () => {
  return {
    default: ({ username, content }) => (
      <div data-testid="post-card">
        <span>{username}</span>
        <span>{content}</span>
      </div>
    )
  };
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
  test('renders without crashing', () => {
    renderWithRouter(
      <HomePage 
        posts={[]}
        topPosts={[]}
        deletePost={() => {}}
        addPost={() => {}}
      />
    );
  });
  // Additional tests to be written here
});

test('displays main headings', () => {
  renderWithRouter(
    <HomePage 
      posts={[]}
      topPosts={[]}
      deletePost={() => {}}
      addPost={() => {}}
    />
  );
  
  expect(screen.getByText('Top Posts')).toBeInTheDocument();
  expect(screen.getByText('Your Feed')).toBeInTheDocument();
  expect(screen.getByTestId('add-post')).toBeInTheDocument();
});

// Placed inside describe block
test('displays empty state when no posts', () => {
  renderWithRouter(
    <HomePage 
      posts={[]}
      topPosts={[]}
      deletePost={() => {}}
      addPost={() => {}}
    />
  );
  
  expect(screen.getByText('No Top Posts')).toBeInTheDocument();
  expect(screen.getByText('Your feed is empty')).toBeInTheDocument();
  expect(screen.getByText('No posts to display. Start sharing your thoughts!')).toBeInTheDocument();
});

test('renders posts when data is provided', () => {
  const mockPosts = [
    {
      id: 1,
      username: 'TestUser',
      content: 'Test post content',
      avatar: 'avatar.jpg',
      timestamp: '1 hour ago',
      likes: 5,
      comments: 2,
      shares: 1
    }
  ];
  
  const mockTopPosts = [
    {
      id: 2,
      username: 'TopUser',
      content: 'Top post content',
      avatar: 'avatar2.jpg',
      timestamp: '2 hours ago',
      likes: 10,
      comments: 5,
      shares: 3
    }
  ];
  
  renderWithRouter(
    <HomePage 
      posts={mockPosts}
      topPosts={mockTopPosts}
      deletePost={() => {}}
      addPost={() => {}}
    />
  );
  
  // Verify posts render (through our mocked PostCard)
  expect(screen.getByText('TestUser')).toBeInTheDocument();
  expect(screen.getByText('Test post content')).toBeInTheDocument();
  expect(screen.getByText('TopUser')).toBeInTheDocument();
  expect(screen.getByText('Top post content')).toBeInTheDocument();
  
  // Verify empty states don't show
  expect(screen.queryByText('No Top Posts')).not.toBeInTheDocument();
  expect(screen.queryByText('Your feed is empty')).not.toBeInTheDocument();
});