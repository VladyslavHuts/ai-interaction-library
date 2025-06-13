import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout.tsx';
import Home from '../pages/Home.tsx';
import CameraPage from '../pages/CameraPage.tsx';
import Voice from '../pages/Voice.tsx';
import Assistant from '../pages/Assistant.tsx';
import DynamicUI from '../pages/DynamicUI.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'camera', element: <CameraPage /> },
            { path: 'voice', element: <Voice /> },
            { path: 'assistant', element: <Assistant /> },
            { path: 'dynamic-ui', element: <DynamicUI /> },
        ],
    },
]);
