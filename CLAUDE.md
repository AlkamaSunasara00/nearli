# COMPLETE UI/UX RESCUE, REDESIGN & FUNCTIONALITY IMPLEMENTATION

You are working inside an EXISTING React Native + Expo application.

A previous implementation attempt has already created many screens and components, but the current result is NOT acceptable.

There are currently problems such as:

* weak/generic UI
* inconsistent design
* broken layouts
* incomplete screens
* missing functionality
* buttons that do nothing
* missing navigation
* inconsistent spacing
* poor dark mode
* unfinished states
* missing Customer functionality
* missing Provider functionality
* components that do not feel reusable
* screens that look like generated templates instead of a real premium mobile application

Your task is NOT to blindly rebuild everything.

Your task is to:

1. Audit the complete existing project.
2. Find every existing screen and component.
3. Compare the implementation against ALL requirements below.
4. Identify missing screens and functionality.
5. Repair broken layouts.
6. Redesign visually weak screens.
7. Complete missing functionality using frontend/local/mock state.
8. Standardize the entire application with one premium design system.
9. Test every route, tab, button and interaction.
10. Leave the project in a polished, production-quality frontend state.

The final application must feel like a professionally designed modern startup application, NOT an AI-generated template.

---

# 1. CRITICAL RULE — DO NOT DESTROY WORKING FEATURES

First inspect the existing project.

DO NOT immediately delete everything.

For every existing screen/component:

* determine whether it works
* determine whether it matches the product requirements
* determine whether it is reusable
* determine whether its design quality is acceptable

KEEP good logic.

REFACTOR weak code.

REDESIGN weak UI.

REPLACE broken components.

CREATE missing components.

DELETE only obsolete, duplicated or unused files after confirming they are no longer required.

Do not break working Expo configuration.

---

# 2. JAVASCRIPT + JSX ONLY

This project MUST remain:

React Native
Expo
Expo Router
JavaScript
JSX

DO NOT create application code using:

.ts

.tsx

Use:

.js

.jsx

If TypeScript application files still exist, replace them properly with JavaScript/JSX equivalents and remove obsolete duplicates.

Do not blindly remove configuration required by Expo dependencies.

---

# 3. NO BACKEND IN THIS PHASE

This phase is frontend/UI only.

DO NOT build:

* real backend
* database
* real authentication server
* real OTP
* real WebSocket server
* real payments
* real push notification backend
* real booking
* AI features

However, ALL UI functionality must behave realistically using:

* local state
* mock data
* Context where appropriate
* AsyncStorage where persistence improves the demo
* reusable service abstractions

There should NOT be dead buttons just because the backend does not exist.

---

# 4. PRIMARY OBJECTIVE — REDESIGN THE ENTIRE EXPERIENCE

The current UI is not good enough.

Redesign it into a:

MODERN
PREMIUM
CLEAN
MINIMAL
TRUSTWORTHY
HIGH-END
POLISHED
FAST
MOBILE-FIRST

application.

The design should feel comparable in QUALITY to polished consumer apps such as:

Uber
Airbnb
Google Maps
Urban Company
Blinkit

Do NOT copy them.

Create an original visual identity.

---

# 5. DO NOT CREATE A GENERIC AI UI

Avoid the common generated-app look.

DO NOT:

* put every section inside a giant card
* use excessive gradients
* use purple gradients everywhere
* make every element extremely rounded
* use random shadows
* use giant headings
* create huge empty spaces
* use excessive emojis
* mix icon libraries
* create desktop dashboard layouts inside mobile screens
* use 5 different accent colors
* make every button a pill
* make every section visually identical
* use glassmorphism everywhere
* use decorative animations that slow navigation
* create unnecessary nested cards
* create oversized statistics cards
* make dark mode simply black backgrounds

The UI must feel intentionally designed.

---

# 6. NEW PREMIUM COLOR SYSTEM

Create ONE centralized theme system.

Recommended primary brand direction:

PRIMARY
#2563EB

PRIMARY PRESSED
#1D4ED8

PRIMARY SOFT
#EFF6FF

ACCENT
#14B8A6

SUCCESS
#16A34A

WARNING
#F59E0B

DANGER
#DC2626

LIGHT BACKGROUND
#F7F9FC

LIGHT SURFACE
#FFFFFF

LIGHT SURFACE SECONDARY
#F1F5F9

LIGHT BORDER
#E2E8F0

