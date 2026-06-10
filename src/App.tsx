import QuakesView from './features/quakes/components/QuakesView';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="px-4 py-4 lg:px-6">
          <h1 className="text-xl font-semibold tracking-tight">
            🌎 Earthquake Scanner
          </h1>
        </div>
      </header>
      <main className="flex-1 p-4 lg:p-6">
        <QuakesView />
      </main>
    </div>
  );
}

export default App;
