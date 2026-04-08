import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentCard from '../../../components/content/ContentCard';

describe('ContentCard', () => {
  it('renders the title in an h3 element', () => {
    render(<ContentCard title="My Title" body="Some body" />);
    expect(screen.getByRole('heading', { level: 3, name: 'My Title' })).toBeInTheDocument();
  });

  it('renders the body text in a p element', () => {
    render(<ContentCard title="T" body="Body content" />);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders inside an <article> element', () => {
    const { container } = render(<ContentCard title="T" body="B" />);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('applies glass-card class to article', () => {
    const { container } = render(<ContentCard title="T" body="B" />);
    expect(container.querySelector('article')).toHaveClass('glass-card');
  });

  it('renders with empty title and body without crashing', () => {
    expect(() => render(<ContentCard title="" body="" />)).not.toThrow();
  });

  it('renders without props without crashing', () => {
    expect(() => render(<ContentCard />)).not.toThrow();
  });

  it('renders special characters in title and body', () => {
    render(<ContentCard title="<Script>" body='alert("xss")' />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('<Script>');
    expect(screen.getByText('alert("xss")')).toBeInTheDocument();
  });
});