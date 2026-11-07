// Astro remark plugin for content directives used by Sveltia CMS:
//
//   :::tip / :::note / :::info / :::warning   -> .notice block
//   :::accordion{title="..."}                  -> <details class="accordion">
//   ::::tabs                                   -> tabbed panels (needs Base.astro script)
//     :::tab{title="..."} ... :::
//   ::::
//
// They work in both .md and .mdx files.
const NOTICE_TYPES = {
  note: { label: "Nota", css: "note" },
  tip: { label: "Tip", css: "tip" },
  info: { label: "Info", css: "info" },
  warning: { label: "Attenzione", css: "warning" },
  alert: { label: "Attenzione", css: "warning" },
  danger: { label: "Attenzione", css: "warning" },
  success: { label: "Tip", css: "tip" },
};

function noticeNode(node, type) {
  const meta = NOTICE_TYPES[type];
  const head = {
    type: "paragraph",
    data: { hName: "div", hProperties: { className: ["notice-head"] } },
    children: [
      {
        type: "paragraph",
        data: { hName: "p" },
        children: [{ type: "text", value: meta.label }],
      },
    ],
  };
  const body = {
    type: "div",
    data: { hName: "div", hProperties: { className: ["notice-body"] } },
    children: node.children || [],
  };
  node.data = {
    hName: "div",
    hProperties: { className: ["notice", meta.css] },
  };
  node.children = [head, body];
  return node;
}

function accordionNode(node) {
  const title = node.attributes?.title || "Dettagli";
  const summary = {
    type: "div",
    data: { hName: "summary", hProperties: { className: ["accordion-header"] } },
    children: [{ type: "text", value: title }],
  };
  const body = {
    type: "div",
    data: { hName: "div", hProperties: { className: ["accordion-content"] } },
    children: node.children || [],
  };
  node.data = { hName: "details", hProperties: { className: ["accordion"] } };
  node.children = [summary, body];
  return node;
}

function tabsNode(node) {
  const tabs = (node.children || []).filter(
    (child) => child.type === "containerDirective" && child.name === "tab",
  );
  if (tabs.length === 0) return node;

  const navItems = tabs.map((tab, index) => {
    const id = `tab-${index + 1}`;
    return {
      type: "div",
      data: {
        hName: "li",
        hProperties: {
          className: ["tab-nav-item", ...(index === 0 ? ["active"] : [])],
          "data-tab-target": id,
          role: "tab",
        },
      },
      children: [{ type: "text", value: tab.attributes?.title || `Tab ${index + 1}` }],
    };
  });

  const nav = {
    type: "div",
    data: { hName: "ul", hProperties: { className: ["tab-nav"] } },
    children: navItems,
  };

  const panels = tabs.map((tab, index) => {
    const id = `tab-${index + 1}`;
    return {
      type: "div",
      data: {
        hName: "div",
        hProperties: {
          className: ["tab-content", ...(index === 0 ? [] : ["hidden"])],
          "data-tab-panel": id,
          role: "tabpanel",
        },
      },
      children: tab.children || [],
    };
  });

  node.data = {
    hName: "div",
    hProperties: { className: ["tab"], "data-tabs": "" },
  };
  node.children = [nav, ...panels];
  return node;
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  const next = [];
  for (const child of node.children) {
    if (child && child.type === "containerDirective") {
      if (NOTICE_TYPES[child.name]) {
        walk(child);
        next.push(noticeNode(child, child.name));
        continue;
      }
      if (child.name === "accordion") {
        walk(child);
        next.push(accordionNode(child));
        continue;
      }
      if (child.name === "tabs") {
        walk(child);
        next.push(tabsNode(child));
        continue;
      }
    }
    walk(child);
    next.push(child);
  }
  node.children = next;
}

export default function remarkNotice() {
  return (tree) => {
    walk(tree);
  };
}