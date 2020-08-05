import styled from 'styled-components';
import { Link } from 'react-router-dom';
import tw from 'tailwind.macro';

export const Container = styled(Link)`
  ${tw`no-underline relative inline-block pl-4 pr-5 font-semibold`}
  color: ${(props) => props.theme.colors.accent};

  span {
    ${tw`absolute left-0`}
        top: 13px;
        right: 0px;
        height: 1px;
        background-color: ${(props) => props.theme.colors.primary};
        transform: scaleX(0);
        transform-origin: 0% 50%;
        transition: 0.3s ease-out 0.3s;

        &:after, &:before{
          ${tw`absolute top-0 right-0 inline-block`}
          content: '';
          height: 1px;
          width: 5px;
          background-color: ${(props) => props.theme.colors.primary};
          transition: 0.3s ease-out;
        }
        &:before{
          transform-origin: 100% 0%;
          transform: rotate(0deg);

        }
        &:after{
          transform-origin: 100% 100%;
          transform: rotate(0deg);
        }
    }
    &:after, &:before{
      ${tw`absolute inline-block`}
        content: '';
        top: 13px;
        height: 1px;
        width: 5px;
        background-color: ${(props) => props.theme.colors.primary};
    }
    &:after{
      right: 5px;
    }
    &:before{
      left: 0;
    }
    &:hover, &:focus{
      span{
        transform: scaleX(1.15);
        transition: 0.3s ease-out;
        &:before{
            transform: rotate(40deg);
            transition: 0.3s cubic-bezier(.17,.67,.36,1.44) 0.3s;
        }
        &:after{
            transform: rotate(-40deg);
            transition: 0.3s cubic-bezier(.17,.67,.36,1.44) 0.3s;
        }
      }
    }
`;
