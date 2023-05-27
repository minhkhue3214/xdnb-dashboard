import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import { Button, ButtonGroup } from '@mui/material';

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        onClick={() => changeLanguage('en')}
        variant={selectedLanguage === 'en' ? 'contained' : 'outlined'}
        color={selectedLanguage === 'en' ? 'primary' : 'error'}
      >
        English
      </Button>
      <Button
        onClick={() => changeLanguage('vi')}
        variant={selectedLanguage === 'vi' ? 'contained' : 'outlined'}
        color={selectedLanguage === 'vi' ? 'primary' : 'error'}
      >
        Tiếng Việt
      </Button>
    </ButtonGroup>
  );
};

export default ChangeLanguage;
