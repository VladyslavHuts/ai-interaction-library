import * as React from 'react'
import { Camera, useVoice } from '../src'

const App = () => {
    const { command } = useVoice()

    return (
        <div>
            <h1>AI Interaction Demo</h1>
            <Camera />
            <p>Voice command: {command}</p>
        </div>
    )
}

export default App
