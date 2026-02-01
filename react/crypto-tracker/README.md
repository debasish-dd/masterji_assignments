# Crypto Tracker Web App

A client-side cryptocurrency tracking application built with React + Vite, designed to fetch, display, and navigate real-time crypto market data with clean routing and state handling.

This project is not a “toy UI”. It focuses on data flow, routing correctness, performance, and deployment behavior.

## Live Demo

🔗 https://crypto-tracker-six-cyan.vercel.app/

## Tech Stack

React 18 – Component-driven UI, hooks-based state

Vite – Fast dev server, optimized production build

React Router DOM – Client-side routing

REST API (Crypto data provider) – Live market data

tailwind css / Utility styling – Minimal but functional UI

Vercel – Deployment with SPA routing configuration

## Core Features

Real-time cryptocurrency market data

List view of multiple coins with price and change

Dedicated detail page per coin using dynamic routing

Bookmark/favorite functionality (client-side)

Coin Comparison Page

Fully client-side rendered Single Page Application (SPA)

Deployed with proper SPA fallback handling

## Project Structure 
crypto-tracker/
├── public/
│   └── _redirects        
├── src/
│   ├── components/       
│   ├── pages/            
│   ├── services/         
│   ├── hooks/            
│   ├── App.jsx           
│   └── main.jsx          
├── package.json
└── vite.config.js


### Separation of concerns is intentional:

Pages handle routing context

Components stay reusable and dumb

API logic stays out of UI code

## Routing Design 

This app uses React Router DOM with browser history (/route) instead of hash routing (#/route).

Problem Encountered

Reloading a nested route (e.g. /bookmark) caused a 404 NOT_FOUND error on Vercel.

Root Cause

Vercel, by default, expects server-side routes.
SPA routes exist only in the browser, not on the server.

Fix Applied

Added a redirect rule so all routes fall back to index.html.

/*  /index.html  200


This ensures React Router handles routing correctly after reload.

### State Management Strategy

Local component state for UI interactions

Derived state instead of redundant state

No Redux used intentionally (overkill for current scope)

Predictable data flow via props and hooks

### Performance Considerations

Minimal re-renders by proper component splitting

API calls scoped to route-level components

Avoided unnecessary global state

Vite ensures tree-shaking and optimized builds

### How to Run Locally
git clone https://github.com/debasish-dd/masterji_assignments.git
cd react/crypto-tracker
npm install
npm run dev

### Known Limitations 

No persistent backend as it is a Frontend project

No caching or rate-limit handling

API errors handled minimally

Not optimized for very large datasets

These are deliberate scope limits, not ignorance.




## This project demonstrates:

Understanding of SPA routing pitfalls

Deployment-aware frontend engineering

Clean separation of concerns

Practical React patterns, not tutorial copy-paste

This is interview-usable, not just portfolio noise.