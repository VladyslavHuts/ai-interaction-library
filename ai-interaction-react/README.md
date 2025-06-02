# ai-interaction-react

> Adaptive AI-powered user interaction library for React – camera, voice & dynamic UI in one package.

[![npm version](https://img.shields.io/npm/v/ai-interaction-react.svg?style=flat&color=blue)](https://www.npmjs.com/package/ai-interaction-react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ai-interaction-react?color=purple)](https://bundlephobia.com/package/ai-interaction-react)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![CI](https://img.shields.io/github/actions/workflow/status/VladyslavHuts/ai-interaction-react/ci.yml?label=CI&logo=github)](https://github.com/VladyslavHuts/ai-interaction-react/actions)

---

## Project Description
*ai-interaction-react* is a modern, lightweight React library that enables adaptive interaction between users and applications through camera, voice, and personalized interface adjustments.

It combines computer vision, speech recognition, and accessibility-focused UI adaptation — all processed locally on the client side, with zero external data transmission.

This library is ideal for:

* Enhancing accessibility (for visually or motor-impaired users)
* Building intelligent interfaces (e.g. voice-controlled UIs)
* Experimental and next-gen UI projects (gesture, emotion-based navigation)
* Prototyping AI-enhanced React apps

Key Principles
* Privacy-first — all processing happens in the browser
* Modular — use only what you need (Camera, Voice, UI, Assistant)
* React-native — built 100% on React + TypeScript with modern tooling
* Framework-ready — future-proofed for integration with Vue, Angular, etc.

---

## Installation

Using npm:
```
npm install ai-interaction-react
```
Or using Yarn:
```
yarn add ai-interaction-react
```
Or using pnpm:
```
pnpm add ai-interaction-react
```
Note: This library defines react and react-dom as peer dependencies.
That means your project must already include them.

---

## Quick Start

Below is a minimal usage example of the *ai-interaction-react* library within a React application.

### Example
```tsx
import React from 'react'
import { Camera, useVoice } from 'ai-interaction-react'

const App: React.FC = () => {
  const { command, isListening } = useVoice()

  return (
    <div>
      <h1>AI Interaction Demo</h1>
      <Camera />
      <p>
        {isListening
          ? `Listening... Command: ${command}`
          : 'Voice control is inactive'}
      </p>
    </div>
  )
}
export default App
```
Key concepts demonstrated:
* Rendering the <Camera /> component, which handles camera input and visual processing
* Using the useVoice() hook to access current voice commands and listening state

For a complete working example, see the /examples directory included in this repository.

---
## API / Documentation

This section provides an overview of all exported components, hooks, and their respective signatures.

### Components

Camera
```tsx
<Camera />
```
* Initializes access to the user's webcam
* Processes facial expressions, gestures, and ambient light level
* Intended for adaptive UI or gesture-based control
* Internal state is managed by the library

Voice
```tsx
<Voice />
```
* Activates voice recognition using the Web Speech API
* Captures commands and converts speech to text
* Can be used for voice navigation, search, or interaction

DynamicUI
```tsx
<DynamicUI />
```
* Adjusts the visual appearance of the interface dynamically
* Supports font scaling, dark/light themes, and accessibility modes

Assistant
```tsx
<Assistant />
```
* Interactive UI assistant (planned component)
* Designed for proactive recommendations or user onboarding

### Hooks
useCamera()
```tsx
const { isCameraActive, emotion, lightLevel, gesture } = useCamera()
```
Returns:

| Field          | Type    | Description                             |
|----------------|---------|-----------------------------------------|
| isCameraActive | boolean | Whether the camera is currently active  |
| emotion        | string  | Detected emotion (e.g., 'happy', 'sad') |
| lightLevel     | number  | Estimated brightness level              |
| gesture        | string  | Detected hand or face gesture           |

useVoice()
```tsx
const { command, isListening } = useVoice()
```
Returns:

| Field        | Type     | Description                                 |
|--------------|----------|---------------------------------------------|
| command      | string   | Last recognized command                     |
| isListening  | boolean  | Whether the microphone is currently active  |

useDynamicUI()
```tsx
const { fontSize, theme, colorBlindMode } = useDynamicUI()
```
Returns:

| Field           | Type                                                         | Description                                     |
|-----------------|--------------------------------------------------------------|-------------------------------------------------|
| fontSize        | `'small' \| 'medium' \| 'large'`                             | Current font size used in the UI                |
| theme           | `'light' \| 'dark' \| 'high-contrast'`                       | Active UI theme                                 |
| colorBlindMode  | `'none' \| 'protanopia' \| 'deuteranopia' \| 'tritanopia'`   | Accessibility mode for color vision correction  |

### Types
All shared types are exported from:
```tsx
import { EmotionType, CameraData, VoiceData, UISettings } from 'ai-interaction-react/types'
```
This includes:
* EmotionType — union of possible emotion labels
* CameraData — structure of camera state
* VoiceData — structure of voice recognition state
* UISettings — structure for UI adaptation

>For full code examples, refer to the examples/ directory.

## Project Structure
```
ai-interaction-react/
├── examples/              # Sample React app demonstrating usage
│   ├── App.tsx
│   ├── index.html
│   └── main.tsx
├── src/                   # Source code of the library
│   ├── components/        # Core UI components
│   │   ├── Assistant.tsx
│   │   ├── Camera.tsx
│   │   ├── DynamicUI.tsx
│   │   └── Voice.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useCamera.ts
│   │   ├── useDynamicUI.ts
│   │   └── useVoice.ts
│   └── types/             # Shared TypeScript types and interfaces
│       └── index.ts
├── README.md              # Documentation
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Package metadata and dependencies
```
## Roadmap
Below are planned features and improvements for future releases.

Released
* Core components: Camera, Voice, DynamicUI, Assistant
* Custom hooks: useCamera, useVoice, useDynamicUI
* TypeScript support with generated declarations
* Peer dependency integration (react, react-dom)
* Vite dev environment with example usage

In Progress
* Context-based state sharing across components
* More accurate emotion and gesture detection models
* Unit tests and coverage reports
* Improved accessibility support (WCAG AA)

Planned
* Full customization via props for each component
* CMS plugin integration (WordPress, Shopify)
* SaaS platform version (hosted AI Interaction engine)
* Cross-framework support (Vue, Angular, Svelte)

> To suggest features or report bugs, please use the GitHub Issues page.

## Contributing

Contributions are welcome and encouraged. If you have suggestions for improvements, new features, or bug fixes, feel free to open an issue or submit a pull request.

### Guidelines

1. Fork the repository and create a new branch:
```
git checkout -b feature/my-new-feature
```

2. Follow the existing coding style.

   TypeScript, functional components, and strict typing are used throughout the codebase.


3. Test your changes using the examples/ project or add new test cases where applicable.
4. Submit a pull request, and clearly describe your changes.


>Before contributing, please make sure your changes do not break the existing API.

If you're unsure about your idea or implementation, feel free to start by opening a discussion in [GitHub Issues](https://github.com/VladyslavHuts/ai-interaction-react/issues).

## License
This project is licensed under the MIT License.

You are free to use, modify, and distribute this library in personal and commercial projects, subject to the conditions of the license.

See the [LICENSE](./LICENSE) file for full details.







