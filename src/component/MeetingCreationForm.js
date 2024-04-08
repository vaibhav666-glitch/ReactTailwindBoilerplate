import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { sendEmail } from '../functions/email'

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
    sendEmail({
      to: inviteEmail,
      from: 'fmanxavier@gmail.com',
      sub:'Invitation email',
      body: 'Please join',
      apiKey: 're_HqaPqTrx_33tcL64Q64bNVRYyCBzxiz3Q'
    })
    console.log(`sent: `, { inviteEmail })
  }

  return (
    <div className="flex">
      <form className="max-w-md mx-auto mt-4">
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
        <div className="ml-8">
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
            className="block w-3/4 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <button type="button" onClick={sendInvite} className="block w-3/4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Send Invite
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingCreationForm;
