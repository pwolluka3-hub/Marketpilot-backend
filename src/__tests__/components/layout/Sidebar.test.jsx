import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../../components/layout/Sidebar';

const links = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];

function renderSidebar() {
  return render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
}

describe('Sidebar', () => {
  it('renders the NexusAI brand heading', () => {
    renderSidebar();
    expect(screen.getByRole('heading', { name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders inside an <aside> element', () => {
    const { container } = renderSidebar();
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  it('applies glass-card class to aside', () => {
    const { container } = renderSidebar();
    expect(container.querySelector('aside')).toHaveClass('glass-card');
  });

  it.each(links)('renders a link for "%s"', (name) => {
    renderSidebar();
    expect(screen.getByRole('link', { name })).toBeInTheDocument();
  });

  it.each(links)('link for "%s" points to correct path', (name) => {
    renderSidebar();
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', `/${name}`);
  });

  it('renders exactly 7 navigation links', () => {
    renderSidebar();
    expect(screen.getAllByRole('link')).toHaveLength(links.length);
  });
});