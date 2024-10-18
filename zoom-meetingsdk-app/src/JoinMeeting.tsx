import { useNavigate } from 'react-router-dom';
import "./JoinMeeting.css";

function JoinMeeting() {
    const navigate = useNavigate();

    const handleJoinMeeting = () => {
    navigate('/meeting');
};

    return (
        <div className="home">
            <main>
                <h1>Zoom Meeting SDK Sample React</h1>
                <button onClick={handleJoinMeeting} className="join-button">Join Meeting</button>
            </main>
        </div>
    );
}

export default JoinMeeting;