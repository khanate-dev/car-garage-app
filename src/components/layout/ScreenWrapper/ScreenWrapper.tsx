import { SafeAreaView, View } from 'react-native';
import { Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import {
	useDarkMode,
	useToggleDarkMode,
	useUpdateUser,
	useUser,
} from 'contexts/app-state';

import IconButton from 'components/form/IconButton';
import Background from 'components/media/Background';

import { ScreenWrapperProps } from './ScreenWrapper.types';
import getScreenWrapperStyles from './ScreenWrapper.styles';

const ScreenWrapper = ({
	children,
	containerStyle,
	title,
	onBack,
}: ScreenWrapperProps) => {

	const theme = useTheme();
	const toggleDarkMode = useToggleDarkMode();
	const isDarkMode = useDarkMode();
	const styles = getScreenWrapperStyles(theme, isDarkMode);
	const user = useUser();
	const updateUser = useUpdateUser();

	return (
		<SafeAreaView
			style={styles.safeArea}
		>
			<Layout
				style={styles.container}
			>

				<Background
					style={styles.background}
				/>

				<View
					style={styles.header}
				>

					<View
						style={styles.headerLeft}
					>

						{onBack &&
							<IconButton
								name='arrow-back'
								style={styles.back}
								onPress={onBack}
								size={40}
								type='primary'
							/>
						}

						{title &&
							<Text
								style={styles.title}
								status='primary'
								category='h6'
							>
								{title}
							</Text>
						}

					</View>

					<View
						style={styles.headerRight}
					>

						{user &&
							<IconButton
								style={styles.logout}
								name='power-outline'
								size={35}
								type='danger'
								appearance='outline'
								onPress={() => updateUser(null)}
							/>
						}

						{user &&
							<Text
								style={styles.username}
								category='c2'
								status='primary'
							>
								Hi, {user.FarmOwnerName.split(' ')[0] ?? 'User'}
							</Text>
						}

						{user &&
							<Icon
								style={styles.userIcon}
								name='person-outline'
								fill={theme[`color-primary-${isDarkMode ? 300 : 700}`]}
							/>
						}

						<IconButton
							style={styles.themeToggle}
							name={isDarkMode ? 'sun-outline' : 'moon-outline'}
							size={40}
							type='primary'
							onPress={toggleDarkMode}
						/>

					</View>

				</View>

				<Animated.View
					style={[
						containerStyle,
						styles.screen,
					]}
					entering={SlideInLeft.springify()}
					exiting={SlideOutRight.springify()}
				>
					{children}
				</Animated.View>

			</Layout>
		</SafeAreaView>
	);
};

export default ScreenWrapper;
