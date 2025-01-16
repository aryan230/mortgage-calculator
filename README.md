# Mortgage Repayment Calculator

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Key Features](#key-features)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Getting Started](#getting-started)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

Create an interactive mortgage calculator that allows users to:

- Calculate monthly mortgage payments based on:
  - Principal amount
  - Interest rate
  - Loan term
  - Mortgage type (Repayment or Interest-only)
- See dynamic updates with animated transitions
- View form validation messages
- Navigate the form using keyboard only
- Experience a responsive design across all devices
- Interact with hover and focus states
- View clear error messages for invalid inputs

### Screenshots

![Desktop View](/public/images/desktop-preview.jpg)
![Mobile View](/public/images/mobile-preview.jpg)
![Form Validation](/public/images/validation-preview.jpg)
![Results View](/public/images/results-preview.jpg)

### Links

- GitHub Repository: [Add repo URL]
- Live Site: [Add live site URL]

## My Process

### Built With

- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Lucide React](https://lucide.dev/) - For icons
- Modern JavaScript (ES6+)
- Mobile-first workflow
- Semantic HTML5
- CSS Grid & Flexbox
- Responsive Design principles

### Key Features

1. **Interactive Form**

   - Real-time validation
   - Keyboard navigation support
   - Animated feedback
   - Clear error messages

2. **Calculation Engine**

   - Support for both repayment and interest-only mortgages
   - Precise financial calculations
   - Instant results display

3. **Animations**

   - Smooth page load transitions
   - Interactive button animations
   - Form validation animations
   - Results reveal animations

4. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop optimizations
   - Flexible grid layout
   - Adaptive typography

### What I Learned

- Implementing complex financial calculations in JavaScript
- Creating smooth animations with Framer Motion
- Building accessible forms with keyboard navigation
- Managing form state and validation in React
- Implementing responsive design with Tailwind CSS

Example of the mortgage calculation function:

```javascript
const calculateMortgage = (amount, years, rate, type) => {
  const principal = parseFloat(amount.replace(/,/g, ""));
  const interestRate = parseFloat(rate) / 100 / 12;
  const payments = parseFloat(years) * 12;

  if (type === "interest-only") {
    const monthlyPayment = principal * interestRate;
    return { monthlyPayment, totalPayment: monthlyPayment * payments };
  }

  const monthlyPayment =
    (principal * (interestRate * Math.pow(1 + interestRate, payments))) /
    (Math.pow(1 + interestRate, payments) - 1);
  return { monthlyPayment, totalPayment: monthlyPayment * payments };
};
```

### Continued Development

Future improvements planned:

- Add overpayment calculations
- Implement mortgage comparison feature
- Add graph visualizations for payment breakdown
- Include mortgage affordability calculator
- Add print/export functionality for results
- Implement save/load functionality for calculations

### Useful Resources

- [Mortgage Math Explained](https://www.moneysavingexpert.com/mortgages/mortgage-rate-calculator/) - Helped understand mortgage calculations
- [Framer Motion Documentation](https://www.framer.com/motion/) - Great resource for learning animations
- [React Form Validation Guide](https://react-hook-form.com/) - Useful patterns for form validation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Essential for styling

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Author

- Website - [Aryan Agarwal](your-website-url)
- GitHub - [@ayan230](https://github.com/aryan230)

## Acknowledgments

- Design inspiration from various financial calculators
- Financial calculation formulas verified against industry standards
- Special thanks to the React and Next.js communities for excellent documentation

---

Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please create an issue or submit a pull request.
