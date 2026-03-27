# Random Idea Generator

## Current State
App has two tone options: Serious and Silly. Stored as string union. Tone toggle is a 2-button pill. STATIC_IDEAS has ideas for serious/silly per category.

## Requested Changes (Diff)

### Add
- 4 new tone options: Creative, Dark, Inspirational, Weird
- Static ideas for every category x new tone (~5 each)
- TONE_COLORS for new tones

### Modify
- Tone type widened to include all 6 tones
- Tone toggle UI expanded to show all 6 options
- Badge updated to show correct emoji/label for active tone

### Remove
- Nothing

## Implementation Plan
1. App.tsx: widen tone type, add TONE_LABELS map, update toggle UI to 6 buttons in a wrap row, update badge
2. useQueries.ts: add ~5 ideas per category per new tone to STATIC_IDEAS
