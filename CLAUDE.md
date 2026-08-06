# NEARIST — STEP 3: PREMIUM ONBOARDING EXPERIENCE

The following Nearist work has already been completed:

1. Global Nearist Design System
2. Nearist Splash / Loading Screen

Now implement ONLY the CUSTOMER ONBOARDING EXPERIENCE.

Do NOT redesign or modify:

* Global design system unless fixing a genuine issue
* Splash Screen
* Authentication
* Home
* Search
* Explore
* Messages
* Saved
* Profile
* Provider/Seller screens
* Admin screens

The purpose of this task is to create a polished onboarding experience that feels like a direct continuation of the Nearist Splash Screen.

---

# 1. USE EXISTING DESIGN SYSTEM

DO NOT create new:

* colors
* gradients
* fonts
* spacing systems
* radius systems
* shadow systems
* icon systems
* theme providers

Use the existing Nearist global design system.

The established identity is:

Brand:
NEARIST

Tagline:
"Whatever You Need, Nearist."

Font:
Inter

Primary Gradient:

#3B82F6
→
#6366F1
→
#8B5CF6

Dark Background:

#111A32
→
#0C1220
→
#080B12

Design language:

Premium Modern Minimalism
+
Location-First Discovery
+
Subtle Soft Surfaces
+
Controlled Gradient Accents

---

# 2. TECHNOLOGY

Keep the project:

React Native
Expo
Expo Router
JavaScript
JSX

Use:

.js
.jsx

DO NOT create:

.ts
.tsx

---

# 3. OBJECTIVE

Create a premium 3-step onboarding experience.

The user should understand three things:

STEP 1:
Find professionals nearby.

STEP 2:
Compare and choose trusted professionals.

STEP 3:
Connect quickly when help is needed.

The onboarding should NOT explain every feature of the application.

Keep it simple.

The purpose is:

UNDERSTAND
→
TRUST
→
START

---

# 4. VISUAL QUALITY

The onboarding should feel like a polished consumer technology application.

It must NOT look like:

* generic onboarding template
* giant illustration + random text
* gaming UI
* crypto UI
* excessive glassmorphism
* excessive cards
* excessive gradients
* basic icon inside a circle
* three identical screens with only different text

Each onboarding screen should have its own visual story while remaining part of the same design system.

---

# 5. GLOBAL ONBOARDING LAYOUT

Use a consistent structural system.

TOP:

Skip action

MIDDLE:

Premium visual / illustration

LOWER:

Headline

Description

Progress

BOTTOM:

Primary CTA

Approximate structure:

[ Skip ]

[ Premium Visual Area ]

Find trusted help nearby.

Discover reliable local professionals
based on your location, ratings and
availability.

[ Progress ]

[ Continue ]

Do not mechanically copy these positions.

Create balanced spacing based on device height.

---

# 6. SAFE AREA

Respect SafeArea correctly.

Top Skip button must never collide with:

status bar
notch
camera cutout

Bottom CTA must never collide with:

gesture navigation
home indicator

---

# 7. BACKGROUND

Use the existing Nearist branded dark background.

Use the existing dark gradient system.

Do NOT introduce a different gradient.

Allow extremely subtle ambient:

blue
indigo
violet

glow around each screen's main visual.

The glow should support the visual, not dominate it.

---

# 8. ONBOARDING SCREEN 1 — DISCOVER

PURPOSE:

Communicate:

"Nearist helps me find professionals around me."

Headline:

"Find trusted help nearby."

Description:

"Discover reliable local professionals based on your location, ratings and availability."

---

# 9. SCREEN 1 VISUAL

Create an abstract premium LOCATION DISCOVERY visual.

Do NOT use a static generic location-pin icon.

Create something more meaningful.

Concept:

User/current location at the center.

Around the user:

3–4 nearby professional markers.

Possible professional categories:

Garage
Electrician
Plumber
Technician

Use icons from the existing global icon system.

Connect nearby providers visually using:

subtle map/grid lines
distance rings
route paths
location indicators

The user's location should be visually strongest.

Use the Nearist gradient around the primary location element.

Provider markers should be more neutral.

This communicates:

YOU

→

PROFESSIONALS AROUND YOU

---

# 10. SCREEN 1 VISUAL DETAILS

Use a large abstract discovery area approximately occupying the upper-middle portion.

Possible structure:

```
    Garage

      ●


●           ●
```

Plumber        Electrician

```
      ◎
     YOU


    ●
 Technician
```

But create a polished visual, not a literal diagram.

Add subtle radial location rings around the user.

Use extremely low-opacity map/path lines behind the markers.

Animate gently:

Main user marker appears.

Location ring expands/fades once.

Provider markers fade/scale into position.

Do NOT make the animation repeat constantly.

---

# 11. SCREEN 2 — TRUST & COMPARE

PURPOSE:

Communicate:

"I can compare providers before choosing."

Headline:

"Choose with confidence."

Description:

"Compare services, ratings, reviews and availability before you connect."

---

# 12. SCREEN 2 VISUAL

Create a premium layered provider comparison visual.

Show approximately 3 provider preview cards.

