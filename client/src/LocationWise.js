// LocationWise.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LocationWise = ({ resultList = [] }) => {
  const [selectedParty, setSelectedParty] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const handleLocationChange = (event) => {
    const party = event.target.value.trim();
    setSelectedParty(party);

    if (party === '') {
      setFilteredCandidates([]);
      return;
    }

    const exactMatch = resultList.some(
      (candidate) => candidate.party.toLowerCase() === party.toLowerCase()
    );

    if (exactMatch) {
      const filtered = resultList.filter(
        (candidate) => candidate.party.toLowerCase() === party.toLowerCase()
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates([]);
    }
  };

  const partyLabels = filteredCandidates.map((candidate) => candidate.location);
  const voteCounts = filteredCandidates.map((candidate) => candidate.voteCount);

  const maxVoteCount = Math.max(...voteCounts, 0);
  const stepSize = Math.ceil(maxVoteCount / 10);

  const data = {
    labels: partyLabels,
    datasets: [
      {
        label: `Votes count for ${selectedParty}`,
        data: voteCounts,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
        text: `Votes by Locations for ${selectedParty.toUpperCase()}`,
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
      },
      
      
      x: {
        title: {
          display: true,
          text: 'Location',
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
      padding: 20,
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>View Votes By Party</h2>
      <input
        type="text"
        placeholder="Enter Party"
        value={selectedParty}
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
        <p>No data available for the selected party.</p>
      )}
    </div>
  );
};

export default LocationWise;
