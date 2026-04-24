# Stripe Nav

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Stripe Nav** is a frontend application that faithfully replicates the interactive navigation experience found on Stripe's website. It features a dynamic, context-aware navigation menu that goes beyond a traditional navbar: instead of static dropdowns, it renders a floating submenu panel that smoothly follows the user's cursor as they hover across different navigation links — transitioning content and repositioning itself horizontally in real time to stay anchored to the active link.

The desktop experience centers around a hover-driven submenu: each top-level navigation item (Products, Developers, Company) reveals a dedicated panel populated with categorized links and icons. The panel slides and repositions fluidly using synchronized X-axis coordinates, giving the impression that the menu is physically attached to the hovered button. On mobile, the same navigation content is surfaced through a sidebar drawer that opens via a hamburger button, providing a fully responsive experience without sacrificing any content.

All application state — submenu visibility, sidebar visibility, active link data, and submenu position — is managed through a single global `StripeContext` using React's Context API, keeping the component tree clean and predictable. The navigation data itself (link categories, labels, icons) is centralized in a constants file, making it trivial to extend or swap out content.

The project is built with **React 19**, **TypeScript**, and **Vite**, and includes a full test suite using **Jest**, **ts-jest**, and **React Testing Library** with coverage thresholds enforced at 70%. Code quality is maintained via **ESLint**, **Prettier**, and **Husky** pre-commit hooks running lint-staged on every commit.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/stripe-nav`](https://www.diegolibonati.com.ar/#/project/stripe-nav)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
