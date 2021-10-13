import styled from "styled-components";

interface Props {
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
}

export const FullWidthCenterWrapper = styled.div<Props>`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: ${props => props.flexWrap};
`;