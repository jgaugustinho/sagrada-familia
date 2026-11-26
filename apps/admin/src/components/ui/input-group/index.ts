import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as InputGroup } from './InputGroup.vue';
export { default as InputGroupAddon } from './InputGroupAddon.vue';
export { default as InputGroupButton } from './InputGroupButton.vue';
export { default as InputGroupInput } from './InputGroupInput.vue';
export { default as InputGroupText } from './InputGroupText.vue';

export const inputGroupAddonVariants = cva(
  'flex h-full shrink-0 items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground select-none [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-3 pr-1',
        'inline-end': 'order-last pl-1 pr-2'
      }
    },
    defaultVariants: {
      align: 'inline-start'
    }
  }
);

export type InputGroupAddonVariants = VariantProps<typeof inputGroupAddonVariants>;
