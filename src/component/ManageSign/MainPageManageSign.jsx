// MainPageManageSign.jsx
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Button, Card, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CurrentSignForms from './components/CurrentSignForms';
import HistorySignForms from './components/HistorySignForms';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sign-tabpanel-${index}`}
      aria-labelledby={`sign-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function MainPageManageSign() {
  const [tabValue, setTabValue] = useState(0);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const tabRefs = useRef([]);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* هدر کارت */}
        <Box
          sx={{
            borderBottom:
              themeMode === 'dark'
                ? '2px solid #fff5'
                : `2px solid ${alpha('#1787B0', 0.2)}`,
            background: `linear-gradient(135deg, ${alpha(
              '#1787B0',
              0.12,
            )} 0%, ${alpha('#1787B0', 0.05)} 100%)`,
          }}
        >
          <Box sx={{ px: 2.5, pt: 2.5 }}>
            <div className="flex items-center gap-2 mb-2">
              <DescriptionIcon sx={{ color: '#1787B0', fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: themeMode === 'dark' ? '#fffa' : '#1e293b',
                }}
              >
               کارتابل
              </Typography>
            </div>
          </Box>
        </Box>

        {/* تب‌ها به سبک TabsAdminLoanRequest */}
        <div className="w-full px-5 mt-3 relative">
          <div
            style={{ background: themeColor.bgColor }}
            className="flex justify-start gap-2 py-2 rounded-lg overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
          >
            <Button
              ref={(el) => (tabRefs.current[0] = el)}
              onClick={() => handleTabChange(0)}
              size="small"
              sx={{
                bgcolor: tabValue === 0 ? '#fff' : '',
                color: tabValue === 0 ? '#161c24' : themeColor.color,
                py: 1,
                px: 2,
                m: 0,
                whiteSpace: 'nowrap',
                minWidth: 130,
                '&:hover': {
                  bgcolor: tabValue === 0 ? '#fff' : alpha(themeColor.color, 0.1),
                },
              }}
            >
              <div className="flex items-center gap-2">
                <DescriptionIcon sx={{ fontSize: 20 }} />
                جاری
              </div>
            </Button>
            <Button
              ref={(el) => (tabRefs.current[1] = el)}
              onClick={() => handleTabChange(1)}
              size="small"
              sx={{
                bgcolor: tabValue === 1 ? '#fff' : '',
                color: tabValue === 1 ? '#161c24' : themeColor.color,
                py: 1,
                px: 2,
                m: 0,
                whiteSpace: 'nowrap',
                minWidth: 130,
                '&:hover': {
                  bgcolor: tabValue === 1 ? '#fff' : alpha(themeColor.color, 0.1),
                },
              }}
            >
              <div className="flex items-center gap-2">
                <HistoryIcon sx={{ fontSize: 20 }} />
                تاریخچه
              </div>
            </Button>
          </div>

          {/* فلش زیر تب فعال */}
          {tabRefs.current[tabValue] && (
            <div
              style={{
                left:
                  tabRefs.current[tabValue].offsetLeft +
                  tabRefs.current[tabValue].scrollWidth / 2 +
                  'px',
              }}
              className={
                themeMode === 'dark'
                  ? 'absolute bottom-0 translate-y-[175%] duration-300 justify-center items-center flex-col bg-[#161c24] z-[5] sm:flex hidden'
                  : 'absolute bottom-0 translate-y-[175%] duration-300 justify-center items-center flex-col bg-white z-[5] sm:flex hidden'
              }
            >
              <div className="translate-y-1">
                <svg
                  width="26"
                  height="11.5"
                  viewBox="0 0 26 11.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5001 11L17.2427 2.7426C14.8995 0.399462 11.1006 0.399463 8.75739 2.74261L0.5 11"
                    stroke="#F79231"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <svg
                width="39"
                height="17.25"
                viewBox="0 0 39 17.25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.2501 16.5L25.864 4.1139C22.3492 0.599077 16.651 0.59908 13.1362 4.11392L0.75 16.5"
                  stroke={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* محتوای تب‌ها */}
        <CustomTabPanel value={tabValue} index={0}>
          <CurrentSignForms />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <HistorySignForms />
        </CustomTabPanel>
      </Card>
    </Box>
  );
}

export default MainPageManageSign;