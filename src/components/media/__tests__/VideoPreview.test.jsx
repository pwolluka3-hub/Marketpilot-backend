import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VideoPreview from '../VideoPreview';

describe('VideoPreview', () => {
  it('renders a video element when src is provided', () => {
    const { container } = render(<VideoPreview src="https://example.com/video.webm" />);
    expect(container.querySelector('video')).not.toBeNull();
  });

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

  it('sets the src attribute on the video element', () => {
    const url = 'https://example.com/clip.webm';
    const { container } = render(<VideoPreview src={url} />);
    expect(container.querySelector('video')).toHaveAttribute('src', url);
  });

  it('adds controls attribute to video', () => {
    const { container } = render(<VideoPreview src="https://example.com/clip.webm" />);
    expect(container.querySelector('video')).toHaveAttribute('controls');
  });

  it('sets video width to 100%', () => {
    const { container } = render(<VideoPreview src="https://example.com/clip.webm" />);
    expect(container.querySelector('video').style.width).toBe('100%');
  });
});