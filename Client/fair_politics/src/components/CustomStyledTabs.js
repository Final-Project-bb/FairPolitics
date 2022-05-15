import { styled } from "@mui/material/styles";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    // position: "static",
    bottom: "auto",
    top: 0,
  },
  "& .MuiTabs-indicatorSpan": {
    minHeight: 2.5,
    maxWidth: 300,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  // color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    // color: "#fff",
  },
  "&.Mui-focusVisible": {
    // backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
