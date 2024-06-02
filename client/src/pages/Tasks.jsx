import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { API_BASE_URL } from "../util";
import { Link, useSearchParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import TasksSkeleton from "../_skeletons/TasksSkeleton";

export default function Tasks() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks/`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.status === 200) {
          setTasks(data.message || []); // Ensure tasks is an array
        } else {
          console.error("Failed to fetch tasks", data.data);
          setTasks([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
        setTasks([]); // Fallback to empty array
      }
    };

    fetchTasks();
  }, [user]);

  if (tasks.length === 0) {
    return <TasksSkeleton />;
  }

  return (
    <Box p="5" maxW="3lg" mx="auto">
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        my="7"
      >
        Tasks to do
      </Heading>
      <Flex justify="space-between" mb="3">
        <Button
          colorScheme="green"
          textTransform="uppercase"
          fontWeight="semibold"
        >
          <Link to="/create-task">Create New Task</Link>
        </Button>
      </Flex>
      <TableContainer>
        <Table px="3" border="2px solid" borderColor="gray.100">
          <Thead backgroundColor="gray.100">
            <Tr>
              <Th>
                <Flex cursor="pointer" alignItems="center">
                  Task
                </Flex>
              </Th>
              <Th>
                <Flex cursor="pointer" alignItems="center">
                  Priority
                </Flex>
              </Th>
              <Th>
                <Flex cursor="pointer" alignItems="center">
                  Status
                </Flex>
              </Th>
              <Th>
                <Flex cursor="pointer" alignItems="center">
                  Due Date
                </Flex>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(tasks) ? (
              tasks.map((task) => (
                <Tr key={task.id}>
                  <Td>
                    <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={task.priority === "urgent" ? "red" : "gray"}
                    >
                      {task.priority}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={task.status === "open" ? "orange" : "green"}
                    >
                      {task.status}
                    </Badge>
                  </Td>
                  <Td>{task.due ? new Date(task.due).toDateString() : ""}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4">No tasks available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
