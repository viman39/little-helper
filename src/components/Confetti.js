import ReactConfetti from "react-confetti";
import useWindowDimensions from "../utils/useWindowDimensions";

const Confetti = () => {
  const { width, height } = useWindowDimensions();
  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={400}
      gravity={0.02}
      recycle={false}
    />
  );
};

export default Confetti;
