const useWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width: width * 0.98,
    height: height * 0.98,
  };
};

export default useWindowDimensions;
