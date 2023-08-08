import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { LogStatus, Status, Technology } from '../Types/enums'; // Import your ProjectStatus and Technology enums
import { Project } from '../Types/Project';
import { CommonService } from '../Services/CommonService';
import { Strings } from '../Const';

interface projectProps { project: Project }

const ProjectCard = (project: projectProps) => {
    
    const selectedProject: Project = project.project;
    if (selectedProject) {
        CommonService.log(Strings.massages.SELECTED_PROJECT(selectedProject.name), LogStatus.info,)
    }

    return (
        <Card elevation={3} sx={{ marginBottom: '20px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {selectedProject.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Customer: {selectedProject.customerCompany}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    Date: {selectedProject.date.toDateString()}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '15px' }}>
                    {selectedProject.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '15px' }}>
                    Status: {Status[selectedProject.status]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Start-Up: {selectedProject.isStartUp ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Embedded SW: {selectedProject.isEmbeeddedSW ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '20px' }}>
                    Teams:
                </Typography>
                <List sx={{ marginTop: '10px', marginBottom: '20px' }}>
                    {selectedProject.teams.map((team, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={team} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
