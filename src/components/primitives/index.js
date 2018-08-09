import Button from 'mineral-ui/Button';
import Text from 'mineral-ui/Text';
import { createStyledComponent } from 'mineral-ui/styles';
import { createThemedComponent } from 'mineral-ui/themes';

export const PressCountText = createThemedComponent(Text, ({ theme }) => ({
  Text_color: theme.color_theme,
  Text_fontSize: theme.h1_fontSize,
}));

const noFocusStyle = {
  '&:focus': {
    'box-shadow': 'none',
  },
  '&:hover': {
    'background-color': 'transparent',
  }
};

const BigButton = createThemedComponent(Button, ({ theme }) => ({
  Button_height_large: '5em',
  Button_height_jumbo: '10em',
  Button_borderColor: theme.color_theme,
}));

export const OptionsButton = (active = true) => createStyledComponent(BigButton, {
  'svg': {
    fill: active ? 'white' : undefined,
    filter: active ? 'drop-shadow(white 0px 0px 10px)' : undefined,
    height: '3em',
    width: '3em',
  },
  ...noFocusStyle,
}, {
  withProps: {
    circular: true,
    minimal: true,
  },
});

export const LightButton = createStyledComponent(BigButton, {
  'svg': {
    height: '3em',
    width: '3em',
  },
  ...noFocusStyle,
});