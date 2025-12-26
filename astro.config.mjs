import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: 'https://yuan.fyi',
  integrations: [
    mdx({
      remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeExternalLinks,
          {
            target: '_blank',
          },
        ],
      ],
    }),
    svelte(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
      transformers: [
        {
          name: 'add-language-label',
          pre(node) {
            const lang = this.options.lang || 'plaintext';
            if (!node.properties) node.properties = {};
            if (!node.properties['data-language']) {
              node.properties['data-language'] = lang;
            }
          }
        }
      ]
    },
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
})
