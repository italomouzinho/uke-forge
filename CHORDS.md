# UkeForge Chord Library — Baritone Ukulele (DGBE Tuning)

This file is the **canonical source of truth** for every chord diagram in `index.html`. All shapes were verified here first; the app's `CHORDS` table is generated directly from this data.

## Notation

Two notations are used below:

- **EBGD** — high to low string (E, B, G, D). This is the format chords are commonly typed/shared in.
- **DGBE** — low to high string (D, G, B, E). This is the format the app uses internally (`[D, G, B, E]` fret arrays, matching the physical top-to-bottom order of strings as drawn on the fretboard).

`x` = string muted. Digits = fret number (0 = open string).

**Conversion:** DGBE is simply EBGD reversed. `EBGD "0222"` → `DGBE "2220"` → array `[2,2,2,0]`.

---

## A Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| A | Major | 0222 | 2220 | `[2, 2, 2, 0]` |
| Am | Minor | 0122 | 2210 | `[2, 2, 1, 0]` |
| Aaug | Augmented | 1223 | 3221 | `[3, 2, 2, 1]` |
| Adim | Diminished | x121 | 121x | `[1, 2, 1, null]` |
| Asus2 | Sus2 | 0022 | 2200 | `[2, 2, 0, 0]` |
| Asus4 | Sus4 | 0322 | 2230 | `[2, 2, 3, 0]` |
| A7 | Dominant 7 | 0202 | 2020 | `[2, 0, 2, 0]` |
| Am7 | Minor 7 | 0102 | 2010 | `[2, 0, 1, 0]` |
| Amaj7 | Major 7 | 0212 | 2120 | `[2, 1, 2, 0]` |
| Aaug7 | Augmented 7 | 3223 | 3223 | `[3, 2, 2, 3]` |
| Adim7 | Diminished 7 | 2121 | 1212 | `[1, 2, 1, 2]` |
| AmMaj7 | Minor-Major 7 | 0112 | 2110 | `[2, 1, 1, 0]` |
| Am7b5 | Half-Diminished (m7b5) | 3121 | 1213 | `[1, 2, 1, 3]` |
| A9 | Dominant 9 | 5245 | 5425 | `[5, 4, 2, 5]` |
| Amaj9 | Major 9 | 5066 | 6605 | `[6, 6, 0, 5]` |
| A11 | 11th | 3220 | 0223 | `[0, 2, 2, 3]` |
| Am11 | Minor 11 | 3120 | 0213 | `[0, 2, 1, 3]` |
| Am6 | Minor 6 | 2122 | 2212 | `[2, 2, 1, 2]` |
| Aadd9 | Add9 | 0242 | 2420 | `[2, 4, 2, 0]` |
| Am9 | Minor 9 | 5022 | 2205 | `[2, 2, 0, 5]` |

## Bb (A#) Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| Bb | Major | 1333 | 3331 | `[3, 3, 3, 1]` |
| Bbm | Minor | 1233 | 3321 | `[3, 3, 2, 1]` |
| Bbaug | Augmented | 2330 | 0332 | `[0, 3, 3, 2]` |
| Bbdim | Diminished | 0232 | 2320 | `[2, 3, 2, 0]` |
| Bbsus2 | Sus2 | 1133 | 3311 | `[3, 3, 1, 1]` |
| Bbsus4 | Sus4 | 1433 | 3341 | `[3, 3, 4, 1]` |
| Bb7 | Dominant 7 | 1313 | 3131 | `[3, 1, 3, 1]` |
| Bbm7 | Minor 7 | 4233 | 3324 | `[3, 3, 2, 4]` |
| Bbmaj7 | Major 7 | 5333 | 3335 | `[3, 3, 3, 5]` |
| Bbdim7 | Diminished 7 | 3232 | 2323 | `[2, 3, 2, 3]` |
| Bbm7b5 | Half-Diminished (m7b5) | 4232 | 2324 | `[2, 3, 2, 4]` |
| Bb9 | Dominant 9 | 1113 | 3111 | `[3, 1, 1, 1]` |
| Bbmaj9 | Major 9 | 1130 | 0311 | `[0, 3, 1, 1]` |
| Bb11 | 11th | 1111 | 1111 | `[1, 1, 1, 1]` |
| Bb13 | 13th | 1313 | 3131 | `[3, 1, 3, 1]` |

