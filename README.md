# Moss

Browser scripts in a Single Page Application for online assessment

## Vite scripts

```
npm run dev
```

```
npm run build
```

## Playwright scripts

```
npm run dev
```

followed by

```
npx playwright test
```

```
npx playwright test --project=chromium
```

```
npx playwright test --debug
```

```
npx playwright codegen [localhost_URL]
```

## Update

```
npx npm-check-updates
```

## User's path

In general a candidate will:

(1) visit website  
(2) authenticate  
(3) select an exam  
(4) read questions  
(5) submit work  
(6) achieve grade

## Naming conventions

- `specialism` eg discipline or subject
- `catalog` eg list of specialisms
- `worksheet` eg exam question or instruction
- `workflow` eg list of worksheets
- `achieved` eg completed workflow with marks and grade

## Endpoints

API endpoints provide a catalogue of subjects followed by a series of worksheets each prompting a submission to the database.

The database exposes three authenticated endpoints:

(1) /candidate-email  
 returns candidate email address  
(2) /catalog  
 returns specialisms (upcoming, ongoing and achieved) as HTML  
(3) /workbook/{workflowId}  
 returns either achieved or next worksheet as HTML

## State chart

![ui_state_chart2023-03-04](https://user-images.githubusercontent.com/37618836/223655779-fe4e0275-ba94-4552-a6dd-183bd20c7917.svg)
