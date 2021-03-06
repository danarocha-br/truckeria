import styled from 'styled-components';
import { shade, transparentize } from 'polished';
import tw from 'tailwind.macro';

export const Container = styled.div`

  .DayPicker {
    background: ${(props) => props.theme.colors.tabbar};
    border-top-left-radius: 2.5rem;

    &-wrapper {
      &:focus {
        outline: none;
      }
    }

    &-NavButton {
      &:focus {
        ${tw`rounded-md`}
        border: ${(props) => `1px dashed ${props.theme.colors.tabbar}`};
        outline: none;
      }
    }
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 16px;
    margin: 0;
  }

  .DayPicker-Caption {
    ${tw`py-3 text-center text-sm font-bold`};
    background-color: ${(props) =>
      transparentize(0.86, props.theme.colors.text)};
    border-top-left-radius: 2.5rem;
  }

  .DayPicker-NavButton {
    top: 0.8rem;
  }

  .DayPicker-Weekdays,
  .DayPicker-Body {
    padding: 0 20px;
  }

  .DayPicker-Day {
    width: 20px;
    height: 20px;
    border: 1px solid transparent;

    &:hover {
      ${tw`rounded-lg`}
    }

    &:focus {
      ${tw`font-bold rounded-lg`}
      outline: 0;
      border: ${(props) => `1px dashed ${props.theme.colors.primary}`};
    }
  }

  .DayPicker-Day--today {
    ${tw`font-bold rounded-lg`}
    background: ${(props) => props.theme.colors.primary} !important;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.text} !important;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${(props) => shade(0.2, props.theme.colors.shade)};
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    ${tw`font-bold rounded-lg`}
    background: ${(props) => props.theme.colors.shade} !important;
    color: ${(props) => props.theme.colors.white} !important;
  }

`;
