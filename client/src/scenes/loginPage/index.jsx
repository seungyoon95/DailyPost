import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          DailyPost
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        maxWidth="500px"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to DailyPost!
        </Typography>
        <Form />
      </Box>
      <Box ml="auto" mr="auto" width="100%" maxWidth="500px" textAlign="center">
        <Typography>**Note**</Typography>
        <Typography>
          Server takes some time process any requests, especially when it's running
          for the first time after 15 minutes of inactivity. Please don't panic
          if the login button doesn't respond, it's working as hard as it can!
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
