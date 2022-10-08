import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, useStyleSheet } from '@ui-kitten/components';

import { isSmallerScreen } from 'config/react';
import { useSetAlert, useSetLoading } from 'contexts/app-state';
import { useShedList } from 'contexts/dashboard';

import { getSheds } from 'endpoints/shed';

import { getGradientByIndex } from 'helpers/color';

import FormInput from 'components/form/FormInput';
import ScreenWrapper from 'components/layout/ScreenWrapper';

import ShedCard from './ShedCard';

import { FormFieldState } from 'types/form';

import shedViewStyles from './ShedView.styles';

const ShedView = () => {

	const styles = useStyleSheet(shedViewStyles);
	const setIsLoading = useSetLoading();
	const setAlert = useSetAlert();
	const { sheds, setSheds } = useShedList();

	const [search, setSearch] = useState<FormFieldState>({ value: '' });
	const [expandedShedId, setExpandedShedId] = useState<null | number>(null);

	useEffect(() => {
		setIsLoading(true);
		getSheds()
			.then(sheds => {
				setSheds(sheds.map((shed, index) => ({
					...shed,
					gradient: getGradientByIndex(index),
				})));
			})
			.catch(error => {
				setAlert({
					title: 'Bad API Response',
					text: error.message ?? error,
					type: 'primary',
				});
			})
			.finally(() => setIsLoading(false));
	}, []);

	const filteredSheds = (
		!search
			? sheds
			: sheds.filter(shed =>
				shed.name.toLowerCase().includes(search.value.toLowerCase())
			)
	);

	if (
		expandedShedId
		&& filteredSheds.every(shed => shed.shedId !== expandedShedId)
	) {
		setExpandedShedId(null);
	};

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Dashboard'
		>

			<FormInput
				style={styles.search}
				type='search'
				state={search}
				onChange={(value) => setSearch(prev => ({
					...prev,
					value,
				}))}
				placeholder='Search Shed'
				size={isSmallerScreen ? 'medium' : 'large'}
				hasIcon
			/>

			<Text
				style={styles.heading}
				category='h2'
			>
				Sheds Summary
			</Text>

			<ScrollView
				contentContainerStyle={styles.shedGrid}
			>

				{filteredSheds.map(shed =>
					<ShedCard
						key={shed.shedId}
						shed={shed}
						gradient={shed.gradient}
						onExpand={() => setExpandedShedId(shed.shedId)}
						onShrink={() => setExpandedShedId(null)}
						isExpanded={shed.shedId === expandedShedId}
					/>
				)}

			</ScrollView>

		</ScreenWrapper>
	);

};

export default ShedView;
