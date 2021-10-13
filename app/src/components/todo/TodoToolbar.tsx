import { observer } from "mobx-react";
import styled from "styled-components";
import { TodoStatus } from "../../models/TodoModel";
import { useStore } from "../../stores/RootStore";
import { SecondaryButton } from "../styling/Buttons";
import { FullWidthCenterWrapper } from "../styling/FullWidthCenterWrapper";

const TodoToolbar = () => {
	const { todoStore } = useStore();

	const markAllAsComplete = () => {
		todoStore.markAllAsComplete();
	};

	const incompleteTodos = todoStore.todos.filter(todo => todo.status === TodoStatus.ToDo);

	return (
		<StyledContainer>
			<div className="counter">{incompleteTodos.length} item(s) left</div>

			<SecondaryButton
				disabled={!incompleteTodos.length}
				onClick={markAllAsComplete}
			>
				Mark all as complete
			</SecondaryButton>

		</StyledContainer>
	);
};

export default observer(TodoToolbar);

const StyledContainer = styled(FullWidthCenterWrapper)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem;
	border-top: 1px dashed #d2d0d0;

	.counter {
		color: #999999;
		font-size: 0.8rem;
	}
`;