## B Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| B | Major | 2444 | 4442 | `[4, 4, 4, 2]` |
| Bm | Minor | 2344 | 4432 | `[4, 4, 3, 2]` |
| Baug | Augmented | 344x | x443 | `[null, 4, 4, 3]` |
| Bdim | Diminished | 134x | x431 | `[null, 4, 3, 1]` |
| Bsus2 | Sus2 | 2244 | 4422 | `[4, 4, 2, 2]` |
| Bsus4 | Sus4 | 2542 | 2452 | `[2, 4, 5, 2]` |
| B7 | Dominant 7 | 2021 | 1202 | `[1, 2, 0, 2]` |
| Bm7 | Minor 7 | 2020 | 0202 | `[0, 2, 0, 2]` |
| Bmaj7 | Major 7 | 2041 | 1402 | `[1, 4, 0, 2]` |
| Baug7 | Augmented 7 | 3041 | 1403 | `[1, 4, 0, 3]` |
| Bdim7 | Diminished 7 | 4343 | 3434 | `[3, 4, 3, 4]` |
| BmMaj7 | Minor-Major 7 | 2334 | 4332 | `[4, 3, 3, 2]` |
| Bm7b5 | Half-Diminished (m7b5) | 1020 | 0201 | `[0, 2, 0, 1]` |
| B9 | Dominant 9 | 2224 | 4222 | `[4, 2, 2, 2]` |
| Bmaj9 | Major 9 | 2234 | 4322 | `[4, 3, 2, 2]` |
| B11 | 11th | 0021 | 1200 | `[1, 2, 0, 0]` |
| B13 | 13th | 4021 | 1204 | `[1, 2, 0, 4]` |
| Bm6 | Minor 6 | 4344 | 4434 | `[4, 4, 3, 4]` |
| Bm9 | Minor 9 | 5060 | 0605 | `[0, 6, 0, 5]` |

## C Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| C | Major | 0102 | 2010 | `[2, 0, 1, 0]` |
| Cm | Minor | 3455 | 5543 | `[5, 5, 4, 3]` |
| Caug | Augmented | 0112 | 2110 | `[2, 1, 1, 0]` |
| Cdim | Diminished | 245x | x542 | `[null, 5, 4, 2]` |
| Csus2 | Sus2 | 3100 | 0013 | `[0, 0, 1, 3]` |
| Csus4 | Sus4 | 1103 | 3011 | `[3, 0, 1, 1]` |
| C7 | Dominant 7 | 3132 | 2313 | `[2, 3, 1, 3]` |
| Cm7 | Minor 7 | 6455 | 5546 | `[5, 5, 4, 6]` |
| Cmaj7 | Major 7 | 3142 | 2413 | `[2, 4, 1, 3]` |
| Caug7 | Augmented 7 | 4132 | 2314 | `[2, 3, 1, 4]` |
| Cdim7 | Diminished 7 | 2121 | 1212 | `[1, 2, 1, 2]` |
| CmMaj7 | Minor-Major 7 | 3445 | 5443 | `[5, 4, 4, 3]` |
| Cm7b5 | Half-Diminished (m7b5) | 2131 | 1312 | `[1, 3, 1, 2]` |
| C9 | Dominant 9 | 0132 | 2310 | `[2, 3, 1, 0]` |
| Cmaj9 | Major 9 | 0002 | 2000 | `[2, 0, 0, 0]` |
| C11 | 11th | 0133 | 3310 | `[3, 3, 1, 0]` |
| Cm11 | Minor 11 | 3435 | 5343 | `[5, 3, 4, 3]` |

