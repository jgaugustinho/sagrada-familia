import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Sheet } from './Sheet.vue';
export { default as SheetClose } from './SheetClose.vue';
export { default as SheetContent } from './SheetContent.vue';
export { default as SheetDescription } from './SheetDescription.vue';
export { default as SheetFooter } from './SheetFooter.vue';
export { default as SheetHeader } from './SheetHeader.vue';
export { default as SheetTitle } from './SheetTitle.vue';
export { default as SheetTrigger } from './SheetTrigger.vue';

export const sheetVariants = cva(
  'bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 h-auto border-b border-border data-[state=open]:animate-sheet-in-top data-[state=closed]:animate-sheet-out-top',
        bottom: 'inset-x-0 bottom-0 h-auto border-t border-border data-[state=open]:animate-sheet-in-bottom data-[state=closed]:animate-sheet-out-bottom',
        left: 'inset-y-0 left-0 h-full w-[86vw] max-w-sm border-r border-border data-[state=open]:animate-sheet-in-left data-[state=closed]:animate-sheet-out-left',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm data-[state=open]:animate-sheet-in-right data-[state=closed]:animate-sheet-out-right'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
);

export type SheetVariants = VariantProps<typeof sheetVariants>;

