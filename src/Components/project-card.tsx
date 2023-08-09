import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

import { CommonService } from '../services/common-service';
import { Strings } from '../consts';
import { LogStatus, Status, variantMap } from '../types/enums';
import { Project } from '../types/project';
import { Translation } from '../translation';

interface projectProps { project: Project }

interface projectComponentView {
    lable: string,
    value: string,
    variant: string,
    color?: string,
    marginTop?: string,
    marginBottom?: string,
    prop?: string
}


const ProjectCard = (project: projectProps) => {

    const selectedProject: Project = project.project;
    if (selectedProject) {
        CommonService.log(Translation.massages.SELECTED_PROJECT(selectedProject.name), LogStatus.INFO,)
    }
    const getYesOrNoText = (isYes: boolean) => {
        return isYes ? Translation.titles.YES : Translation.titles.NO;
    }

    const projectComponentsView: projectComponentView[] = [
        { lable: '', value: selectedProject.name, variant: "h5", prop: 'gutterBottom' },
        { lable: Translation.titles.CUSTOMER, value: selectedProject.customerCompany, variant: "subtitle1", color: 'textSecondary' },
        { lable: Translation.titles.DATE, value: selectedProject.date.toDateString(), variant: "subtitle2", color: 'textSecondary' },
        { lable: '', value: selectedProject.description, variant: "body1", marginTop: '15px' },
        { lable: Translation.titles.STATUS, value: Status[selectedProject.status], variant: "body2", color: 'textSecondary', marginTop: '15px' },
        { lable: Translation.titles.START_UP, value: getYesOrNoText(selectedProject.isStartUp), variant: "body2", color: 'textSecondary' },
        { lable: Translation.titles.EMBEDDED, value: getYesOrNoText(selectedProject.isEmbeeddedSW), variant: "body2", color: 'textSecondary' },
        { lable: Translation.titles.TEAMS, value: '', variant: "h6", marginTop: '20px' }
    ]

    return (
        <Card elevation={3} sx={{ marginBottom: '20px' }}>
            <CardContent>
                {projectComponentsView.map((componentView: projectComponentView, index) =>
                (<Typography
                    key={index}
                    variant={variantMap[componentView.variant]}
                    sx={{
                        marginTop: componentView.marginTop || '0',
                        marginBottom: componentView.marginBottom || '0',
                    }}>
                    {componentView.lable}
                    {componentView.value}
                </Typography>))}
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

