# Dish Details Bottom Sheet Component

A responsive React component that displays dish details in a mobile-optimized bottom sheet popup, matching the provided design specifications.

## Features

- ✅ **Exact Design Match**: Matches the provided UI design pixel-perfectly
- 📱 **Fully Responsive**: Optimized for all phone sizes (iPhone SE to iPhone Pro Max and beyond)
- 🎨 **Modern UI**: Clean, modern interface with smooth animations
- ♿ **Accessible**: Includes proper ARIA labels, keyboard navigation, and focus management
- 🚀 **Performance Optimized**: Lazy loading images, smooth animations, and efficient rendering
- 🎯 **Touch Optimized**: Proper touch targets for mobile devices

## Responsive Breakpoints

- **iPhone SE (375px and below)**: 85vh height, optimized spacing
- **iPhone 12/13/14 (376px - 414px)**: 80vh height, standard layout
- **iPhone Plus/Max (415px - 480px)**: 75vh height, larger images
- **Large phones/tablets (481px+)**: 70vh height, maximum width constraint

## Component Structure

### Main Components

1. **HomePage**: Main container with dish grid and bottom sheet trigger
2. **BottomSheet**: Reusable modal component with backdrop and animations
3. **Dish Details**: Complete dish information display with:
   - Hero image with rating badge
   - Title and description
   - Nutritional information (calories, weight)
   - Ingredients composition
   - Add-on options (radio buttons)
   - Customer reviews
   - Quantity controls and add to cart button

### Key Features

- **Smooth Animations**: CSS transitions and transforms for opening/closing
- **Backdrop Blur**: Modern glass-morphism effect on rating badge
- **Safe Area Support**: Handles devices with notches and home indicators
- **Scroll Management**: Prevents body scroll when modal is open
- **Keyboard Support**: ESC key closes the modal
- **Loading States**: Fallback images and smooth loading transitions

## Styling

The component uses:
- **Tailwind CSS**: For utility-first styling and responsive design
- **Custom CSS**: For advanced animations and browser-specific features
- **Material-UI Icons**: For consistent iconography
- **Inter Font**: For modern, readable typography

## Browser Support

- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 88+

## Accessibility Features

- Proper ARIA roles and labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support
- Reduced motion support for users with vestibular disorders

## Performance Optimizations

- Lazy loading for images
- Efficient re-renders with React hooks
- CSS `will-change` for smooth animations
- Optimized touch scrolling on iOS
- Minimal bundle size with tree-shaking

## Usage

```tsx
import HomePage from './HomePage';

function App() {
  return <HomePage />;
}
```

The component is self-contained and includes all necessary state management, styling, and interactions.

## Customization

The component can be easily customized by:
- Modifying the `dish` object for different content
- Adjusting Tailwind classes for styling changes
- Updating the `styles.css` file for advanced customizations
- Changing breakpoints in the CSS media queries

## File Structure

```
/workspace/
├── HomePage.tsx          # Main React component
├── styles.css           # Custom CSS for responsive design
├── package.json         # Dependencies and scripts
└── README-component.md  # This documentation
```