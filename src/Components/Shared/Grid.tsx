import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';

import { CommonService } from '../../services/common-service';
import { LogStatus } from '../../types/enums';
import { Translation } from '../../translation';
import { ProjectHeader } from '../../types/project';


export interface GridProps {
    rows: ProjectHeader[];
    columns: ColDef<ProjectHeader>[];
    onRowClicked?: (row: ProjectHeader) => void;
}
const Grid = (props: GridProps) => {
    let gridApi: GridApi;
    let gridColumnApi: ColumnApi;

    const gridWidth = '90%';
    const gridHight = 800;
    const handleRowClicked = (event: any): void => {
        if (props.onRowClicked && event.data) {
            props.onRowClicked(event.data); // Pass the clicked row data to the parent component
        }
    }
    const onGridReady = (params: any): void => {
        CommonService.log(Translation.massages.GRID_READY, LogStatus.INFO,)
        gridApi = params.api;
        gridColumnApi = params.columnApi;
        gridApi.sizeColumnsToFit();
    }

    return <div className="ag-theme-alpine" style={{ width: gridWidth, height: gridHight }}>
        <AgGridReact
            onGridReady={onGridReady}
            rowData={props.rows}
            columnDefs={props.columns}
            onRowClicked={handleRowClicked}
        >
        </AgGridReact>
    </div>
}
export default Grid;