LIGHT TEXT PRIMARY
#0F172A

LIGHT TEXT SECONDARY
#64748B

LIGHT TEXT MUTED
#94A3B8

DARK BACKGROUND
#090D14

DARK SURFACE
#111827

DARK SURFACE SECONDARY
#182234

DARK ELEVATED
#1E293B

DARK BORDER
#283548

DARK TEXT PRIMARY
#F8FAFC

DARK TEXT SECONDARY
#CBD5E1

DARK TEXT MUTED
#8291A7

DARK PRIMARY
#3B82F6

DARK PRIMARY SOFT
#172554

DARK ACCENT
#2DD4BF

DARK SUCCESS
#22C55E

DARK WARNING
#FBBF24

DARK DANGER
#EF4444

You may improve these slightly for accessibility/contrast.

BUT:

all colors MUST live in centralized theme files.

No random hexadecimal colors throughout screens.

---

# 7. CENTRALIZED DESIGN TOKENS

Create/refactor:

src/theme/colors.js

src/theme/spacing.js

src/theme/typography.js

src/theme/radius.js

src/theme/shadows.js

src/theme/index.js

Create semantic values such as:

colors.background

colors.surface

colors.surfaceSecondary

colors.primary

colors.primarySoft

colors.text

colors.textSecondary

colors.textMuted

colors.border

colors.success

colors.warning

colors.danger

colors.overlay

Do not make screens know raw colors.

---

# 8. LIGHT / DARK / SYSTEM THEME

Implement theme modes properly:

System
Light
Dark

Default:

System

Persist manual preference.

Create:

ThemeProvider

useAppTheme()

EVERY screen and component must support both themes.

Audit:

* bottom tabs
* headers
* cards
* search
* inputs
* filters
* chips
* buttons
* bottom sheets
* modals
* dialogs
* chat
* provider dashboard
* reviews
* skeletons
* empty states
* status bars
* separators

There must be NO unreadable text in dark mode.

There must be NO white cards accidentally appearing on dark screens.

---

# 9. TYPOGRAPHY

Use a professional modern type system.

Prefer Inter if already available/appropriate.

Create tokens for:

display
heading1
heading2
heading3
title
body
bodyMedium
label
caption
button

Avoid giant headings.

Use strong hierarchy instead of excessive font size.

---

# 10. SPACING

Use a consistent spacing scale:

4
8
12
16
20
24
32
40

Avoid random values such as:

13
17
29
37

unless genuinely required.

Use approximately:

16–20 horizontal screen padding.

---

# 11. RADIUS

Create:

sm = 8

md = 12

lg = 16

xl = 20

pill = 999

Use rounded design intentionally.

Cards should generally use 12–18 radius.

Do NOT use 30px radius on everything.

---

# 12. SHADOWS / ELEVATION

Use shadows sparingly.

Most hierarchy should come from:

background differences
borders
spacing
typography

Use subtle elevation for:

bottom sheets
floating cards
sticky action bars
selected map card
modal surfaces

Do not make every card float.

---

# 13. ICON SYSTEM

Use ONE icon family.

Prefer:

Lucide React Native

Keep consistent:

16px
18px
20px
24px

depending on context.

Use consistent stroke widths.

Do not use emoji as production icons.

---

# 14. BUILD / REFACTOR REUSABLE COMPONENTS

Create a strong reusable UI system.

Required components include:

Button

IconButton

Input

PhoneInput

SearchBar

Avatar

Badge

StatusBadge

VerificationBadge

Rating

RatingSummary

ProviderCard

ServiceCard

ServiceChip

FilterChip

VehicleSelector

BrandChip

SectionHeader

ScreenHeader

EmptyState

ErrorState

Skeleton

GarageCardSkeleton

ConversationSkeleton

ReviewSkeleton

BottomSheet

Modal

ConfirmDialog

Checkbox

Radio

Toggle

SegmentedControl

StatItem

ReviewCard

ConversationRow

ChatBubble

ChatComposer

QuickReplyChip

ProfileMenuItem

SettingRow

AvailabilitySelector

LocationCard

MapPreview

ImageGallery

PhotoGrid

ProgressIndicator

Toast/Snackbar

Do NOT duplicate these patterns separately on each screen.

---

# 15. BUTTONS MUST BE STANDARDIZED

Create ONE button system.

Variants:

Primary
Secondary
Outline
Ghost
Danger

