export default function setupPosition(config: object, self: any) {
  const el = self.shadowRoot?.querySelector(
    '.dent-in-widget',
  );

  const position = config['position' as keyof typeof config];

  const stylesMap = {
    inline: () => el?.classList.add('inline'),
    'bottom-left': () => el?.classList.add('bottom-left'),
    'bottom-right': () => el?.classList.add('bottom-right'),
    'top-left': () => el?.classList.add('top-left'),
    'top-right': () => el?.classList.add('top-right'),
  };

  stylesMap[position as keyof typeof stylesMap]();
}
