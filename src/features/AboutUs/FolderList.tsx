import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';

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
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Weekly calls to discord" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Daily chat reports on the progress of tasks" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Constant communication in telegram" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Using the task board in Trello" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Regular code review by mentor" />
      </ListItem>
      <ListItem sx={{ width: '49%' }}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Gifs in pull requests" />
      </ListItem>
    </List>
  );
}
