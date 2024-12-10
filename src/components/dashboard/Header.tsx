import * as React from 'react';
import Stack from '@mui/material/Stack';
// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import CustomDatePicker from './CustomDatePicker';
// import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown';
import Search from './Search';
import {
  // SignInButton,
  SignedIn,
  // SignedOut,
  UserButton
} from '@clerk/nextjs';

export default function Header() {
  const hoy = new Date();
  console.log(hoy); // Muestra la fecha y hora actuales

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <p>{hoy.toDateString()}</p>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        {/* <Search /> */}
        {/* <CustomDatePicker /> */}
        {/* <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton> */}
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
