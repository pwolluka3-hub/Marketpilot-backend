import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoicePlayer from '../VoicePlayer';

describe('VoicePlayer', () => {
  it('renders the Voice Script prefix with text', () => {
    render(<VoicePlayer text="Hello world" />);
    expect(screen.getByText('Voice Script: Hello world')).toBeInTheDocument();
  });

  it('renders without crashing when text is undefined', () => {
    render(<VoicePlayer />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('renders without crashing when text is null', () => {
    render(<VoicePlayer text={null} />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('applies glass-card class to container', () => {
    const { container } = render(<VoicePlayer text="Hi" />);
    expect(container.querySelector('.glass-card')).not.toBeNull();
  });

  it('truncates text at 140 characters', () => {
    const longText = 'a'.repeat(200);
    render(<VoicePlayer text={longText} />);
    const expected = 'Voice Script: ' + 'a'.repeat(140);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('renders full text when text is exactly 140 characters', () => {
    const text = 'b'.repeat(140);
    render(<VoicePlayer text={text} />);
    expect(screen.getByText(`Voice Script: ${text}`)).toBeInTheDocument();
  });

  it('renders full text when text is shorter than 140 characters', () => {
    const text = 'Short text';
    render(<VoicePlayer text={text} />);
    expect(screen.getByText(`Voice Script: ${text}`)).toBeInTheDocument();
  });
});