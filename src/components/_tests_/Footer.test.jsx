import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
// Render without crashing test not shown
// Display test
test('displays engagement statistics correctly', () => {
  render(
    <Footer 
      totalLikes={42}
      totalComments={18}
      totalShares={7}
      totalEngagement={67}
    />
  );
  
  // Verify the engagement statistics appear
  expect(screen.getByText('👍 Total Likes:')).toBeInTheDocument();
  expect(screen.getByText('42')).toBeInTheDocument();
  
  // Verify comments count appears
  expect(screen.getByText('💬 Total Comments:')).toBeInTheDocument();
  expect(screen.getByText('18')).toBeInTheDocument();
  
  // Verify the heading appears
  expect(screen.getByText('📊 Engagement Statistics')).toBeInTheDocument();
  });
});