/**
 * TestTablePage.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

import { measureTableHeader } from 'helpers/textMeasurement';

import IBTable from 'components/sharedComponents/IBTable2/IBTable';

import ContentHeaderCell from './ContentHeaderCell';
import ContentBodyCell from './ContentBodyCell';

require('../../../_scss/pages/testTable/testTable.scss');

export default class TestTablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            columnNames: [],
            data: []
        };

        this.renderHeaderCell = this.renderHeaderCell.bind(this);
        this.renderBodyCell = this.renderBodyCell.bind(this);
    }

    componentWillMount() {
        this.buildTable();
    }

    buildTable() {
        const widths = [30, 400, 0, 300, 20];

        const columns = [];
        const columnNames = [];

        for (let i = 0; i < 50; i++) {
            const title = `Column Number ${i + 1}`;
            const widthIndex = i % widths.length;
            const column = {
                id: `col-${i}`,
                width: measureTableHeader(title) + widths[widthIndex]
            };

            columns.push(column);
            columnNames.push(title);
        }

        const rows = [];

        for (let i = 0; i < 500; i++) {
            const row = [];
            columns.forEach((col, colIndex) => {
                const item = `row ${i + 1}, column ${colIndex + 1}`;
                row.push(item);
            });

            rows.push(row);
        }

        this.setState({
            columns,
            columnNames,
            data: rows
        });
    }

    renderHeaderCell(id, index) {
        return (<ContentHeaderCell
            title={this.state.columnNames[index]} />);
    }

    renderBodyCell(row, column) {
        return (<ContentBodyCell
            value={this.state.data[row][column]} />);
    }

    render() {
        return (
            <div className="test-table-page">
                <main id="main-content">
                    <div className="page-content">
                        <div className="page-wrapper">
                            <div>
                                <IBTable
                                    visibleWidth={500}
                                    visibleHeight={700}
                                    headerHeight={60}
                                    rowHeight={60}
                                    columns={this.state.columns}
                                    rowCount={this.state.data.length}
                                    renderHeaderCell={this.renderHeaderCell}
                                    renderBodyCell={this.renderBodyCell} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
