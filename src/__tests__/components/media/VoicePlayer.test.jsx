import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VoicePlayer from '../../../components/media/VoicePlayer';

describe('VoicePlayer', () => {
  it('renders with the provided text', () => {
    render(<VoicePlayer text="Hello world" />);
    expect(screen.getByText('Voice Script: Hello world')).toBeInTheDocument();
  });

  it('truncates text to 140 characters', () => {
    const longText = 'A'.repeat(200);
    render(<VoicePlayer text={longText} />);
    const expected = 'A'.repeat(140);
    expect(screen.getByText(`Voice Script: ${expected}`)).toBeInTheDocument();
  });

  it('renders exactly 140 characters when text is exactly 140 chars', () => {
    const text = 'B'.repeat(140);
    render(<VoicePlayer text={text} />);
    expect(screen.getByText(`Voice Script: ${text}`)).toBeInTheDocument();
  });

  it('renders with no text prop without crashing', () => {
    expect(() => render(<VoicePlayer />)).not.toThrow();
  });

  it('renders label even when text is undefined', () => {
    render(<VoicePlayer />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<VoicePlayer text="test" />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders as a div', () => {
    const { container } = render(<VoicePlayer text="test" />);
    expect(container.firstChild?.tagName).toBe('DIV');
  });

  it('renders empty script label when text is empty string', () => {
    render(<VoicePlayer text="" />);
    expect(screen.getByText('Voice Script: ')).toBeInTheDocument();
  });

  it('shows text at boundary length of 139 characters fully', () => {
    const text = 'C'.repeat(139);
    render(<VoicePlayer text={text} />);
    expect(screen.getByText(`Voice Script: ${text}`)).toBeInTheDocument();
  });
});