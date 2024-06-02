import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../util";
import { toast } from "react-hot-toast";
import {
  Stack,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the user context

export default function TaskForm({ type, task, onTaskCreated }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useUser(); // Get user from user context
  const navigate = useNavigate();
  const doSubmit = async (values) => {
    values.authorId = user?.user?.id; // Set authorId from user context

    const endpoint =
      type === "create"
        ? `${API_BASE_URL}/tasks/createTask`
        : `${API_BASE_URL}/tasks/${task.id}`;
    const method = type === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(endpoint, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();

      if (res.status === 200) {
        const action = type === "create" ? "created" : "updated";
        toast.success(`Task ${action}: ${values.title}`);
        if (type === "create" && onTaskCreated) {
          // Check if onTaskCreated exists
          onTaskCreated(response.insertedId); // Invoke the callback function with the created task ID
        }
        navigate("/tasks");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to process request");
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <Stack direction={{ base: "column", md: "row" }} gap="4">
        <Flex direction="column" flex="1" gap="4">
          <FormControl isInvalid={errors.title}>
            <Input
              id="title"
              type="text"
              placeholder="Task Title"
              {...register("title", { required: "Task Title is required" })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description}>
            <Textarea
              id="description"
              type="text"
              placeholder="Description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex direction="column" flex="1" gap="4">
          <FormControl isInvalid={errors.priority}>
            <Select
              placeholder="Priority"
              {...register("priority", { required: "Priority is required" })}
            >
              <option value="urgent">Urgent</option>
              <option value="not urgent">Not Urgent</option>
            </Select>
            <FormErrorMessage>
              {errors.priority && errors.priority.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.status}>
            <Select
              placeholder="Status"
              {...register("status", { required: "Status is required" })}
            >
              <option value="open">Open</option>
              <option value="done">Done</option>
            </Select>
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
          </FormControl>
          {/* Hidden authorId field */}
          <FormControl>
            <Input
              id="authorId"
              type="hidden"
              value={user?.user?.id}
              {...register("authorId")}
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            textTransform="uppercase"
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
