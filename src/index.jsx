import { createRoot } from 'react-dom/client';
import App from './App';
import { I18nApp } from './components/i18n';
import './styles/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<I18nApp ReactComponent={<App />} />);
