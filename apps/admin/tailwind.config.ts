import type { Config } from 'tailwindcss';
import sharedPreset from '../../packages/ui/tailwind.preset';

export default {
  presets: [ sharedPreset ],
  content: [
    './index.html',
    './src/**/*.{vue,ts}'
  ]
} satisfies Config;