Sizes:

Small
Medium
Large

States:

Normal
Pressed
Disabled
Loading

Support:

iconLeft
iconRight
fullWidth

Buttons must have proper touch targets.

---

# 16. NAVIGATION MUST BE FULLY FUNCTIONAL

Use Expo Router correctly.

Route groups should logically separate:

(auth)

(customer)

(provider)

shared/detail screens

Customer tabs:

Home
Explore
Messages
Saved
Profile

Provider tabs:

Dashboard
Messages
Garage
Reviews
Profile

Test EVERY tab.

No tab should navigate to:

blank screen
wrong screen
404 route
broken route

Back navigation must work.

---

# 17. BOTTOM TAB BAR REDESIGN

Redesign the bottom navigation to look modern and premium.

Requirements:

* compact
* safe-area aware
* theme-aware
* icon + small label
* strong active state
* subtle inactive state
* unread Messages badge
* subtle top border/elevation
* no giant center FAB
* keyboard-aware

The active state may use:

primary icon/text

with a subtle soft-primary background indicator if it improves the design.

---

# 18. AUTHENTICATION SCREENS

Complete and redesign ALL:

Splash

Onboarding

Phone Login

OTP Verification

Role Selection

Customer Setup

Provider Registration

All must be visually consistent.

---

# 19. SPLASH

Create a minimal premium splash.

Logo/brand placeholder

App name

Short line:

"Trusted services around you."

Subtle loading indicator.

Do NOT make a huge animation.

---

# 20. ONBOARDING

Create three beautiful slides.

1.

Find trusted garages near you.

2.

Compare services, ratings and availability.

3.

Message garages instantly.

Each should include:

illustration area
short heading
short description
page indicator

Actions:

Skip
Next
Get Started

---

# 21. PHONE LOGIN

Create premium authentication layout.

Include:

brand
heading
description
+91 country code
phone input
Continue

Terms/Privacy acknowledgement.

Implement local validation.

Continue should navigate to OTP when valid.

---

# 22. OTP

Create:

6-digit input

auto focus

resend countdown

invalid state

expired state

Verify

Change Number

For demo:

use a clearly documented mock OTP such as:

123456

Successful entry should continue through the UI flow.

---

# 23. ROLE SELECTION

Cards:

Customer

Service Provider

Do NOT call Provider:

Seller

Each card should have:

icon
title
description
selected state

Continue button.

Role selection must actually update local app state and route to the correct experience.

---

# 24. PROVIDER REGISTRATION

Build/repair a polished multi-step provider onboarding.

Steps:

Business
Location
Services
Vehicles
Hours
Photos
Review

Show progress.

Each step must work.

Allow:

Back
Next
Save Draft

Validate required fields locally.

Final:

Submit for Verification

Then show:

Pending Verification state.

---

# 25. CUSTOMER HOME — FULL REDESIGN

This screen must immediately look premium.

Top area:

Greeting

Current location

Avatar

Example:

Good morning

Chhapi, Gujarat

Below:

large but elegant search field

"Search garage, service or problem"

Then:

Bike / Car selector

Then:

Quick Services

Use clean icon tiles/chips for:

Puncture

Battery

Oil Change

Engine

Brakes

Electrical

AC

General Service

Then:

Available Near You

Then:

Top Rated

Then:

Open Now

Then:

Recently Viewed

Do NOT display all sections using exactly the same layout.

Use visual variation intentionally.

---

# 26. PROVIDER CARD — REDESIGN CAREFULLY

This component appears everywhere.

It must be excellent.

Include:

realistic image

Garage name

Verified badge

Rating

Review count

Distance

Open/Closed

Availability

Bike/Car

Relevant services

Optional quick actions:

Message
Call

Availability:

Available

Busy

Unavailable

Do not paint the entire card green/orange/red.

Use compact badges.

Create:

horizontal card variant

vertical card variant

map preview variant

saved variant

Reuse the same design language.

---

# 27. LOCATION PICKER

Complete:

Search location

Use Current Location

Recent locations

Map placeholder

Pin selector

Use This Location

Location denied state.

Current Location button must update mock location.

---

# 28. EXPLORE

Redesign and complete.

Top:

Explore

Search

Recent searches

Popular services

Nearby areas

List / Map toggle

Search interactions must work.

---

# 29. SEARCH RESULTS

Implement:

search query

result count

Sort

Filter

Map

