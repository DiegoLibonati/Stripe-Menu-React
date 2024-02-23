# Stripe-Menu-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that simulates a new style of navbar. It is not the traditional navbar, but it is a menu that will appear if we hover over the nav link. As you scroll through the different nav links, the menu will scroll as well.

## Technologies used

1. React JS
2. Typescript
3. CSS3

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/35`](https://www.diegolibonati.com.ar/#/project/35)

## Video

https://user-images.githubusercontent.com/99032604/199617642-cbe53bbe-07a3-4e08-a153-0b75c1994920.mp4

## Documentation

In the `assets` folder we have all the images.
In the `helpers/data.ts` file we have all the information that we are going to use to render in the page as if it was the information of an API.
In the `helpers/context.tsx` file we find the context that we use for the whole application to handle states and functions:

This code block handles the system of opening or closing the navigation menu in the mobile version:

```
const [mobileMenu, setMobileMenu] = useState<boolean>(false);

const handleMobileMenuOpen = (): void => {
    setMobileMenu(true);
};

const handleMobileMenuClose = (): void => {
    setMobileMenu(false);
};
```

This code block handles the system of opening or closing the navigation menu in the desktop version:

```
const [desktopMenu, setDesktopMenu] = useState<boolean>(false);

const handleDesktopMenuOpen = (text: string, centerBtn: number): void => {
const page = sublinks.find((link) => link.page === text);
setPage(page!);
setLocation(centerBtn);
setDesktopMenu(true);
};

const handleDesktopMenuClose = (): void => {
    setDesktopMenu(false);
};
```

The `page` state is in charge of rendering the different links for each navLink:

```
const [page, setPage] = useState<SubLink>({ page: "", links: [] });
```