## Db (C#) Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| Db | Major | 1213 | 3121 | `[3, 1, 2, 1]` |
| Dbm | Minor | 0212 | 2120 | `[2, 1, 2, 0]` |
| Dbaug | Augmented | 122x | x221 | `[null, 2, 2, 1]` |
| Dbdim | Diminished | 0202 | 2020 | `[2, 0, 2, 0]` |
| Dbsus2 | Sus2 | 4466 | 6644 | `[6, 6, 4, 4]` |
| Dbsus4 | Sus4 | 4764 | 4674 | `[4, 6, 7, 4]` |
| Db7 | Dominant 7 | 4243 | 3424 | `[3, 4, 2, 4]` |
| Dbm7 | Minor 7 | 0066 | 6600 | `[6, 6, 0, 0]` |
| Dbmaj7 | Major 7 | 4253 | 3524 | `[3, 5, 2, 4]` |
| Dbaug7 | Augmented 7 | 5243 | 3425 | `[3, 4, 2, 5]` |
| Dbdim7 | Diminished 7 | 3232 | 2323 | `[2, 3, 2, 3]` |
| DbmMaj7 | Minor-Major 7 | 4556 | 6554 | `[6, 5, 5, 4]` |
| Dbm7b5 | Half-Diminished (m7b5) | 3242 | 2423 | `[2, 4, 2, 3]` |
| Db9 | Dominant 9 | 4446 | 6444 | `[6, 4, 4, 4]` |
| Dbmaj9 | Major 9 | 4456 | 6544 | `[6, 5, 4, 4]` |
| Db11 | 11th | 4444 | 4444 | `[4, 4, 4, 4]` |
| Db13 | 13th | 6243 | 3426 | `[3, 4, 2, 6]` |

## D Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| D | Major | 2320 | 0232 | `[0, 2, 3, 2]` |
| Dm | Minor | 1320 | 0231 | `[0, 2, 3, 1]` |
| Daug | Augmented | 2330 | 0332 | `[0, 3, 3, 2]` |
| Ddim | Diminished | 1310 | 0131 | `[0, 1, 3, 1]` |
| Dsus2 | Sus2 | 0320 | 0230 | `[0, 2, 3, 0]` |
| Dsus4 | Sus4 | 3320 | 0233 | `[0, 2, 3, 3]` |
| D7 | Dominant 7 | 2120 | 0212 | `[0, 2, 1, 2]` |
| Dm7 | Minor 7 | 1120 | 0211 | `[0, 2, 1, 1]` |
| Dmaj7 | Major 7 | 2220 | 0222 | `[0, 2, 2, 2]` |
| Daug7 | Augmented 7 | 2130 | 0312 | `[0, 3, 1, 2]` |
| Ddim7 | Diminished 7 | 1010 | 0101 | `[0, 1, 0, 1]` |
| DmMaj7 | Minor-Major 7 | 1220 | 0221 | `[0, 2, 2, 1]` |
| Dm7b5 | Half-Diminished (m7b5) | 1110 | 0111 | `[0, 1, 1, 1]` |
| D9 | Dominant 9 | 2122 | 2212 | `[2, 2, 1, 2]` |
| Dmaj9 | Major 9 | 2222 | 2222 | `[2, 2, 2, 2]` |
| D11 | 11th | 2102 | 2012 | `[2, 0, 1, 2]` |
| Dm11 | Minor 11 | 1102 | 2011 | `[2, 0, 1, 1]` |

## Eb (D#) Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| Eb | Major | 3435 | 5343 | `[5, 3, 4, 3]` |
| Ebm | Minor | 2431 | 1342 | `[1, 3, 4, 2]` |
| Ebaug | Augmented | 3445 | 5443 | `[5, 4, 4, 3]` |
| Ebdim | Diminished | 242x | x242 | `[null, 2, 4, 2]` |
| Ebsus2 | Sus2 | 143x | x341 | `[null, 3, 4, 1]` |
| Ebsus4 | Sus4 | 4431 | 1344 | `[1, 3, 4, 4]` |
| Eb7 | Dominant 7 | 6465 | 5646 | `[5, 6, 4, 6]` |
| Ebm7 | Minor 7 | 2231 | 1322 | `[1, 3, 2, 2]` |
| Ebmaj7 | Major 7 | 3331 | 1333 | `[1, 3, 3, 3]` |
| Ebaug7 | Augmented 7 | 3241 | 1423 | `[1, 4, 2, 3]` |
| Ebdim7 | Diminished 7 | 5454 | 4545 | `[4, 5, 4, 5]` |
| EbmMaj7 | Minor-Major 7 | 2334 | 4332 | `[4, 3, 3, 2]` |
| Ebm7b5 | Half-Diminished (m7b5) | 2221 | 1222 | `[1, 2, 2, 2]` |
| Eb9 | Dominant 9 | 1201 | 1021 | `[1, 0, 2, 1]` |
| Ebmaj9 | Major 9 | 1331 | 1331 | `[1, 3, 3, 1]` |
| Eb11 | 11th | 1201 | 1021 | `[1, 0, 2, 1]` |
| Ebm11 | Minor 11 | 2211 | 1122 | `[1, 1, 2, 2]` |

