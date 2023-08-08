import React, { useState } from 'react';
import Grid from './Shared/Grid';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useActiveUserAuth } from './AuthContext';
import { Project, ProjectHeader } from '../Types/Project';
import { ProjectsService } from '../Services/ProjectsService';
import { Status } from '../Types/enums';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import { ColDef } from 'ag-grid-community';
import Header from './Shared/Header';
import { Strings } from '../Const';

const MainScreen: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const allProjects = ProjectsService.getAllProjects();
    const columns: ColDef<ProjectHeader>[] = [
        { field: 'name', sortable: true, filter: 'agTextColumnFilter' },
        { field: 'customerCompany', sortable: true, filter: 'agTextColumnFilter' },
        { field: 'status', valueFormatter: (data) => { return Status[data.value] }, sortable: true, filter: 'agSetColumnFilter' }
    ];

    // Handle row click event
    const handleRowClicked = (row: ProjectHeader) => {
        const selectedProjectData: Project | undefined = allProjects.find((project: Project) => project.id === row.id);
        if (selectedProjectData) {
            setSelectedProject(selectedProjectData); // Set the selected project to open the popup
        }
    };

    //close the popup
    const handleClosePopup = () => {
        setSelectedProject(null);
    };

    return (
        <>
            <Header></Header>
            <Content>
                <h1>{Strings.titles.MATRIX_PROJECTS}</h1>
                <Grid columns={columns} rows={allProjects} onRowClicked={handleRowClicked} />
                {selectedProject && (
                    // Render the styled popup with project details if 'selectedProject' is not null
                    <Dialog open={true} onClose={handleClosePopup} fullWidth maxWidth="sm">
                        <DialogTitle>Project Details</DialogTitle>
                        <DialogContent dividers>
                            <ProjectCard project={selectedProject}></ProjectCard>
                        </DialogContent>
                        <Button variant="contained" color="primary" onClick={handleClosePopup}>
                            Close
                        </Button>
                    </Dialog>
                )}
            </Content>
        </>
    );
};

export default MainScreen;

// Define the Content styled component

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem; /* Add margin for spacing */
`;