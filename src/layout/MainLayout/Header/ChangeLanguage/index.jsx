import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  ButtonGroup
} from '@mui/material';

const index = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  }

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => changeLanguage("en")} variant="contained"
        color={selectedLanguage === "en" ? "success" : "error"}
      >
        English
      </Button>
      <Button onClick={() => changeLanguage("vi")} variant="contained"
        color={selectedLanguage === "vi" ? "success" : "error"}
      >
        Tiếng Việt
      </Button>
    </ButtonGroup>
  )
}

export default index