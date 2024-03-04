import CircleLoader  from "react-spinners/CircleLoader";

export default function Spinner({ isLoading }) {
  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
        <CircleLoader  color={"#36D7B7"} loading={isLoading} size={155} />;
    </div>
  );
}
