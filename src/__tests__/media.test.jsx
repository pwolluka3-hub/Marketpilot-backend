import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageGenerator from '../components/media/ImageGenerator';
import VideoPreview from '../components/media/VideoPreview';
import VoicePlayer from '../components/media/VoicePlayer';

// ---------------------------------------------------------------------------
// ImageGenerator
// ---------------------------------------------------------------------------
describe('ImageGenerator', () => {
  it('renders an img element when imageUrl is provided', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.png" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('img src matches the provided imageUrl', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.png');
  });

  it('img has alt text "Generated"', () => {
    render(<ImageGenerator imageUrl="https://example.com/image.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Generated');
  });

  it('renders nothing when imageUrl is falsy (undefined)', () => {
    const { container } = render(<ImageGenerator />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when imageUrl is an empty string', () => {
    const { container } = render(<ImageGenerator imageUrl="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when imageUrl is null', () => {
    const { container } = render(<ImageGenerator imageUrl={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('img has 100% width style', () => {
    render(<ImageGenerator imageUrl="https://example.com/img.jpg" />);
    expect(screen.getByRole('img')).toHaveStyle({ width: '100%' });
  });
});

// ---------------------------------------------------------------------------
// VideoPreview
// ---------------------------------------------------------------------------
describe('VideoPreview', () => {
  it('renders a video element when src is provided', () => {
    render(<VideoPreview src="https://example.com/video.mp4" />);
    // video element doesn't have an accessible role by default; query by tag
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('video src matches the provided src prop', () => {
    render(<VideoPreview src="https://example.com/video.mp4" />);
    expect(document.querySelector('video')).toHaveAttribute('src', 'https://example.com/video.mp4');
  });

  it('video has controls attribute', () => {
    render(<VideoPreview src="https://example.com/video.mp4" />);
    expect(document.querySelector('video')).toHaveAttribute('controls');
  });

  it('video has 100% width style', () => {
    render(<VideoPreview src="https://example.com/video.mp4" />);
    expect(document.querySelector('video')).toHaveStyle({ width: '100%' });
  });

  it('renders nothing when src is falsy (undefined)', () => {
    const { container } = render(<VideoPreview />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when src is an empty string', () => {
    const { container } = render(<VideoPreview src="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when src is null', () => {
    const { container } = render(<VideoPreview src={null} />);
    expect(container.firstChild).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// VoicePlayer
// ---------------------------------------------------------------------------
describe('VoicePlayer', () => {
  it('renders "Voice Script:" label', () => {
    render(<VoicePlayer text="Hello world" />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('displays the full text when under 140 characters', () => {
    render(<VoicePlayer text="Short text" />);
    expect(screen.getByText('Voice Script: Short text')).toBeInTheDocument();
  });

  it('truncates text to 140 characters', () => {
    const longText = 'A'.repeat(200);
    render(<VoicePlayer text={longText} />);
    const expected = 'Voice Script: ' + 'A'.repeat(140);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('shows exactly 140 characters of text at the boundary', () => {
    const text140 = 'B'.repeat(140);
    render(<VoicePlayer text={text140} />);
    expect(screen.getByText('Voice Script: ' + text140)).toBeInTheDocument();
  });

  it('handles undefined text gracefully (no crash)', () => {
    render(<VoicePlayer />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('handles null text gracefully', () => {
    render(<VoicePlayer text={null} />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('has glass-card class on wrapper', () => {
    render(<VoicePlayer text="test" />);
    expect(screen.getByText(/Voice Script:/).closest('div')).toHaveClass('glass-card');
  });

  it('shows exactly 139-character text fully (boundary - 1)', () => {
    const text = 'C'.repeat(139);
    render(<VoicePlayer text={text} />);
    expect(screen.getByText('Voice Script: ' + text)).toBeInTheDocument();
  });
});