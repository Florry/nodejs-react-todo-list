import styled from "styled-components";

export const PrimaryButton = styled.button<{ width: number }>`
	border: 1px solid #b7b6b6;
	border-radius: 0.3125rem;
	padding: 0.75rem;
	width: ${props => props.width ? props.width + "rem" : "auto"};
	font-weight: 600;
	color: #646363;
	height: 2.625rem;
	font-size: 0.875rem;

	&[disabled] {
		opacity: 0.5;
	}
`;

export const SecondaryButton = styled.button`
	border: none;
	color: #448ccb;
	background: none;
	font-size: 0.8125rem;

	&[disabled] {
		color: #999999;
	}
`;