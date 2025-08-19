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

export default function NotFound() {
  return (
    <Page title="404 Page Not Found" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <img src="/images/error-img.png" alt="" />
           
            <Typography sx={{ color: 'text.secondary',paddingY:2 }}>
             متاسفیم صفحه مورد نظر پیدا نشد
            </Typography>

            

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              برگشت به خانه
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
