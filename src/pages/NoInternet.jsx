import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
// assets
import Page from '../component/page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function NoInternet() {
  return (
    <Page title="404 Page Not Found" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <img src="/images/error-img.png" alt="" />
           
            <Typography sx={{ color: 'text.secondary',paddingY:2 }}>
             متاسفیم دسترسی به اینترنت ندارید!!!
            </Typography>

            

            <Button onClick={()=>{
                window.location.reload();
            }} size="large" variant="contained" component={RouterLink}>
              بارگذاری مجدد
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
