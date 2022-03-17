const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;