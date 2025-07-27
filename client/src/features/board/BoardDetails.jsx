import { useParams } from "react-router";
import useBoards from "./useBoards";

export default function BoardDetails() {
  const { id } = useParams();

  return (
    <main>
      <>
        <h1>Board Details</h1>
        <p>Board ID: {id}</p>
      </>
    </main>
  );
}
