import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 230;

const floatingDrawerKeyProps:CSSObject = { position: 'fixed', top: '7dvh', backgroundColor:'rgb(255 255 255 / 95%)' };
const displacingDrawerKeyProps:CSSObject = { position: 'relative', top: 0, backgroundColor:'#FEFFDF' };

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  ...floatingDrawerKeyProps,
  // For bigger than 'lg' viewport sizes, apply drawer displacing content
  [theme.breakpoints.up('lg')]: {
    ...displacingDrawerKeyProps
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  ...floatingDrawerKeyProps,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  // For bigger than 'lg' viewport sizes, apply drawer displacing content
  [theme.breakpoints.up('lg')]: {
    ...displacingDrawerKeyProps
  },
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...floatingDrawerKeyProps,
  zIndex:1,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));