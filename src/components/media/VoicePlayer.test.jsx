import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VoicePlayer from './VoicePlayer';

describe('VoicePlayer', () => {
  it('renders "Voice Script:" label', () => {
    render(<VoicePlayer text="Hello world" />);
    expect(screen.getByText(/Voice Script:/)).toBeInTheDocument();
  });

  it('renders the provided text', () => {
    render(<VoicePlayer text="Hello world" />);
    expect(screen.getByText('Voice Script: Hello world')).toBeInTheDocument();
  });

  it('truncates text to 140 characters', () => {
    const longText = 'A'.repeat(200);
    render(<VoicePlayer text={longText} />);
    expect(screen.getByText(`Voice Script: ${'A'.repeat(140)}`)).toBeInTheDocument();
  });

  it('does not truncate text shorter than 140 characters', () => {
    const shortText = 'Short text';
    render(<VoicePlayer text={shortText} />);
    expect(screen.getByText('Voice Script: Short text')).toBeInTheDocument();
  });

  it('renders text of exactly 140 characters in full', () => {
    const exactText = 'B'.repeat(140);
    render(<VoicePlayer text={exactText} />);
    expect(screen.getByText(`Voice Script: ${'B'.repeat(140)}`)).toBeInTheDocument();
  });

  it('renders without crashing when text is undefined', () => {
    expect(() => render(<VoicePlayer />)).not.toThrow();
  });

  it('renders "Voice Script: " when text is undefined', () => {
    render(<VoicePlayer />);
    expect(screen.getByText('Voice Script:')).toBeInTheDocument();
  });

  it('renders "Voice Script: " when text is empty string', () => {
    render(<VoicePlayer text="" />);
    expect(screen.getByText('Voice Script:')).toBeInTheDocument();
  });

  it('applies glass-card CSS class', () => {
    const { container } = render(<VoicePlayer text="Test" />);
    expect(container.firstChild).toHaveClass('glass-card');
  });
});