# CRM preview acceptance checklist

## Routes and navigation

- [ ] Overview `/`
- [ ] Bookings `/bookings`
- [ ] Employees `/employees`
- [ ] Customers `/customers`
- [ ] Services `/services`
- [ ] Payments `/payments`
- [ ] Audit `/audit`
- [ ] Settings `/settings`
- [ ] Direct-load and refresh every route on the deployed Pages URL
- [ ] Verify navigation works from the repository subpath

## Visual and accessibility checks

- [ ] Confirm DEMO DATA banner is visible on every route
- [ ] Test dark and light themes
- [ ] Test narrow phone viewport and horizontal table scrolling
- [ ] Keyboard-test navigation, search, filters, buttons, selects and record drawer
- [ ] Confirm skip link and focus indicators work
- [ ] Confirm logo and icons load from `public/brand`

## Data and actions

- [ ] Confirm data is clearly synthetic
- [ ] Search customers, employees and bookings
- [ ] Filter bookings by lifecycle state
- [ ] Change a booking status and confirm local audit event
- [ ] Assign an employee to a booking
- [ ] Reset demo data and reload to confirm reset behavior
- [ ] Confirm no real API, login, payment gateway or dispatch service is called

## Release gate

- [ ] Pull-request workflow completes and artifact is available
- [ ] TypeScript check and static export validator pass
- [ ] Export is at most 15 MiB
- [ ] Pages deploy occurs only from `main`