Sorting must work locally:

Recommended

Nearest

Rating

Most Reviewed

Use realistic mock garage data.

---

# 30. FILTERS — COMPLETE FUNCTIONALITY

Filters must actually affect mock results.

Implement:

Vehicle

Bike
Car
Both

Distance

2km
5km
10km
25km

Available Now

Open Now

Rating

4.5+

4.0+

3.5+

Services

Brands

Sticky footer:

Reset All

Apply Filters

Show active filter count.

Persist filter state while moving between Explore and Results.

---

# 31. MAP SCREEN

Build the complete map-screen UI.

If real map integration is not configured, DO NOT break the application.

Create a polished map placeholder architecture.

Include:

search

markers

selected marker state

recenter

filters

Search This Area

List View

When a marker is selected:

show bottom floating ProviderCard.

---

# 32. GARAGE DETAIL — MAJOR REDESIGN

This is one of the MOST IMPORTANT screens.

Spend extra effort here.

Top:

large photo cover/gallery

floating Back

Favorite

Share

Then:

Garage Name

Verified badge

Rating

review count

distance

Open Now

Available

Then primary actions:

MESSAGE

CALL

DIRECTIONS

MESSAGE should be visually strongest.

Then:

About

Services

Vehicles

Brands

Hours

Location

Map Preview

Photos

Reviews

Avoid huge cards for every section.

Use:

clean section separation

typography

spacing

small surfaces

chips

dividers

Create sticky bottom actions when useful.

---

# 33. FAVORITE FUNCTIONALITY

Favorite must actually work locally.

Tapping heart:

adds/removes garage.

Saved tab updates immediately.

Persist favorites using AsyncStorage if available/appropriate.

Favorite state must remain consistent between:

Home

Explore

Garage Detail

Saved

---

# 34. SERVICES DETAIL

Create grouped services.

Examples:

General

Engine

Tyres

Electrical

Battery

Brakes

AC

Each service:

icon

name

description where appropriate

CTA:

Message About Service

This should open/create the mock conversation with service context.

---

# 35. PHOTO GALLERY

Implement:

grid

fullscreen image viewer

swipe

close

image counter

loading/error states

---

# 36. MESSAGES TAB

Complete:

search conversations

conversation rows

garage avatar

garage name

verification

last message

time

unread count

availability

Unread conversations should be clearly distinguishable.

Search must filter conversations locally.

---

# 37. CUSTOMER CHAT — COMPLETE

Implement a polished mock chat experience.

Header:

Back

Garage avatar

Garage name

Verified

Availability

Call

Optional context:

Regarding: Engine Repair

Messages:

incoming

outgoing

timestamps

sent

delivered

read

failed state if simulated

Composer:

attachment

text input

send

Quick replies:

Are you available?

Can I come now?

Do you repair this vehicle?

Approximate cost?

Sending a message must actually add it to local conversation state.

Update:

conversation last message

timestamp

ordering

Do NOT leave Send non-functional.

Keyboard must not cover composer.

---

# 38. SAVED TAB

Complete:

Saved Garages

sort

Recently Saved

Nearest

Provider cards

Remove Favorite

Empty state

Explore Garages CTA.

---

# 39. CUSTOMER PROFILE

Redesign into clean grouped sections.

Header:

avatar

name

phone

ACCOUNT

Edit Profile

My Reviews

PREFERENCES

Location & Permissions

Notifications

Appearance

SUPPORT

Help

Terms

Privacy

ACCOUNT ACTIONS

Logout

Delete Account

All rows should navigate/open something.

No dead menu rows.

---

# 40. APPEARANCE SCREEN

Implement:

System Default

Light

Dark

Selecting an option should immediately update the entire application.

Persist selection.

---

# 41. EDIT PROFILE

Implement local editing.

Avatar

Name

Phone

Save

Changing phone can show:

"Phone verification will be required when backend authentication is connected."

---

# 42. MY REVIEWS

Complete:

garage

rating

text

date

Edit

Delete

Editing must update local state.

Delete should show confirmation.

---

# 43. WRITE REVIEW

Implement:

Garage summary

interactive 5 stars

text area

character guidance if useful

Submit

Validation

After submission:

update mock review data

update rating display if practical

show success feedback.

---

# 44. CUSTOMER NOTIFICATION SETTINGS

Implement toggles:

Messages

Garage Replies

Review Updates

Platform Announcements

