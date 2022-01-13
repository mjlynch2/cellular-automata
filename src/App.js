import Board from "./components/Board";

const App = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-3" />
        <div className="col-6">
          <Board />
        </div>
        <div className="col-3" />
      </div>
    </div>
  );
};

export default App;