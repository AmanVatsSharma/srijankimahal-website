# RoomsSection Component

Purpose: Render the homepage rooms grid and provide a “Room Details” modal dialog that opens when the user clicks either a room card or its “View” button.

## Key Elements

- Rooms grid:
  - Each room card uses `.room-card` and stores the source-of-truth metadata in `data-*` attributes:
    - `data-room`: room type slug (e.g. `4-bed-ac`)
    - `data-title`: human-readable title shown in modal
    - `data-price`: price per night (numeric string)
- View button:
  - Uses `.view-details-btn` inside each `.room-card`
  - Uses `type="button"` to avoid accidental form submission if embedded in a form later
- Modal:
  - Root: `#room-modal` (overlay) + `.modal-content` (panel)
  - Title: `#modal-title`
  - Price: `#modal-price`
  - Gallery images: `#modal-img-1`, `#modal-img-2`, `#modal-img-3`
  - CTAs:
    - `#modal-whatsapp`: opens WhatsApp with a prefilled message
    - `#modal-call`: opens the phone dialer (`tel:` link)

## Interaction Flow (Flow Chart)

```text
[Page loads]
   |
   v
[initRoomModal()]
   |
   +--> Query DOM nodes (.room-card, .view-details-btn, #room-modal, #close-modal)
   |
   +--> Bind listeners
         |
         +--> Click "View" button
         |      |
         |      v
         |   stopPropagation()
         |      |
         |      v
         |   openModal(parent .room-card)
         |
         +--> Click room card
         |      |
         |      v
         |   openModal(this card)
         |
         +--> Click overlay / press Escape / click close
                |
                v
             closeModal()
```

## Implementation Notes

- Client-side constants:
  - The modal script runs in the browser, so it **imports** `TEL_LINK` and `WHATSAPP_LINK` from `src/lib/constants.ts` inside the `<script>` tag.
  - This avoids a common Astro pitfall where server/frontmatter variables are not available in client runtime.
- Defensive programming:
  - If `#room-modal` is missing, the script logs a warning and safely no-ops for modal open/close.
  - All binding is wrapped in `try/catch` and logs errors to the console for debugging.
- “Dialog” behavior:
  - The modal is a lightweight overlay; it’s not a native `<dialog>` element.
  - It closes on overlay click and Escape, and locks body scroll while open.

## Troubleshooting

- If the “View” buttons do nothing:
  - Open DevTools and check for `[RoomsSection]` logs.
  - If you see a `ReferenceError` related to contact links, confirm the modal script imports `TEL_LINK` / `WHATSAPP_LINK` inside the script.
- If the modal opens but looks invisible:
  - Verify `.modal-overlay` and `.modal-overlay.active` exist in `src/styles/global.css`.
  - Ensure the modal gets the `active` class when opened (check Elements panel).

