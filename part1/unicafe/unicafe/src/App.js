import React, {useState} from 'react';

const Button = ({handleClick, name}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {

const total = good + neutral + bad;

const average = (good - bad) / total;

const positive = (good / total) * 100;

if (good == 0 && neutral == 0 && bad == 0) {
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  );
}


  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
}

const StatisticLine = ({text, value}) => {

  if (text == 'positive') {
    return (
      <tr>
        <td>{text}</td><td>{value} %</td>
      </tr>
    );
  }

  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}


const App = () => {

const [good, setGood] = useState(0);
const [neutral, setNeutral] = useState(0);
const [bad, setBad] = useState(0);

const increaseGood = () => {
  setGood(good + 1)
}

const increaseNeutral = () => {
  setNeutral(neutral + 1);
};

const increaseBad = () => {
  setBad(bad + 1);
};

  return (
    <div>
      <h1> give feedback </h1>
      <Button name="good" handleClick={increaseGood}/>
      <Button name="neutral" handleClick={increaseNeutral}/>
      <Button name="bad" handleClick={increaseBad}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  );
}

export default App;


