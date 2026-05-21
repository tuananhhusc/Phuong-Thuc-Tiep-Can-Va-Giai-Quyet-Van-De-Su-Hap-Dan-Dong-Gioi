import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          100: "#FDFBF7",
          200: "#F9F6F0", // Main bg
          300: "#EFEBE1",
          400: "#E3DDD0",
        },
        burgundy: {
          600: "#800020",
          700: "#600018",
          800: "#4A0404",
        },
        navy: {
          800: "#0B1D3A",
          900: "#051024",
        },
        gold: {
          400: "#D4AF37",
          500: "#C5B358",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        body: ["var(--font-lora)", "serif"],
      },
      typography: (theme: any) => ({
        academic: {
          css: {
            '--tw-prose-body': theme('colors.gray.800'),
            '--tw-prose-headings': theme('colors.navy.800'),
            '--tw-prose-lead': theme('colors.gray.600'),
            '--tw-prose-links': theme('colors.burgundy.600'),
            '--tw-prose-bold': theme('colors.navy.900'),
            '--tw-prose-counters': theme('colors.gold.500'),
            '--tw-prose-bullets': theme('colors.gold.500'),
            '--tw-prose-hr': theme('colors.gold.400'),
            '--tw-prose-quotes': theme('colors.navy.800'),
            '--tw-prose-quote-borders': theme('colors.gold.400'),
            '--tw-prose-captions': theme('colors.gray.600'),
            '--tw-prose-code': theme('colors.burgundy.700'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.navy.900'),
            '--tw-prose-th-borders': theme('colors.gold.400'),
            '--tw-prose-td-borders': theme('colors.gray.300'),
            
            // Customizing specific tags
            h1: {
              fontFamily: theme('fontFamily.serif')[0],
              fontWeight: '700',
              color: theme('colors.navy.800'),
            },
            h2: {
              fontFamily: theme('fontFamily.serif')[0],
              fontWeight: '600',
              color: theme('colors.navy.800'),
              marginTop: '2.5em',
              marginBottom: '1em',
              borderBottom: `1px solid ${theme('colors.gold.400')}`,
              paddingBottom: '0.3em',
            },
            h3: {
              fontFamily: theme('fontFamily.serif')[0],
              fontWeight: '600',
              color: theme('colors.burgundy.700'),
            },
            p: {
              fontFamily: theme('fontFamily.body')[0],
              lineHeight: '2.0',
              fontSize: '1.125rem', // 18px
              textAlign: 'justify',
            },
            a: {
              color: theme('colors.burgundy.600'),
              textDecoration: 'none',
              borderBottom: `1px dotted ${theme('colors.burgundy.600')}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.burgundy.800'),
                borderBottomStyle: 'solid',
              },
            },
            blockquote: {
              backgroundColor: theme('colors.parchment.300'),
              borderLeftColor: theme('colors.gold.500'),
              borderLeftWidth: '4px',
              padding: '1rem 1.5rem',
              fontStyle: 'italic',
              fontFamily: theme('fontFamily.body')[0],
              color: theme('colors.navy.800'),
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: theme('fontFamily.body')[0],
              fontSize: '1rem',
            },
            th: {
              borderBottom: `2px solid ${theme('colors.gold.500')}`,
              padding: '0.75rem',
              textAlign: 'left',
              color: theme('colors.navy.800'),
              fontWeight: '600',
            },
            td: {
              borderBottom: `1px solid ${theme('colors.gray.300')}`,
              padding: '0.75rem',
            },
            li: {
              fontFamily: theme('fontFamily.body')[0],
              fontSize: '1.125rem',
              lineHeight: '1.8',
            },
            // Style footnotes section
            '.footnotes': {
              marginTop: '4rem',
              borderTop: `2px solid ${theme('colors.gold.400')}`,
              paddingTop: '2rem',
              fontSize: '0.9rem',
            },
            '.footnotes ol': {
              paddingLeft: '1.5rem',
            },
            '.footnotes li': {
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
            },
            'a.data-footnote-backref': {
              textDecoration: 'none',
              borderBottom: 'none',
              marginLeft: '0.5rem',
              color: theme('colors.gold.500'),
              fontFamily: 'sans-serif',
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
