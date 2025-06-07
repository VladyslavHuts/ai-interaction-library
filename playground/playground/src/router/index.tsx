import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import CameraPage from '../pages/CameraPage';
import Voice from '../pages/Voice';
import Assistant from '../pages/Assistant';
import DynamicUI from '../pages/DynamicUI';

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
