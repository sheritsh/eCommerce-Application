/* import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface Ia11yProps {
  id: string;
  'aria-controls': string;
}

function a11yProps(index: number): Ia11yProps {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label={<Avatar alt="Remy Sharp" src="../../assets/images/team/oleg.jpg" />} {...a11yProps(0)} />
        <Tab label={<Avatar alt="Remy Sharp" src="../../assets/images/team/kate.jpg" />} {...a11yProps(1)} />
        <Tab label={<Avatar alt="Remy Sharp" src="../../assets/images/team/andrey.jpg" />} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Вклад Олега был в ...
      </TabPanel>
      <TabPanel value={value} index={1}>
        Вклад Кати был в ...
      </TabPanel>
      <TabPanel value={value} index={2}>
        Вклад Андрея был в ...
      </TabPanel>
    </Box>
  );
} */

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface Ia11yProps {
  id: string;
  'aria-controls': string;
}

function a11yProps(index: number): Ia11yProps {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CenterTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: '850px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={<Avatar alt="Remy Sharp" src="../../assets/images/team/oleg.jpg" />} {...a11yProps(0)} />
          <Tab label={<Avatar alt="Remy Sharp" src="../../assets/images/team/kate.jpg" />} {...a11yProps(1)} />
          <Tab label={<Avatar alt="Remy Sharp" src="../../assets/images/team/andrey.jpg" />} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Вклад Олега был в ... Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem! Rem atque at
        adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis molestiae
        dignissimos explicabo totam fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem!
        Rem atque a adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis
        molestiae dignissimos explicabo totam fuga. quidem placeat obcaecati excepturi blanditiis molestiae dignissimos
        explicabo totam fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem! Rem atque a
        adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis molestiae
        dignissimos explicabo.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Вклад Кати был в ... Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem! Rem atque at
        adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis molestiae
        dignissimos explicabo totam fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem!
        Rem atque a adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis
        molestiae dignissimos explicabo totam fuga. quidem placeat obcaecati excepturi blanditiis molestiae dignissimos
        explicabo totam fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem! Rem atque a
        adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis molestiae
        dignissimos explicabo.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Вклад Андрея был в ... Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem! Rem atque
        adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis molestiae
        dignissimos explicabo totam fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem!
        Rem atque a adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis
        molestiae dignissimos explicabo totam fuga. quidem placeat obcaecati excepturi blanditiis molestiae dignissimos
        explicabo totam fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, qui autem! Rem atque a
        adipisci modi. Tempore vitae laborum cupiditate, quidem placeat obcaecati excepturi blanditiis molestiae
        dignissimos explicabo.
      </CustomTabPanel>
    </Box>
  );
}