Do NOT create three giant full-width cards.

Use layered/floating mini provider cards.

The center/front provider should be visually selected.

Example information:

QuickFix Garage

4.8 ★

1.2 km

● Available

Verified

Other cards can show:

4.6 ★
2.4 km

and

4.9 ★
3.1 km

Do NOT overload them.

---

# 13. SELECTED PROVIDER

The selected provider card should have:

slightly stronger surface

subtle brand border

possibly very subtle soft brand gradient

Verified indicator

Rating

Distance

Availability

The card should immediately communicate:

"This provider looks trustworthy."

Do NOT use a giant gradient card.

---

# 14. SCREEN 2 ANIMATION

When screen 2 becomes active:

Provider cards should enter subtly.

Example:

back cards:

fade + small horizontal movement

selected card:

fade + slight upward movement

Verified badge:

small scale appearance

Keep animation approximately within existing global animation timings.

No dramatic spring/bounce.

---

# 15. SCREEN 3 — CONNECT

PURPOSE:

Communicate:

"When I need someone, Nearist helps me connect quickly."

Headline:

"Help is just a tap away."

Description:

"Connect with trusted local professionals whenever you need them."

---

# 16. SCREEN 3 VISUAL

Create a connection visual.

Concept:

CUSTOMER

↓

NEARIST

↓

LOCAL PROFESSIONAL

Do NOT literally display this as plain arrows/text.

Create a polished visual representation.

For example:

User avatar/location point on left.

Professional/provider on right.

Nearist gradient connection line between them.

Around the connection, subtly show:

Message

Call

Location

icons.

The central connection line should use the Nearist gradient.

---

# 17. SCREEN 3 VISUAL STORY

The visual should communicate:

FIND

→

CONNECT

→

GET HELP

without needing explanatory labels.

Possible animation:

Customer appears.

Professional appears.

Gradient connection path draws between them.

Message/location indicators fade in.

Animation should happen once.

No infinite moving connection.

---

# 18. PROGRESS INDICATOR

Create a premium onboarding progress indicator.

Do NOT use three giant circles.

Recommended:

3 compact segments.

Example:

━━━  ━━━  ━━━

Current segment:

Nearist gradient.

Completed:

brand blue/indigo or subtle gradient.

Upcoming:

muted surface.

Keep the entire indicator compact.

---

# 19. TOP SKIP ACTION

Screens 1 and 2:

Show:

Skip

Top right.

Use:

Inter Medium

theme.colors.textSecondary

Do NOT put Skip inside a giant button.

Touch target must still be at least approximately 44×44.

On screen 3:

Skip may disappear.

---

# 20. PRIMARY CTA

SCREEN 1:

Continue

SCREEN 2:

Continue

SCREEN 3:

Get Started

Use the existing Nearist GradientButton.

Do NOT create another button implementation.

Button should be:

full width

approximately 52px height

existing global radius

Nearist gradient

white text

---

# 21. OPTIONAL BACK ACTION

Screen 1:

No back action.

Screens 2 and 3:

Allow swipe/back if appropriate.

You may also provide a subtle back control if it improves UX.

Do NOT clutter the bottom area with:

Back + Next + Skip

all together.

Keep onboarding simple.

---

# 22. SWIPE SUPPORT

Allow horizontal swipe between onboarding pages.

Use an appropriate performant React Native approach such as:

FlatList paging

or reuse the existing onboarding implementation if already present.

Do NOT introduce a heavy carousel dependency unnecessarily.

Swiping must synchronize correctly with:

progress indicator
current page
button state

---

# 23. CONTINUE BEHAVIOR

Continue on Screen 1:

→ Screen 2

Continue on Screen 2:

→ Screen 3

Get Started:

→ Mark onboarding as completed

→ Continue into the existing app routing/auth flow.

Do NOT hardcode navigation directly to Home if the application has authentication or role logic that should run first.

Respect existing routing architecture.

---

# 24. SKIP BEHAVIOR

When user taps:

Skip

Mark onboarding as completed.

Then continue into the existing routing flow.

Do NOT show onboarding again every time the app launches.

---

# 25. ONBOARDING PERSISTENCE

Use the existing project persistence approach.

If onboarding state already exists:

reuse it.

Otherwise use an appropriate existing storage mechanism.

Store something conceptually like:

hasCompletedOnboarding = true

Do NOT introduce an entire state management library just for this.

---

# 26. SPLASH INTEGRATION

The previously implemented Splash Screen should determine whether onboarding needs to appear.

Expected flow:

APP START

↓

SPLASH / INITIALIZATION

↓

Has user completed onboarding?

NO

→ ONBOARDING

YES

→ Continue existing app flow

Do NOT show onboarding before Splash.

Do NOT create navigation loops.

---

# 27. ONBOARDING SHOULD SHOW ONCE

Once completed or skipped:

Do not show onboarding again during normal launches.

For development purposes, it is okay to provide a simple way to reset onboarding state manually, but do NOT expose a developer reset button in production UI.

---

# 28. RESPONSIVENESS

Test the onboarding visually for:

360px width

375px

390px

