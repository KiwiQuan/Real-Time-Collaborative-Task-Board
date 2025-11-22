import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import TrashCan from "../../assets/TrashCan";
import ModalOverlay from "../../components/ModalOverlay";

export default function Board({ board, deleteBoard, getBoards }) {
  const [tasks, setTasks] = useState([]);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTasks(board.tasks || []);
  }, [board]);

  return (
    <>
      <li className="boardItem min-w-[310px] max-w-[450px]">
        <Link
          className="boardLink font-medium px-5 py-5 gap-9 border border-gray-300 hover:shadow-md basis-full bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out mb-5 hover:scale-101 flex flex-col group"
          to={`/board/${board.id}`}
        >
          <div className="flex flex-col gap-2 relative">
            <p className="text-2xl font-medium">{board.name}</p>
            <button
              onClick={(e) => {
                setShowDeleteBoardModal(true);
                e.preventDefault();
              }}
              className="trashCanButton hover:bg-red-100 p-1 rounded-md absolute opacity-0 rounded-md group-hover:opacity-100 transition-opacity right-2 top-7"
            >
              <TrashCan className="size-5 stroke-red-500 cursor-default transition duration-200 ease-in-out" />
            </button>
          </div>

          <p className="text-gray-500 text-sm truncate w-full">
            {board.description}
          </p>

          <div className="flex flex-col gap-3">
            <div className="text-gray-500 text-sm flex justify-between">
              <p>Total Tasks</p>
              <p className="text-black font-medium">{tasks.length}</p>
            </div>
            <div className="taskStatus flex items-center gap-5">
              <span className="bg-green-500 w-4 h-4 rounded-full"></span>
              <p className="text-gray-500">
                {tasks.filter((task) => task.completed).length}
              </p>
              <span className="bg-red-500 w-4 h-4 rounded-full"></span>
              <p className="text-gray-500">
                {tasks.filter((task) => !task.completed).length}
              </p>
            </div>
          </div>
        </Link>
      </li>
      {showDeleteBoardModal && (
        <ModalOverlay
          onClose={() => setShowDeleteBoardModal(false)}
          title="Delete Board"
        >
          <div className="deleteBoardModalContent flex flex-col gap-4">
            <p className="confirmationMessage">
              Are you sure you want to delete "{board.name}"? This action cannot
              be undone and will delete all tasks associated with this board.
            </p>
            <div className="deleteBoardButtons flex gap-4 justify-end">
              <button
                className="deleteBoardButton bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 py-2 px-4 rounded-md cursor-pointer"
                onClick={async () => {
                  setShowDeleteBoardModal(false);

                  try {
                    await deleteBoard(board.id);
                    await getBoards();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Delete
              </button>
              <button
                className="cancelDeleteBoardButton hover:bg-gray-200 text-black border border-gray-300 transition-colors duration-200 py-2 px-4 rounded-md cursor-pointer"
                onClick={() => setShowDeleteBoardModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}
