import './bootstrap';
import '../styles/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init({
    color: '#ED8936',
    showSpinner: true
});

const app = document.getElementById('app');
const root = createRoot(app);

// Color palette used - https://coolors.co/c1aba6-533b4d-f564a9-faa4bd-fae3c6

root.render(
    <InertiaApp
        initialPage={JSON.parse(app.dataset.page)}
        resolveComponent={name =>
            import(`./Pages/${name}`).then(module => module.default)
        }
    />
);