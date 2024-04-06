import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MeetingCreationForm = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [isSubmit,setIsSubmit]=useState(false);

  function createMeeting() {
    console.log(meetingTitle);
    setMeetingScheduled(true);
    setIsSubmit(true);
  }

  return (
    <div className="flex">
      <form className="max-w-md mx-auto">
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
      {meetingScheduled && isSubmit &&(
        <div className="ml-8">
          <h2 className="text-xl font-bold mb-2">Thanks for scheduling the meeting!</h2>
          <p className="text-gray-700">
            Meeting Title: {meetingTitle} <br />
            Date: {selectedDate.toDateString()} <br />
            Time: {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default MeetingCreationForm;
