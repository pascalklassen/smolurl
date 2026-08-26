# UI Components

All UI elements in this app use **shadcn/ui**. Do not hand-write custom
components for things shadcn/ui already provides.

## Rules

- Never build a custom component (button, input, dialog, dropdown, card,
  etc.) from scratch. Always use the equivalent shadcn/ui component.
- If a needed shadcn/ui component isn't installed yet under
  [components/ui/](../components/ui/), add it via the shadcn CLI rather than
  writing it manually:

  ```
  npx shadcn add <component>
  ```

- Only extend/compose shadcn/ui primitives (e.g. wrapping `Button` +
  `Dialog`) in [components/](../components/) — don't fork or reimplement
  their internals.
- Style with the existing Tailwind classes/variants shadcn/ui generates;
  avoid introducing parallel styling systems.

## Configuration

- Project config lives in [components.json](../components.json): style
  `base-nova`, base color `neutral`, icons from `lucide`, CSS variables
  enabled.
- Import via the `@/components/ui/*` alias — never relative paths.
