import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import TelegramIcon from '@mui/icons-material/Telegram';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function FolderList(): JSX.Element {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        rowGap: '15px',
        columnGap: '15px',
      }}
    >
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <PermPhoneMsgIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Weekly calls to discord" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <EditNoteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Daily chat reports on the progress of tasks" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <TelegramIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Constant communication in telegram" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <AddTaskIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Using the task board in Trello" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <Diversity3Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Regular code review by mentor" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <CelebrationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Gifs in pull requests" />
      </ListItem>
    </List>
  );
}
