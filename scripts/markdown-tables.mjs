// Wrap tables at build time so wide scientific data scrolls inside the reading column, including without JavaScript.
export default function wrapTables() {
  return (tree) => {
    function walk(node) {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table')
          return {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-scroll'],
              role: 'region',
              tabIndex: 0,
              'aria-label': 'Scrollable article table',
            },
            children: [child],
          };
        walk(child);
        return child;
      });
    }
    walk(tree);
  };
}
