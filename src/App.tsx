import CustomTitleBar from "./components/window/TitleBar";

function App() {
  return (
    <main className="h-screen w-screen bg-gray-100">
      <CustomTitleBar />
      <h1 className="m-auto translate-x-0 text-pretty bg-green-400 text-center font-mono text-2xl font-bold">
        Hello World
      </h1>
    </main>
  );
}

export default App;
