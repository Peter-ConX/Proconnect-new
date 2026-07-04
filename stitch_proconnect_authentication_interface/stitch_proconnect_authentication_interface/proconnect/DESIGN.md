---
name: ProConnect
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434653'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#2559bd'
  primary: '#00327d'
  on-primary: '#ffffff'
  primary-container: '#0047ab'
  on-primary-container: '#a5bdff'
  inverse-primary: '#b1c5ff'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#90efef'
  on-secondary-container: '#006e6e'
  tertiary: '#2f3647'
  on-tertiary: '#ffffff'
  tertiary-container: '#464d5e'
  on-tertiary-container: '#b7bed2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#00419e'
  secondary-fixed: '#93f2f2'
  secondary-fixed-dim: '#76d6d5'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#dce2f7'
  tertiary-fixed-dim: '#c0c6db'
  on-tertiary-fixed: '#141b2b'
  on-tertiary-fixed-variant: '#404758'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  split-ratio: 45/55
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1280px
---

## Brand & Style
The brand personality is authoritative yet accessible, designed to instill confidence in professional growth. The visual style is **Corporate / Modern**, prioritizing clarity, systematic alignment, and a "fresh professional" aesthetic. It avoids the heaviness of legacy enterprise software by utilizing generous whitespace and a refined color story.

The design system focuses on high legibility and a sense of "structured flow." Every element is intended to feel deliberate and reliable, mirroring the characteristics of a successful career path. The emotional response should be one of focus, trust, and professional momentum.

## Colors
The palette is anchored by a sophisticated **Deep Brand Blue to Teal gradient**, symbolizing the transition from traditional corporate stability to modern innovation.

- **Primary Surface**: Pure White (#FFFFFF) is used for all primary interaction containers and forms to maximize contrast and focus.
- **Secondary Surface**: A subtle Grey (#F9FAFB) provides clear distinction for background areas and card groupings.
- **Typography**: Dark Navy (#111827) provides high-contrast readability for headers, while Muted Grey (#6B7280) is reserved for metadata and secondary labels to create a clear information hierarchy.
- **Semantic Colors**: Green and Red are used sparingly for validation and status, maintaining a clean workspace.

## Typography
The system utilizes **Inter** exclusively to leverage its systematic, utilitarian nature. 

- **Headings**: Use Bold (700) or Semi-Bold (600) weights with tighter letter-spacing for a modern, "impactful" look.
- **Body**: Standardized on Regular (400) weight for long-form readability.
- **Labels**: Utilize Medium (500) weight to distinguish interactive elements and form titles from body text.
- **Hierarchy**: On mobile, large display type scales down aggressively to maintain the 45/55 split-screen integrity.

## Layout & Spacing
The design system employs a **Fluid Grid** with a specific **45/55 split-screen** layout for primary landing and authentication pages. 

- **Desktop**: The left pane (45%) houses brand imagery or value propositions, while the right pane (55%) contains active forms and content.
- **Mobile**: The split transitions to a stacked vertical layout where the 45% pane becomes a header (approx. 30vh) and the 55% pane becomes the primary scrollable content area.
- **Rhythm**: A 4px/8px base spacing system ensures consistent vertical rhythm. Standard padding for cards and form containers is set to 24px.

## Elevation & Depth
This design system utilizes **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows to maintain a clean, professional appearance.

- **Level 0 (Background)**: #F9FAFB.
- **Level 1 (Cards/Forms)**: Pure #FFFFFF with a 1px border (#E5E7EB).
- **Interactive State**: On hover, elements may gain a very soft, diffused ambient shadow (0px 4px 12px rgba(0,0,0,0.05)) to indicate clickability.
- **Focus State**: A 2px solid ring of the Primary Blue (#0047AB) with a 2px offset is used for keyboard navigation and input focus.

## Shapes
The shape language is consistently **Rounded**, using an 8px (0.5rem) base radius. This softens the corporate aesthetic, making it feel "fresh" and modern without becoming overly playful.

- **Small elements (Checkboxes/Badges)**: 4px radius.
- **Standard elements (Buttons/Inputs)**: 8px radius.
- **Large elements (Cards/Modals)**: 12px to 16px radius.

## Components
- **Buttons**:
    - **Primary**: Solid gradient (Blue to Teal) with white text. Hover state shifts the gradient intensity or darkens slightly.
    - **Secondary**: 1px border (#D1D5DB) with Dark Navy text. Used for social authentication or "Cancel" actions.
- **Input Fields**: 1px border (#D1D5DB) with 8px corner radius. Placeholder text in Muted Grey (#6B7280). Active focus state transitions the border to Primary Blue.
- **Checkboxes**: Custom-styled with a Primary Blue fill when checked and a crisp white checkmark.
- **Cards**: Pure white background, 1px subtle border, 12px rounded corners. Used for feed items and profile summaries.
- **Chips/Badges**: Light grey (#F3F4F6) background with Medium-weight text for skills or categories.
- **Lists**: Clean rows with 1px bottom dividers (#F3F4F6), emphasizing vertical alignment and white space between line items.