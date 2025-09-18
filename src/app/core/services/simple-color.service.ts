// Create new file: src/app/core/services/simple-color.service.ts
import { Injectable } from '@angular/core';

export interface ColorScheme {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  neutralLight: string;
  neutralSoft: string;
  neutralMid: string;
  neutralDark: string;
  danger: string;
  warning: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimpleColorService {

  // Default color scheme
  private defaultColors: ColorScheme = {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#6c757d',
    accent: '#28a745',
    neutralLight: '#f8f9fa',
    neutralSoft: '#e9ecef',
    neutralMid: '#6c757d',
    neutralDark: '#333333',
    danger: '#dc3545',
    warning: '#ffc107'
  };

  // Predefined color schemes you can switch between
  private colorSchemes = {
    default: this.defaultColors,
    ocean: {
      primary: '#006994',
      primaryDark: '#004d6f',
      secondary: '#5c8a9a',
      accent: '#00acc1',
      neutralLight: '#f0f4f5',
      neutralSoft: '#d4e1e5',
      neutralMid: '#6c8a94',
      neutralDark: '#2c3e44',
      danger: '#e74c3c',
      warning: '#f39c12'
    },
    warm: {
      primary: '#ff6b6b',
      primaryDark: '#ee5a52',
      secondary: '#95a5a6',
      accent: '#f39c12',
      neutralLight: '#fef9f3',
      neutralSoft: '#f5e6d3',
      neutralMid: '#7f8c8d',
      neutralDark: '#2c3e50',
      danger: '#c0392b',
      warning: '#e67e22'
    },
    forest: {
      primary: '#27ae60',
      primaryDark: '#229954',
      secondary: '#7f8c8d',
      accent: '#16a085',
      neutralLight: '#f4f9f4',
      neutralSoft: '#d5e8d4',
      neutralMid: '#718c71',
      neutralDark: '#2c3e2c',
      danger: '#e74c3c',
      warning: '#f1c40f'
    }
  };

  constructor() {
    // Load saved colors from localStorage if they exist
    this.loadSavedColors();
  }

  /**
   * Update a single color
   */
  updateColor(colorName: keyof ColorScheme, value: string): void {
    const cssVarName = this.getCssVarName(colorName);
    document.documentElement.style.setProperty(cssVarName, value);
    this.saveColors();
  }

  /**
   * Apply a predefined color scheme
   */
  applyScheme(schemeName: 'default' | 'ocean' | 'warm' | 'forest'): void {
    const scheme = this.colorSchemes[schemeName];
    if (scheme) {
      Object.entries(scheme).forEach(([key, value]) => {
        const cssVarName = this.getCssVarName(key as keyof ColorScheme);
        document.documentElement.style.setProperty(cssVarName, value);
      });
      localStorage.setItem('colorScheme', schemeName);
    }
  }

  /**
   * Get current color value
   */
  getColor(colorName: keyof ColorScheme): string {
    const cssVarName = this.getCssVarName(colorName);
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue(cssVarName).trim() || this.defaultColors[colorName];
  }

  /**
   * Reset to default colors
   */
  resetColors(): void {
    this.applyScheme('default');
    localStorage.removeItem('colorScheme');
    localStorage.removeItem('customColors');
  }

  /**
   * Convert colorName to CSS variable name
   */
  private getCssVarName(colorName: string): string {
    // Convert camelCase to kebab-case
    const kebab = colorName.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `--color-${kebab}`;
  }

  /**
   * Save current colors to localStorage
   */
  private saveColors(): void {
    const currentColors: any = {};
    Object.keys(this.defaultColors).forEach(key => {
      currentColors[key] = this.getColor(key as keyof ColorScheme);
    });
    localStorage.setItem('customColors', JSON.stringify(currentColors));
  }

  /**
   * Load saved colors from localStorage
   */
  private loadSavedColors(): void {
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme && savedScheme in this.colorSchemes) {
      this.applyScheme(savedScheme as keyof typeof this.colorSchemes);
    }

    const customColors = localStorage.getItem('customColors');
    if (customColors) {
      try {
        const colors = JSON.parse(customColors);
        Object.entries(colors).forEach(([key, value]) => {
          this.updateColor(key as keyof ColorScheme, value as string);
        });
      } catch (e) {
        console.error('Failed to load custom colors:', e);
      }
    }
  }
}