Toggles must actually change local settings.

---

# 45. PROVIDER DASHBOARD — MAJOR REDESIGN

This should NOT look like an admin dashboard.

Garage owners need simplicity.

Top:

Good Morning

Garage Name

Verification

Then:

LARGE availability control

AVAILABLE

BUSY

UNAVAILABLE

Then compact activity summary:

New Messages

Calls

Directions

Profile Views

New Reviews

Do NOT create five giant statistic cards.

Use a compact modern grid/list.

Then:

Recent Messages

Then:

Profile Completion

Example:

80% Complete

Add Opening Hours

Upload More Photos

Verification banner where required.

---

# 46. PROVIDER AVAILABILITY MUST WORK

Implement local availability state.

Available

Busy

Unavailable

Changing status must update it across:

Provider Dashboard

Garage Profile

Customer Garage Detail

Provider cards

where mock shared state allows.

This is important.

---

# 47. PROVIDER MESSAGES

Implement:

All

Unread

Search

Conversation list

Customer name

Last message

Service context

Unread count

Provider Chat.

---

# 48. PROVIDER CHAT

Reuse the SAME chat system.

Do not create a second incompatible chat UI.

Provider quick replies:

Yes, available now

Please come after...

We repair this

Please call me

Messages sent from Provider side should update shared mock conversation state.

---

# 49. PROVIDER GARAGE TAB

Redesign.

Top:

Cover

Garage avatar/logo

Garage name

Verified

Rating

Availability

Profile completeness

Then:

Business Information

Photos

Services

Vehicle Types & Brands

Opening Hours

Location

Contact Information

CTA:

Preview Public Profile

Every section must open the correct editor.

---

# 50. BUSINESS INFORMATION

Fields:

Garage Name

Owner Name

Description

Phone

WhatsApp

Save locally.

Show verification warning when sensitive fields change.

---

# 51. MANAGE PHOTOS

Implement local/demo functionality:

Cover photo

Gallery

Add Photo

Delete

Set Cover

Reorder where practical

Upload progress simulation if useful.

Do not leave photo controls dead.

---

# 52. MANAGE SERVICES

Search services.

Grouped list.

Checkbox selection.

Selected count.

Save.

Provider's public profile should reflect selected services.

---

# 53. VEHICLE TYPES & BRANDS

Implement:

Bike

Car

Both

Brand search

Brand multi-select

Selected brands

Save.

Public garage profile should update.

---

# 54. OPENING HOURS

Implement all days.

Monday

Tuesday

Wednesday

Thursday

Friday

Saturday

Sunday

Each:

Open/Closed

Opening time

Closing time

Implement:

Copy Monday to Weekdays

Save.

Use a polished time picker if available and compatible.

---

# 55. GARAGE LOCATION

Implement:

Address

Use Current Location mock

Map preview

Move Pin mock

Save

Show:

Changing location may require re-verification.

---

# 56. CONTACT INFORMATION

Implement:

Public phone

WhatsApp

Allow Calls toggle

Allow WhatsApp toggle

Save.

---

# 57. PROVIDER REVIEWS

Implement:

Average rating

Review count

Rating distribution

Review list

Report Review

Do NOT allow provider to:

edit

delete

customer reviews.

---

# 58. REPORT REVIEW

Bottom sheet:

Spam

Abusive

Unrelated

Conflict

Other

Submit Report

Show success state locally.

---

# 59. PROVIDER PROFILE

Complete:

Personal Profile

Verification Status

Notifications

Appearance

Help

Terms

Privacy

Logout

Delete Account

All navigation must work.

---

# 60. VERIFICATION STATES

Implement:

PENDING

APPROVED

REJECTED

Pending:

Verification in Progress

Approved:

Verified Garage

Rejected:

reason

required changes

Fix & Resubmit

Make these states visually excellent.

---

# 61. PROVIDER NOTIFICATIONS

Implement toggles:

New Messages

Unread Message Reminders

Reviews

Verification Updates

Platform Notices

---

# 62. LOADING STATES

Audit every important screen.

Create skeletons for:

Home

Provider cards

Search results

Garage Detail

Messages

Reviews

Provider Dashboard

Use action spinner for:

Save

Submit

Send

Verify

Do not show a full-screen spinner for every load.

---

# 63. EMPTY STATES

Implement polished empty states for:

No garages nearby

No search results

No messages

No favorites

No reviews

