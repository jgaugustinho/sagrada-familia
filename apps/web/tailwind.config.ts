import type { Config } from 'tailwindcss';
import sharedPreset from '../../packages/ui/tailwind.preset';

export default <Partial<Config>>{
  presets: [ sharedPreset ],
  content: [ '../../packages/ui/components/**/*.{vue,ts}' ],
  safelist: [ 'dark' ]
};
