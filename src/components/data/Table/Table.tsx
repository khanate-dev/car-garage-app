import { FlatList, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { useDarkMode } from 'contexts/app-state';

import { humanizeString } from 'helpers/string';

import { TableColumn, TableProps, TableStyles } from './Table.types';
import getTableStyles from './Table.styles';

const rowNoColumn: TableColumn = {
	name: 'rowNumber',
	label: '#',
	getText: (_, index) => (index + 1).toString(),
};

const Table = ({
	styles: passedStyles,
	columns: passedColumns,
	data,
	emptyLabel,
	showRowNumbers,
}: TableProps) => {

	const theme = useTheme();
	const isDarkMode = useDarkMode();
	const baseStyles = getTableStyles(
		theme,
		isDarkMode
	);

	const styles = Object.entries(baseStyles).reduce(
		(object, [key, value]) => ({
			...object,
			[key]: [value, passedStyles?.[key as keyof TableStyles]],
		})
		, {} as TableStyles
	);

	const columns = (
		showRowNumbers
			? [rowNoColumn, ...passedColumns]
			: passedColumns
	);

	return (
		<FlatList
			style={[
				styles.container,
			]}
			contentContainerStyle={styles.table}
			data={data}
			ListEmptyComponent={
				<Text style={styles.emptyLabel}>{emptyLabel ?? 'The Table Has No Rows'}</Text>
			}
			ListHeaderComponent={
				<View
					style={[
						styles.row,
						styles.headerRow,
					]}
				>
					{columns.map((column, index) =>
						<View
							key={index}
							style={[
								styles.cell,
								styles.headerCell,
								{ flex: column.width ?? 1 },
							]}
						>
							<Text
								style={[
									styles.cellText,
									styles.headerCellText,
								]}
							>
								{column.label ?? humanizeString(column.name)}
							</Text>
						</View>
					)}
				</View>
			}
			renderItem={({ item, index }) =>
				<Animated.View
					key={index}
					style={[
						styles.row,
						styles.bodyRow,
					]}
					entering={FadeInUp.springify()}
					exiting={FadeOutUp.springify()}
				>
					{columns.map((column, columnIndex) =>
						<View
							key={`${index}-${columnIndex}`}
							style={[
								styles.cell,
								styles.bodyCell,
								{ flex: column.width ?? 1 },
							]}
						>
							<Text
								style={[
									styles.cellText,
									styles.bodyCellText,
								]}
							>
								{column.getText?.(item, index) ?? item[column.name]}
							</Text>
						</View>
					)}
				</Animated.View>
			}
		/>
	);

};

export default Table;
