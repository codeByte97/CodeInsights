import React, { useEffect, useState } from 'react';
import './contestlist.css';
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from 'react-router-dom';

const ContestList = () => {
  const [CompeltedContest, setCompletedContest] = useState([]);
  const [UpcomingContest, setUpcomingContest] = useState([]);
  const [Error, setError] = useState('');
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");
  const history = useNavigate();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setColor("black");
    async function FecthData() {
      try {

        const result = await fetch('/UpcomingContests');
        const response = await result.json();
        if (response.status === 200) {

          setUpcomingContest(response.Data);
        }
        else {
          setError('Not Connected To Internet');
        }
      }
      catch (error) {
        console.log(error);
      }
      try {

        const result = await fetch('/Contests');
        const response = await result.json()
        if (response.status === 200) {
          setCompletedContest(response.Data);
        }
        else {
          setError('Not Connected To Internet');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    FecthData();

    setLoading(false);
  }, []);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentItems = CompeltedContest.slice(startIndex, endIndex);

  // Function to handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(CompeltedContest.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const NavigateContest = async (data) => {
       history(`/Contest/${data}`);
  }

  return (
    <>
      <div className="leaderboard">
        <center>
          <div className='Heading'>
            Contests
          </div>
          <h3 style={{ color: 'black', paddingRight: '80%' }}>Upcoming Contest</h3>
        </center>
        {loading === true ?
          <div className='loading'>
            <FadeLoader
              color={color}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader" />
          </div>
          :
          <>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ContestName</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {UpcomingContest.length === 0 ? <center><p>No Upcoming Contest</p></center> : UpcomingContest.map((entry, index) => (
                  <>
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                    >
                      <td className='td-contest'>{startIndex + index + 1}</td>
                      <td className='td-contest' onClick={()=>NavigateContest(entry.ContestName)} >{entry.ContestName} </td>
                      <td className='td-contest'>{entry.ContestDate} {entry.ContestTime}</td>
                    </tr>
                    <div className='sapce'>
                    </div>
                  </>
                ))}

              </tbody>
            </table>
            <h3 style={{ color: 'black', paddingRight: '70%' }}>Completed Contest</h3>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ContestName</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>

                {CompeltedContest.map((entry, index) => (
                  <>
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                    >
                      <td className='td-contest'>{startIndex + index + 1}</td>
                      <td className='td-contest' onClick={()=>NavigateContest(entry.ContestName)} >{entry.ContestName}</td>
                      <td className='td-contest'>{entry.ContestDate} {entry.ContestTime}</td>
                    </tr>
                    <div className='sapce'>
                    </div>
                  </>
                ))}

              </tbody>
            </table>
            {CompeltedContest.length && <div className="pagination">
              {currentPage === 1 ? <></> : <button
                className="pagination-button"
                onClick={goToPreviousPage}
              >
                Previous
              </button>}
              <span className="page-info">
                Page {currentPage} of {Math.ceil(CompeltedContest.length / itemsPerPage)}
              </span>
              {currentPage === Math.ceil(CompeltedContest.length / itemsPerPage) ? <></> : <button
                className="pagination-button"
                onClick={goToNextPage}
              >
                Next
              </button>}
            </div>}
          </>
        }
      </div>
    </>
  );
};

export default ContestList;
