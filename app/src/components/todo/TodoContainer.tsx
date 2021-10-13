import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../stores/RootStore";
import { sortTodosByDate } from "../../utils/utils";
import { FullWidthCenterWrapper } from "../styling/FullWidthCenterWrapper";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
	const { todoStore } = useStore();

	useEffect(() => {
		todoStore.loadTodos();
	}, [todoStore]);

	return (
		<FullWidthCenterWrapper
			flexWrap="wrap"
		>
			{
				todoStore.todos
					.sort(sortTodosByDate)
					.map(todo => <TodoItem id={todo.id} key={todo.id} />)
			}
		</FullWidthCenterWrapper>
	);
};

export default observer(TodoContainer);