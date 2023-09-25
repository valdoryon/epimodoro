# React + Vite

Timer & Chronometer using HTML, CSS, React

V0.5 notes:
    - Reworked CSS.
    - Reworked logic for the timer and chrono, setInterval()
      not working when tab not on focus. added Web Worker that
      sends ticks every seconds/milliseconds.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
