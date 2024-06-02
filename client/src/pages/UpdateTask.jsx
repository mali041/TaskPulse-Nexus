import TaskForm from "../components/TaskForm";
import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../util";

export default function UpdateTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setTask(data.message);
        } else {
          console.error("Failed to fetch task:", data.message);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  return (
    <Box p="3" maxW="4xl" mx="auto">
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        my="7"
      >
        Update Task
      </Heading>
      <TaskForm type="update" task={task} />
    </Box>
  );
}
