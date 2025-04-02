// PartyWise.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PartyWise = ({ resultList }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);

    // Filter resultList for the selected location
    const filtered = resultList.filter(
      (candidate) => candidate.location.toLowerCase() === location.toLowerCase()
    );
    setFilteredCandidates(filtered);
  };

  // Prepare data for Chart.js
  const partyLabels = filteredCandidates.map((candidate) => candidate.party);
  const voteCounts = filteredCandidates.map((candidate) => candidate.voteCount);

  // Calculate max vote count to adjust chart range dynamically
  const maxVoteCount = Math.max(...voteCounts, 0); // Avoid issues if no data is present

  // Calculate dynamic stepSize for y-axis
  const stepSize = Math.ceil(maxVoteCount / 10); // For example, divide the max count into 10 steps

  const data = {
    labels: partyLabels,
    datasets: [
      {
        label: `Votes Count  in ${selectedLocation}`,
        data: voteCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.6)',
        hoverBorderColor: 'rgba(0, 0, 0, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, family: 'Arial, sans-serif' },
        },
      },
      title: {
        display: true,
        text: `Votes by Party in ${selectedLocation.toUpperCase()}`,
        font: { size: 18, family: 'Arial, sans-serif' },
        color: '#333',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxVoteCount + stepSize,
        stepSize: stepSize,
        title: {
          display: true,
          text: 'Vote Count',
          font: { size: 16, family: 'Arial, sans-serif' },
          color: '#555',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Subtle grid lines
        },
      },
      x: {
        title: {
          display: true,
          text: 'Parties',
          font: { size: 16, family: 'Arial, sans-serif' },
          color: '#555',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Subtle grid lines
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    layout: {
      padding: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>View Votes By Location</h2>
      <input
        type="text"
        placeholder="Enter Location"
        value={selectedLocation}
        onChange={handleLocationChange}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />

      {filteredCandidates.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data available for the selected location.</p>
      )}
    </div>
  );
};

export default PartyWise;
