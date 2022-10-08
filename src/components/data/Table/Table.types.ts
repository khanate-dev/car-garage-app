import { StyleProp, ViewStyle } from 'react-native';

import getTableStyles from './Table.styles';

export interface TableColumn<Column extends string = string> {

	/** the identifying name of the column */
	name: Column,

	/** the label to show on the column header */
	label?: string,

	/** the width of the column in flex units. @default 1 */
	width?: number,

	/** the function to override a columns text value */
	getText?: (row: TableRow<Column>, index: number) => string,

}

export type TableRow<Column extends string = string> = Record<
	Column,
	string | number
>;

export type TableStyles = Record<
	keyof ReturnType<typeof getTableStyles>,
	StyleProp<ViewStyle>
>;

export interface TableProps<Column extends string = string> {

	styles?: Partial<TableStyles>,

	/** the details of the table's columns */
	columns: TableColumn<Column>[],

	/** the data to show in the table */
	data: TableRow<Column>[],

	/** the label to show when the table has no rows */
	emptyLabel?: string,

	/** should the table show row numbers? */
	showRowNumbers?: boolean,

}
