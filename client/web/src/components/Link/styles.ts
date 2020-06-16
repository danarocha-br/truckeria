import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import tw from 'tailwind.macro';

export type Props = LinkProps;

// export const Container = styled(Link)<Props>`
//   position: relative;
//   text-decoration: none;
//   display: inline-block;
//   color: ${(props) => props.theme.colors.primary};
//   padding: 3px 8px;

//   transition: color ease 0.5s;
//   z-index: 2;

//   &::after {
//     content: '';
//     position: absolute;
//     border-radius: 2px;
//     z-index: -1;
//     width: 100%;
//     height: 5%;
//     left: 0;
//     bottom: 0;
//     background-color: ${(props) => props.theme.colors.primary};
//     transition: all ease 0.5s;
//   }

//   &:hover {
//     color: white;

//     &::after {
//       height: 100%;
//     }
//   }
// `;

export const Container = styled(Link)<Props>`
  ${tw`no-underline relative inline-block pl-4 `}
  color: ${(props) => props.theme.colors.accent};

  span {
    ${tw`absolute left-0 `}
        top: -19px;
        right: -20px;
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
        display: inline-block;
        height: 1px;
        width: 5px;
        background-color: ${(props) => props.theme.colors.primary};
    }
    &:after{
      right: -15px;
    }
    &:before{
      left: 0;
    }
    &:hover, &:focus{
      span{
        transform: scaleX(1.2);
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
