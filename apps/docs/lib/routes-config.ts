// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Changelog", href: "/changelog" },
      {
        title: "FAQ",
        href: "/faq",
      },
    ],
  },
  {
    title: 'Core',
    href: '/core',
    noLink: true,
    items: [
      {
        title: "Installation",
        href: "/installation"
      },
      { title: "Quick Start Guide", href: "/quick-start-guide" },
      {
        title: "API",
        href: "/api",
        items: [
          { title: "initArrowNavigation", href: "/init-arrow-navigation" },
          { title: "getArrowNavigation", href: "/get-arrow-navigation" },
          { title: "destroy", href: "/destroy" },
          { title: "registerGroup", href: "/register-group" },
          { title: "updateGroup", href: "/update-group" },
          { title: "resetGroupState", href: "/reset-group-state" },
          { title: "getCurrentGroups", href: "/get-current-groups" },
          { title: "getGroupElements", href: "/get-group-elements" },
          { title: "getGroupConfig", href: "/get-group-config" },
          { title: "registerElement", href: "/register-element" },
          { title: "updateElement", href: "/update-element" },
          { title: "unregisterElement", href: "/unregister-element" },
          { title: "getFocusedElement", href: "/get-focused-element" },
          { title: "setFocusElement", href: "/set-focus-element" },
          { title: "setInitialFocusElement", href: "/set-initial-focus-element" },
          { title: "getRegisteredElements", href: "/get-registered-elements" },
          { title: "getNextElement", href: "/get-next-element" },
          { title: "getNextGroup", href: "/get-next-group" },
          { title: "handleDirectionPress", href: "/handle-direction-press" },
          { title: "Events", href: "/events" },
        ]
      }
    ]
  },
  {
    title: 'React',
    href: '/react',
    noLink: true,
    items: [
      {
        title: "Installation",
        href: "/installation"
      },
      { title: "Quick Start Guide", href: "/quick-start-guide" },
      {
        title: "API",
        href: "/api",
        items: [
          { title: "initArrowNavigation", href: "/init-arrow-navigation" },
          { title: "useArrowNavigation", href: "/use-arrow-navigation" },
          { title: "FocusableGroup", href: "/focusable-group" },
          { title: "FocusableElement", href: "/focusable-element" },
          { title: "useFocusableElement", href: "/use-focusable-element" },
          { title: "useListenElementFocused", href: "/use-listen-element-focused" },
          { title: "useListenLastElementReached", href: "/use-listen-last-element-reached"},
          { title: "useListenLastGroupReached", href: "/use-listen-last-group-reached" },
          { title: "useWatchElementFocused", href: "/use-watch-element-focused" },
        ]
      },
    ]
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