No photos

No selected services

No recent activity

Each should have:

icon

title

short explanation

useful CTA

---

# 64. ERROR STATES

Implement:

No Internet

Unable to Load Garages

Location Unavailable

Message Failed

Image Failed

Generic Error

Retry button.

---

# 65. MOCK DATA MUST BE REALISTIC

Centralize mock data.

DO NOT hardcode giant arrays inside screens.

Use files such as:

src/data/mockProviders.js

src/data/mockUsers.js

src/data/mockServices.js

src/data/mockReviews.js

src/data/mockMessages.js

src/data/mockBrands.js

Use realistic local garage examples.

Each garage should vary:

rating

reviews

distance

availability

opening status

services

bike/car support

brands

photos

description

hours

location

Do not make every garage identical.

---

# 66. CREATE SHARED FRONTEND STATE

Create a clean local state architecture.

It must support:

current role

current user

theme

favorites

filters

provider availability

provider profile

services

opening hours

reviews

messages

unread counts

notification preferences

Do not create unnecessary complexity.

Context + hooks is acceptable.

Use AsyncStorage only where persistence improves the demo.

---

# 67. CRITICAL FUNCTIONALITY AUDIT

After implementation, manually inspect EVERY clickable element.

Every:

button

icon button

tab

menu item

filter

chip

favorite

message

review

setting

theme selector

availability selector

profile editor

service selector

location action

must either:

perform its intended frontend action

OR

navigate to the intended screen

OR

show a clear intentional placeholder message for functionality that absolutely requires future backend/native configuration.

There must be NO mysterious dead buttons.

---

# 68. SCREEN RESPONSIVENESS

Test layouts conceptually for:

360px width

390px width

412px width

small Android phones

larger Android phones

No:

horizontal overflow

cut text

buttons outside screen

cards wider than screen

bad keyboard overlap

hidden bottom content

---

# 69. SAFE AREA

Use SafeAreaView / safe-area insets properly.

Nothing should collide with:

status bar

camera cutout

bottom gesture area

bottom tabs

keyboard

---

# 70. KEYBOARD

Audit:

Login

OTP

Search

Chat

Profile editing

Provider registration

Business editor

Review writing

The keyboard must not destroy layouts.

Chat composer must remain accessible.

Forms must scroll appropriately.

---

# 71. PERFORMANCE

Use:

FlatList

for lists.

Avoid mapping hundreds of items inside ScrollView.

Optimize rendering.

Avoid huge nested ScrollViews.

Avoid unnecessary re-renders.

Use optimized images/placeholders.

---

# 72. ACCESSIBILITY

Minimum useful touch target.

Good contrast.

Accessible labels.

Selected states.

Readable typography.

Do not communicate status only with color.

Use:

green indicator + "Available"

not only green.

---

# 73. ANIMATION

Use subtle animations only.

Good:

button press

favorite

bottom sheet

tab indicator

availability state

skeleton

small transitions

Bad:

everything flying in

constant bouncing

giant spring effects

decorative animations that delay interaction.

---

# 74. VISUAL AUDIT SCREEN BY SCREEN

After all functionality is complete, perform another pass ONLY for design quality.

For each screen ask:

Does this look like a real production app?

Is hierarchy clear?

Is spacing consistent?

Are there too many cards?

Are there unnecessary borders?

Are buttons consistent?

Does dark mode look intentionally designed?

Is important information visible quickly?

Does this screen feel cluttered?

Does this screen feel empty?

Are icons aligned?

Are typography weights consistent?

Is the primary action obvious?

If not:

REDESIGN IT.

Do not accept mediocre screens simply because they technically work.

---

# 75. CUSTOMER FLOW TEST

Test this entire flow:

Launch

→ Onboarding

→ Login

→ OTP

→ Customer Role

→ Profile Setup

→ Home

→ Select Bike

→ Select Puncture

→ Results

→ Apply Available Now

→ Open Garage

→ Favorite Garage

→ Message Garage

→ Send Quick Reply

→ Open Messages

→ Open Chat

→ Saved

→ Profile

→ Appearance

→ Dark Mode

Every step must work.

---

# 76. PROVIDER FLOW TEST

Test:

Launch/Login

→ Provider Role

→ Provider Registration

→ Submit

→ Pending Verification

→ Provider Dashboard

→ Change Available → Busy

→ Messages

→ Open Customer Chat

→ Send Reply

