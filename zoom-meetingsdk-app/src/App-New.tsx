import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinMeeting from './JoinMeeting';
import Meeting from './Meeting';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<JoinMeeting />} />
          <Route path="/meeting" element={<Meeting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;