## E Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| E | Major | 0012 | 2100 | `[2, 1, 0, 0]` |
| Em | Minor | 0002 | 2000 | `[2, 0, 0, 0]` |
| Eaug | Augmented | 011x | x110 | `[null, 1, 1, 0]` |
| Edim | Diminished | 3x32 | 23x3 | `[2, 3, null, 3]` |
| Esus2 | Sus2 | 2044 | 4402 | `[4, 4, 0, 2]` |
| Esus4 | Sus4 | 0022 | 2200 | `[2, 2, 0, 0]` |
| E7 | Dominant 7 | 4342 | 2434 | `[2, 4, 3, 4]` |
| Em7 | Minor 7 | 0302 | 2030 | `[2, 0, 3, 0]` |
| Emaj7 | Major 7 | 0011 | 1100 | `[1, 1, 0, 0]` |
| Eaug7 | Augmented 7 | 0110 | 0110 | `[0, 1, 1, 0]` |
| Edim7 | Diminished 7 | 3232 | 2323 | `[2, 3, 2, 3]` |
| EmMaj7 | Minor-Major 7 | 0001 | 1000 | `[1, 0, 0, 0]` |
| Em7b5 | Half-Diminished (m7b5) | 3332 | 2333 | `[2, 3, 3, 3]` |
| E9 | Dominant 9 | 2312 | 2132 | `[2, 1, 3, 2]` |
| Emaj9 | Major 9 | 2412 | 2142 | `[2, 1, 4, 2]` |
| E11 | 11th | 2322 | 2232 | `[2, 2, 3, 2]` |
| Em11 | Minor 11 | 0322 | 2230 | `[2, 2, 3, 0]` |

## F Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| F | Major | 1123 | 3211 | `[3, 2, 1, 1]` |
| Fm | Minor | 1113 | 3111 | `[3, 1, 1, 1]` |
| Faug | Augmented | 1223 | 3221 | `[3, 2, 2, 1]` |
| Fdim | Diminished | 1013 | 3101 | `[3, 1, 0, 1]` |
| Fsus2 | Sus2 | 1103 | 3011 | `[3, 0, 1, 1]` |
| Fsus4 | Sus4 | 1133 | 3311 | `[3, 3, 1, 1]` |
| F7 | Dominant 7 | 1121 | 1211 | `[1, 2, 1, 1]` |
| Fm7 | Minor 7 | 1111 | 1111 | `[1, 1, 1, 1]` |
| Fmaj7 | Major 7 | 0123 | 3210 | `[3, 2, 1, 0]` |
| Faug7 | Augmented 7 | 1221 | 1221 | `[1, 2, 2, 1]` |
| Fdim7 | Diminished 7 | 1010 | 0101 | `[0, 1, 0, 1]` |
| FmMaj7 | Minor-Major 7 | 0113 | 3110 | `[3, 1, 1, 0]` |
| Fm7b5 | Half-Diminished (m7b5) | 1011 | 1101 | `[1, 1, 0, 1]` |
| F9 | Dominant 9 | 3123 | 3213 | `[3, 2, 1, 3]` |
| Fmaj9 | Major 9 | 3122 | 2213 | `[2, 2, 1, 3]` |
| F11 | 11th | 3133 | 3313 | `[3, 3, 1, 3]` |
| Fm11 | Minor 11 | 1111 | 1111 | `[1, 1, 1, 1]` |

