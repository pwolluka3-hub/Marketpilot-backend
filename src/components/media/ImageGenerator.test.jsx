import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageGenerator from './ImageGenerator';

describe('ImageGenerator', () => {
  it('renders an img element when imageUrl is provided', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.jpg" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('sets the src attribute to the provided imageUrl', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.jpg" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('sets alt text to "Generated"', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.jpg" />);
    expect(screen.getByAltText('Generated')).toBeInTheDocument();
  });

  it('applies width: 100% style to the image', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.jpg" />);
    expect(screen.getByRole('img')).toHaveStyle({ width: '100%' });
  });

  it('renders nothing when imageUrl is undefined', () => {
    const { container } = render(<ImageGenerator />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when imageUrl is null', () => {
    const { container } = render(<ImageGenerator imageUrl={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when imageUrl is an empty string', () => {
    const { container } = render(<ImageGenerator imageUrl="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a blob URL without crashing', () => {
    render(<ImageGenerator imageUrl="blob:http://localhost/abc-123" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'blob:http://localhost/abc-123');
  });
});