import styled from "styled-components";
import Header from './components/structure/Header';
import AddTodoInput from "./components/todo/AddTodoInput";
import { Spacer } from "./components/styling/Spacer";
import TodoContainer from './components/todo/TodoContainer';
import TodoToolbar from './components/todo/TodoToolbar';
import { useStore } from "./stores/RootStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FullWidthCenterWrapper } from "./components/styling/FullWidthCenterWrapper";

function App() {
	const { todoStore } = useStore();
	const { isLoadingTodos } = todoStore;
	const [fade, setFade] = useState(1);
	const [stillLoading, setStillLoading] = useState(true);

	const generateNewUniqueReferenceId = () => {
		todoStore.clearReferenceId();
		todoStore.clearTodos();
		todoStore.generateNewReferenceId();
	};

	useEffect(() => {
		if (!isLoadingTodos) {
			setFade(0);
			setStillLoading(false);
		}
	}, [isLoadingTodos]);

	useEffect(() => {
		setTimeout(() => setFade(0), 200);
	}, []);

	return (
		<StyledFadeInContainer
			fade={fade}
		>
			<FullWidthCenterWrapper>
				<StyledDebugButton
					onClick={generateNewUniqueReferenceId}
				>
					Debug: Generate new unique reference id
				</StyledDebugButton>
			</FullWidthCenterWrapper>

			<StyledPageWrapper>
				<StyledContentWrapper>
					{/* Should never happen in this scenario, but could happen "irl" ! */}
					{stillLoading && <><Spacer />Loading...</>}
					<Header />
					<AddTodoInput />
					<TodoContainer />
					<Spacer />
					<TodoToolbar />
				</StyledContentWrapper>
			</StyledPageWrapper>
		</StyledFadeInContainer>
	);
}

export default observer(App);

const StyledPageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 6.25rem;
	margin-bottom: 6.25rem;
`;

const StyledContentWrapper = styled.div`
	max-width: 31.25rem;
	background-color: #fff;
	border-radius: 0.625rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	border: 1px solid #e4e4e4;
`;

const StyledDebugButton = styled.button`
	margin-top: 10px;
`;

const StyledFadeInContainer = styled.div<{ fade: number }>`
	opacity: ${props => 1 - props.fade};
	transition: opacity 0.5s ease-in;
`;