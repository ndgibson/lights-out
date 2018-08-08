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
};

const BigButton = createThemedComponent(Button, ({ theme }) => ({
  Button_height_large: '5em',
  Button_height_jumbo: '10em',
  Button_borderColor: theme.color_theme,
}));

export const OptionsButton = createStyledComponent(BigButton, {
  'svg': {
    height: '3em',
    width: '3em',
  },
  ...noFocusStyle,
});

export const LightButton = createStyledComponent(BigButton, {
  'svg': {
    height: '3em',
    width: '3em',
  },
  ...noFocusStyle,
});