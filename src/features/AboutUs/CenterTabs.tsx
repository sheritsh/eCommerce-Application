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
        As the team leader, Oleg assumed a critical role in orchestrating our e-commerce project. He oversaw the entire
        development process and ensured that our team's efforts aligned with our objectives. Also Oleg played a pivotal
        role in developing the core functionality of our e-commerce platform. His expertise brought to life the product
        detail page, ensuring users can access comprehensive information about each product. Additionally, Oleg crafted
        a robust routing system, allowing seamless navigation throughout the application. His contribution to the
        shopping cart functionality optimized the purchasing process. Oleg's mastery of state management techniques
        facilitated the smooth interaction between different components, enhancing the overall user experience.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Ekaterina's creative talents and technical skills were instrumental in shaping the front-end of our e-commerce
        website. She led the design and implementation of the catalog, making product discovery an enjoyable experience.
        Ekaterina also spearheaded the development of the dynamic homepage, where users can explore featured items. Her
        work on intuitive filtering mechanisms empowers customers to quickly refine their product searches. Moreover,
        Ekaterina integrated promotional code functionality, creating opportunities for cost savings and customer
        engagement. Her dedication to user interface and experience design enriched our platform's visual appeal and
        usability.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Andrey focused on user-centric features that enhance the overall functionality of our application. He designed
        and implemented the user registration form, simplifying the onboarding process for new customers. By creating
        user profiles, Andrey empowered users to manage their information efficiently. Additionally, he crafted the
        "About Us" page, providing valuable insights into our company's history and mission. His contributions fostered
        a personalized and informative user experience. Andrey's dedication to user accounts and user-facing content
        strengthened our platform's customer-centric approach.
      </CustomTabPanel>
    </Box>
  );
}
