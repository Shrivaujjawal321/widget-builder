import { Dashboard } from './components/orchestrator/Dashboard';
import { WidgetOrchestrator } from './components/orchestrator/WidgetOrchestrator';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <Dashboard />
      <WidgetOrchestrator />
    </div>
  );
}
