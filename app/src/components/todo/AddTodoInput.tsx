import { useState } from "react";
import styled from "styled-components";
import { useStore } from "../../stores/RootStore";
import { PrimaryButton } from "../styling/Buttons";

const AddTodoInput = () => {
	const { todoStore } = useStore();
	const [text, setText] = useState("");

	const createTodo = (e: any) => {
		e.preventDefault();

		if (text !== "") {
			todoStore.createTodo(text);
			setText("");
		}
	};

	return (
		<StyledNewTodoContainer>
			<StyledInput
				placeholder="What needs to be done?"
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<PrimaryButton
				onClick={createTodo}
				width={9.0625}
				disabled={text === ""}
				type="submit"
			>
				Add todo
			</PrimaryButton>
		</StyledNewTodoContainer>
	);
};

export default AddTodoInput;

const StyledNewTodoContainer = styled.form`
	width: 100%;
	display: flex;
	justify-content: center;
	height: 2.5rem;
	padding: 1.25rem;
	justify-content: space-between;
	align-items: center;

	@media(max-width: 31.25rem){
		flex-wrap: wrap;
		height: auto;
		justify-content: center;
	}
`;

export const StyledInput = styled.input`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	border: 1px solid #b7b6b6;
	border-radius: 0.3125rem;
	height: 2.5rem;
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	font-size: 0.875rem;
	width: calc(100% - 11.25rem);
	margin-right: 0.625rem;

	@media(max-width: 31.25rem){
		margin: 0;
		margin-bottom: 0.625rem;
		width: 100%;
		text-align: center;
	}
`;