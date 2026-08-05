# Jawa Modern Parallax Asset Pack

Paket konsep ini menggunakan pasangan fiktif dewasa dan tidak merepresentasikan orang nyata.

## Layer order

1. `01-far-background.png` — opaque base
2. `02-rear-architecture.png` — transparent rear pendopo
3. `03-middle-arch.png` — transparent middle arch
4. `04-front-arch.png` — transparent front arch
5. `05-fictional-couple.png` — transparent fictional couple
6. `06-foreground-left.png` — transparent foliage
7. `07-foreground-right.png` — transparent foliage

`00-master-composition.png` is the visual alignment reference. `08-opening-cover.png` is a ready-to-use cover. Files `09`–`11` are gallery photographs.

## Suggested parallax transforms

| Layer | z-index | Scroll movement |
|---|---:|---|
| Far background | 1 | `translateY(-32px) scale(1.05)` |
| Rear architecture | 2 | `translateY(-56px) scale(1.03)` |
| Middle arch | 3 | `translateY(-78px) scale(1.02)` |
| Front arch | 4 | `translateY(-96px) scale(1.015)` |
| Couple | 5 | `translateY(-132px) scale(1.03)` |
| Foreground left | 6 | `translate(-28px, -60px) scale(1.05)` |
| Foreground right | 6 | `translate(28px, -60px) scale(1.05)` |

All source layers share a 941 × 1672 vertical canvas, so place them with identical `inset: 0; width: 100%; height: 100%; object-fit: contain` geometry. Keep the hero container `position: relative; overflow: hidden; isolation: isolate`.

## Notes

- Add titles as HTML text, not baked into the imagery.
- Use `transform` and `opacity` only for continuous motion.
- Reduce travel distance by roughly 45% on mobile.
- Disable scroll-linked motion for `prefers-reduced-motion: reduce`.
