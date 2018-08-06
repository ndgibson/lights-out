import Button from 'mineral-ui/Button';
import Text from 'mineral-ui/Text';
import { createStyledComponent } from 'mineral-ui/styles';
import { createThemedComponent } from 'mineral-ui/themes';

export const PressCountText = createThemedComponent(Text, ({ theme }) => ({
  Text_color: theme.color_theme,
  Text_fontSize: theme.h3_fontSize,
}));

const SansFocusButton = createStyledComponent(Button, {
  '&:focus': {
    'box-shadow': 'none',
  },
});

export const OptionsButton = SansFocusButton;

export const LightButton = SansFocusButton;