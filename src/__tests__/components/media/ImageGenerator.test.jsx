import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageGenerator from '../../../components/media/ImageGenerator';

describe('ImageGenerator', () => {
  it('renders null when imageUrl is not provided', () => {
    const { container } = render(<ImageGenerator />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when imageUrl is empty string', () => {
    const { container } = render(<ImageGenerator imageUrl="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when imageUrl is null', () => {
    const { container } = render(<ImageGenerator imageUrl={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders an img element when imageUrl is provided', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.png" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('sets src attribute from imageUrl prop', () => {
    const url = 'https://example.com/image.png';
    render(<ImageGenerator imageUrl={url} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', url);
  });

  it('sets alt text to "Generated"', () => {
    render(<ImageGenerator imageUrl="https://example.com/img.png" />);
    expect(screen.getByAltText('Generated')).toBeInTheDocument();
  });

  it('applies width 100% style to the image', () => {
    render(<ImageGenerator imageUrl="https://example.com/img.png" />);
    expect(screen.getByRole('img')).toHaveStyle({ width: '100%' });
  });

  it('renders null when imageUrl is false (falsy)', () => {
    const { container } = render(<ImageGenerator imageUrl={false} />);
    expect(container.firstChild).toBeNull();
  });
});