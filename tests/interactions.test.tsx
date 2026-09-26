import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('interactions', () => {
  it('opens the mobile menu and closes it with Escape', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy();
  });

  it('closes the menu when a nav link is chosen', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.click(screen.getByRole('navigation', { name: 'Primary' }).querySelector('a') as HTMLAnchorElement);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy();
  });

  it('copies the email address and reports failure gracefully', async () => {
    const writeText = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    render(<App />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Copy/ }));
    });
    expect(writeText).toHaveBeenCalledWith('atultiwari.in@gmail.com');
    expect(screen.getByText('Copied')).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Copied/ }));
    });
    expect(screen.getByText(/Copy failed/)).toBeTruthy();
  });

  it('shows timeline details on hover and focus', () => {
    render(<App />);
    const bar = screen.getByRole('listitem', { name: /Liverpool John Moores/ });
    fireEvent.mouseEnter(bar);
    expect(document.querySelector('.chart__readout')?.textContent).toContain('Liverpool John Moores');
    fireEvent.mouseLeave(bar);
    expect(document.querySelector('.chart__readout')?.textContent).toContain('Hover or tab');
    fireEvent.focus(bar);
    expect(document.querySelector('.chart__readout')?.textContent).toContain('Feb 2022 – Mar 2024');
    fireEvent.blur(bar);
  });

  it('selects a cell from the keyboard and toggles the scan controls', () => {
    render(<App />);
    const cell = screen.getAllByRole('button', { name: /White cell/ })[3];
    fireEvent.keyDown(cell, { key: 'Enter' });
    expect(screen.getByText('Cell 4/5')).toBeTruthy();
    fireEvent.keyDown(cell, { key: 'a' });

    const cam = screen.getByRole('button', { name: 'Grad-CAM' });
    const before = cam.getAttribute('aria-pressed');
    fireEvent.click(cam);
    expect(cam.getAttribute('aria-pressed')).not.toBe(before);

    fireEvent.click(screen.getByRole('button', { name: /Resume scan/ }));
    expect(screen.getByRole('button', { name: /Pause scan/ })).toBeTruthy();
  });

  it('advances the scan automatically while playing', () => {
    vi.useFakeTimers();
    render(<App />);
    expect(screen.getByText('Cell 1/5')).toBeTruthy();
    act(() => {
      vi.advanceTimersByTime(2900);
    });
    expect(screen.getByText('Cell 2/5')).toBeTruthy();
    vi.useRealTimers();
  });
});
