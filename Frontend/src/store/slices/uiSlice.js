import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isProfileDropdownOpen: false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    toggleProfileDropdown: (state) => {
      state.isProfileDropdownOpen = !state.isProfileDropdownOpen;
    },
    closeProfileDropdown: (state) => {
      state.isProfileDropdownOpen = false;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  toggleProfileDropdown,
  closeProfileDropdown,
} = uiSlice.actions;
export default uiSlice.reducer;
