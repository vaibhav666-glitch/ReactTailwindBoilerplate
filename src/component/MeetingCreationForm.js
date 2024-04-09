import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

const MeetingCreationForm = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [data, setData] = useState({})
  
  function createMeeting() {
    console.log(meetingTitle);
    setMeetingScheduled(true);
    setData({
      title: meetingTitle,
      date: selectedDate.toDateString(),
      time: selectedTime
    })
  }

  function sendInvite() {
    console.log("Sending Email");
  
    if (inviteEmail) {
      localStorage.setItem("email", inviteEmail);
      
      axios
        .post("http://localhost:5000/send-email", {
          inviteEmail: inviteEmail,
        })
        .then((response) => {
          console.log(response.data);
          alert("Message Sent Successfully");
          setMeetingScheduled(false); // Close the pop-up
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to send message");
        });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-600">
      <form className={`max-w-md mx-auto mt-4 bg-purple-100 p-6 rounded-lg shadow-lg ${meetingScheduled && 'filter blur-md'}`}>
      <input
          type="text"
          placeholder="Meeting Title"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          required
          className="block w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            className="border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button type="button" onClick={createMeeting} className="block w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Create Meeting
        </button>
      </form>
      {meetingScheduled && (
        <div  className="fixed inset-0 flex items-center justify-center">
          <div className="max-w-md bg-purple-100 p-6 rounded-lg shadow-lg relative">
            <button className="absolute top-0 right-0 px-3 py-1 text-gray-500" onClick={() => setMeetingScheduled(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-2">Thanks for scheduling the meeting!</h2>
            <p className="text-gray-700">
              Meeting Title: {data.title} <br />
              Date: {data.date} <br />
              Time: {data.time}
            </p>
            <input
              type="text"
              placeholder="Invitation email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <button type="button" onClick={sendInvite} className="block w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Send Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingCreationForm;
