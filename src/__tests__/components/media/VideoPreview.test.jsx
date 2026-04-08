import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoPreview from '../../../components/media/VideoPreview';

describe('VideoPreview', () => {
  it('renders null when src is not provided', () => {
    const { container } = render(<VideoPreview />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when src is empty string', () => {
    const { container } = render(<VideoPreview src="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when src is null', () => {
    const { container } = render(<VideoPreview src={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a video element when src is provided', () => {
    render(<VideoPreview src="https://example.com/video.webm" />);
    // query by tag name since HTMLVideoElement may not have a role
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('sets src attribute from prop', () => {
    const src = 'https://example.com/video.webm';
    render(<VideoPreview src={src} />);
    expect(document.querySelector('video')).toHaveAttribute('src', src);
  });

  it('renders video with controls attribute', () => {
    render(<VideoPreview src="https://example.com/video.webm" />);
    expect(document.querySelector('video')).toHaveAttribute('controls');
  });

  it('applies width 100% style', () => {
    render(<VideoPreview src="https://example.com/video.webm" />);
    expect(document.querySelector('video')).toHaveStyle({ width: '100%' });
  });

  it('renders null when src is false (falsy)', () => {
    const { container } = render(<VideoPreview src={false} />);
    expect(container.firstChild).toBeNull();
  });
});