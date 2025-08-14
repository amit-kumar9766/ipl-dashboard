# UI Components Library

A modular, reusable UI component library built with TypeScript and Tailwind CSS.

## 🎯 Features

- **Modular Design**: Each component is in its own directory with proper exports
- **TypeScript Support**: Full type safety with proper interfaces
- **Tailwind CSS**: Utility-first styling with custom variants
- **Accessible**: Built with accessibility in mind
- **Customizable**: Extensive props for customization
- **Consistent**: Unified design system across all components

## 📦 Components

### Button
A versatile button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `icon`: ReactNode
- `iconPosition`: 'left' | 'right'

### Card
A flexible card component with header, footer, and multiple variants.

```tsx
import { Card } from '@/components/ui';

<Card variant="elevated" header={<h3>Title</h3>}>
  Content goes here
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined' | 'gradient'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean
- `header`: ReactNode
- `footer`: ReactNode

### Loading
A loading component with multiple variants and sizes.

```tsx
import { Loading } from '@/components/ui';

<Loading variant="spinner" size="lg" text="Loading..." />
```

**Props:**
- `variant`: 'spinner' | 'dots' | 'pulse'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `text`: string
- `fullScreen`: boolean

### Input
A form input component with validation and icon support.

```tsx
import { Input } from '@/components/ui';

<Input 
  type="text" 
  placeholder="Enter text" 
  label="Name"
  error="This field is required"
/>
```

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'search'
- `placeholder`: string
- `label`: string
- `error`: string
- `icon`: ReactNode
- `iconPosition`: 'left' | 'right'

### Badge
A badge component for displaying status, labels, or counts.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success" size="md">
  Active
</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: boolean
- `icon`: ReactNode

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray scale

### Spacing
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

### Typography
- **sm**: 0.875rem (14px)
- **md**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)

## 🚀 Usage

### Basic Import
```tsx
import { Button, Card, Loading } from '@/components/ui';
```

### Individual Import
```tsx
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
```

### With Types
```tsx
import { Button, ButtonProps } from '@/components/ui';
```

## 🔧 Customization

### Extending Components
```tsx
import { Button, ButtonProps } from '@/components/ui';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} className={`${props.className} custom-class`} />;
};
```

### Theme Customization
Override Tailwind classes in your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
};
```

## 📝 Best Practices

1. **Always use TypeScript**: Leverage the provided interfaces
2. **Consistent spacing**: Use the design system spacing values
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Performance**: Use React.memo for frequently re-rendered components
5. **Testing**: Write unit tests for component behavior

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui';

test('Button renders with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## 📚 Examples

### Form with Validation
```tsx
import { Input, Button, Card } from '@/components/ui';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <Card variant="elevated" className="max-w-md mx-auto">
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        required
      />
      <Button variant="primary" className="w-full">
        Login
      </Button>
    </Card>
  );
};
```

### Status Dashboard
```tsx
import { Card, Badge, Loading } from '@/components/ui';

const StatusCard = ({ status, loading }) => {
  if (loading) return <Loading size="sm" />;

  return (
    <Card variant="outlined">
      <div className="flex items-center justify-between">
        <span>System Status</span>
        <Badge variant={status === 'online' ? 'success' : 'danger'}>
          {status}
        </Badge>
      </div>
    </Card>
  );
};
``` 