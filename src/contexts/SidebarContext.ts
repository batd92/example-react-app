import { createContext, Dispatch, SetStateAction } from 'react';

// Define the type for the context value
interface SidebarContextProps {
  toggleSidebar: boolean;
  setToggleSidebar: Dispatch<SetStateAction<boolean>>;
}

// Create the context with an initial value of undefined
export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);
