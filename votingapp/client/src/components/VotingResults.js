import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import "./VotingResults.css";

const VotingResults = () => {
  const [votingData, setVotingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/votes/aggregate-votes");
        setVotingData(response.data);
      } catch (error) {
        console.error("Error fetching voting data:", error);
        // Optionally, notify the user about the error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (votingData.length === 0) return;

    // Bar Chart
    const barCtx = document.getElementById("barChart").getContext("2d");
    const barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: votingData.map((item) => item.candidateName),
        datasets: [
          {
            label: "Votes",
            data: votingData.map((item) => item.totalVotes),
            backgroundColor: "#FFA500",
            borderColor: "#FFA500",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: 14, weight: 'bold' },
              color: '#333',
            },
            title: { display: true, text: 'Votes', font: { size: 16, weight: 'bold' } }
          },
          x: {
            ticks: {
              font: { size: 14, weight: 'bold' },
              color: '#333',
            },
            title: { display: true, text: 'Candidates', font: { size: 16, weight: 'bold' } }
          }
        },
        plugins: { legend: { display: false } },
        layout: {
          padding: { left: 20, right: 20, top: 20, bottom: 20 }
        }
      },
    });

    // Pie Chart
    const pieCtx = document.getElementById("pieChart").getContext("2d");
    const pieChart = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: votingData.map((item) => item.candidateName),
        datasets: [
          {
            label: "Votes",
            data: votingData.map((item) => item.totalVotes),
            backgroundColor: [
              "#FFA500",
              "#FF6347",
              "#FFD700",
              "#CD5C5C",
              "#4682B4",
              "#008000",
              "#4B0082",
              "#9400D3",
            ],
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: { size: 14, weight: 'bold' },
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [votingData]);

  return (
    <div className="chart-container">
      <canvas id="barChart" className="chart-item" width="400" height="400"></canvas>
      <canvas id="pieChart" className="chart-item" width="400" height="400"></canvas>
    </div>
  );
};

export default VotingResults;
