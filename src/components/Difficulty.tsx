export default function Difficulty(props: DifficultyProps) {
  return (
    <div className="difficulty-container">
      <label className="landing-label-heading">Difficulty</label>
      <select
        className="difficulty-select"
        value={props.difficulty}
        onChange={(e) => {
          props.handleDifficultyChange(e.target.value);
        }}
      >
        <option value="any">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

type DifficultyProps = {
  difficulty: string;
  handleDifficultyChange: (difficulty: string) => void;
};
