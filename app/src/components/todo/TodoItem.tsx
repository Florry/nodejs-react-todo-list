import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TodoStatus } from "../../models/TodoModel";
import { useStore } from "../../stores/RootStore";
import { SecondaryButton } from "../styling/Buttons";

interface Props {
	id: string;
}

const TodoItem = ({ id }: Props) => {
	const { todoStore } = useStore();
	const todoItem = todoStore.getTodoById(id);
	const [checked, setChecked] = useState(todoItem?.status === TodoStatus.Completed);

	useEffect(() => {
		setChecked(todoItem?.status === TodoStatus.Completed);
	}, [todoItem?.status]);

	const markAsComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		todoStore.toggleCompleted(id);
	};

	const deleteItem = () => todoStore.deleteTodo(id);

	return (
		<StyledContainer>
			<input
				id={todoItem?.id}
				checked={checked}
				onChange={markAsComplete}
				type="checkbox"
			/>
			<label
				htmlFor={todoItem?.id}
				className={todoItem?.status?.toLowerCase()}
			>
				{todoItem?.text}
			</label>
			<SecondaryButton
				onClick={deleteItem}
				title="Delete todo item"
			>
				⨯
			</SecondaryButton>
		</StyledContainer>
	);
};

export default observer(TodoItem);

const StyledContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 3.125rem;
	height: auto;
	width: 100%;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
	font-size: 0.875rem;
	color: #494949;

	input[type="checkbox"]{
		margin-top: 0.25rem;
		width: 0.875rem;
		height: 0.875rem;
	}

	label {
		width: 100%;
		padding: 0.625rem;
		word-wrap: anywhere;

		&.completed {
			text-decoration: line-through;
			color: #b5b5b5;
		}
	}

	&:nth-child(odd) {
		background-color:	#f4f7fa
	}
`;
