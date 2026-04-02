# Design System Document: The Bespoke Luthier

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Atelier"
This design system is built to transform a mobile utility into a premium, tactile experience. Inspired by the workshop of a master luthier, the "Digital Atelier" aesthetic focuses on high-contrast editorial layouts, tonal depth, and atmospheric lighting. We are moving away from the "app-like" genericism of heavy borders and flat buttons toward a world that feels more like a luxury magazine or a physical instrument.

**Breaking the Template:**
We achieve sophistication through **intentional asymmetry** and **tonal layering**. Elements should not simply sit in a grid; they should breathe. By utilizing the `newsreader` serif for displays and `manrope` for UI, we create a tension between tradition and precision. Layouts should prioritize negative space over containment lines, using the contrast between the deep charcoal `background` (#131313) and warm `primary` gold (#ffc464) to guide the eye.

---

## 2. Colors

The palette is rooted in a "midnight" environment, punctuated by the glow of amber and the calm of teal.

### Tonal Foundations
- **Primary Highlights:** Use `primary` (#ffc464) for high-intent actions. To add "soul," apply a subtle gradient from `primary` to `primary_container` (#e1a94b) on large buttons.
- **Secondary Cues:** Use `secondary` (#a1cfcf) specifically for scale tones and informative musical data. This muted teal provides a professional, analytic counterpoint to the warmth of the gold.

### The "No-Line" Rule
Prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background creates a natural edge without the "clutter" of a structural line.

### Surface Hierarchy & Nesting
Treat the UI as physical layers.
- **Base:** `surface` (#131313).
- **Secondary Panels:** `surface_container` (#201f1f).
- **Interactive Cards:** `surface_container_high` (#2a2a2a).
- **Nesting:** When placing an input field inside a card, use `surface_container_lowest` (#0e0e0e) for the input to create a "recessed" look, or `surface_container_highest` (#353534) for a "protruding" look.

---

## 3. Typography

Typography is the voice of the brand. We pair the intellectual, historical feel of a serif with the industrial precision of a modern sans-serif.

| Level | Token | Font Family | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Newsreader | 3.5rem | High-contrast, elegant, airy. |
| **Headline** | `headline-md`| Newsreader | 1.75rem | Authority; used for Song Titles. |
| **Title** | `title-lg` | Manrope | 1.375rem | Functional headers; semi-bold. |
| **Body** | `body-lg` | Manrope | 1.0rem | Standard reading; high legibility. |
| **Label** | `label-md` | Manrope | 0.75rem | Uppercase with 0.05em tracking. |

**The Editorial Mix:** Use `headline-lg` for the "Root Key" (e.g., D Minor) and pair it immediately with a small `label-md` in `on_surface_variant` (#d0c5af) for the subtitle. This contrast in scale is the hallmark of premium design.

---

## 4. Elevation & Depth

We eschew traditional "Drop Shadows" in favor of **Tonal Layering** and **Atmospheric Glows**.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. To create a lift for a Chord Diagram card:
1. Place the card on `surface_container_high`.
2. Apply a `0.25rem` (sm) roundedness.
3. Instead of a shadow, use a `1px` **Ghost Border**: Use `outline_variant` at 15% opacity to catch the light.

### Glassmorphism & Ambient Light
For floating navigation or overlays (like a "Transpose" menu):
- **Background:** `surface_variant` (#353534) at 70% opacity.
- **Effect:** `backdrop-blur: 20px`.
- **Shadow:** A diffused 24px blur shadow using `surface_container_lowest` at 40% opacity. This makes the element feel like it is floating in a dark room rather than sitting on a flat screen.

---

## 5. Components

### Buttons
- **Primary:** Rounded `0.375rem` (md). Background: Gradient `primary` to `primary_container`. Text: `on_primary_fixed` (#281900).
- **Ghost (Secondary):** No background. Text: `primary`. Border: `Ghost Border` (outline-variant at 20% opacity).

### Chord Cards & Lists
- **Forbid dividers.** To separate chords in a progression, use a `1.5rem` (spacing-6) horizontal gap.
- **Internal Spacing:** Use `1rem` (spacing-4) padding. 
- **The Fretboard:** Lines should be `outline_variant` (#4d4635). Active finger positions must use the `primary` (#ffc464) circle with a subtle outer glow (2px blur).

### Input Fields (The "Forged" Look)
- **Container:** `surface_container_lowest` (#0e0e0e).
- **Active State:** Change border from `outline_variant` (20%) to `primary` (100%).
- **Typography:** `body-md` for user input, `label-sm` for the floating label.

### Interactive Chips
- **Selection Chips:** When unselected, use `surface_container_highest`. When selected, use `primary` with `on_primary` text. This provides an immediate "lit-up" affordance.

---

## 6. Do's and Don'ts

### Do
- **Do** use `Newsreader` for any text that is meant to be "felt" (Titles, Hero text).
- **Do** use `primary_fixed_dim` (#f6bd5c) for disabled-state highlights to maintain the warm amber tone without the "active" vibrance.
- **Do** leverage `0.75rem` (xl) roundedness for large containers to soften the "industrial" feel.

### Don't
- **Don't** use pure white (#FFFFFF) for text. Always use `on_surface` (#e5e2e1) to reduce eye strain in dark mode.
- **Don't** use 100% opaque borders. They create a "grid-locked" look that kills the premium atmosphere.
- **Don't** stack more than three levels of surface hierarchy. If you need more depth, use a `backdrop-blur` overlay instead of a fourth container color.

---

## 7. Signature Elements: The "Forge" Detail

To truly lean into the musical tool context, use the `secondary` (#a1cfcf) teal for **Scale Highlights**. In a sea of amber and charcoal, the teal acts as a surgical tool—marking the notes that matter. It should be used sparingly, like a signature on a custom-made instrument.
