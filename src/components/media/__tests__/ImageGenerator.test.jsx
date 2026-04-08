import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ImageGenerator from '../ImageGenerator';

describe('ImageGenerator', () => {
  it('renders an img element when imageUrl is provided', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.jpg" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders null (nothing) when imageUrl is not provided', () => {
    const { container } = render(<ImageGenerator />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when imageUrl is empty string', () => {
    const { container } = render(<ImageGenerator imageUrl="" />);
    expect(container.firstChild).toBeNull();
  });

  it('sets src attribute on the image', () => {
    render(<ImageGenerator imageUrl="https://example.com/photo.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/photo.png');
  });

  it('sets alt text to "Generated"', () => {
    render(<ImageGenerator imageUrl="https://example.com/photo.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Generated');
  });

  it('sets image width to 100%', () => {
    render(<ImageGenerator imageUrl="https://example.com/photo.png" />);
    expect(screen.getByRole('img').style.width).toBe('100%');
  });

  it('renders null when imageUrl is null', () => {
    const { container } = render(<ImageGenerator imageUrl={null} />);
    expect(container.firstChild).toBeNull();
  });
});