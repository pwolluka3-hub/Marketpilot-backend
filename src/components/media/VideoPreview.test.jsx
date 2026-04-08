import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoPreview from './VideoPreview';

describe('VideoPreview', () => {
  it('renders a video element when src is provided', () => {
    render(<VideoPreview src="https://example.com/video.webm" />);
    expect(screen.getByRole('video', { hidden: true }) ?? document.querySelector('video')).toBeTruthy();
  });

  it('sets the src attribute on the video element', () => {
    const { container } = render(<VideoPreview src="https://example.com/video.webm" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', 'https://example.com/video.webm');
  });

  it('renders video with controls attribute', () => {
    const { container } = render(<VideoPreview src="https://example.com/video.webm" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('controls');
  });

  it('applies width: 100% style to the video element', () => {
    const { container } = render(<VideoPreview src="https://example.com/video.webm" />);
    const video = container.querySelector('video');
    expect(video).toHaveStyle({ width: '100%' });
  });

  it('renders nothing when src is undefined', () => {
    const { container } = render(<VideoPreview />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when src is null', () => {
    const { container } = render(<VideoPreview src={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when src is an empty string', () => {
    const { container } = render(<VideoPreview src="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a blob URL without crashing', () => {
    const { container } = render(<VideoPreview src="blob:http://localhost/abc-123" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', 'blob:http://localhost/abc-123');
  });
});