412px

430px

Also consider shorter Android screens.

Do NOT make the illustration so large that:

headline
description
progress
CTA

get pushed off-screen.

The visual area should respond to available height.

---

# 29. TEXT RESPONSIVENESS

Do NOT use fixed heights around headings/descriptions.

Allow text to wrap naturally.

Do not reduce fonts randomly on individual devices.

Use existing typography tokens.

---

# 30. DARK MODE

The onboarding should use Nearist's branded dark experience as the primary onboarding presentation.

This creates continuity:

Splash

→

Onboarding

Both should feel like one branded opening experience.

Do NOT make onboarding suddenly switch to bright white immediately after the dark Splash.

---

# 31. LIGHT MODE

The user's chosen Light/Dark/System preference should still be preserved globally.

However, the initial branded onboarding experience may use the Nearist dark branded presentation consistently if that matches the existing Splash implementation.

Do not break global theme settings.

---

# 32. ICONS

Use the existing global icon library.

Prefer the icon system established during Step 1.

Do NOT use emojis such as:

🔧
⚡
🚗
📍

in production UI.

Use proper vector icons.

---

# 33. ILLUSTRATIONS

Prefer creating the onboarding visuals from:

React Native Views

icons

gradients

simple shapes

lines

subtle map patterns

instead of loading large raster illustrations.

This keeps the onboarding:

fast

responsive

theme-consistent.

Do NOT download random stock illustrations.

---

# 34. NO HUGE CARDS

Do not put the entire onboarding content inside a large rounded card.

The background itself should provide the visual canvas.

Cards should only appear where conceptually useful, such as provider previews on Screen 2.

---

# 35. NO EXCESSIVE TEXT

Each onboarding page should have:

ONE headline

ONE short description

ONE primary CTA

Do not add paragraphs explaining Nearist.

The onboarding must be understandable within seconds.

---

# 36. TRANSITIONS BETWEEN PAGES

Page transitions should feel smooth.

Horizontal movement should correspond naturally with swipe direction.

Visual content may use subtle:

fade
translate
scale

when page becomes active.

Do NOT replay distracting animations repeatedly while scrolling slightly between pages.

---

# 37. HAPTICS

If the project already uses Expo Haptics, optionally use very subtle haptic feedback for:

Continue

Get Started

Do NOT install/use it solely for unnecessary effects unless appropriate.

Do not vibrate on every swipe.

---

# 38. ACCESSIBILITY

Ensure:

Skip is accessible.

Continue is accessible.

Get Started is accessible.

Progress has appropriate accessibility information where possible.

Text contrast is sufficient.

Touch targets are large enough.

Animations should not prevent interaction.

---

# 39. PERFORMANCE

Onboarding must remain lightweight.

Do NOT use:

videos

large Lottie animations

remote background assets

large PNG sequences

heavy 3D effects

The experience should load immediately after Splash.

---

# 40. FILE ORGANIZATION

Keep onboarding implementation organized.

Possible structure:

app/
onboarding/
index.jsx

or reuse the existing Expo Router structure.

Reusable onboarding-specific components may live somewhere such as:

src/
components/
onboarding/
OnboardingVisualDiscover.jsx
OnboardingVisualCompare.jsx
OnboardingVisualConnect.jsx
OnboardingProgress.jsx

Only create components when they improve maintainability.

Do NOT over-engineer.

---

# 41. DO NOT MODIFY GLOBAL TOKENS

The global design system is already established.

Do NOT change global:

brand colors

gradient

radius

typography

spacing

because an onboarding layout is difficult to implement.

Adapt the onboarding to the system.

Only fix global tokens if there is a genuine implementation bug.

---

# 42. FINAL VISUAL QUALITY CHECK

Compare:

Splash

and

Onboarding

They must clearly belong to the same product.

Check:

background

gradient

logo treatment

typography

spacing

glow

animation

iconography

brand tone

There should be no sudden design-language change.

---

# 43. FUNCTIONALITY CHECK

Before completing this task verify:

Splash → Onboarding works.

Skip works.

Continue works.

Swipe works.

Progress updates correctly.

Get Started works.

Completion state persists.

App restart does not show onboarding again after completion.

Existing routing after onboarding works.

Android back behavior is correct.

No navigation loops.

No console errors.

No broken SafeArea.

No TypeScript files introduced.

---

# 44. FINAL EXPERIENCE

The complete opening flow should now feel like:

NEARIST SPLASH

"Whatever You Need, Nearist."

↓

DISCOVER

"Find trusted help nearby."

↓

TRUST

"Choose with confidence."

↓

CONNECT

"Help is just a tap away."

↓

GET STARTED

↓

Existing Nearist application flow.

The user should understand Nearist before reaching the main app without reading a long explanation.

---

# 45. IMPORTANT — STOP HERE

Implement ONLY the complete Onboarding experience.

DO NOT redesign Home after completing this.

DO NOT redesign Search.

DO NOT redesign Explore.

DO NOT continue into authentication.

Once Onboarding is implemented and fully tested:

STOP.

The next task will redesign the Nearist Home Screen using the same established design system.
