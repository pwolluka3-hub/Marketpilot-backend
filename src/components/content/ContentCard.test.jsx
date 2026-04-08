import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentCard from './ContentCard';

describe('ContentCard', () => {
  it('renders the title', () => {
    render(<ContentCard title="My Title" body="My body" />);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<ContentCard title="Title" body="Body content here" />);
    expect(screen.getByText('Body content here')).toBeInTheDocument();
  });

  it('renders title in an h3 element', () => {
    render(<ContentCard title="Heading" body="Content" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Heading' })).toBeInTheDocument();
  });

  it('renders body in a paragraph element', () => {
    const { container } = render(<ContentCard title="T" body="Paragraph text" />);
    const p = container.querySelector('p');
    expect(p).toBeInTheDocument();
    expect(p?.textContent).toBe('Paragraph text');
  });

  it('renders inside an article element', () => {
    const { container } = render(<ContentCard title="T" body="B" />);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('applies glass-card CSS class to the article', () => {
    const { container } = render(<ContentCard title="T" body="B" />);
    expect(container.querySelector('article')).toHaveClass('glass-card');
  });

  it('renders empty strings without crashing', () => {
    render(<ContentCard title="" body="" />);
    const article = document.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('renders numeric-like string values in body', () => {
    render(<ContentCard title="Score" body="42" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});