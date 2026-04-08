import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContentCard from '../ContentCard';

describe('ContentCard', () => {
  it('renders the title inside an h3', () => {
    render(<ContentCard title="My Title" body="Some body" />);
    expect(screen.getByRole('heading', { level: 3, name: 'My Title' })).toBeInTheDocument();
  });

  it('renders the body text inside a paragraph', () => {
    render(<ContentCard title="Title" body="Body text" />);
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders an article element', () => {
    const { container } = render(<ContentCard title="T" body="B" />);
    expect(container.querySelector('article')).not.toBeNull();
  });

  it('applies glass-card class to article', () => {
    const { container } = render(<ContentCard title="T" body="B" />);
    expect(container.querySelector('article')).toHaveClass('glass-card');
  });

  it('renders without title and body (undefined props)', () => {
    const { container } = render(<ContentCard />);
    expect(container.querySelector('article')).not.toBeNull();
  });

  it('renders special characters in title and body correctly', () => {
    render(<ContentCard title="Title & More <Special>" body="Body > content" />);
    expect(screen.getByText('Title & More <Special>')).toBeInTheDocument();
    expect(screen.getByText('Body > content')).toBeInTheDocument();
  });

  it('renders long body text fully', () => {
    const longText = 'a'.repeat(500);
    render(<ContentCard title="T" body={longText} />);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });
});