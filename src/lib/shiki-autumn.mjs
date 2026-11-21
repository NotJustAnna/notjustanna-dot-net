// @ts-check
/**
 * Autumn syntax themes for Shiki, matching the site palette.
 * Every token colour clears 4.5:1 against its mode's code background
 * (light: #f2e6d3 wheat, dark: #090605 near-black espresso).
 * Backgrounds are left to CSS (`.prose pre`), so blocks sit inset in the post card.
 */

/**
 * @param {string} name
 * @param {'light' | 'dark'} type
 * @param {Record<string, string>} c
 */
function theme(name, type, c) {
  return {
    name,
    type,
    colors: {
      'editor.background': c.bg,
      'editor.foreground': c.fg,
    },
    tokenColors: [
      { settings: { foreground: c.fg } },
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
      {
        scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new', 'keyword.other'],
        settings: { foreground: c.keyword },
      },
      { scope: ['keyword.operator', 'punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: c.punct } },
      {
        scope: ['string', 'string.quoted', 'string.template', 'string.unquoted', 'markup.inline.raw'],
        settings: { foreground: c.string },
      },
      {
        scope: ['constant.numeric', 'constant.language', 'constant.character', 'constant.other', 'support.constant', 'variable.language'],
        settings: { foreground: c.number },
      },
      {
        scope: ['entity.name.function', 'support.function', 'meta.function-call', 'entity.name.command', 'support.function.builtin'],
        settings: { foreground: c.function },
      },
      {
        scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class', 'storage.type.java'],
        settings: { foreground: c.type },
      },
      {
        scope: [
          'entity.name.tag',
          'entity.other.attribute-name',
          'support.type.property-name',
          'meta.object-literal.key',
          'entity.name.section',
          'variable.other.key',
          'keyword.other.definition.ini',
        ],
        settings: { foreground: c.tag },
      },
      { scope: ['variable', 'variable.other', 'variable.parameter', 'meta.definition.variable'], settings: { foreground: c.variable } },
      { scope: ['markup.heading'], settings: { foreground: c.keyword, fontStyle: 'bold' } },
      { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
      { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
      { scope: ['markup.inserted'], settings: { foreground: c.string } },
      { scope: ['markup.deleted', 'invalid'], settings: { foreground: c.keyword } },
    ],
  };
}

export const autumnLight = theme('autumn-light', 'light', {
  bg: '#f2e6d3',
  fg: '#2b1a10',
  comment: '#7a6350',
  keyword: '#9b1b1b',
  string: '#56601a',
  number: '#b5361a',
  function: '#8a4508',
  type: '#7a5410',
  tag: '#8f2c14',
  punct: '#6b5340',
  variable: '#4a2e1e',
});

export const autumnDark = theme('autumn-dark', 'dark', {
  bg: '#090605',
  fg: '#f2e5d2',
  comment: '#958070',
  keyword: '#ef7a45',
  string: '#b8c46e',
  number: '#e8a020',
  function: '#f2bd6a',
  type: '#dca872',
  tag: '#ec8f62',
  punct: '#b8a089',
  variable: '#e6cfb3',
});
