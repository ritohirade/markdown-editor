import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
  cursor: pointer;
  
  &.cancel {
    background: white;
    border: 1px solid grey;
    color: grey;
  }
`

interface Props {
  cancel?: boolean
  children: string
  onClick: () => void
}

//React.FC<Props>と定義すると、引数propsはPropsであると判断できる
export const Button: React.FC<Props> = (props) => {
  return(
    <>
      <StyledButton onClick={props.onClick} className={props.cancel ? 'cancel' : ''}>
        {props.children}
      </StyledButton>
    </>
  )
}