## Gb (F#) Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| Gb | Major | 2234 | 4322 | `[4, 3, 2, 2]` |
| Gbm | Minor | 2224 | 4222 | `[4, 2, 2, 2]` |
| Gbaug | Augmented | 2334 | 4332 | `[4, 3, 3, 2]` |
| Gbdim | Diminished | 2124 | 4212 | `[4, 2, 1, 2]` |
| Gbsus2 | Sus2 | 2214 | 4122 | `[4, 1, 2, 2]` |
| Gbsus4 | Sus4 | 2244 | 4422 | `[4, 4, 2, 2]` |
| Gb7 | Dominant 7 | 2232 | 2322 | `[2, 3, 2, 2]` |
| Gbm7 | Minor 7 | 2222 | 2222 | `[2, 2, 2, 2]` |
| Gbmaj7 | Major 7 | 6664 | 4666 | `[4, 6, 6, 6]` |
| Gbaug7 | Augmented 7 | 2332 | 2332 | `[2, 3, 3, 2]` |
| Gbdim7 | Diminished 7 | 2121 | 1212 | `[1, 2, 1, 2]` |
| GbmMaj7 | Minor-Major 7 | 1224 | 4221 | `[4, 2, 2, 1]` |
| Gbm7b5 | Half-Diminished (m7b5) | 8797 | 7978 | `[7, 9, 7, 8]` |
| Gb9 | Dominant 9 | 2232 | 2322 | `[2, 3, 2, 2]` |
| Gbmaj9 | Major 9 | 4234 | 4324 | `[4, 3, 2, 4]` |
| Gb11 | 11th | 4244 | 4424 | `[4, 4, 2, 4]` |
| Gbm11 | Minor 11 | 4222 | 2224 | `[2, 2, 2, 4]` |

## G Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| G | Major | 3000 | 0003 | `[0, 0, 0, 3]` |
| Gm | Minor | 3330 | 0333 | `[0, 3, 3, 3]` |
| Gaug | Augmented | 3001 | 1003 | `[1, 0, 0, 3]` |
| Gdim | Diminished | 323x | x323 | `[null, 3, 2, 3]` |
| Gsus2 | Sus2 | 3300 | 0033 | `[0, 0, 3, 3]` |
| Gsus4 | Sus4 | 3100 | 0013 | `[0, 0, 1, 3]` |
| G7 | Dominant 7 | 1000 | 0001 | `[0, 0, 0, 1]` |
| Gm7 | Minor 7 | 1333 | 3331 | `[3, 3, 3, 1]` |
| Gmaj7 | Major 7 | 2000 | 0002 | `[0, 0, 0, 2]` |
| Gaug7 | Augmented 7 | 1001 | 1001 | `[1, 0, 0, 1]` |
| Gdim7 | Diminished 7 | 0232 | 2320 | `[2, 3, 2, 0]` |
| GmMaj7 | Minor-Major 7 | 2330 | 0332 | `[0, 3, 3, 2]` |
| Gm7b5 | Half-Diminished (m7b5) | 3233 | 3323 | `[3, 3, 2, 3]` |
| G9 | Dominant 9 | 1020 | 0201 | `[0, 2, 0, 1]` |
| Gmaj9 | Major 9 | 2020 | 0202 | `[0, 2, 0, 2]` |
| G11 | 11th | 1100 | 0011 | `[0, 0, 1, 1]` |
| Gm11 | Minor 11 | 3133 | 3313 | `[3, 3, 1, 3]` |
| Gm13 | Minor 13 | 3332 | 2333 | `[2, 3, 3, 3]` |