→ Garage

→ Edit Business

→ Manage Services

→ Change Brands

→ Edit Hours

→ Edit Location

→ Reviews

→ Report Review

→ Profile

→ Verification

→ Appearance

Every step must work.

---

# 77. DARK MODE TEST

Navigate EVERY major screen in Dark Mode.

Fix:

bad borders

washed text

white backgrounds

invisible icons

wrong shadows

bad chips

bad inputs

bad chat bubbles

bad bottom sheets

bad navigation

Dark mode should feel as polished as light mode.

---

# 78. PROJECT CLEANUP

When implementation is complete:

Remove:

unused imports

obsolete components

unused starter files

duplicate routes

dead styles

unused mock files

old TypeScript application files

console.log debugging

Fix warnings where practical.

Do NOT leave:

`Screen2`

`TestComponent`

`Temp`

`OldHome`

`NewHome2`

or similar garbage naming.

---

# 79. DO NOT BUILD FUTURE FEATURES

Do NOT add:

payments

booking

mechanic tracking

AI diagnosis

subscriptions

spare-parts marketplace

electricians

plumbers

carpenters

roadside dispatch

The MVP remains:

GARAGES.

Architecture may support future categories.

---

# 80. MOST IMPORTANT PRODUCT PRINCIPLE

The customer should be able to answer:

"Which good garage near me can actually help me right now?"

within seconds.

Therefore prioritize:

Location

Distance

Rating

Services

Open/Closed

Availability

Message

Call

Directions

The Provider should be able to answer customers with minimal effort.

Therefore prioritize:

Availability

Messages

Quick Replies

Garage Information

---

# 81. FINAL COMPLETION REQUIREMENT

DO NOT finish the task merely because all files compile.

The task is complete ONLY when:

* every required screen exists
* every bottom tab works
* every important button works locally
* Customer flow works
* Provider flow works
* mock chat works
* favorites work
* filters work
* sorting works
* theme switching works
* provider availability works
* profile editing works
* service editing works
* hours editing works
* review interactions work
* verification states work
* navigation works
* dark mode works
* no screen is visibly broken
* no major screen feels unfinished
* layouts work on common Android widths
* JavaScript/JSX is used
* no duplicate TypeScript application routes remain
* design tokens are centralized
* components are reusable
* UI is visually consistent
* empty/loading/error states exist
* the application runs successfully

---

# 82. DO NOT JUST TELL ME WHAT IS WRONG — FIX IT

Do not return only an audit report.

After identifying problems:

IMPLEMENT THE FIXES.

If a screen is ugly:

REDESIGN IT.

If a component is duplicated:

REFACTOR IT.

If a route is missing:

CREATE IT.

If a button does nothing:

IMPLEMENT ITS LOCAL FRONTEND BEHAVIOR.

If dark mode is broken:

FIX IT.

If a screen is missing:

BUILD IT.

If mock data is poor:

IMPROVE IT.

If navigation is broken:

REPAIR IT.

If the existing design system is inconsistent:

REPLACE/REFACTOR IT.

---

# 83. WORK IN PASSES

Do not randomly modify the project.

Use this order:

PASS 1
Project and route audit

PASS 2
Design system + theme repair

PASS 3
Reusable components

PASS 4
Authentication screens

PASS 5
Customer screens

PASS 6
Customer functionality

PASS 7
Provider screens

PASS 8
Provider functionality

PASS 9
Messaging

PASS 10
Loading / empty / error states

PASS 11
Dark mode audit

PASS 12
Responsive/layout audit

PASS 13
Navigation/functionality audit

PASS 14
Visual polish

PASS 15
Final project cleanup

After each pass, ensure you did not break previously working functionality.

---

# 84. FINAL DESIGN EXPECTATION

The finished application should feel like something that could realistically be released on Google Play after backend integration.

It should NOT feel like:

a school project

a basic Expo template

a generic CRUD application

an admin dashboard converted to mobile

an AI-generated UI kit

It should feel like:

a carefully designed modern local-services marketplace

with excellent:

discovery

trust

location awareness

availability

communication

and provider management.

Prioritize excellent visual hierarchy and usability over decorative complexity.

When uncertain between two UI approaches, choose the one that is:

cleaner

simpler

faster

more intuitive

more premium

and more consistent with the rest of the application.

DO NOT stop until the entire application has been audited and the weak/broken UI has actually been improved.
