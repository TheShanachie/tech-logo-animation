# RetroChipComponent Documentation

A customizable retro-style microchip React component with animated pins, LED indicators, and colorful background stripes.

## Basic Usage

```jsx
import RetroChipComponent from './RetroChipComponent';

// Default usage
<RetroChipComponent />

// Custom configuration
<RetroChipComponent 
  size="large"
  text="AI"
  showStripes={false}
  borderColor="#ff6b6b"
/>
```

## Props

### Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | `'BG'` | Text displayed on the chip |
| `size` | string \| number | `'medium'` | Chip size: `'small'` (140px), `'medium'` (280px), `'large'` (420px), or custom number |
| `showStripes` | boolean | `true` | Show/hide the colored background stripes |
| `enableAnimation` | boolean | `true` | Enable/disable all animations (hover effects, pin pulsing, LED blinking) |

### Container Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerMode` | string | `'inline'` | Container behavior: `'inline'` (fixed size), `'fill'` (fills parent), `'fixed'` (absolute size) |
| `backgroundColor` | string | `'#f5e6d3'` | Background color of the container |
| `borderWidth` | number | `3` | Border thickness in pixels |
| `borderColor` | string | `'#2a2a2a'` | Border color |
| `borderStyle` | string | `'solid'` | CSS border style (solid, dashed, dotted, etc.) |
| `borderRadius` | number | `12` | Container corner radius in pixels |
| `padding` | number | `20` | Space between border and chip in pixels |

### Utility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Additional CSS class for the container |
| `style` | object | `{}` | Additional inline styles for the container |
| `colorScheme` | string | `'default'` | Reserved for future theme support |

## Color Customization

The component uses a centralized color object with these keys:

- `background` - Container background
- `border` - Container border
- `chipOuter` - Dark chip shell and pins (#1f2f2a)
- `chipInner` - Green chip body (#89b097)
- `text` - Chip text color
- `led` - Status LED lights
- `indicator` - Bottom-right indicator
- `stripeTop` - Orange stripe (#d4924b)
- `stripeMiddle` - Teal stripe (#6bb5c7)
- `stripeBottom` - Purple stripe (#7b6b9f)

## Container Modes

### `inline` (default)
Component has fixed dimensions and behaves as an inline-block element. Best for placing in text or flex layouts.

### `fill`
Component expands to fill its parent container while maintaining minimum size requirements. Useful for responsive layouts.

### `fixed`
Component maintains absolute dimensions regardless of context. Good for grid layouts where consistent sizing is needed.

## Examples

### Minimal Chip
```jsx
<RetroChipComponent 
  size="small"
  showStripes={false}
  borderWidth={0}
  padding={0}
/>
```

### Custom Branded Chip
```jsx
<RetroChipComponent 
  text="LOL"
  size={350}
  borderColor="#0066cc"
  borderWidth={5}
  backgroundColor="#f0f8ff"
/>
```

### Animation Disabled
```jsx
<RetroChipComponent 
  enableAnimation={false}
  containerMode="fill"
/>
```

### Compact Mode
```jsx
<RetroChipComponent 
  size="small"
  padding={10}
  borderRadius={8}
/>
```

## DOM Structure

The component creates a container with class `RetroMicrochipContainer` and data attributes:
- `data-component="retro-microchip"`
- `data-size={size}`
- `data-mode={containerMode}`

This allows for external CSS targeting and debugging.
