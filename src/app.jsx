import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './app/Main';
import './index.css';

const root = createRoot(document.body);
root.render(<Main/>);