## Ab (G#) Chords

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| Ab | Major | 4456 | 6544 | `[6, 5, 4, 4]` |
| Abm | Minor | 4446 | 6444 | `[6, 4, 4, 4]` |
| Abaug | Augmented | 4556 | 6554 | `[6, 5, 5, 4]` |
| Abdim | Diminished | 4346 | 6434 | `[6, 4, 3, 4]` |
| Absus2 | Sus2 | 4436 | 6344 | `[6, 3, 4, 4]` |
| Absus4 | Sus4 | 4466 | 6644 | `[6, 6, 4, 4]` |
| Ab7 | Dominant 7 | 4454 | 4544 | `[4, 5, 4, 4]` |
| Abm7 | Minor 7 | 4444 | 4444 | `[4, 4, 4, 4]` |
| Abmaj7 | Major 7 | 8886 | 6888 | `[6, 8, 8, 8]` |
| Abaug7 | Augmented 7 | 2112 | 2112 | `[2, 1, 1, 2]` |
| Abdim7 | Diminished 7 | 1010 | 0101 | `[0, 1, 0, 1]` |
| AbmMaj7 | Minor-Major 7 | 3446 | 6443 | `[6, 4, 4, 3]` |
| Abm7b5 | Half-Diminished (m7b5) | 2344 | 4432 | `[4, 4, 3, 2]` |
| Ab9 | Dominant 9 | 2111 | 1112 | `[1, 1, 1, 2]` |
| Abmaj9 | Major 9 | 3111 | 1113 | `[1, 1, 1, 3]` |
| Ab11 | 11th | 2111 | 1112 | `[1, 1, 1, 2]` |
| Abm11 | Minor 11 | 4444 | 4444 | `[4, 4, 4, 4]` |

## Slash Chords / Inversions

| Chord | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|
| D/G | 3324 | 4233 | `[4, 2, 3, 3]` |
| D/B | 2020 | 0202 | `[0, 2, 0, 2]` |
| Dm/B | 5343 | 3435 | `[3, 4, 3, 5]` |
| E/F | 1012 | 2101 | `[2, 1, 0, 1]` |
| Gb/E | 2311 | 1132 | `[1, 1, 3, 2]` |
| Ab/Gb | 4454 | 4544 | `[4, 5, 4, 4]` |
| Gb/G | 3234 | 4323 | `[4, 3, 2, 3]` |
| Ab/G | 3111 | 1113 | `[1, 1, 1, 3]` |
| B/G | 2001 | 1002 | `[1, 0, 0, 2]` |
| G/A | 7877 | 7787 | `[7, 7, 8, 7]` |
| Ebdim/Db | 2221 | 1222 | `[1, 2, 2, 2]` |
| Fdim/Eb | 1011 | 1101 | `[1, 1, 0, 1]` |
| Em/A | 3022 | 2203 | `[2, 2, 0, 3]` |
| Gm/E | 3332 | 2333 | `[2, 3, 3, 3]` |
| Csus4/Bb | 3133 | 3313 | `[3, 3, 1, 3]` |
| C/Bb | 3132 | 2313 | `[2, 3, 1, 3]` |

## Added 9th Chords (add9) — all roots

Computed and note-verified for DGBE baritone. `add9` = root, major 3rd, 5th, major 9th (no 7th).

| Chord | Quality | EBGD | DGBE | App array `[D,G,B,E]` |
|---|---|---|---|---|
| Cadd9 | Add9 | 0100 | 0010 | `[0, 0, 1, 0]` |
| Dbadd9 | Add9 | 1211 | 1121 | `[1, 1, 2, 1]` |
| Dadd9 | Add9 | 2322 | 2232 | `[2, 2, 3, 2]` |
| Ebadd9 | Add9 | 3433 | 3343 | `[3, 3, 4, 3]` |
| Eadd9 | Add9 | 2012 | 2102 | `[2, 1, 0, 2]` |
| Fadd9 | Add9 | 3123 | 3213 | `[3, 2, 1, 3]` |
| Gbadd9 | Add9 | 4234 | 4324 | `[4, 3, 2, 4]` |
| Gadd9 | Add9 | 3020 | 0203 | `[0, 2, 0, 3]` |
| Abadd9 | Add9 | 4131 | 1314 | `[1, 3, 1, 4]` |
| Aadd9 | Add9 | 0242 | 2420 | `[2, 4, 2, 0]` |
| Bbadd9 | Add9 | 1130 | 0311 | `[0, 3, 1, 1]` |
| Badd9 | Add9 | 2241 | 1422 | `[1, 4, 2, 2]` |
