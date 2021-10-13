import styled from "styled-components";

const Header = () => (
	<StyledHeader>
		<h1>Todos</h1>
	</StyledHeader>
);

export default Header;

const StyledHeader = styled.div`
	height: 5.125rem;
	width: 100%;
	padding: 1.25rem;
	border-bottom: 1px dashed #d2d0d0;
	display: flex;
	align-items: center;
	justify-content: center;
`;